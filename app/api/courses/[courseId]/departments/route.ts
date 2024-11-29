import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string, departmentId: string } }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    const { name }  = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // const lastChapter = await db.chapter.findFirst({
    //   where: {
    //     courseId: params.courseId,
    //   },
    //   orderBy: {
    //     position: "desc",
    //   },
    // });

    // const newPosition = lastChapter ? lastChapter.position + 1 : 1;

    const department = await db.department.create({
      data: {
        id: params.departmentId,
        name,
        // courseId: params.courseId,
        // position: newPosition,
      },
    });

    return NextResponse.json(department);
  } catch (error) {
    console.log("[CHAPTERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
