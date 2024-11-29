// import Stripe from "stripe";
// import { currentUser } from "@/lib/auth";
// import { NextResponse } from "next/server";

// import { db } from "@/lib/db";
// import { stripe } from "@/lib/stripe";

// export async function POST(
//   req: Request,
//   { params }: { params: { courseId: string } }
// ) {
//   try {
//     const user = await currentUser();

//     if (!user || !user.id || !user.email?.[0]) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const course = await db.course.findUnique({
//       where: {
//         id: params.courseId,
//         isPublished: true,
//       },
//     });

//     const purchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: {
//           userId: user.id,
//           courseId: params.courseId,
//         },
//       },
//     });

//     if (purchase) {
//       return new NextResponse("Already purchased", { status: 400 });
//     }

//     if (!course) {
//       return new NextResponse("Not found", { status: 404 });
//     }

//     const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
//       {
//         quantity: 1,
//         price_data: {
//           currency: "USD",
//           product_data: {
//             name: course.title,
//             description: course.description!,
//           },
//           unit_amount: Math.round(course.price! * 100),
//         },
//       },
//     ];

//     let stripeCustomer = await db.stripeCustomer.findUnique({
//       where: {
//         userId: user.id,
//       },
//       select: {
//         stripeCustomerId: true,
//       },
//     });

//     if (!stripeCustomer) {
//       const customer = await stripe.customers.create({
//         email: user.email[0],
//       });

//       stripeCustomer = await db.stripeCustomer.create({
//         data: {
//           userId: user.id,
//           stripeCustomerId: customer.id,
//         },
//       });
//     }

//     const session = await stripe.checkout.sessions.create({
//       customer: stripeCustomer.stripeCustomerId,
//       line_items,
//       mode: "payment",
//       success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?success=1`,
//       cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?canceled=1`,
//       metadata: {
//         courseId: course.id,
//         userId: user.id,
//       },
//     });

//     return NextResponse.json({ url: session.url });
//   } catch (error) {
//     console.log("[COURSE_ID_CHECKOUT]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }

// ////////////////////////////////////////////////////////////////////////////////////////

import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        isPublished: true,
      },
    });

    if (!course) {
      return new NextResponse("Course not found", { status: 404 });
    }

    const userWallet = await db.wallet.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!userWallet) {
      return new NextResponse("User wallet not found", { status: 404 });
    }

    if (userWallet.balance < course.price!) {
      return new NextResponse("Insufficient balance", { status: 400 });
    }

    // Deduct the course price from user's balance
    const newBalance = userWallet.balance - course.price!;

    // Update user's wallet
    await db.wallet.update({
      where: {
        userId: user.id,
      },
      data: {
        balance: newBalance,
      },
    });

    // Create a record in the purchase table indicating the user has bought the course
    await db.purchase.create({
      data: {
        userId: user.id,
        courseId: params.courseId,
      },
    });

    const purchasesCount = await db.purchase.count({
      where: {
        courseId: params.courseId,
      },
    });

    if (purchasesCount >= 3) {
      await db.course.update({
        where: {
          id: params.courseId,
        },
        data: {
          status: "ACTIVE",
        },
      });
    }
   
    // return NextResponse.json({ url: session.url });
    return new NextResponse("Purchase successful");
  } catch (error) {
    console.error("[BUY_COURSE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
