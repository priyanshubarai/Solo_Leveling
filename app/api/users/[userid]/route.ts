import { usersTable } from "@/db/schema";
import db from "@/index";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userid: string }> },
) {
  try {
    const { userid } = await params;
    const res = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.clerkuserid, userid));
    console.log("RESPONSE : ", res);
    return NextResponse.json(
      { message: "success", data: res },
      { status: 201 },
    );
  } catch (err) {
    console.log("ERROR : ", err);
    return NextResponse.json({ message: "error", data: err }, { status: 500 });
  }
}
