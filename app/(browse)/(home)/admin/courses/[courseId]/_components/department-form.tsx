"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Course, Department } from "@prisma/client";
interface DepartmentFormProps {
  initialData: Course & { departments: Department[] };
  courseId: string;
  options: { name: string; id: string }[];
}
const FormSchema = z.object({
  departments: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "يجب اختيار مادة واحدة على الاقل.",
  }),
})
export function DepartmentForm({ courseId, options, initialData }: DepartmentFormProps) {

  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      departments: [],
    },
  })
  const departments = options
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      await axios.patch(`/api/admin/courses/${courseId}`, {
        departments: {
          set: data.departments.map(id => ({ id }))
        }
      });

      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch {

      toast.error("Something went wrong");
    }
  }
  const departmentId = initialData.departments.map((department) => (department.id)).toString()
  const SelectedOptions = departments.find((departments) => departments.id === departmentId)
  return (
    <div className="mt-6 border bg-card rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        الفرع
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>الغاء</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              تعديل الفرع
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className={cn(
          "text-sm mt-2",
          !initialData.departments && "text-slate-500 italic"
        )}>
          {SelectedOptions?.name}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="departments"
              render={() => (
                <FormItem>
                  <div className="mb-4">

                    <FormDescription>
                      الفروع التي تتشارك نفس الكتاب
                      {initialData.departments.map((department) => (
                        <> <div>{department.name}</div></>
                      ))}
                    </FormDescription>
                  </div>
                  {departments.map((department) => (
                    <FormField
                      key={department.id}
                      control={form.control}
                      name="departments"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={department.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(department.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, department.id])
                                    : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== department.id
                                      )
                                    )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {department.name}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">حفظ</Button>
          </form>
        </Form>
      )}
    </div>
  )
}

