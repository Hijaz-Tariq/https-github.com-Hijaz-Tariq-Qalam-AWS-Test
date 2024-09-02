import { createUploadthing, type FileRouter } from "uploadthing/next";

import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";
import { currentUser } from "@/lib/auth";

const f = createUploadthing();

const handleAuth = async () => {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId || user.role !== "TEACHER") throw new Error("Unauthorized");
  return { userId };
};

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
idImage: f(["text", "image", "video", "audio", "pdf"])
.middleware(async () => {
  const self = await getSelf();
  return { user: self };
})
.onUploadComplete(() => {}),
  imageUploader: f({
    image: {
      maxFileCount: 1,
      maxFileSize: "4MB",
    },
  })
    .middleware(async () => {
      const self = await getSelf();
      return { user: self };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db.user.update({
        where: { id: metadata.user.id },
        data: {
          image: file.url,
        },
      });
    }),
  thumbnailUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const self = await getSelf();

      return { user: self };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db.stream.update({
        where: {
          userId: metadata.user.id,
        },
        data: {
          thumbnailUrl: file.url,
        },
      });

      return { fileUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
