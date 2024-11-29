// "use client";

// import * as z from "zod";
// import axios from "axios";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { Pencil } from "lucide-react";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { $Enums, User, UserRole } from "@prisma/client";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { Textarea } from "@/components/ui/textarea";
// import { Combobox } from "@/components/ui/combobox";

// interface RoleFormProps {
//   initialData: User;
//   id: string;
//   role: $Enums.UserRole;
//   options: { label: string; value: string; }[];
// };

// const formSchema = z.object({
//   role: z.string().min(1),
// });

// export const RoleForm = ({
//   initialData,
//   id,
//   options,
//   role,
// }: RoleFormProps) => {
//   const [isEditing, setIsEditing] = useState(false);

//   const toggleEdit = () => setIsEditing((current) => !current);

//   const router = useRouter();

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       role: initialData?.role || ""
//     },
//   });

//   const { isSubmitting, isValid } = form.formState;

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       await axios.patch(`/api/users/${id}`, values);
//       toast.success("Course updated");
//       console.log("Course updated")
//       toggleEdit();
//       router.refresh();
//     } catch {
//       toast.error("Something went wrong");
//       console.log("Something went wrong")
//     }
//   }

//   const selectedOption = options.find((option) => option.value === initialData.role);

//   return (
//     <div className="mt-6 border bg-card rounded-md p-4">
//       <div className="font-medium flex items-center justify-between">
//         Course category
//         <Button onClick={toggleEdit} variant="ghost">
//           {isEditing ? (
//             <>Cancel</>
//           ) : (
//             <>
//               <Pencil className="h-4 w-4 mr-2" />
//               Edit category
//             </>
//           )}
//         </Button>
//       </div>
//       {!isEditing && (
//         <p className={cn(
//           "text-sm mt-2",
//           !initialData.role && "text-slate-500 italic"
//         )}>
//           {role || "No category"}
//         </p>
//       )}
//       {isEditing && (
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="space-y-4 mt-4"
//           >
//             <FormField
//               control={form.control}
//               name="role"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>

//                     <select

//                       defaultValue={role}
//                       onSubmit={form.handleSubmit(onSubmit)}
//                       className="w-full rounded border border-gray-200 bg-black px-2 py-1 leading-tight focus:border-gray-500 focus:outline-none disabled:opacity-50"
//                     >
//                       <option value={UserRole.USER}>USER</option>
//                       <option value={UserRole.TEACHER}>TEACHER</option>
//                     </select>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <div className="flex items-center gap-x-2">
//               <Button
//                 disabled={!isValid || isSubmitting}
//                 type="submit"
//               >
//                 Save
//               </Button>
//             </div>
//           </form>
//         </Form>
//       )}
//     </div>
//   )
// }



"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { $Enums, User, UserRole } from "@prisma/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Combobox } from "@/components/ui/combobox";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RoleFormProps {
  initialData: User;
  id: string;
  role: $Enums.UserRole;
  jobRequest: string;
  options: { label: string; value: string; }[];
};

const formSchema = z.object({
  role: z.string().min(1),
  jobRequest: z.string().min(0),
});

export const RoleForm = ({
  initialData,
  id,
  options,
  role,
  jobRequest,
}: RoleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: initialData?.role || "",
      jobRequest: ""
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/users/${id}`, values);

      toast.success("User updated");
      
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
      
    }
  }

  const selectedOption = options.find((option) => option.value === initialData.role);
 
  return (
    <>
      <div className="mt-6 border bg-card rounded-md p-4">
        <div className="font-medium flex items-center justify-between">
          :صفة المستخدم
          <Button onClick={toggleEdit} variant="ghost">
            {isEditing ? (
              <>Cancel</>
            ) : (
              <>
                <Pencil className="h-4 w-4 mr-2" />
                تعديل الصفة
              </>
            )}
          </Button>
        </div>
        {!isEditing && (
          <p className={cn(
            "text-sm mt-2",
            !initialData.role && "text-slate-500 italic"
          )}>
            {role || "No category"}
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
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>

                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}

                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent  >

                          <SelectItem value={UserRole.TEACHER}>
                            معلم
                          </SelectItem>
                          <SelectItem value={UserRole.BROKER}>
                            وسيط
                          </SelectItem>
                          <SelectItem value={UserRole.USER}>
                            طالب
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between gap-x-2">
                <Button
                  disabled={!isValid || isSubmitting}
                  type="submit"
                >
                  Save
                </Button>
                {jobRequest !== '' ?
                  <p >{jobRequest}       : الطلب المقدم</p>
                  : 'لا يوجد طلب'}
              </div>
            </form>
          </Form>
        )}
      </div>

    </>
  )
}



