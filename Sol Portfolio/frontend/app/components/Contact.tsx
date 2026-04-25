'use client'
import { Send } from "lucide-react";

export default function Footer() {
  const email = "hello@yourdomain.com";

  const handleClick = () => {
    navigator.clipboard.writeText(email);
    window.location.href = `mailto:${email}`;
  };

  return (
    <section className="px-6 pb-16 bg-[#05070B]">
      <div className="max-w-4xl mx-auto text-center">

        {/* TITLE */}
        <h2 className="text-2xl md:text-3xl font-semibold text-white">
          Start the Conversation
        </h2>

        <div className="w-12 h-[2px] bg-[#F5B301] mx-auto mt-3 mb-8" />

        {/* EMAIL BOX */}
        <div
          onClick={handleClick}
          className="flex items-center justify-between cursor-pointer bg-[#0B0F14] border border-[#1A1F26] rounded-xl max-w-xl mx-auto px-4 py-3 hover:border-[#F5B301] transition"
        >
          <span className="text-gray-300 text-sm">
            {email}
          </span>

          <Send className="text-white w-5 h-5" />
        </div>

        {/* LINK */}
        <p className="text-gray-500 text-xs mt-6">
          Upwork Profile:{" "}
          <a
            href="https://www.upwork.com/freelancers/champnow"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F5B301] hover:underline"
          >
            https://www.upwork.com/freelancers/champnow
          </a>
        </p>

      </div>
    </section>
  );
}