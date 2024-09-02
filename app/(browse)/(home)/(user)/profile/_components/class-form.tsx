"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";

interface ClassFormProps {
  initialData: User;
  userId: string;
  options: { label: string; value: string; }[];
};

const formSchema = z.object({
  classId: z.string().min(1),
  foundation: z.string().min(1, {
    message: "يجب ذكر العنوان"
  }),
});

export const ClassForm = ({
  initialData,
  userId,
  options,
}: ClassFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      classId: initialData?.classId || ""
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/users/${userId}`, values);
      toast.success("user updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  const selectedOption = options.find((option) => option.value === initialData.classId);

  return (
    <div className="mt-6 border bg-card rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        المرحلة الدراسية
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>الغاء</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              تعديل المرحلة الدراسية
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className={cn(
          "text-sm mt-2",
          !initialData.classId && "text-slate-500 italic"
        )}>
          {selectedOption?.label || "No class"}{'-'}{initialData.foundation}
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
              name="classId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox
                      options={options}
                      {...field}
                    />

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="foundation"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="اسم المؤسسة و عنوانها"
                      {...field}
                      dir="rtl" />
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