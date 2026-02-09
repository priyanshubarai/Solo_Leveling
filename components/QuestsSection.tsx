import { motion } from "framer-motion";
import { Swords, Brain, Flame, Shield, Zap, Target } from "lucide-react";

const quests = [
  {
    icon: Swords,
    title: "Daily Dungeons",
    description: "Complete daily challenges in fitness, mindset, and discipline to earn XP and level up.",
    rank: "E-Rank",
    color: "primary" as const,
  },
  {
    icon: Brain,
    title: "Mind Forge",
    description: "Sharpen your mental clarity with meditation, journaling, and cognitive training quests.",
    rank: "B-Rank",
    color: "secondary" as const,
  },
  {
    icon: Flame,
    title: "Shadow Extraction",
    description: "Transform your weaknesses into strengths. Identify shadows and make them your army.",
    rank: "A-Rank",
    color: "crimson" as const,
  },
  {
    icon: Shield,
    title: "Guild System",
    description: "Join accountability guilds with fellow hunters. Raid bosses together and grow as a unit.",
    rank: "S-Rank",
    color: "primary" as const,
  },
  {
    icon: Zap,
    title: "Power Surge",
    description: "Unlock burst training protocols — high intensity sprints for rapid stat increases.",
    rank: "A-Rank",
    color: "secondary" as const,
  },
  {
    icon: Target,
    title: "Quest Board",
    description: "Custom-tailored missions aligned with your goals. No two hunters walk the same path.",
    rank: "S-Rank",
    color: "crimson" as const,
  },
];

const colorMap = {
  primary: {
    border: "border-glow-blue",
    glow: "box-glow-blue",
    text: "text-primary",
    iconBg: "bg-primary/10",
    shadow: "text-glow-blue",
  },
  secondary: {
    border: "border-glow-purple",
    glow: "box-glow-purple",
    text: "text-secondary",
    iconBg: "bg-secondary/10",
    shadow: "text-glow-purple",
  },
  crimson: {
    border: "border-crimson/40",
    glow: "shadow-[0_0_15px_hsl(350_80%_55%/0.2)]",
    text: "text-crimson",
    iconBg: "bg-crimson/10",
    shadow: "",
  },
};

const QuestsSection = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-display text-sm tracking-[0.3em] text-secondary text-glow-purple uppercase">
            Choose Your Path
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 text-foreground">
            QUEST <span className="text-primary text-glow-blue">SYSTEM</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto font-body text-lg">
            Every great hunter starts with a single quest. Select your training path and begin the grind.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quests.map((quest, index) => {
            const colors = colorMap[quest.color];
            return (
              <motion.div
                key={quest.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`relative bg-card border ${colors.border} rounded-lg p-6 hover:${colors.glow} transition-all duration-300 group cursor-pointer`}
              >
                {/* Rank badge */}
                <div className={`absolute top-4 right-4 font-display text-xs tracking-wider ${colors.text} opacity-60`}>
                  {quest.rank}
                </div>

                <div className={`w-12 h-12 rounded-lg ${colors.iconBg} flex items-center justify-center mb-4`}>
                  <quest.icon className={`w-6 h-6 ${colors.text}`} />
                </div>

                <h3 className={`font-display text-lg font-bold mb-2 ${colors.text} ${colors.shadow}`}>
                  {quest.title}
                </h3>
                <p className="text-muted-foreground text-sm font-body leading-relaxed">
                  {quest.description}
                </p>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent ${colors.text === "text-primary" ? "via-primary/30" : colors.text === "text-secondary" ? "via-secondary/30" : "via-crimson/30"} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuestsSection;
