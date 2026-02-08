import { goalsTable } from "@/db/schema";
import db from "@/index";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userid: string }> },
) {
  const { userid } = await params;
  try {
    const goals = await db
      .select()
      .from(goalsTable)
      .where(eq(goalsTable.clerkuserid, userid));
    console.log("goals fetched : ", goals);
    return NextResponse.json(
      { message: "success", data: goals },
      { status: 200 },
    );
  } catch (error) {
    console.log("Error : ", error);
    return NextResponse.json(
      { message: "Internal server Error" },
      { status: 500 },
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ userid: string }> },
) {
  const { userid } = await params;
  try {
    const { goaltitle, goaldesc } = await req.json();
    const newGoal = await db
      .insert(goalsTable)
      .values({
        clerkuserid: userid,
        goaltitle: goaltitle,
        goaldesc: goaldesc,
      })
      .returning();

    console.log("Goal created : ", newGoal);
    return NextResponse.json(
      { message: "new Goal created", data: newGoal },
      { status: 201 },
    );
  } catch (error) {
    console.log(`Error : ${error}`);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ userid: string }> },
) {
  const { userid } = await params;
  try {
    const { goalid } = await req.json();

    const deletedGoal = await db
      .delete(goalsTable)
      .where(
        and(eq(goalsTable.clerkuserid, userid), eq(goalsTable.goalid, goalid)),
      )
      .returning();

    console.log("goal deleted : ", deletedGoal);
    return NextResponse.json(
      { message: "success", data: deletedGoal },
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
