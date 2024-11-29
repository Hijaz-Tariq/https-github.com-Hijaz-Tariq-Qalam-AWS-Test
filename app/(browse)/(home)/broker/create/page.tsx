"use client";
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import QRCode from "qrcode.react";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { useCurrentUser } from '@/hooks/use-current-user';

const formSchema = z.object({
  title: z.string().min(1, {
    message: "يجب إضافة المبلغ",
  }),
});

const codeUrl = uuidv4();
const QRCreatePage = () => {
  const router = useRouter();
  const user = useCurrentUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const [qrCodeValue, setQRCodeValue] = useState("");
  const [confirmationStep, setConfirmationStep] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const title = parseFloat(values.title);
      const websiteLink = "http://e-qalam.com/broker/scan";
      if (!isNaN(title) && user) {

        const qrCodeData = {
          // userId: user.id,
          // dateNow: new Date().toISOString(),
          codeUrl,
          title: title,
          websiteLink: websiteLink,

        };

        const qrCodeValue = JSON.stringify(qrCodeData);
        setQRCodeValue(qrCodeValue);
        setConfirmationStep(true);
      } else {
        toast.error("المبلغ غير صالح أو المستخدم غير مسجل دخوله");
      }
    } catch (error) {
      toast.error("حدث خطأ ما");
    }
  };

  const createQRCode = async () => {
    try {

      const response = await axios.post("/api/code", {
        title: form.getValues("title"),
        qrCodeData: JSON.parse(qrCodeValue),
        codeUrl,
      });
      router.push(`/broker/codes/${response.data.id}`);
      toast.success("تم انشاء الرمز");

    } catch {
      toast.error("حدث خطأ");

    }
  };


  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">المدرسة الفلسطينية الدولية</h1>
        <p className="text-sm text-slate-600">LOGO</p>
        <Form {...form}>
          <form
            onSubmit={confirmationStep ? createQRCode : form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>كم هو المبلغ الذي تريد إضافته؟</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="00.0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2">
              {confirmationStep ? (
                <>
                  <Button type="button" onClick={() => setConfirmationStep(false)}>
                    تعديل
                  </Button>
                  <Button type="submit" disabled={!isValid || isSubmitting}>
                    تأكيد

                  </Button>

                </>
              ) : (
                <Button type="submit" disabled={!isValid || isSubmitting}>
                  التالي

                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
      {qrCodeValue && (
        <div className="mt-8">
          <QRCode value={qrCodeValue} size={128} level="H" renderAs="canvas" />
          <div className="mt-4">
            {confirmationStep ? (
              <Button type="button" onClick={createQRCode}>
                تحميل الرمز الشريطي

              </Button>
            ) : (
              <a
                href={qrCodeValue}
                download="teacher_qr_code.png"
                className="text-blue-600 cursor-pointer"
              >

              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCreatePage;


////////////////////////////////////////////////////////////////



// "use client"

// import { useUser } from "@clerk/nextjs";
// import { useState } from "react";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import QRCode from "qrcode.react";
// import { useRouter } from "next/navigation";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormLabel,
//   FormMessage,
//   FormItem,
// } from "@/components/ui/form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import toast from "react-hot-toast";
// import axios from "axios";
// import CryptoJS from "crypto-js";

// // Generate a random 256-bit (32-byte) encryption key
// const generateEncryptionKey = () => {
//   return CryptoJS.lib.WordArray.random(32).toString();
// };

// const formSchema = z.object({
//   title: z.string().min(1, {
//     message: "يجب إضافة المبلغ",
//   }),
// });

// const QRCreatePage = () => {
//   const router = useRouter();
//   const { user } = useUser();
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "",
//     },
//   });

//   const { isSubmitting, isValid } = form.formState;
//   const [qrCodeValue, setQRCodeValue] = useState<string | null>(null);
//   const [confirmationStep, setConfirmationStep] = useState(false);

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       const title = parseFloat(values.title);

//       if (!isNaN(title) && user) {
//         const qrCodeData = {
//           userId: user.id,
//           dateNow: new Date().toISOString(),
//           title: title,
//         };

//         // Generate a random encryption key
//         const encryptionKey = generateEncryptionKey();

//         // Encrypt the data
//         const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(qrCodeData), encryptionKey).toString();

//         setQRCodeValue(encryptedData);
//         setConfirmationStep(true);
//       } else {
//         toast.error("المبلغ غير صالح أو المستخدم غير مسجل دخوله");
//       }
//     } catch (error) {
//       toast.error("حدث خطأ ما");
//     }
//   };

//   const createQRCode = async () => {
//     try {
//       const response = await axios.post("/api/code", {
//         title: form.getValues("title"),
//         qrCodeData: qrCodeValue, // Use the encrypted data
//       });
//       router.push(`/broker/codes/${response.data.id}`);
//       toast.success("QR-Code created");
//     } catch {
//       toast.error("حدث خطأ");
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
//       <div>
//         <h1 className="text-2xl">المدرسة الفلسطينية الدولية</h1>
//         <p className="text-sm text-slate-600">LOGO</p>
//         <Form {...form}>
//           <form
//             onSubmit={confirmationStep ? createQRCode : form.handleSubmit(onSubmit)}
//             className="space-y-8 mt-8"
//           >
//             <FormField
//               control={form.control}
//               name="title"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>كم هو المبلغ الذي تريد إضافته؟</FormLabel>
//                   <FormControl>
//                     <Input
//                       disabled={isSubmitting}
//                       placeholder="00.0"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <div className="flex items-center gap-x-2">
//               {confirmationStep ? (
//                 <>
//                   <Button type="button" onClick={() => setConfirmationStep(false)}>
//                     تعديل
//                   </Button>
//                   <Button type="submit" disabled={!isValid || isSubmitting}>
//                     تأكيد
//                   </Button>
//                 </>
//               ) : (
//                 <Button type="submit" disabled={!isValid || isSubmitting}>
//                   التالي
//                 </Button>
//               )}
//             </div>
//           </form>
//         </Form>
//       </div>
//       {qrCodeValue && (
//         <div className="mt-8">
//           {confirmationStep ? (
//             <div>
//               <QRCode value={qrCodeValue} size={128} level="H" renderAs="canvas" />
//               <div>تم توليد البيانات المخفية. لا يمكن رؤيتها في الرمز الشريطي.</div>
//             </div>
//           ) : (
//             <QRCode value={qrCodeValue} size={128} level="H" renderAs="canvas" />
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default QRCreatePage;


////////////////////////////////////////// 11/10/20230 18:50


// "use client"

// import { useUser } from "@clerk/nextjs";
// import { useState } from "react";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import QRCode from "qrcode.react";
// import { useRouter } from "next/navigation";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormLabel,
//   FormMessage,
//   FormItem,
// } from "@/components/ui/form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import toast from "react-hot-toast";
// import axios from "axios";

// const formSchema = z.object({
//   title: z.string().min(1, {
//     message: "يجب إضافة المبلغ",
//   }),
// });

// const QRCreatePage = () => {
//   const router = useRouter();
//   const { user } = useUser();
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "",
//     },
//   });

//   const { isSubmitting, isValid } = form.formState;
//   const [qrCodeValue, setQRCodeValue] = useState("");
//   const [confirmationStep, setConfirmationStep] = useState(false);

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       const title = parseFloat(values.title);

//       if (!isNaN(title) && user) {
//         const qrCodeData = {
//           userId: user.id,
//           dateNow: new Date().toISOString(),
//           title: title,
//         };

//         const qrCodeValue = JSON.stringify(qrCodeData);
//         setQRCodeValue(qrCodeValue);
//         setConfirmationStep(true);
//       } else {
//         toast.error("المبلغ غير صالح أو المستخدم غير مسجل دخوله");
//       }
//     } catch (error) {
//       toast.error("حدث خطأ ما");
//     }
//   };

//   const createQRCode = async () => {
//     try {
//       const response = await axios.post("/api/code", {
//         title: form.getValues("title"),
//         qrCodeData: JSON.parse(qrCodeValue),
//       });
//       router.push(`/broker/codes/${response.data.id}`);
//       toast.success("QR-Code created");

//     } catch {
//       toast.error("حدث خطأ");

//     }
//   };


//   return (
//     <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
//       <div>
//         <h1 className="text-2xl">المدرسة الفلسطينية الدولية</h1>
//         <p className="text-sm text-slate-600">LOGO</p>
//         <Form {...form}>
//           <form
//             onSubmit={confirmationStep ? createQRCode : form.handleSubmit(onSubmit)}
//             className="space-y-8 mt-8"
//           >
//             <FormField
//               control={form.control}
//               name="title"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>كم هو المبلغ الذي تريد إضافته؟</FormLabel>
//                   <FormControl>
//                     <Input
//                       disabled={isSubmitting}
//                       placeholder="00.0"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <div className="flex items-center gap-x-2">
//               {confirmationStep ? (
//                 <>
//                   <Button type="button" onClick={() => setConfirmationStep(false)}>
//                     تعديل
//                   </Button>
//                   <Button type="submit" disabled={!isValid || isSubmitting}>
//                     تأكيد

//                   </Button>

//                 </>
//               ) : (
//                 <Button type="submit" disabled={!isValid || isSubmitting}>
//                   التالي

//                 </Button>
//               )}
//             </div>
//           </form>
//         </Form>
//       </div>
//       {qrCodeValue && (
//         <div className="mt-8">
//           <QRCode value={qrCodeValue} size={128} level="H" renderAs="canvas" />
//           <div className="mt-4">
//             {confirmationStep ? (
//               <Button type="button" onClick={createQRCode}>
//                 تحميل الرمز الشريطي

//               </Button>
//             ) : (
//               <a
//                 href={qrCodeValue}
//                 download="teacher_qr_code.png"
//                 className="text-blue-600 cursor-pointer"
//               >

//               </a>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QRCreatePage;

//////////////////////////////////////////////////////////// 11/11 20.38

