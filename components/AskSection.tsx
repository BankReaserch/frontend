"use client";

import Link from "next/link";
import {
  ArrowRight,
  Phone,
  Mail,
  BookOpen,
} from "lucide-react";

const cards = [
  {
    icon: BookOpen,
    title:
      "Rabbinical Guidance",
    description:
      "Receive trusted guidance from experienced Rabbanim on ribis and financial halacha.",
  },

  {
    icon: Phone,
    title:
      "Ribis Hotline",
    description:
      "Speak directly with our team during designated hours for practical guidance.",
  },

  {
    icon: Mail,
    title:
      "Submit a Question",
    description:
      "Send your question online anytime and receive a prompt response.",
  },
];

export default function AskSection() {
  return (
    <section className="bg-[#F4F1EC] py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="bg-gradient-to-br from-[#0B1C2C] to-[#1E3A5F] rounded-[32px] p-10 md:p-14 overflow-hidden relative">

          <div className="absolute right-0 top-0 w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl" />

          {/* HEADER */}
          <div className="relative z-10 text-center max-w-4xl mx-auto">

            <p className="text-[#C8A75B] text-xs tracking-[0.3em] uppercase">

              Bais Hora'ah

            </p>

            <h2 className="mt-5 text-white font-serif text-5xl">

              Ask a Sha&apos;alah

            </h2>

            <p className="mt-6 text-gray-300 text-lg leading-8">

              Have a question regarding ribis, loans,
              investments, partnerships, or financial halacha?

              Our Rabbanim are available to provide
              clear and trusted guidance.

            </p>

          </div>

          {/* CARDS */}
          <div className="relative z-10 mt-14 grid md:grid-cols-3 gap-6">

            {cards.map(
              (
                card,
                index
              ) => {

                const Icon =
                  card.icon;

                return (
                  <div
                    key={index}
                    className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6"
                  >

                    <div className="w-12 h-12 rounded-xl bg-[#C8A75B]/10 flex items-center justify-center">

                      <Icon
                        size={22}
                        className="text-[#C8A75B]"
                      />

                    </div>

                    <h3 className="mt-5 text-white text-xl font-medium">

                      {
                        card.title
                      }

                    </h3>

                    <p className="mt-3 text-gray-400 text-sm leading-7">

                      {
                        card.description
                      }

                    </p>

                  </div>
                );
              }
            )}

          </div>

          {/* BUTTON */}
          <div className="relative z-10 mt-12 text-center">

            <Link
              href="/ask-a-shaalah"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#C8A75B] text-[#0B1C2C] font-semibold hover:scale-[1.02] transition"
            >

              Learn More

              <ArrowRight
                size={18}
              />

            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}