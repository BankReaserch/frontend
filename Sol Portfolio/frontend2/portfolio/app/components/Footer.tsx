export default function Footer() {
  return (
    <footer className="border-t border-gold/[0.08] px-16 py-10 flex flex-col md:flex-row justify-between items-center gap-3">
      <span className="font-serif text-lg font-light tracking-[0.1em] text-gold-dim">Sol</span>
      <span className="font-mono text-[0.58rem] tracking-[0.2em] uppercase text-fog-2">
        © 2025 Sol — champ.now
      </span>
      <span className="font-mono text-[0.58rem] tracking-[0.2em] uppercase text-gold-dim">
        From champ. To champ.
      </span>
    </footer>
  );
}