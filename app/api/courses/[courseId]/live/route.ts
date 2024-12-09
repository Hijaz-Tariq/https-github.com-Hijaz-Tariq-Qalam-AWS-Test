// import { currentUser } from "@/lib/auth";
// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";

// export async function POST(
//   req: Request,
//   { params }: { params: { courseId: string } }
// ) {
//   try {
//     // Get the current authenticated user
//     const user = await currentUser();
//     const userId = user?.id;

//     // Check if user is authenticated
//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     // Find the course by courseId and userId
//     const course = await db.course.findUnique({
//       where: {
//         id: params.courseId,
//         userId,
//       },
//     });

//     // If the course does not exist or doesn't belong to the user
//     if (!course) {
//       return new NextResponse("Course not found", { status: 404 });
//     }

//     // Update the `isLive` field to `true` when the teacher starts the call
//     const updatedCourse = await db.course.update({
//       where: {
//         id: params.courseId,
//         userId,
//       },
//       data: {
//         isLive: true,
//       },
//     });

//     // Respond with the updated course
//     return NextResponse.json(updatedCourse);
//   } catch (error) {
//     console.error("[START_CALL_ERROR]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }


// import { currentUser } from "@/lib/auth";
// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";

// export async function POST(
//   req: Request,
//   { params }: { params: { courseId: string } }
// ) {
//   try {
//     // Get the current authenticated user
//     const user = await currentUser();
//     const userId = user?.id;

//     // Check if user is authenticated
//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     // Find the course by courseId and userId
//     const course = await db.course.findUnique({
//       where: {
//         id: params.courseId,
//         userId,
//       },
//     });

//     // If the course does not exist or doesn't belong to the user
//     if (!course) {
//       return new NextResponse("Course not found", { status: 404 });
//     }

//     // Check if the course is already live
//     if (course.isLive) {
//       return new NextResponse("Course is already live", { status: 400 });
//     }

//     // Update the `isLive` field to `true` when the teacher starts the call
//     const updatedCourse = await db.course.update({
//       where: {
//         id: params.courseId,
//         userId,
//       },
//       data: {
//         isLive: true,
//       },
//     });

//     // Respond with the updated course
//     return NextResponse.json(updatedCourse);
//   } catch (error) {
//     console.error("[START_CALL_ERROR]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }


//-------------------------------------------------------------

import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    // Get the current authenticated user
    const user = await currentUser();
    const userId = user?.id;

    // Check if user is authenticated
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Find the course by courseId and userId
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    // If the course does not exist or doesn't belong to the user
    if (!course) {
      return new NextResponse("Course not found", { status: 404 });
    }

    // Parse the body to get the new isLive value
    const { isLive } = await req.json();

    // Check if the isLive field is being toggled correctly
    if (typeof isLive !== "boolean") {
      return new NextResponse("Invalid isLive value", { status: 400 });
    }

    // Update the `isLive` field to the new value
    const updatedCourse = await db.course.update({
      where: {
        id: params.courseId,
        userId,
      },
      data: {
        isLive,
      },
    });

    // Respond with the updated course
    return NextResponse.json(updatedCourse);
  } catch (error) {
    console.error("[TOGGLE_LIVE_STATUS_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
