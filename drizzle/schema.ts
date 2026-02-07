import { pgEnum, pgTable, serial, uuid, varchar, integer, text, timestamp, foreignKey, primaryKey, unique, check } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const difficulty = pgEnum("difficulty", ["Easy", "Moderate", "Hard", "Legendary"])
export const goalcategory = pgEnum("goalcategory", ["Weekly", "Monthly", "Annualy"])
export const level = pgEnum("level", ["F", "E", "D", "C", "B", "A", "S"])
export const questcategory = pgEnum("questcategory", ["Productivity", "Fitness", "Health", "Learning", "Creativity", "Social"])


export const goals = pgTable("goals", {
	goalid: serial().primaryKey(),
	clerkuserid: varchar({ length: 255 }).notNull().references(() => users.clerkuserid, { onDelete: "cascade" } ),
	goaltitle: varchar({ length: 255 }).notNull(),
	goaldesc: text(),
	category: goalcategory().default("Weekly").notNull(),
});

export const habits = pgTable("habits", {
	habitid: serial().primaryKey(),
	clerkuserid: varchar({ length: 255 }).notNull().references(() => users.clerkuserid, { onDelete: "cascade" } ),
	habittitle: varchar({ length: 255 }).notNull(),
	category: questcategory().default("Productivity").notNull(),
});

export const quests = pgTable("quests", {
	questid: serial().primaryKey(),
	clerkuserid: varchar({ length: 255 }).notNull().references(() => users.clerkuserid, { onDelete: "cascade" } ),
	questtitle: varchar({ length: 255 }).notNull(),
	questdesc: text(),
	category: questcategory().default("Productivity").notNull(),
	difficulty: difficulty().default("Easy").notNull(),
});

export const stats = pgTable("stats", {
	statid: serial().primaryKey(),
	clerkuserid: varchar({ length: 255 }).notNull().references(() => users.clerkuserid, { onDelete: "cascade" } ),
	agility: integer().default(0),
	fitness: integer().default(0),
	health: integer().default(0),
	intelligence: integer().default(0),
	creativity: integer().default(0),
	social: integer().default(0),
}, (table) => [
	unique("stats_clerkuserid_key").on(table.clerkuserid),]);

export const users = pgTable("users", {
	userid: uuid().defaultRandom(),
	clerkuserid: varchar({ length: 255 }).primaryKey(),
	username: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	xp: integer("XP").default(0),
	level: level().default("F"),
	updatedAt: timestamp("updated_at"),
	createdAt: timestamp("created_at").default(sql`now()`).notNull(),
	deletedAt: timestamp("deleted_at"),
}, (table) => [
	unique("users_email_key").on(table.email),check("xp_check", sql`("XP" >= 0)`),]);
