export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-[#05070B] text-white">
      <div className="max-w-7xl mx-auto">

        {/* TITLE */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold">
            About Me
          </h2>
          <div className="w-10 h-[2px] bg-[#F5B301] mx-auto mt-3" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* LEFT CARD */}
          <div className="relative bg-[#0B0F14] border border-[#1A1F26] rounded-2xl p-8">

            {/* PROFILE */}
            <div className="flex flex-col items-center text-center">

              {/* GLOW RING */}
              <div className="relative mb-4">
                <div className="absolute inset-0 rounded-full blur-xl bg-[#F5B301]/30" />
                <img
                  src="/profile.jpg"
                  className="relative w-28 h-28 rounded-full border-2 border-[#F5B301]"
                />
              </div>

              <h3 className="text-xl font-semibold text-[#F5B301]">
                Sol
              </h3>

              <p className="text-gray-400 text-sm mt-1">
                Full Stack Developer
              </p>

              <p className="text-gray-500 text-xs">
                Website Performance & Maintenance
              </p>
            </div>

            {/* ICON ROW */}
            <div className="grid grid-cols-4 gap-6 mt-8 text-center text-xs text-gray-400">
              <div>💻</div>
              <div>🛡️</div>
              <div>⚡</div>
              <div>⭐</div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-4 gap-6 mt-4 text-center">
              <div>
                <p className="text-white font-semibold">10+</p>
                <p className="text-gray-500 text-xs">Projects</p>
              </div>
              <div>
                <p className="text-white font-semibold">100%</p>
                <p className="text-gray-500 text-xs">Client Focus</p>
              </div>
              <div>
                <p className="text-white font-semibold">Fast</p>
                <p className="text-gray-500 text-xs">Delivery</p>
              </div>
              <div>
                <p className="text-white font-semibold">Top</p>
                <p className="text-gray-500 text-xs">Quality</p>
              </div>
            </div>
          </div>

          {/* RIGHT TEXT */}
          <div className="text-gray-400 text-sm leading-relaxed space-y-5">

            <p>
              I’m a U.S.-based web developer focused on building, fixing, and maintaining reliable websites and apps.
            </p>

            <p>
              I personally manage every project end to end, supported by a small, highly reliable production team. You’ll always communicate directly with me.
            </p>

            <p>
              I handle project planning, technical oversight, quality control, and final delivery to ensure consistent, professional results.
            </p>

            <p>
              I combine strong analytical thinking with practical problem-solving to deliver efficient, well-structured digital solutions.
            </p>

            <p>
              If you're looking for a dependable developer who combines technical skill with real-world accountability — I'd be glad to connect.
            </p>

          </div>
        </div>

        {/* SKILLS */}
        {/* <div className="mt-16">
          <h3 className="text-[#F5B301] text-sm mb-4">
            Skills & Technologies
          </h3>

          <div className="flex flex-wrap gap-3">
            {[
              "React.js", "Next.js", "Tailwind CSS", "Bootstrap",
              "Node.js", "Express.js", "Python", "Flask",
              "MongoDB", "MySQL", "PostgreSQL", "REST APIs",
              "Authentication", "UI/UX Design"
            ].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 text-xs rounded-full bg-[#0B0F14] border border-[#1A1F26] text-gray-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div> */}

      </div>
    </section>
  );
}