import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
}

const ProjectCard=({
  title,
  description,
  image,
  tags,
  github,
  demo,
}: ProjectCardProps)=> {
  return (
    <div className="group bg-[#0f172a] rounded-xl overflow-hidden border border-white/10 hover:border-blue-500/40 transition shadow-lg">

      {/* Project Image */}
      <div className="relative h-[200px] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-6">

        <h3 className="text-xl font-semibold mb-2 text-white">
          {title}
        </h3>

        <p className="text-gray-400 text-sm mb-4">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">

          {github && (
            <Link
              href={github}
              className="text-sm px-4 py-2 rounded-lg border border-white/10 hover:bg-white/10 transition"
            >
              Github
            </Link>
          )}

          {demo && (
            <Link
              href={demo}
              className="text-sm px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white"
            >
              Live Demo
            </Link>
          )}

        </div>
      </div>
    </div>
  );
}

export default ProjectCard