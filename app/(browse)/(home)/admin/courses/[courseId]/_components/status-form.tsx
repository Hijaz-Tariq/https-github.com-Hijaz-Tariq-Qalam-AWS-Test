

"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { $Enums, Status, Course } from "@prisma/client";

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

interface StatusFormProps {
  initialData: Course;
  courseId: string;
  status: $Enums.Status;
  // jobRequest: string;
  // options: { label: string; value: string; }[];
};

const formSchema = z.object({
  status: z.string().min(1),
  // jobRequest: z.string().min(0),
});

export const StatusForm = ({
  initialData,
  courseId,
  // options,
  status,

}: StatusFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: initialData?.status || "",

    },
  });

  const { isSubmitting, isValid } = form.formState;
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/admin/courses/${courseId}`, values);

      toast.success("Course updated");

      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");

    }
  }

  // const selectedOption = options.find((option) => option.value === initialData.status);

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
            !initialData.status && "text-slate-500 italic"
          )}>
            {status || "No status"}
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
                name="status"
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

                          <SelectItem value={Status.PENDING}>
                            PENDING
                          </SelectItem>
                          <SelectItem value={Status.SCHEDULED}>
                            SCHEDULED
                          </SelectItem>
                          <SelectItem value={Status.ACTIVE}>
                            ACTIVE
                          </SelectItem>
                          <SelectItem value={Status.OVER}>
                            OVER
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
                {/* {jobRequest !== '' ?
                  <p >{jobRequest}       : الطلب المقدم</p>
                  : 'لا يوجد طلب'} */}
              </div>
            </form>
          </Form>
        )}
      </div>

    </>
  )
}



