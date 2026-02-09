import { motion } from "framer-motion";

const stats = [
  { label: "STR", value: 85, max: 100, color: "bg-primary" },
  { label: "INT", value: 72, max: 100, color: "bg-secondary" },
  { label: "AGI", value: 91, max: 100, color: "bg-glow-cyan" },
  { label: "VIT", value: 68, max: 100, color: "bg-crimson" },
  { label: "PER", value: 79, max: 100, color: "bg-primary" },
];

const StatBar = ({ label, value, max, color, delay }: { label: string; value: number; max: number; color: string; delay: number }) => (
  <div className="flex items-center gap-4">
    <span className="font-display text-sm tracking-wider text-muted-foreground w-10">{label}</span>
    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${(value / max) * 100}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay, ease: "easeOut" }}
        className={`h-full rounded-full ${color}`}
      />
    </div>
    <span className="font-display text-sm text-foreground w-8 text-right">{value}</span>
  </div>
);

const StatsSection = () => {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Player card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-card border border-glow-blue rounded-lg p-8 box-glow-blue">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="font-display text-xs tracking-[0.3em] text-muted-foreground uppercase">Hunter Profile</div>
                  <div className="font-display text-2xl font-bold text-foreground mt-1">SHADOW MONARCH</div>
                </div>
                <div className="text-right">
                  <div className="font-display text-xs text-muted-foreground">RANK</div>
                  <div className="font-display text-3xl font-black text-primary text-glow-blue">S</div>
                </div>
              </div>

              {/* Level */}
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  <span className="font-display text-sm text-muted-foreground">LEVEL 97</span>
                  <span className="font-display text-sm text-primary">24,850 / 30,000 XP</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "83%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-4">
                {stats.map((stat, i) => (
                  <StatBar key={stat.label} {...stat} delay={0.2 + i * 0.15} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="font-display text-sm tracking-[0.3em] text-glow-cyan uppercase text-glow-cyan">
              Track Your Power
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6 text-foreground">
              YOUR <span className="text-secondary text-glow-purple">STATS</span> ARE
              <br />EVERYTHING
            </h2>
            <p className="text-muted-foreground text-lg font-body leading-relaxed mb-6">
              Just like a hunter in the system, your progress is measured across key attributes. 
              Strength, Intelligence, Agility, Vitality, and Perception — every action you take 
              feeds into your stat growth.
            </p>
            <p className="text-muted-foreground text-lg font-body leading-relaxed">
              Complete quests, maintain streaks, and watch your character evolve from an E-Rank 
              nobody into an unstoppable force. The system never lies — your stats reflect your effort.
            </p>

            <div className="mt-8 flex gap-6">
              {[
                { num: "365", label: "Day Streak" },
                { num: "S", label: "Current Rank" },
                { num: "97", label: "Level" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="font-display text-2xl font-bold text-primary text-glow-blue">{item.num}</div>
                  <div className="font-display text-xs text-muted-foreground tracking-wider uppercase">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
