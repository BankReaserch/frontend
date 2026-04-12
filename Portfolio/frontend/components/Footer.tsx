import { Linkedin } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-[#d4a056]/30 mt-20 py-6 px-6 text-gray-300">

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

        {/* Left */}
        <p className="text-sm text-center md:text-left">
          © 2024 Samir Alam. All Rights Reserved.
        </p>

        {/* Right */}
        <div className="flex items-center gap-6 text-sm">

          <Link
            href="#"
            className="hover:text-[#d4a056] transition"
          >
            Privacy Policy
          </Link>

          <Link
            href="#"
            className="hover:text-[#d4a056] transition"
          >
            Terms of Service
          </Link>

          <a
            href="https://www.linkedin.com/in/samiramrullah/"
            target="_blank"
            className="hover:text-[#d4a056] transition"
          >
            <Linkedin size={18} />
          </a>

        </div>

      </div>

    </footer>
  )
}