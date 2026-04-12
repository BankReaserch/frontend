import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center text-white overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/background.jpg')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* Left Side */}
        <div>

          {/* Name */}
          <h1 className="text-6xl font-script text-[#d4a056] mb-4">
            Samir Alam
          </h1>

          {/* Title */}
          <p className="uppercase tracking-[4px] text-sm text-gray-300 mb-6">
            Application Security & Compliance Engineer
          </p>

          {/* Heading */}
          <h2 className="text-4xl font-semibold leading-snug mb-6">
            Strengthening Enterprise <br />
            Security Posture & Engineering
          </h2>

          {/* Tags */}
          <div className="flex gap-4 mb-6">

            <span className="px-4 py-2 border border-[#d4a056] text-sm rounded-full">
              CEH v12-Certified
            </span>

            <span className="px-4 py-2 border border-[#d4a056] text-sm rounded-full">
              MERN Stack Developer
            </span>

          </div>

          {/* Description */}
          <p className="text-gray-300 max-w-xl mb-8 leading-relaxed">
            Application Security & Compliance Engineer with expertise in
            enhancing enterprise security controls, vulnerability management
            (SAST/DAST), penetration testing, AWS cloud security, and Secure
            SDLC integration.
          </p>

          {/* Buttons */}
          <div className="flex gap-4">

            <Link href={'/contact'}>
            <button className="bg-gradient-to-r from-[#d4a056] to-[#b37c35] px-6 py-3 rounded-md text-black font-medium hover:opacity-90">
              Contact Me
            </button>
            </Link>

            <Link href={'https://github.com/samiramrullah'} target="_github">
            <button className="border border-[#d4a056] px-6 py-3 rounded-md hover:bg-[#d4a056]/10">
              View My Projects
            </button>
            </Link>
            

          </div>

        </div>

        {/* Right Image */}
        <div className="relative flex justify-center">

          <Image
            src="/profile.png"
            alt="profile"
            width={450}
            height={550}
            className="object-contain"
          />

        </div>

      </div>

      {/* Bottom Curve Line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#d4a056] to-transparent"></div>

    </section>
  )
}