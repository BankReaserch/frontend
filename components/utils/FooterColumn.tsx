type Props = {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
};

import Link from "next/link";

export default function FooterColumn({ title, links }: Props) {
  return (
    <div>
      <p className="text-[#C8A75B] text-xs tracking-[0.3em] mb-4 uppercase">
        {title}
      </p>

      <ul className="space-y-3 text-gray-400 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="hover:text-white transition"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}