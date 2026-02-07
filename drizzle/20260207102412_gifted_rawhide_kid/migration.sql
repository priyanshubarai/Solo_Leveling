-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "difficulty" AS ENUM('Easy', 'Moderate', 'Hard', 'Legendary');--> statement-breakpoint
CREATE TYPE "goalcategory" AS ENUM('Weekly', 'Monthly', 'Annualy');--> statement-breakpoint
CREATE TYPE "level" AS ENUM('F', 'E', 'D', 'C', 'B', 'A', 'S');--> statement-breakpoint
CREATE TYPE "questcategory" AS ENUM('Productivity', 'Fitness', 'Health', 'Learning', 'Creativity', 'Social');--> statement-breakpoint
CREATE TABLE "goals" (
	"goalid" serial PRIMARY KEY,
	"clerkuserid" varchar(255) NOT NULL,
	"goaltitle" varchar(255) NOT NULL,
	"goaldesc" text,
	"category" "goalcategory" DEFAULT 'Weekly'::"goalcategory" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "habits" (
	"habitid" serial PRIMARY KEY,
	"clerkuserid" varchar(255) NOT NULL,
	"habittitle" varchar(255) NOT NULL,
	"category" "questcategory" DEFAULT 'Productivity'::"questcategory" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quests" (
	"questid" serial PRIMARY KEY,
	"clerkuserid" varchar(255) NOT NULL,
	"questtitle" varchar(255) NOT NULL,
	"questdesc" text,
	"category" "questcategory" DEFAULT 'Productivity'::"questcategory" NOT NULL,
	"difficulty" "difficulty" DEFAULT 'Easy'::"difficulty" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stats" (
	"statid" serial PRIMARY KEY,
	"clerkuserid" varchar(255) NOT NULL CONSTRAINT "stats_clerkuserid_key" UNIQUE,
	"agility" integer DEFAULT 0,
	"fitness" integer DEFAULT 0,
	"health" integer DEFAULT 0,
	"intelligence" integer DEFAULT 0,
	"creativity" integer DEFAULT 0,
	"social" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "users" (
	"userid" uuid DEFAULT gen_random_uuid(),
	"clerkuserid" varchar(255) PRIMARY KEY,
	"username" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL CONSTRAINT "users_email_key" UNIQUE,
	"XP" integer DEFAULT 0,
	"level" "level" DEFAULT 'F'::"level",
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "xp_check" CHECK (("XP" >= 0))
);
--> statement-breakpoint
ALTER TABLE "goals" ADD CONSTRAINT "goals_clerkuserid_users_clerkuserid_fkey" FOREIGN KEY ("clerkuserid") REFERENCES "users"("clerkuserid") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "habits" ADD CONSTRAINT "habits_clerkuserid_users_clerkuserid_fkey" FOREIGN KEY ("clerkuserid") REFERENCES "users"("clerkuserid") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "quests" ADD CONSTRAINT "quests_clerkuserid_users_clerkuserid_fkey" FOREIGN KEY ("clerkuserid") REFERENCES "users"("clerkuserid") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "stats" ADD CONSTRAINT "stats_clerkuserid_users_clerkuserid_fkey" FOREIGN KEY ("clerkuserid") REFERENCES "users"("clerkuserid") ON DELETE CASCADE;
*/