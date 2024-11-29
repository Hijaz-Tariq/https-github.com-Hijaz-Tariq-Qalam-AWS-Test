"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface JobFormProps {
  initialData: {
    foundation: string;
    job: string;
  };
  userId: string;
};

const formSchema = z.object({
  foundation: z.string().min(1, {
    message: "يجب ذكر العنوان"
  }),
  job: z.string().min(1, {
    message: "Job is required",
  }),
});

export const JobForm = ({
  initialData,
  userId
}: JobFormProps) => {
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
      toast.success("‘Job updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }



  return (
    <div className="mt-6 border bg-card rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        المهنة
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>الغاء</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              تعديل المهنة
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className="text-sm mt-2">
          {initialData.foundation}{'-'}{initialData.job}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2  items-baseline justify-between"
          >
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
            <FormField
              control={form.control}
              name="job"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'اسم المهنة'"
                      {...field}
                      dir="rtl"
                    />
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