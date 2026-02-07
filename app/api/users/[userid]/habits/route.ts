import { habitsTable } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import db from "@/index";
import { and, eq } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userid: string }> },
) {
  const { userid } = await params;
  const habits = await db
    .select()
    .from(habitsTable)
    .where(eq(habitsTable.clerkuserid, userid));
  console.log("habits fetched : ", habits);
  return NextResponse.json(
    { message: "success", data: habits },
    { status: 200 },
  );
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ userid: string }> },
) {
  const { userid } = await params;
  const { habittitle } = await req.json();
  const newHabit = await db
    .insert(habitsTable)
    .values({
      clerkuserid: userid,
      habittitle: habittitle,
    })
    .returning();
  console.log(`New habit ${newHabit} created for user ${userid}`);
  return NextResponse.json(
    { message: "new habit created", data: newHabit },
    { status: 201 },
  );
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ userid: string }> },
) {
  const { userid } = await params;
  const { habitid } = await req.json();
  console.log(userid, habitid);
  const deletedHabit = await db
    .delete(habitsTable)
    .where(
      and(
        eq(habitsTable.habitid, habitid),
        eq(habitsTable.clerkuserid, userid),
      ),
    )
    .returning();
  console.log("habit deleted : ", deletedHabit);
  return NextResponse.json(
    { message: "habbit deleted", data: deletedHabit },
    { status: 200 },
  );
}
