type Props = {
  label: string;
  placeholder: string;
};

export default function Input({ label, placeholder }: Props) {
  return (
    <div>
      <label className="block text-xs tracking-wide mb-2 text-[#1A2B3C]">
        {label}
      </label>

      <input
        type="text"
        placeholder={placeholder}
        className="w-full rounded-lg border border-[#E7E2D9] bg-[#F8F6F2] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8A75B]/40 transition"
      />
    </div>
  );
}