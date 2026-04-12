import { ShieldCheck, Award, GraduationCap, Trophy } from "lucide-react"

const certifications = [
    {
        icon: ShieldCheck,
        title: "Certified Ethical Hacker (CEH v12)",
        org: "EC-Council",
    },
    {
        icon: GraduationCap,
        title: "Security & Compliance Nanodegree",
        org: "Udacity",
    },
    {
        icon: Award,
        title: "Special Mention Award",
        org: "STGI Hackathon, Panchkula",
    },
]

const achievements = [
    "Improved audit closure timelines by 30% through automation",
    "Recognized for stakeholder engagement in security advisory initiatives",
]

export default function Certifications() {
    return (
        <section className="px-6 text-white">

            {/* Title */}
            <div className="text-center mb-16">
                <h2 className="text-4xl font-semibold">
                    Certifications & Achievements
                </h2>

                <div className="w-64 h-[2px] bg-gradient-to-r from-transparent via-[#d4a056] to-transparent mx-auto mt-6"></div>
            </div>

            {/* Certifications */}
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-16">

                {certifications.map((cert, index) => {
                    const Icon = cert.icon

                    return (
                        <div
                            key={index}
                            className="border border-[#d4a056]/40 rounded-xl p-8 text-center bg-black/30 backdrop-blur-sm hover:border-[#d4a056] hover:shadow-[0_0_15px_rgba(212,160,86,0.4)] transition duration-300"
                        >

                            {/* Icon */}
                            <div className="flex justify-center mb-4">
                                <Icon className="text-[#d4a056] w-10 h-10" />
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-semibold mb-2">
                                {cert.title}
                            </h3>

                            {/* Organization */}
                            <p className="text-gray-300 text-sm">
                                {cert.org}
                            </p>

                        </div>
                    )
                })}
            </div>

            {/* Achievements Box */}
            <div className="max-w-4xl mx-auto border border-[#d4a056]/40 rounded-xl p-10 bg-black/30 backdrop-blur-sm">

                <div className="flex justify-center mb-6">
                    <Trophy className="text-[#d4a056] w-10 h-10" />
                </div>

                <h3 className="text-xl text-center font-semibold mb-6">
                    Achievements
                </h3>

                <ul className="space-y-4 text-gray-300">

                    {achievements.map((item, index) => (
                        <li key={index} className="flex gap-3">

                            <span className="text-[#d4a056]">✔</span>

                            <span>{item}</span>

                        </li>
                    ))}

                </ul>

            </div>
            {/* CTA Section */}
            <div className="text-center mt-14">

                <button className="
    px-8 py-3
    rounded-md
    font-medium
    text-black
    bg-gradient-to-r
    from-[#d4a056]
    to-[#b37c35]
    hover:scale-105
    transition
    duration-300
    shadow-lg
    shadow-[#d4a056]/30
  ">
                    Get In Touch
                </button>

            </div>

        </section>
    )
}