import Wrapper from "@/components/Wrapper"
import { ShieldCheck, Cloud, Server, Code, Database, Network } from "lucide-react"

export default function Experience() {
  return (
    <Wrapper>
    <section className="py-24 px-6 text-white">
      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl text-[#d4a056] font-semibold mb-4">
            Professional Experience
          </h2>

          <p className="text-gray-300">
            Strengthening Enterprise Security Through Engineering & Compliance
          </p>

          <div className="w-64 h-[2px] bg-gradient-to-r from-transparent via-[#d4a056] to-transparent mx-auto mt-6"/>
        </div>

        {/* Experience Cards */}

        <div className="space-y-8">

          {/* Job 1 */}
          <div className="border border-[#d4a056]/40 rounded-xl p-8 bg-black/30 backdrop-blur-sm">

            <div className="flex justify-between mb-4 flex-wrap gap-2">
              <h3 className="text-lg font-semibold text-[#d4a056]">
                Shell | IDT Assurance Analyst
              </h3>

              <span className="text-gray-300">
                Feb 2025 – Present
              </span>
            </div>

            <ul className="space-y-2 text-gray-300">
              <li>✔ Strengthened enterprise security posture by engineering security controls.</li>
              <li>✔ Conducted risk-based security assurance reviews.</li>
              <li>✔ Built Power BI dashboards for vulnerability insights.</li>
              <li>✔ SQL-based validation across large security datasets.</li>
              <li>✔ Embedded privacy-by-design and Secure SDLC practices.</li>
              <li>✔ Supported internal audit security validation.</li>
            </ul>

          </div>


          {/* Job 2 */}

          <div className="border border-[#d4a056]/40 rounded-xl p-8 bg-black/30 backdrop-blur-sm">

            <div className="flex justify-between mb-4 flex-wrap gap-2">
              <h3 className="text-lg font-semibold text-[#d4a056]">
                Shell | Security & Compliance Analyst
              </h3>

              <span className="text-gray-300">
                Aug 2023 – Jan 2025
              </span>
            </div>

            <ul className="space-y-2 text-gray-300">
              <li>✔ Application security risk assessments.</li>
              <li>✔ SAST / DAST vulnerability management.</li>
              <li>✔ Penetration testing report analysis.</li>
              <li>✔ OWASP Top 10 vulnerability remediation.</li>
              <li>✔ Security control testing and audit evidence preparation.</li>
            </ul>

          </div>

        </div>


        {/* Skills Section */}

        <div className="mt-24 text-center">

          <h2 className="text-4xl text-[#d4a056] mb-4">
            Technical Skills
          </h2>

          <p className="text-gray-300 mb-12">
            Application Security · Cloud Security · Full Stack Development
          </p>

        </div>


        {/* Skills Grid */}

        <div className="grid md:grid-cols-3 gap-8">

          {/* Skill Card */}

          <SkillCard
            icon={<ShieldCheck />}
            title="Application Security"
            skills={[
              "SAST",
              "OWASP Top 10",
              "Secure SDLC",
              "Penetration Testing Analysis",
            ]}
          />

          <SkillCard
            icon={<Cloud />}
            title="Cloud Security (AWS)"
            skills={[
              "AWS IAM",
              "EC2",
              "Cloud Security Fundamentals",
            ]}
          />

          <SkillCard
            icon={<Server />}
            title="Security & Risk"
            skills={[
              "Risk Assessments",
              "Security Control Testing",
              "Privacy-by-Design",
              "Third-Party Risk",
            ]}
          />

          <SkillCard
            icon={<Network />}
            title="Networking"
            skills={[
              "TCP/IP",
              "HTTP / HTTPS",
              "TLS / SSL",
              "REST APIs",
            ]}
          />

          <SkillCard
            icon={<Code />}
            title="Full Stack Development"
            skills={[
              "MongoDB",
              "JavaScript",
              "React",
              "Node.js",
            ]}
          />

          <SkillCard
            icon={<Database />}
            title="Data & Automation"
            skills={[
              "Power BI",
              "SQL",
              "MongoDB",
              "Git",
            ]}
          />

        </div>

      </div>
    </section>
    </Wrapper>
  )
}


function SkillCard({
  icon,
  title,
  skills,
}: {
  icon: React.ReactNode
  title: string
  skills: string[]
}) {
  return (
    <div className="border border-[#d4a056]/40 rounded-xl p-6 bg-black/30 backdrop-blur-sm hover:border-[#d4a056] transition">

      <div className="flex justify-center mb-4 text-[#d4a056]">
        {icon}
      </div>

      <h3 className="text-center text-lg font-semibold mb-4">
        {title}
      </h3>

      <ul className="space-y-2 text-gray-300 text-sm">
        {skills.map((skill, i) => (
          <li key={i}>✔ {skill}</li>
        ))}
      </ul>

    </div>
  )
}