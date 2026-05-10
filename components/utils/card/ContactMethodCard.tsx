type Props = {
  icon: string;
  title: string;
  description: string;
};

export default function ContactMethodCard({
  icon,
  title,
  description,
}: Props) {
  return (
    <div className="flex items-start gap-4 p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition">
      
      {/* ICON */}
      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-lg">
        {icon}
      </div>

      {/* TEXT */}
      <div>
        <h4 className="text-white font-medium mb-1">{title}</h4>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  );
}