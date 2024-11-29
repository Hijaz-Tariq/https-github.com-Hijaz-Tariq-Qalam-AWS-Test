// import { auth } from "@clerk/nextjs";
// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";

// export async function PATCH(req: Request) {
//   try {
//     const { userId } = auth();

//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }
//     const balance = await req.json();

//     const wallet = await db.wallet.update({
//       where: {
//         userId,
//       },
//       data: {
//         balance,
//       },
//     });

//     return NextResponse.json(wallet);
//   } catch (error) {
//     console.log("[USER_ID]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }

// //////////////////////////////////////////////////////////////////////////

// import { auth } from "@clerk/nextjs";
// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";

// export async function PATCH(req: Request) {
//   try {
//     const { userId } = auth();

//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const { balance: newBalance } = await req.json();

//     const wallet = await db.wallet.update({
//       where: {
//         userId,
//       },
//       data: {
//         balance: { set: newBalance }, // Assuming `balance` is a numeric field
//       },
//     });

//     return NextResponse.json(wallet);
//   } catch (error) {
//     console.error("[USER_ID]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }

// //////////////////////////////////////// 11/15 12:00

// import { auth } from "@clerk/nextjs";
// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";

// export async function PATCH(req: Request) {
//   try {
//     const { userId } = auth();

//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const { balance: newBalance, codeUrl } = await req.json();

//     // Check if codeUrl exists in the Code table
//     const codeExists = await checkCodeUrlInDatabase(codeUrl);

//     if (codeExists) {
//       // CodeUrl exists, update the balance
//       const wallet = await db.wallet.update({
//         where: {
//           userId,
//         },
//         data: {
//           balance: { set: newBalance }, // Assuming `balance` is a numeric field
//         },
//       });

//       return NextResponse.json({
//         exists: true,
//         updatedBalance: wallet.balance,
//       });
//     } else {
//       // CodeUrl not found in the Code table
//       return NextResponse.json({
//         exists: false,
//         updatedBalance: null,
//       });
//     }
//   } catch (error) {
//     console.error("[USER_ID]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }

// async function checkCodeUrlInDatabase(codeUrl: any) {
//   try {
//     // Perform the necessary database query to check if codeUrl exists in the Code table
//     const code = await db.code.findFirst({
//       where: {
//         codeUrl,
//       },
//     });

//     return !!code; // Returns true if codeUrl exists in the Code table
//   } catch (error) {
//     console.error("Error checking codeUrl in the Code table:", error);
//     return false;
//   }
// }

/////////////////////////////////////////// check if used


import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(req: Request) {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { balance: newBalance, codeUrl } = await req.json();

    // Check if codeUrl exists in the Code table
    const codeExists = await checkCodeUrlInDatabase(codeUrl);

    if (codeExists) {
      // CodeUrl exists, update the balance
      const wallet = await db.wallet.update({
        where: {
          userId,
        },
        data: {
          balance: { set: newBalance }, // Assuming `balance` is a numeric field
        },
      });

      return NextResponse.json({
        exists: true,
        updatedBalance: wallet.balance,
      });
    } else {
      // CodeUrl not found in the Code table
      return NextResponse.json({
        exists: false,
        updatedBalance: null,
      });
    }
  } catch (error) {
    console.error("[USER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

async function checkCodeUrlInDatabase(codeUrl: any) {
  try {
    // Perform the necessary database query to check if codeUrl exists in the Code table
    const code = await db.code.findFirst({
      where: {
        codeUrl,
      },
    });

    if (code) {
      if (code.used === null) {
        // If 'used' is null, update it to true and continue the process
        await db.code.update({
          where: {
            id: code.id,
          },
          data: {
            used: true,
          },
        });

        // Continue with your process here

        return true; // You may want to return a value indicating the process status
      } else {
        // 'used' is true, do not continue the process
        console.log(`Code with URL ${codeUrl} is already used.`);
        return false;
      }
    } else {
      // Code does not exist
      return false;
    }
  } catch (error) {
    console.error("Error checking codeUrl in the Code table:", error);
    return false;
  }
}
