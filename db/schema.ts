import { table } from "console";
import { sql, defineRelations } from "drizzle-orm";
import {
  text,
  check,
  uuid,
  integer,
  pgTable,
  varchar,
  bigserial,
  pgEnum,
  timestamp,
  serial,
} from "drizzle-orm/pg-core";

const timestamps = {
  updated_at: timestamp(),
  created_at: timestamp().defaultNow().notNull(),
  deleted_at: timestamp(),
};

export const levelEnum = pgEnum("level", ["F", "E", "D", "C", "B", "A", "S"]);
export const questCategoryEnum = pgEnum("questcategory", [
  "Productivity",
  "Fitness",
  "Health",
  "Learning",
  "Creativity",
  "Social",
]);
export const difficultyEnum = pgEnum("difficulty", [
  "Easy",
  "Moderate",
  "Hard",
  "Legendary",
]);
export const goalCategoryEnum = pgEnum("goalcategory", [
  "Weekly",
  "Monthly",
  "Annualy",
]);

export const usersTable = pgTable(
  "users",
  {
    userid: uuid("userid").defaultRandom(),
    clerkuserid: varchar("clerkuserid", { length: 255 }).primaryKey(),
    username: varchar("username", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    XP: integer("XP").default(0),
    level: levelEnum().default("F"),
    ...timestamps,
  },
  (usersTable) => [check("xp_check", sql`${usersTable.XP} >= 0 `)],
);

export const habitsTable = pgTable("habits", {
  habitid: serial().primaryKey(),
  clerkuserid: varchar("clerkuserid", { length: 255 })
    .notNull()
    .references(() => usersTable.clerkuserid, { onDelete: "cascade" }), //FK
  habittitle: varchar({ length: 255 }).notNull(),
  category: questCategoryEnum().notNull().default("Productivity"),
});

export const questsTable = pgTable("quests", {
  questid: serial().primaryKey(),
  clerkuserid: varchar("clerkuserid", { length: 255 })
    .notNull()
    .references(() => usersTable.clerkuserid, { onDelete: "cascade" }), //FK
  questtitle: varchar({ length: 255 }).notNull(),
  questdesc: text(),
  category: questCategoryEnum().notNull().default("Productivity"),
  difficulty: difficultyEnum().notNull().default("Easy"),
});

export const goalsTable = pgTable("goals", {
  goalid: serial().primaryKey(),
  clerkuserid: varchar("clerkuserid", { length: 255 })
    .notNull()
    .references(() => usersTable.clerkuserid, { onDelete: "cascade" }), //FK
  goaltitle: varchar({ length: 255 }).notNull(),
  goaldesc: text(),
  category: goalCategoryEnum().notNull().default("Weekly"),
});

export const statTable = pgTable("stats", {
  statid: serial().primaryKey(),
  clerkuserid: varchar("clerkuserid", { length: 255 })
    .notNull()
    .unique()
    .references(() => usersTable.clerkuserid, { onDelete: "cascade" }), //FK
  agility: integer().default(0),
  fitness: integer().default(0),
  health: integer().default(0),
  intelligence: integer().default(0),
  creativity: integer().default(0),
  social: integer().default(0),
});
