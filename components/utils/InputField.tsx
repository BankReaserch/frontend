export default function InputField({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder: string;
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm text-gray-300 mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-[rgba(255,255,255,0.08)] focus:border-[#C6A85A] focus:outline-none transition"
      />
    </div>
  );
}