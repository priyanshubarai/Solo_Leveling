import db from "@/index";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

type NewUser = typeof usersTable.$inferInsert;

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();

    if (!user || !user.id)
      return NextResponse.json(
        { error: "No User Signed In!!" },
        { status: 401 },
      );

    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.clerkuserid, user.id));
    if (existingUser)
      return NextResponse.json(
        { message: "user already exists", data: existingUser },
        { status: 201 },
      );

    const newUser = await db
      .insert(usersTable)
      .values({
        clerkuserid: user.id,
        username: user.username ?? "user",
        email: user.primaryEmailAddress?.emailAddress,
      })
      .returning();
    console.log("User Created : ", newUser);
    return NextResponse.json(
      {
        message: "User Created",
        data: newUser,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("Error : ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { clerkuserid } = await req.json();
    const deletedUser = await db
      .delete(usersTable)
      .where(eq(usersTable.clerkuserid, clerkuserid))
      .returning();
    console.log("User Deleted : ", deletedUser);
    return NextResponse.json(
      { message: "User Deleted", user: deletedUser },
      { status: 200 },
    );
  } catch (error) {
    console.log("Error : ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
