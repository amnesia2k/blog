// app/api/user-role/route.ts
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/express";

export async function POST(request: Request) {
  const { userId, role } = await request.json();

  if (!userId || !role) {
    return NextResponse.json(
      { error: "Missing userId or role" },
      { status: 400 }
    );
  }

  try {
    await clerkClient.users.updateUser(userId, {
      unsafeMetadata: { role },
    });
    return NextResponse.json({ message: "Role updated" });
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json(
      { error: "Failed to update role" },
      { status: 500 }
    );
  }
}
