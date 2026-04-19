type Props = {
  title: string;
  links: string[];
};

export default function FooterColumn({ title, links }: Props) {
  return (
    <div>
      <p className="text-[#C8A75B] text-xs tracking-[0.3em] mb-4">
        {title}
      </p>

      <ul className="space-y-3 text-gray-400 text-sm">
        {links.map((link, i) => (
          <li
            key={i}
            className="hover:text-white cursor-pointer transition"
          >
            {link}
          </li>
        ))}
      </ul>
    </div>
  );
}