import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { user_id, ref } = body;

    if (!user_id || !ref) {
      return NextResponse.json(
        { error: "Missing required fields (user_id, ref)" },
        { status: 400 }
      );
    }

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id: user_id }
    });

    if (!user) {
      // If user doesn't exist yet, we might need to create a stub
      // or we return an error depending on the flow.
      // Usually LibreChat registers the user and then calls this.
      // Let's upsert the user just in case.
      await prisma.user.upsert({
        where: { id: user_id },
        update: {},
        create: {
          id: user_id,
          email: "unknown@ref.created", // placeholder
        }
      });
    }

    // Save referral
    const referral = await prisma.referral.upsert({
      where: { userId: user_id },
      update: { referrerCode: ref },
      create: {
        userId: user_id,
        referrerCode: ref
      }
    });

    return NextResponse.json({ success: true, referral }, { status: 200 });

  } catch (error) {
    console.error("Error saving referral:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
