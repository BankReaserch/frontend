import { ReactNode } from "react";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const ServiceCard=({
  icon,
  title,
  description,
}: ServiceCardProps) =>{
  return (
    <div className="group p-8 rounded-xl bg-[#0f172a] border border-white/10 
    hover:border-blue-500/40 transition duration-300 shadow-lg">

      {/* Icon */}
      <div className="mb-6 text-blue-400 text-3xl">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold mb-3 text-white">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default ServiceCard