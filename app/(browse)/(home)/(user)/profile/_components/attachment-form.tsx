"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon, File, Loader2, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IdImage, User } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

interface IdImageFormProps {
  initialData: User & { idImages: IdImage[] };
  id: string;
};

const formSchema = z.object({
  url: z.string().min(1),
});

export const IdImageForm = ({
  initialData,
  id,
}: IdImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/users/${id}/idImages`, values);
      toast.success("User updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async (idImage: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/users/${id}/idImage/${idImage}`);
      toast.success("IdImage deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="mt-6 border bg-card rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        وثائق رسمية
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && (
            <>الغاء</>
          )}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              اضافة وثيقة
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.idImages.length === 0 && (
            <p className="text-sm mt-2 text-slate-200 italic">
              لا توجد وثائق
            </p>
          )}
          {initialData.idImages.length > 0 && (
            <div className="space-y-2">
              {initialData.idImages.map((idImage) => (
                <div
                  key={idImage.id}
                  className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">
                    {/* {idImage.name} */}
                    وثيقة
                  </p>
                  {deletingId === idImage.id && (
                    <div>
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                  {/* {deletingId !== idImage.id && (
                    <button
                      onClick={() => onDelete(idImage.id)}
                      className="ml-auto hover:opacity-75 transition"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )} */}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="idImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            انت وحدك المسؤول عن مصداقية الوثائق المقدمة
          </div>
        </div>
      )}
    </div>
  )
}