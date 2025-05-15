import { clerkClient } from "@clerk/express";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "~@/server/db";

export async function POST(request: Request) {
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

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Name is required" },
        { status: 400 }
      );
    }

    // 1. Update Clerk user role
    await clerkClient.users.updateUser(userId, {
      unsafeMetadata: {
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

    const dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!dbUser) {
      return NextResponse.json(
        { success: false, error: "User not found in DB." },
        { status: 404 }
      );
    }

    // 3. Create authorProfile
    const createdProfile = await prisma.authorProfile.create({
      data: {
        name,
        bio,
        twitterLink,
        instagramLink,
        linkedinLink,
        userId: dbUser.id,
      },
    });

    // 4. Update User/Author relationship
    await prisma.user.update({
      where: { id: dbUser.id },
      data: {
        profileId: createdProfile.id,
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
