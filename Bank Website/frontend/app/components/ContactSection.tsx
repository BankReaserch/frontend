import Input from "./utils/Input";

export default function ContactSection() {
  return (
    <section className="bg-[#F4F1EC] py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">

        {/* HEADER */}
        <p className="text-[#C8A75B] text-xs tracking-[0.3em] mb-4">
          GET IN TOUCH
        </p>

        <h2 className="text-[#1A2B3C] font-serif text-4xl md:text-5xl mb-4">
          We&apos;re Here to{" "}
          <span className="text-[#C8A75B] italic">Help</span>
        </h2>

        <p className="text-gray-500 max-w-xl mx-auto mb-12">
          Whether you have a sha&apos;alah, need a heter iska, or want to learn
          more about our programs — reach out.
        </p>

        {/* FORM CARD */}
        <div className="relative bg-white/60 backdrop-blur-md border border-[#E7E2D9] rounded-2xl p-8 md:p-10 shadow-lg">

          {/* subtle glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#C8A75B]/10 to-transparent pointer-events-none" />

          <form className="relative z-10 space-y-6 text-left">

            {/* ROW */}
            <div className="grid md:grid-cols-2 gap-4">

              <Input label="NAME" placeholder="Your full name" />
              <Input label="EMAIL" placeholder="your@email.com" />

            </div>

            {/* SUBJECT */}
            <Input label="SUBJECT" placeholder="Please select a subject" />

            {/* MESSAGE */}
            <div>
              <label className="block text-xs tracking-wide mb-2 text-[#1A2B3C]">
                MESSAGE
              </label>
              <textarea
                placeholder="Describe your question or request..."
                rows={5}
                className="w-full rounded-lg border border-[#E7E2D9] bg-[#F8F6F2] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8A75B]/40 transition"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#C8A75B] to-[#E0C27A] text-black py-3 rounded-lg font-medium shadow hover:shadow-lg transition"
            >
              Send Message

              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}