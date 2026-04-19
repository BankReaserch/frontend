type Props = {
  name: string;
};

export default function PoskimPill({ name }: Props) {
  return (
    <span className="px-4 py-2 rounded-lg border border-[#E7E2D9] bg-[#F8F6F2] text-sm text-[#1A2B3C]">
      {name}
    </span>
  );
}