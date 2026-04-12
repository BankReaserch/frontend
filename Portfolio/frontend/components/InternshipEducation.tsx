import { ShieldCheck, Cloud, Code, GraduationCap, Database } from "lucide-react"

const items = [
  {
    icon: ShieldCheck,
    title: "Application Security",
    desc: "Focused on SAST/DAST, OWASP Top 10 and vulnerability analysis.",
  },
  {
    icon: Cloud,
    title: "Cloud & Networking",
    desc: "AWS IAM, EC2, S3 with networking fundamentals.",
  },
  {
    icon: Code,
    title: "Programming & Automation",
    desc: "Python, JavaScript, TypeScript and security automation.",
  },
  {
    icon: GraduationCap,
    title: "Frameworks & Certifications",
    desc: "ISO 27001, ISO 31000, GRC methodologies.",
  },
  {
    icon: Database,
    title: "MERN Stack Development",
    desc: "MongoDB, Express, React, Node.js full-stack applications.",
  },
]

export default function InternshipEducation() {
  return (
    <section className="py-10 px-6 text-white">

      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-semibold">
          Internship & Education
        </h2>

        <div className="w-56 h-[2px] bg-gradient-to-r from-transparent via-[#d4a056] to-transparent mx-auto mt-6"></div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 lg:grid-cols-5 gap-6">

        {items.map((item, index) => {
          const Icon = item.icon

          return (
            <div
              key={index}
              className="border border-[#d4a056]/40 rounded-xl p-6 text-center bg-black/30 backdrop-blur-sm hover:border-[#d4a056] hover:shadow-[0_0_15px_rgba(212,160,86,0.4)] transition duration-300"
            >

              {/* Icon */}
              <div className="flex justify-center mb-4">
                <Icon className="text-[#d4a056] w-8 h-8" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 text-sm">
                {item.desc}
              </p>

            </div>
          )
        })}

      </div>
    </section>
  )
}