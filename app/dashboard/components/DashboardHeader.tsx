"use client";

type Props = {
  title: string;

  subtitle?: string;
};

export default function DashboardHeader({
  title,
  subtitle,
}: Props) {

  return (
    <div className="mb-8">

      <h1 className="text-4xl font-serif text-[#0d1b2a]">
        {title}
      </h1>

      {subtitle && (

        <p className="text-gray-500 mt-2">
          {subtitle}
        </p>

      )}

    </div>
  );
}