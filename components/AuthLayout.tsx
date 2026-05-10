export default function AuthLayout({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071C2C] to-[#041421] text-white flex items-center justify-center px-4 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-[#C6A85A]/10 blur-[120px] rounded-full top-[-100px] right-[-100px]" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Logo */}
        <div className="flex items-center gap-2 mb-10">
          <div className="w-10 h-10 bg-gold rounded-md flex items-center justify-center text-black font-bold">
            ר
          </div>
          <span className="text-xl font-semibold">Ribis</span>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-borderSoft rounded-2xl p-8 shadow-xl">
          
          <h1 className="text-3xl font-serif mb-2">{title}</h1>
          <p className="text-gray-400 mb-6">{subtitle}</p>

          {children}
        </div>
      </div>
    </div>
  );
}