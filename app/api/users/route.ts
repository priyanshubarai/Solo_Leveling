import db from "@/index";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

type NewUser = typeof usersTable.$inferInsert;

export async function POST(req: NextRequest) {
  try {
    const { clerkuserid, username, email } = await req.json();
    const newUser = await db
      .insert(usersTable)
      .values({
        clerkuserid: clerkuserid,
        username: username,
        email: email,
      })
      .returning();
    console.log("User Created : ", newUser);
    return NextResponse.json(
      {
        message: "User Created",
        user: newUser,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("Error : ", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
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
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// async function main() {
//   const user: typeof usersTable.$inferInsert = {
//     name: 'John',
//     age: 30,
//     email: 'john@example.com',
//   };
//   await db.insert(usersTable).values(user);
//   console.log('New user created!')
//   const users = await db.select().from(usersTable);
//   console.log('Getting all users from the database: ', users)
//   /*
//   const users: {
//     id: number;
//     name: string;
//     age: number;
//     email: string;
//   }[]
//   */
//   await db
//     .update(usersTable)
//     .set({
//       age: 31,
//     })
//     .where(eq(usersTable.email, user.email));
//   console.log('User info updated!')
//   await db.delete(usersTable).where(eq(usersTable.email, user.email));
//   console.log('User deleted!')
// }

// main();
