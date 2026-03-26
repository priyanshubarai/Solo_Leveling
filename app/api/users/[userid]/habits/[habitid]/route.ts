import { habitsCompletionTable } from "@/db/schema";
import { habits } from "@/drizzle/schema";
import db from "@/index";
import { and, eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userid: string; habitid: number }> },
) {
  const { userid, habitid } = await params;
  try {
    const habitCompletion = await db
      .select()
      .from(habitsCompletionTable)
      .where(
        and(
          eq(habitsCompletionTable.clerkuserid, userid),
          eq(habitsCompletionTable.habitid, habitid),
        ),
      );
    console.log("habit completion fetched : ", habitCompletion);
    return NextResponse.json(
      { message: "success", data: habitCompletion },
      { status: 200 },
    );
  } catch (error) {
    console.log("Error : ", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ habitid: string; userid: string }> },
) {
  const { habitid, userid } = await params;
  const habitidint = parseInt(habitid);

  try {
    const body = await req.json().catch(() => ({}));
    const now = new Date();
    const day = body.day ?? now.getDate();
    const month = body.month ?? now.getMonth();
    const year = body.year ?? now.getFullYear();

    // Validation
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    if (day < 1 || day > daysInMonth) {
      return NextResponse.json(
        { message: "Invalid day for the given month" },
        { status: 400 },
      );
    }
    //create new
    const newCompletionEntry = await db
      .insert(habitsCompletionTable)
      .values({
        clerkuserid: userid,
        habitid: habitidint,
        day,
        month,
        year,
      })
      .onConflictDoNothing()
      .returning();

    if (newCompletionEntry.length === 0) {
      return NextResponse.json(
        { message: "entry already exist" },
        { status: 200 },
      );
    }

    console.log("new completion entry created : ", newCompletionEntry);
    return NextResponse.json(
      { message: "success", data: newCompletionEntry[0] },
      { status: 201 },
    );
  } catch (error) {
    console.log("Error : ", error);
    return NextResponse.json(
      { error: "Internal Server Error!" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ userid: string; habitid: number }> },
) {
  const { userid, habitid } = await params;
  try {
    const body = await req.json().catch(() => ({}));
    const now = new Date();
    const day = body.day ?? now.getDate();
    const month = body.month ?? now.getMonth();
    const year = body.year ?? now.getFullYear();

    // Validation
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    if (day < 1 || day > daysInMonth) {
      return NextResponse.json(
        { message: "Invalid day for the given month" },
        { status: 400 },
      );
    }

    const deletedCompletion = await db
      .delete(habitsCompletionTable)
      .where(
        and(
          eq(habitsCompletionTable.clerkuserid, userid),
          eq(habitsCompletionTable.habitid, habitid),
          eq(habitsCompletionTable.day, day),
          eq(habitsCompletionTable.month, month),
          eq(habitsCompletionTable.year, year),
        ),
      )
      .returning();
    console.log("habit completion deleted : ", deletedCompletion);
    return NextResponse.json(
      { message: "success", data: deletedCompletion },
      { status: 200 },
    );
  } catch (error) {
    console.log("Error : ", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
