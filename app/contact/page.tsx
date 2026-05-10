"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  Mail,
  Phone,
  MessageSquare,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

const contactCards = [
  {
    icon: MessageSquare,
    title: "Online Submission Form",
    desc: "Submit your question anytime and receive a prompt response.",
  },
  {
    icon: Mail,
    title: "Email",
    desc: "Office@Ribis.org — ideal for detailed or complex questions.",
  },
  {
    icon: Phone,
    title: "Phone",
    desc: "732.228.8558 — speak directly with our office.",
  },
];

const rabbis = [
  {
    initials: "PV",
    name: 'Harav Pinchos Vind shlit"a',
    color: "bg-amber-500",
  },
  {
    initials: "YZ",
    name: 'Harav Yitzchok Zilberstein shlit"a',
    color: "bg-emerald-500",
  },
  {
    initials: "AM",
    name: 'Harav Ari Marberger shlit"a',
    color: "bg-blue-500",
  },
];

export default function ContactPage() {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen overflow-hidden bg-[#f5f1ea]">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#051933]">
        {/* Pattern */}
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(135deg,#ffffff_1px,transparent_1px)] bg-[size:30px_30px]" />

        {/* Glow */}
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#c8a21a]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 pb-36 pt-24 md:px-8 md:pt-32 lg:pb-44">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-serif text-5xl leading-tight text-white md:text-7xl">
              We&apos;re Here to{" "}
              <span className="italic text-[#c8a21a]">Help</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#b7c2d3] md:text-xl">
              Whether you have a sha&apos;alah, need a heter iska, or want to
              learn more about our programs — reach out anytime.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="relative z-10 -mt-20 pb-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 md:px-8 lg:grid-cols-[360px_1fr]">
          {/* LEFT SIDEBAR */}
          <div className="space-y-6">
            {/* CONTACT CARDS */}
            <div className="overflow-hidden rounded-[28px] border border-white/5 bg-[#061a33] shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
              {contactCards.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 border-b border-white/5 p-6 last:border-none"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0d2a4e]">
                    <item.icon className="h-6 w-6 text-[#d0ab24]" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-serif text-2xl text-white">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[15px] leading-7 text-[#94a3b8]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* RABBIS CARD */}
            <div className="rounded-[28px] bg-[#061a33] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
              <p className="mb-6 text-sm uppercase tracking-[0.28em] text-[#d0ab24]">
                Guided by Leading Poskim
              </p>

              <div className="space-y-5">
                {rabbis.map((rabbi) => (
                  <div key={rabbi.name} className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white ${rabbi.color}`}
                    >
                      {rabbi.initials}
                    </div>

                    <p className="text-lg text-[#edf2ff]">{rabbi.name}</p>
                  </div>
                ))}
              </div>

              <button className="mt-7 text-lg font-medium text-[#d0ab24] transition hover:translate-x-1">
                + 4 more Rabbanim on staff →
              </button>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { number: "3000+", label: "USA Banks" },
                { number: "2000+", label: "Serviced" },
                { number: "10", label: "Poskim" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl bg-[#061a33] px-3 py-6 text-center shadow-xl"
                >
                  <h3 className="font-serif text-3xl text-[#d0ab24] md:text-4xl">
                    {item.number}
                  </h3>

                  <p className="mt-2 text-xs uppercase tracking-widest text-[#94a3b8] md:text-sm">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="rounded-[34px] bg-white p-6 shadow-[0_25px_80px_rgba(0,0,0,0.18)] md:p-10 lg:p-14">
            <div className="max-w-3xl">
              <h2 className="font-serif text-4xl leading-tight text-[#0f172a] md:text-6xl">
                Send Us a Message
              </h2>

              <p className="mt-5 text-lg leading-8 text-[#64748b]">
                Fill out the form below and we&apos;ll respond as soon as
                possible.
              </p>
            </div>

            <form className="mt-10 space-y-7">
              {/* INPUTS */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-3 block text-sm font-semibold uppercase tracking-[0.25em] text-[#64748b]">
                    Name
                  </label>

                  <input
                    type="text"
                    placeholder="Your full name"
                    className="h-16 w-full rounded-2xl border border-[#e7e1d6] bg-[#f8f5ef] px-5 text-lg text-[#0f172a] outline-none transition-all placeholder:text-[#94a3b8] focus:border-[#d0ab24] focus:bg-white focus:ring-4 focus:ring-[#d0ab24]/10"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-semibold uppercase tracking-[0.25em] text-[#64748b]">
                    Email
                  </label>

                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="h-16 w-full rounded-2xl border border-[#e7e1d6] bg-[#f8f5ef] px-5 text-lg text-[#0f172a] outline-none transition-all placeholder:text-[#94a3b8] focus:border-[#d0ab24] focus:bg-white focus:ring-4 focus:ring-[#d0ab24]/10"
                  />
                </div>
              </div>

              {/* SUBJECT */}
              <div>
                <label className="mb-3 block text-sm font-semibold uppercase tracking-[0.25em] text-[#64748b]">
                  Subject
                </label>

                <div className="relative">
                  <select className="h-16 w-full appearance-none rounded-2xl border border-[#e7e1d6] bg-[#f8f5ef] px-5 text-lg text-[#64748b] outline-none transition-all focus:border-[#d0ab24] focus:bg-white focus:ring-4 focus:ring-[#d0ab24]/10">
                    <option>Please select a subject</option>
                    <option>General Inquiry</option>
                    <option>Heter Iska</option>
                    <option>Banking Questions</option>
                    <option>Programs</option>
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#64748b]" />
                </div>
              </div>

              {/* MESSAGE */}
              <div>
                <label className="mb-3 block text-sm font-semibold uppercase tracking-[0.25em] text-[#64748b]">
                  Message
                </label>

                <textarea
                  rows={7}
                  placeholder="Describe your question or request..."
                  className="w-full rounded-3xl border border-[#e7e1d6] bg-[#f8f5ef] px-5 py-5 text-lg text-[#0f172a] outline-none transition-all placeholder:text-[#94a3b8] focus:border-[#d0ab24] focus:bg-white focus:ring-4 focus:ring-[#d0ab24]/10"
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="group flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-[#c8a21a] text-lg font-semibold text-[#051933] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d7b52f] hover:shadow-[0_15px_35px_rgba(200,162,26,0.35)]"
              >
                Send Message

                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </button>

              <p className="text-center text-[#94a3b8]">
                Prefer email?{" "}
                <span className="font-semibold text-[#c8a21a]">
                  Office@Ribis.org
                </span>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
    <Footer/>
    </>
  );
}