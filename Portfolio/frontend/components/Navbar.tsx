"use client"

import Link from "next/link"
import { Linkedin, Github } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="w-full absolute top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-6">

        {/* Logo */}
        <h1 className="text-xl font-semibold text-white tracking-wide">
          Portfolio
        </h1>

        {/* Menu */}
        <div className="flex items-center gap-10 text-sm text-gray-300">

          <Link href="/" className="hover:text-[#d4a056] transition">
            Home
          </Link>

          <Link href="/experience" className="hover:text-[#d4a056] transition">
            Experience
          </Link>

          <Link href="/achievements" className="hover:text-[#d4a056] transition">
            Achievements
          </Link>

          <Link href="/contact" className="hover:text-[#d4a056] transition">
            Contact
          </Link>

        </div>

        {/* Social Icons */}
        <div className="flex gap-4 text-gray-300">
          <div className="relative group">
            <a href="https://www.linkedin.com/in/samiramrullah/" target="_blank">
              <Linkedin className="w-5 h-5 hover:text-[#d4a056] cursor-pointer" />
            </a>

            <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 
  text-xs bg-black text-white px-2 py-1 rounded opacity-0 
  group-hover:opacity-100 transition">
              Linkedin
            </span>
          </div>
          <div className="relative group">
            <a href="https://github.com/samiramrullah" target="_samir">
            <Github className="w-5 h-5 hover:text-[#d4a056] cursor-pointer" />
            </a>
             <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 
  text-xs bg-black text-white px-2 py-1 rounded opacity-0 
  group-hover:opacity-100 transition">
              Github
            </span>
          </div>
          <Link href={'/contact'}>
          <div className="w-6 h-6 flex items-center justify-center rounded-full border border-[#d4a056] text-xs text-[#d4a056]">
            S
          </div>
          </Link>
        </div>

      </div>
    </nav>
  )
}