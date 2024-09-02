import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { Status } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    const role = user?.role;
    const { title } = await req.json();

    if (!userId || role != "TEACHER") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const pendingCourseCount = await db.course.count({
      where: {
        userId,
        status: Status.PENDING, // Adjust if needed based on your enum
      },
    });

    if (pendingCourseCount >= 10) {
      return new NextResponse("Course limit reached", { status: 403 });
    }

    const course = await db.course.create({
      data: {
        userId,
        title,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
