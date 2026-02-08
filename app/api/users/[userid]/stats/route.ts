import { statTable } from "@/db/schema";
import db from "@/index";
import { error } from "console";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userid: string }> },
) {
  const { userid } = await params;
  try {
    const stats = await db
      .select()
      .from(statTable)
      .where(eq(statTable.clerkuserid, userid));

    console.log("stats fetched : ", stats);
    return NextResponse.json(
      { message: "success", data: stats },
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

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ userid: string }> },
) {
  const { userid } = await params;
  try {
    const existingStats = await db
      .select()
      .from(statTable)
      .where(eq(statTable.clerkuserid, userid));
    if (existingStats[0]) {
      return NextResponse.json(
        { message: `Stats already exist for ${userid}`, data: existingStats },
        { status: 200 },
      );
    }

    const newStats = await db
      .insert(statTable)
      .values({
        clerkuserid: userid,
      })
      .returning();
    console.log("new Stats created : ", newStats);
    return NextResponse.json(
      { message: "stats inserted", data: newStats },
      { status: 201 },
    );
  } catch (error) {
    console.log("Error : ", error);
    return NextResponse.json(
      { message: "internal server Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ userid: string }> },
) {
  const { userid } = await params;
  try {
    //get user stats
    const stats = await db
      .select()
      .from(statTable)
      .where(eq(statTable.clerkuserid, userid));

    const statsRow: any = stats[0];
    if (!statsRow) {
      return NextResponse.json({ error: "no stats found" }, { status: 500 });
    }
    const newStats = await req.json();

    //update the stats
    let updatedStats: any = {};
    for (let key in newStats) {
      if (key !== undefined) {
        updatedStats[key] = statsRow[key] + newStats[key];
      }
    }

    //save
    updatedStats = await db
      .update(statTable)
      .set({
        ...updatedStats,
        updated_at: new Date().toISOString(),
      })
      .where(eq(statTable.clerkuserid, userid))
      .returning();

    console.log("stats updated", updatedStats);
    return NextResponse.json(
      { message: "success", data: updatedStats },
      { status: 200 },
    );
  } catch (err) {
    console.log("Error : ", err);
    return NextResponse.json(
      { message: "Internal server Error" },
      { status: 500 },
    );
  }
}
