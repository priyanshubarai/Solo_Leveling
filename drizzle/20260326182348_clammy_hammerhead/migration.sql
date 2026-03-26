ALTER TABLE "habitscompletion" ADD COLUMN "day" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "habitscompletion" ADD COLUMN "month" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "habitscompletion" ADD COLUMN "year" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "habitscompletion" DROP COLUMN "completedata";