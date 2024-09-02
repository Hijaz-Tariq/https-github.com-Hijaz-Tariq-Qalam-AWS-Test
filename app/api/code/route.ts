// import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
// import { isBroker } from "@/lib/broker";
import { currentUser } from "@/lib/auth";

export async function POST(req: Request) {
    const  user  =await currentUser();
    const role = user?.role
  try {
    const userId = user?.id
    const { title, qrCodeData, codeUrl } = await req.json();

    if (!userId || role !== "BROKER") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const code = await db.code.create({
      data: {
        title,
        userId,
        qrCodeData,
        codeUrl,
      },
    });

    return NextResponse.json(code);
  } catch (error) {
    console.log("[code]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}