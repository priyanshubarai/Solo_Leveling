"use client";

import Image from "next/image";
import {
  SignIn,
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  SignOutButton,
} from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <div>HOME</div>
      <div className="flex flex-col gap-2">
        <SignedOut>
          <SignInButton/>
          <SignUpButton/>
        </SignedOut>
        <SignedIn>
          <UserButton />
          <SignOutButton/>
        </SignedIn>
      </div>
    </div>
  );
}
