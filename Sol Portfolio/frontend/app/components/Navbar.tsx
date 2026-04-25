export default function Navbar() {
  return (
    <header className="w-full fixed top-0 z-50 bg-[#0B0F14]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold text-white">Champ.now</h1>

        <nav className="hidden md:flex gap-8 text-sm text-gray-300">
          <a href="#about" className="hover:text-white">About</a>
          <a href="#projects" className="hover:text-white">Portfolio</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </nav>

        {/* Mobile menu placeholder */}
        <div className="md:hidden text-sm text-gray-300">
          Menu
        </div>
      </div>
    </header>
  );
}