import { questsTable } from "@/db/schema";
import db from "@/index";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest , { params }: { params: Promise<{ userid: string }> }) {
  const { userid } = await params;
  try {
    const quests = await db
      .select()
      .from(questsTable)
      .where(eq(questsTable.clerkuserid, userid));
    console.log("quests fetched :",quests)
    return NextResponse.json(
      { message: "success", data: quests },
      { status: 200 },
    );
  } catch (error) {
    console.log("Error : ",error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ userid: string }> },
) {
  const { userid } = await params;
  try {
    const { questtitle, questdesc } = await req.json();

    const newQuest = await db
      .insert(questsTable)
      .values({
        clerkuserid: userid,
        questtitle: questtitle,
        questdesc: questdesc,
      })
      .returning();

    console.log("quest inserted : ", newQuest);
    return NextResponse.json(
      { message: "quest inserted", data: newQuest },
      { status: 201 },
    );
  } catch (error) {
    console.log("Error : ", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ userid: string }> },
) {
  const { userid } = await params;
  try {
    const { questid } = await req.json();

    const deletedQuest = await db
      .delete(questsTable)
      .where(
        and(
          eq(questsTable.clerkuserid, userid),
          eq(questsTable.questid, questid),
        ),
      )
      .returning();

    console.log("quest deleted: ", deletedQuest);
    return NextResponse.json(
      { message: "success", data: deletedQuest },
      { status: 200 },
    );
  } catch (error) {
    console.log("Error : ", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
