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
import { $Enums } from "@prisma/client";

interface GenderFormProps {
    initialData: {
        sex: $Enums.UserSex;
    };
    userId: string;
};

const formSchema = z.object({
    sex: z.string().min(1, {
        message: "Title is required",
    }),
});

export const GenderForm = ({
    initialData,
    userId
}: GenderFormProps) => {
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
            toast.success("‘Gender updated");
            toggleEdit();
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        }
    }

    console.log(initialData.sex)
    const GenderOptions = ["MALE", "FEMALE", "OTHER"];

    const genderMap: Record<string, string> = {
        MALE: "ذكر",
        FEMALE: "أنثى",
        OTHER: "عدم الإجابة"
    };

    return (
        <div className="mt-6 border bg-card rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                الجنس
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>الغاء</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            تعديل الجنس
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p className="text-sm mt-2">
                    {genderMap[initialData.sex]}
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
                            name="sex"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <RadioGroup
                                            className="flex h-11 gap-6 xl:justify-between"
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            dir="rtl"
                                        >
                                            {GenderOptions.map((option, i) => (
                                                <div key={option + i} className="radio-group">
                                                    <RadioGroupItem value={option} id={option} />
                                                    <Label htmlFor={option} className="cursor-pointer">
                                                        {genderMap[option]}
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