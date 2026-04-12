import Wrapper from "@/components/Wrapper"
import CertificationCard from "@/components/cards/CertificationCard"
import { ShieldCheck, GraduationCap, Trophy, Linkedin, Github, Mail } from "lucide-react"

export default function CertificationsPage() {
  return (
    <Wrapper>
    <section className="py-24 px-6 text-white">
      <div className="max-w-6xl mx-auto">

        {/* PAGE TITLE */}
        <div className="text-center mb-16">
          <h1 className="text-5xl text-[#d4a056] mb-4 font-semibold">
            Certifications & Achievements
          </h1>

          <p className="text-gray-300">
            Validating Expertise in Security Engineering, Compliance, and Full Stack Development
          </p>

          <div className="w-72 h-[2px] bg-gradient-to-r from-transparent via-[#d4a056] to-transparent mx-auto mt-6"/>
        </div>


        {/* CERTIFICATIONS TITLE */}
        <h2 className="text-center text-3xl mb-10 text-[#d4a056]">
          Certifications
        </h2>


        {/* CERTIFICATION CARDS */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">

          {/* CEH */}
          <CertificationCard
            icon={<ShieldCheck size={40} />}
            title="Certified Ethical Hacker"
            subtitle="(CEH v12)"
            org="EC-Council"
          />

          {/* Udacity */}
          <CertificationCard
            icon={<GraduationCap size={40} />}
            title="Security & Compliance"
            subtitle="Nanodegree"
            org="Udacity"
          />

          {/* Hackathon */}
          <CertificationCard
            icon={<Trophy size={40} />}
            title="Special Mention Award"
            subtitle="STGI Hackathon"
            org="Panchkula"
          />

        </div>


        {/* CONNECT TEXT */}
        <div className="text-center mb-10 text-gray-300">
          Interested in discussing a project or opportunity? Let's connect.
        </div>


        {/* SOCIAL ICONS */}
        <div className="flex justify-center gap-6 mb-16">

          <IconCircle>
            <Linkedin size={18}/>
          </IconCircle>

          <IconCircle>
            <Github size={18}/>
          </IconCircle>

          <IconCircle>
            <Mail size={18}/>
          </IconCircle>

        </div>


        {/* ACHIEVEMENTS CARD */}
        <div className="border border-[#d4a056]/40 rounded-xl p-10 bg-black/30 backdrop-blur-sm text-center">

          <div className="flex justify-center mb-4 text-[#d4a056]">
            <Trophy size={40}/>
          </div>

          <h3 className="text-2xl text-[#d4a056] mb-6">
            Achievements
          </h3>

          <ul className="space-y-4 text-gray-300 text-left max-w-xl mx-auto">
            <li>✔ Improved audit closure timelines by 30% through automation</li>
            <li>✔ Recognized for stakeholder engagement in security advisory initiatives</li>
          </ul>

        </div>

      </div>
    </section>
    </Wrapper>
  )
}

/* Certification Card */


/* Icon Circle */
function IconCircle({children}:{children:React.ReactNode}){
  return(
    <div className="border border-[#d4a056] p-3 rounded-full hover:bg-[#d4a056] hover:text-black transition cursor-pointer">
      {children}
    </div>
  )
}