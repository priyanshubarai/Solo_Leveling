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
    //check existing
    const completionEntryRows = await db
      .select()
      .from(habitsCompletionTable)
      .where(
        and(
          eq(habitsCompletionTable.clerkuserid, userid),
          eq(habitsCompletionTable.habitid, habitidint),
          sql`${habitsCompletionTable.completedata} = CURRENT_DATE`,
        ),
      );
    if (completionEntryRows[0]) {
      console.log("already Exists : ", completionEntryRows[0]);
      return NextResponse.json(
        { message: "entry already exist", data: completionEntryRows[0] },
        { status: 200 },
      );
    }

    //create new
    const newCompletionEntry = await db
      .insert(habitsCompletionTable)
      .values({
        clerkuserid: userid,
        habitid: habitidint,
      })
      .returning();

    console.log("new completion entry created : ", newCompletionEntry);
    return NextResponse.json(
      { message: "success", data: newCompletionEntry },
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ userid: string; habitid: number }> },
) {
  const { userid, habitid } = await params;
  try {
    const deletedCompletion = await db
      .delete(habitsCompletionTable)
      .where(
        and(
          eq(habitsCompletionTable.clerkuserid, userid),
          eq(habitsCompletionTable.habitid, habitid),
          sql`${habitsCompletionTable.completedata} = CURRENT_DATE`,
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
