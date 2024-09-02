"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { settings } from "@/actions/settings";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { useCurrentUser } from "@/hooks/use-current-user";
import { SettingsSchema } from "@/schemas";
import { PasswordInput } from "@/components/ui/password-toggle";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useSession } from "next-auth/react";
import { TelInput } from "@/components/ui/phone-toggle";

interface PasswordFormProps {
    initialData: {
        email: string;

    };
    userId: string;
};


export const EmailForm = () => {

    const user = useCurrentUser();

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const { update } = useSession();


    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);


    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            password: undefined,
            newPassword: undefined,
            name: user?.name || undefined,
            email: user?.email || undefined,
            role: user?.role || undefined,
            isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
        }
    });
    const router = useRouter();
    const { isSubmitting, isValid } = form.formState;
    const [isPending, startTransition] = useTransition();
    const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
        startTransition(() => {
            settings(values)
                .then((data) => {
                    if (data.error) {
                        setError(data.error);
                    }

                    if (data.success) {
                        update();
                        setSuccess(data.success);
                        toggleEdit();
                        router.refresh();
                    }
                })
                .catch(() => setError("Something went wrong!"));
        });
    }



    return (
        <div className="mt-6 border bg-card rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                الايميل
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>الغاء</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            تعديل الايميل
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p className="text-sm mt-2">
                    {user?.email}
                </p>
            )}
            {isEditing && (



                <Form {...form}>
                    <form
                        className="space-y-4 mt-4"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="space-y-4">

                            {user?.isOAuth === false && (
                             <FormField
                             control={form.control}
                             name="email"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel>الايميل</FormLabel>
                                 <FormControl>
                                   <TelInput
                                     {...field}
                                     disabled={isPending}
                                   />
                                 </FormControl>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                            )}


                        </div>
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <Button
                            disabled={isPending}
                            type="submit"
                        >
                            حفظ
                        </Button>
                    </form>
                </Form>


            )}
        </div>
    )
}




