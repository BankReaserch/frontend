import Image from "next/image"

const experiences = [
  {
    company: "Shell",
    role: "IDT Assurance Analyst",
    date: "Feb 2025 – Present",
    points: [
      "Strengthened enterprise security posture by engineering security controls.",
      "Conducted risk-based security assurance reviews.",
      "Developed Power BI dashboards for vulnerability insights.",
      "SQL-based validation across large security datasets.",
      "Embedded privacy-by-design and Secure SDLC practices.",
    ],
  },
  {
    company: "Shell",
    role: "Security & Compliance Analyst",
    date: "Aug 2023 – Jan 2025",
    points: [
      "Application security risk assessments.",
      "SAST / DAST vulnerability management.",
      "Penetration testing report analysis.",
      "Remediation of OWASP Top 10 vulnerabilities.",
      "Security control testing and audit evidence preparation.",
    ],
  },
]

export default function Experience() {
  return (
    <section className="py-24 px-6 text-white">

      {/* Section Title */}
      <div className="text-center">
        <h2 className="text-4xl font-semibold tracking-wide">
          Professional Experience
        </h2>

        <div className="w-48 h-[2px] bg-gradient-to-r from-transparent via-[#d4a056] to-transparent mx-auto mt-6"></div>
      </div>

      {/* Experience Cards */}
      <div className="max-w-5xl mx-auto space-y-10">

        {experiences.map((exp, index) => (
          <div
            key={index}
            className="border border-[#d4a056]/40 rounded-xl p-8 bg-black/30 backdrop-blur-sm hover:border-[#d4a056] transition duration-300 shadow-lg"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">

              <div className="flex items-center gap-4">

                {/* Logo */}
                <Image
                  src="/assets/Shell_logo.svg.png"
                  alt="company logo"
                  width={36}
                  height={36}
                />

                <div>
                  <h3 className="text-lg font-semibold">
                    {exp.company} | {exp.role}
                  </h3>
                </div>

              </div>

              <span className="text-sm text-gray-300">
                {exp.date}
              </span>

            </div>

            {/* Bullet Points */}
            <ul className="space-y-3 text-gray-300">

              {exp.points.map((point, i) => (
                <li key={i} className="flex gap-3">

                  <span className="text-[#d4a056]">✔</span>

                  <span>{point}</span>

                </li>
              ))}

            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}