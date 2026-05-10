// type Props = {
//   label: string;
//   placeholder: string;
// };

// export default function Input({ label, placeholder }: Props) {
//   return (
//     <div>
//       <label className="block text-xs tracking-wide mb-2 text-[#1A2B3C]">
//         {label}
//       </label>

//       <input
//         type="text"
//         placeholder={placeholder}
//         className="w-full rounded-lg border border-[#E7E2D9] bg-[#F8F6F2] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8A75B]/40 transition"
//       />
//     </div>
//   );
// }

type Props = {
  label: string;
  placeholder: string;
  type?: string;
};

export default function Input({ label, placeholder, type = "text" }: Props) {
  return (
    <div className="mb-4">
      <label className="text-sm text-gray-300">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:border-gold text-white placeholder-gray-500"
      />
    </div>
  );
}