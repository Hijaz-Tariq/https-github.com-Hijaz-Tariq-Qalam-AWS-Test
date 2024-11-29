import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    const { url } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const profileOwner = await db.user.findUnique({
      where: {
        id: params.id,
        // userId: userId,
      },
    });

    if (!profileOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const idImage = await db.idImage.create({
      data: {
        url,
        name: url.split("/").pop(),
        userId: params.id,
      },
    });

    return NextResponse.json(idImage);
  } catch (error) {
    console.log("USER_ID_ATTACHMENTS", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
