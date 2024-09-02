import { db } from "@/lib/db";
import { Course, Purchase } from "@prisma/client";
import axios from "axios"
type PurchaseWithCourse = Purchase & {
  course: Course;
};

// const groupByCourse = (purchases: PurchaseWithCourse[]) => {
//   const grouped: { [courseTitle: string]: number } = {};

//   purchases.forEach((purchase) => {
//     const courseTitle = purchase.course.title;
//     if (!grouped[courseTitle]) {
//       grouped[courseTitle] = 0;
//     }
//     grouped[courseTitle] += purchase.course.price!;
//   });

//   return grouped;
// };

// export const getAnalytics = async (courseId: string) => {
//   try {
//     const purchases = await db.purchase.findMany({
//       where: {
//         course: {
//           id: courseId
//         }
//       },
//       include: {
//         course: true,
//       }
//     });
// console.log(purchases.length)

//     const groupedEarnings = groupByCourse(purchases);
//     const data = Object.entries(groupedEarnings).map(([courseTitle, total]) => ({
//       name: courseTitle,
//       total: total,
//     }));

//     const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
//     const totalSales = purchases.length;

//     return {
//       data,
//       totalRevenue,
//       totalSales,
//     }
//   } catch (error) {
//     console.log("[GET_ANALYTICS]", error);
//     return {
//       data: [],
//       totalRevenue: 0,
//       totalSales: 0,
//     }
//   }
// }

// const courseId = '';

export const courseLimit = async (courseId: string) => {
  try {
    const purchases = await db.purchase.findMany({
      where: {
        course: {
          id: courseId,
        },
      },
      include: {
        course: true,
      },
    });
    const courses = await db.course.findUnique({
      where: {
        id: courseId,
      },
      select: {
        status: true,
      },
    });
    // purchases.length === 2 ? courses?.status == "SCHEDULED" : null;
    await axios.patch(`/api/courses/${courseId}`, {status: 'SCHEDULED'})
    console.log(courses!.status);
    console.log(purchases.length);
  } catch {}
};

// const purchases = await db.purchase.findMany({
//     where: {
//       course: {
//         id: courseId,
//       }
//     },
//     include: {
//       course: true,
//     }
//   });
//   const courses = await db.course.findUnique({
//     where: {
//       id: courseId
//     },
//     select: {
//       status: true
//     }
//   })
//   purchases.length === 2 ? courses?.status == "SCHEDULED" : null

//   console.log(courses!.status)
//   console.log(purchases.length)
