import Mux from "@mux/mux-node";
import { NextResponse } from "next/server";

import { getUserById } from "@/data/user";

import { db } from "@/lib/db";
import { $Enums, UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";
// import { currentUser } from "@/lib/auth";

const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!
);

export async function DELETE(
  req: Request,
  { params }: { params: { id: string; role: string } }
) {
  try {
    const userId = await getUserById(params.id);
    const role = await currentRole();

    if (role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await db.user.findUnique({
      where: {
        id: params.id,
        role: userId?.role,
      },
      // include: {
      //     roles: params.role
      //     chapters: {
      //       include: {
      //         muxData: true,
      //       }
      //     }
      // }
    });

    if (!user) {
      return new NextResponse("Not found", { status: 404 });
    }

    // for (const chapter of user.chapters) {
    //   if (chapter.muxData?.assetId) {
    //     await Video.Assets.del(chapter.muxData.assetId);
    //   }
    // }

    const deletedCourse = await db.user.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.log("[USER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string; role: $Enums.UserRole } }
) {
  try {
    const userId = await getUserById(params.id);
    const role = params.role;
    // const userId = user?.id;
    const { id } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await db.user.update({
      where: {
        id: params.id,
        role: userId.role,
        // userId
      },
      data: {
        ...values,
      },
    });
console.log(user.role)
    return NextResponse.json(user);
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
