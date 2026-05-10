export default function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
      {children}
    </div>
  );
}