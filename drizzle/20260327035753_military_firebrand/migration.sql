ALTER TABLE "goals" ADD COLUMN "completed" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "goals" ALTER COLUMN "category" SET DEFAULT 'Monthly'::"goalcategory";