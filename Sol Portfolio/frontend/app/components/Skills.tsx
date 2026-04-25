const skills = [
  "React.js", "Next.js", "Tailwind CSS", "Bootstrap",
  "CSS3", "Node.js", "Express.js", "Python", "Flask",
  "Fast API", ".NET", "C#", "JavaScript", "TypeScript",
  "Java", "Spring Boot", "MySQL", "MongoDB", "PostgreSQL",
  "SQL", "Data Structures", "Algorithms", "Machine Learning",
  "Automation", "RESTful APIs", "API Security", "OWASP Top 10",
  "Input Validation", "Authentication", "Secure API Design",
  "UI / UX Design", "Figma (UI Design & Prototyping)"
];

export default function Skills() {
  return (
    <section className="px-6 pb-24 bg-[#05070B]">
      <div className="max-w-7xl mx-auto">

        {/* CARD CONTAINER */}
        <div className="bg-[#0B0F14] border border-[#1A1F26] rounded-2xl p-8">

          {/* TITLE */}
          <h3 className="text-[#F5B301] text-sm mb-6 tracking-wide">
            Skills & Technologies
          </h3>

          {/* SKILLS */}
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="
                  px-4 py-2 
                  text-xs 
                  rounded-full 
                  bg-[#0A0E13] 
                  border border-[#1F2630] 
                  text-gray-300
                  hover:border-[#F5B301]/40
                  transition
                "
              >
                {skill}
              </span>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}