// components/ui/SearchInput.tsx

import { Search } from "lucide-react";

type Props = {
  value: string;

  onChange: (
    value: string
  ) => void;

  placeholder?: string;
};

export default function SearchInput({
  value,
  onChange,
  placeholder,
}: Props) {

  return (
    <div className="relative max-w-md">

      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8]" />

      <input
        type="text"
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        placeholder={
          placeholder
        }
        className="w-full h-12 rounded-2xl border border-[#e7dfd2] bg-white pl-12 pr-4 outline-none"
      />

    </div>
  );
}