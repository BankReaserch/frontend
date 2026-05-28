// components/ui/PageHeader.tsx

type Props = {
  label: string;

  title: string;

  buttonText?: string;

  onClick?: () => void;
};

export default function PageHeader({
  label,
  title,
  buttonText,
  onClick,
}: Props) {

  return (
    <section className="sticky top-0 z-20 border-b border-[#e7dfd2] bg-white/90 backdrop-blur-xl">

      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        <div>

          <p className="text-[#c8a21a] uppercase tracking-[0.35em] text-xs font-semibold">

            {label}

          </p>

          <h1 className="font-serif text-4xl text-[#051933] mt-2">

            {title}

          </h1>

        </div>

        {buttonText && (

          <button
            onClick={onClick}
            className="h-12 px-6 rounded-2xl bg-[#051933] hover:bg-[#0d2748] transition-all text-white font-semibold"
          >

            {buttonText}

          </button>
        )}

      </div>

    </section>
  );
}