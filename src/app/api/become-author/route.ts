import { clerkClient } from "@clerk/express";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "~@/server/db";

export async function POST(request: Request) {
  function generateUserId() {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for (let i = 0; i < 10; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User not authenticated." },
        { status: 401 }
      );
    }

    console.log("Clerk UserId:", userId);

    const body = await request.json();

    const { name, bio, twitterLink, instagramLink, linkedinLink } = body;

    const userIdd = `mba-${generateUserId()}`;

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Name is required" },
        { status: 400 }
      );
    }

    // 1. Update Clerk user role
    await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        role: "author",
      },
    });

    // 2. Update your database
    await prisma.user.update({
      where: { clerkId: userId },
      data: {
        role: "author",
      },
    });

    // 3. Create authorProfile
    await prisma.authorProfile.create({
      data: {
        name,
        bio,
        twitterLink,
        instagramLink,
        linkedinLink,
        userId: userIdd,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("🔥 Error creating author profile and setting role:", error);
    return NextResponse.json(
      { success: false, error: "Server Error" },
      { status: 500 }
    );
  }
}
