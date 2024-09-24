"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
// import { formatDate } from "@/lib/format";

interface StartsByFormProps {
    initialData: Course;
    courseId: string;
    startsBy: Date;
    dateFormat?: string;
};

const formSchema = z.object({
    startsBy: z.coerce.date(),
});

export const StartsByForm = ({
    initialData,
    courseId,
    startsBy,
    dateFormat,
}: StartsByFormProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            startsBy: initialData?.startsBy || undefined,
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/admin/courses/${courseId}`, values);
            toast.success("user updated");
            toggleEdit();
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        }
    }

    // const userBirthday = birthday.toString();

    return (
        <div className="mt-6 border bg-card rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                موعد الدورة
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>الغاء</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            تعديل موعد الدورة
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p className={cn(
                    "text-sm mt-2",
                    !initialData.startsBy && "text-slate-200 italic"
                )}>
                    {/* {initialData.birthday
            ? dateFormat(initialData.birthday)
            : "Set Birthday"
          } */}
                    {startsBy ?
                        startsBy.toDateString()
                        : 'Set Starting Day'
                    }
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
                            name="startsBy"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <ReactDatePicker
                                            selected={field.value}
                                            onChange={(date: Date | null) => field.onChange(date!)}
                                            showTimeSelect
                                            dateFormat="Pp"
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