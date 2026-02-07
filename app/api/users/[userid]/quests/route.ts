import { questsTable } from "@/db/schema";
import db from "@/index";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ userid: string }> },
) {
  const { userid } = await params;
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
}
