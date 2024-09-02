"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/core";
import "react-phone-number-input/style.css";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PhoneFormProps {
    initialData: {
        phone: string;
    };
    userId: string;
};

const formSchema = z.object({
    phone: z.string().min(1, {
        message: "Title is required",
    }),
});

export const PhoneForm = ({
    initialData,
    userId
}: PhoneFormProps) => {
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

    console.log(initialData.phone)

    return (
        <div className="mt-6 border bg-card rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                رقم الهاتف
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>الغاء</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            تعديل رقم الهاتف
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p className="text-sm mt-2">
                    {initialData.phone}
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
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <PhoneInput
                                            defaultCountry="PS"
                                            placeholder={initialData.phone}
                                            international
                                            withCountryCallingCode
                                            value={field.value as E164Number | undefined}
                                            onChange={field.onChange}
                                            className="input-phone"
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