import db from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { desc } from "drizzle-orm";

export async function GET(_: NextRequest) {
  try {
    const user = await currentUser();
    if (!user || !user.id)
      return NextResponse.json(
        { error: "no User Signed in!" },
        { status: 401 },
      );

    const res = await db
      .select({
        clerkuserid: usersTable.clerkuserid,
        username: usersTable.username,
        level: usersTable.level,
        XP: usersTable.XP,
      })
      .from(usersTable)
      .orderBy(desc(usersTable.XP));
    console.log("users : ",res);
    return NextResponse.json({ data: res }, { status: 200 });
  } catch (err) {
    console.log("Error :", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST() {
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
