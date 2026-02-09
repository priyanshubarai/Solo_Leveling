const Footer = () => {
  return (
    <footer className="border-t border-border py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-display text-sm tracking-wider text-primary text-glow-blue">
          ARISE
        </div>
        <p className="text-sm text-muted-foreground font-body">
          © 2026 Arise. Level up or fall behind.
        </p>
        <div className="flex gap-6">
          {["Terms", "Privacy", "Discord"].map((link) => (
            <a key={link} href="#" className="text-sm text-muted-foreground hover:text-foreground font-body transition-colors">
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
