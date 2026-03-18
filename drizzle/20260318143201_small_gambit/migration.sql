CREATE TABLE "habitscompletion" (
	"dayid" serial PRIMARY KEY,
	"clerkuserid" varchar(255) NOT NULL,
	"habitid" integer NOT NULL,
	"completedata" date DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "stats" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "stats" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "stats" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "habitscompletion" ADD CONSTRAINT "habitscompletion_clerkuserid_users_clerkuserid_fkey" FOREIGN KEY ("clerkuserid") REFERENCES "users"("clerkuserid") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "habitscompletion" ADD CONSTRAINT "habitscompletion_habitid_habits_habitid_fkey" FOREIGN KEY ("habitid") REFERENCES "habits"("habitid") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "goals" DROP CONSTRAINT "goals_clerkuserid_users_clerkuserid_fkey", ADD CONSTRAINT "goals_clerkuserid_users_clerkuserid_fkey" FOREIGN KEY ("clerkuserid") REFERENCES "users"("clerkuserid") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "habits" DROP CONSTRAINT "habits_clerkuserid_users_clerkuserid_fkey", ADD CONSTRAINT "habits_clerkuserid_users_clerkuserid_fkey" FOREIGN KEY ("clerkuserid") REFERENCES "users"("clerkuserid") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "quests" DROP CONSTRAINT "quests_clerkuserid_users_clerkuserid_fkey", ADD CONSTRAINT "quests_clerkuserid_users_clerkuserid_fkey" FOREIGN KEY ("clerkuserid") REFERENCES "users"("clerkuserid") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "stats" DROP CONSTRAINT "stats_clerkuserid_users_clerkuserid_fkey", ADD CONSTRAINT "stats_clerkuserid_users_clerkuserid_fkey" FOREIGN KEY ("clerkuserid") REFERENCES "users"("clerkuserid") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "xp_check", ADD CONSTRAINT "xp_check" CHECK ("XP" >= 0 );