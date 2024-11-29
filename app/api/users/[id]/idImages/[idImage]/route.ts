import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string, idImage: string } }
) {
  try {
    const user = await currentUser()
    const  userId  = user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const profileOwner = await db.user.findUnique({
      where: {
        id: params.userId,
        // userId: userId
      }
    });

    if (!profileOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const idImage = await db.idImage.delete({
      where: {
        userId: params.userId,
        id: params.idImage,
      }
    });

    return NextResponse.json(idImage);
  } catch (error) {
    console.log("ATTACHMENT_ID", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

