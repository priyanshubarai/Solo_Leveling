import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
	goals: {
		user: r.one.users({
			from: r.goals.clerkuserid,
			to: r.users.clerkuserid
		}),
	},
	users: {
		goals: r.many.goals(),
		habits: r.many.habits(),
		quests: r.many.quests(),
		stats: r.one.stats(),
	},
	habits: {
		user: r.one.users({
			from: r.habits.clerkuserid,
			to: r.users.clerkuserid
		}),
	},
	quests: {
		user: r.one.users({
			from: r.quests.clerkuserid,
			to: r.users.clerkuserid
		}),
	},
	stats: {
		user: r.one.users({
			from: r.stats.clerkuserid,
			to: r.users.clerkuserid
		}),
	},
}))