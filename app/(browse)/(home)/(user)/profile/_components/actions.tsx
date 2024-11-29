// "use client";

// import axios from "axios";
// import { Trash } from "lucide-react";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";

// import { Button } from "@/components/ui/button";
// import { ConfirmModal } from "@/components/modals/confirm-modal";
// import { useConfettiStore } from "@/hooks/use-confetti-store";
// import { UserRole } from "@prisma/client";

// interface ActionsProps {
//   disabled: boolean;
//   userId: string;
//   isPublished: boolean;
// };

// export const Actions = ({
//   disabled,
//   userId,
//   isPublished
// }: ActionsProps) => {
//   const router = useRouter();
//   const confetti = useConfettiStore();
//   const [isLoading, setIsLoading] = useState(false);

//   const onClick = async () => {
//     try {
//       setIsLoading(true);

//       if (isPublished) {
//         await axios.patch(`/api/users/${userId}/unpublish`);
//         toast.success("user unpublished");
//       } else {
//         await axios.patch(`/api/users/${userId}/publish`);
//         toast.success("user published");
//         confetti.onOpen();
//       }

//       router.refresh();
//     } catch {
//       toast.error("Something went wrong");
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   const onDelete = async () => {
//     try {
//       setIsLoading(true);

//       await axios.delete(`/api/users/${userId}`);

//       toast.success("user deleted");
//       router.refresh();
//       router.push(`/admin/users`);
//     } catch {
//       toast.error("Something went wrong");
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   const role = UserRole
//   console.log(role)
//   return (
//     <div className="flex items-center gap-x-2">
//       <Button
//         onClick={onClick}
//         disabled={disabled || isLoading}
//         variant="outline"
//         size="sm"
//       >
//         {/* {isPublished ? "Unpublish" : "Publish"} */}
//       </Button>
//       <ConfirmModal onConfirm={onDelete}>
//         <Button size="sm" disabled={isLoading}>
//           <Trash className="h-4 w-4" />
//         </Button>
//       </ConfirmModal>
//     </div>
//   )
// }


"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserRole } from "@prisma/client";
import { useCurrentUser } from "@/hooks/use-current-user";


interface RoleFormProps {
  initialData: {
    jobRequest: string;
  };
  userId: string;
  role: string
};

const formSchema = z.object({
  jobRequest: z.string().min(1, {
    message: "Title is required",
  }),
});

export const JobRequestForm = ({
  initialData,
  userId,
  role,
}: RoleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {

      await axios.patch(`/api/users/${userId}`, values);
      toast.success("‘Phone number updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  const RoleOptions = ["TEACHER", "BROKER"];

  const roleMap: Record<string, string> = {
    TEACHER: "معلم",
    BROKER: "وسيط",

  };

  return (
    <div className="mt-6 border bg-card rounded-md p-4">
      <div className="font-medium flex items-center justify-between">

        <Button onClick={toggleEdit} variant="ghost" disabled={initialData.jobRequest !== null || role !== 'USER'}>
          {isEditing ? (
            <>الغاء</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              تعديل الوصف
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className="text-sm mt-2">
          {role}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="jobRequest"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      className="flex h-11 gap-6 xl:justify-between"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      dir="rtl"
                    >
                      {RoleOptions.map((option, i) => (
                        <div key={option + i} className="radio-group">
                          <RadioGroupItem value={option} id={option} />
                          <Label htmlFor={option} className="cursor-pointer">
                            {roleMap[option]}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
              >
                حفظ
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}