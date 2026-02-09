import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      {/* Glow orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-secondary/5 blur-[100px]" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-display text-sm tracking-[0.3em] text-crimson uppercase">
            ⚠ Warning: Awakening Imminent
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-black mt-6 mb-6 text-foreground leading-tight">
            WILL YOU <span className="text-primary text-glow-blue">ARISE</span>?
          </h2>
          <p className="text-muted-foreground text-lg font-body max-w-xl mx-auto mb-10">
            The gates are open. Thousands of hunters have already begun their journey. 
            The only question is — are you strong enough to answer the call?
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" className="text-lg">
              I&apos;ll Arise
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground font-body">
            Free to start · No credit card required · Begin as E-Rank
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
