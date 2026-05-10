import RabbiList from "./RabbiList";
import ContactMethodCard from "./utils/card/ContactMethodCard";



export default function AskSection() {
  return (
    <section className="bg-[#F4F1EC] py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* MAIN CONTAINER */}
        <div className="bg-gradient-to-br from-[#0B1C2C] to-[#1E3A5F] rounded-3xl p-10 md:p-14 relative overflow-hidden">

          {/* RADIAL DECOR */}
          <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl opacity-20" />

          <div className="grid lg:grid-cols-2 gap-12 relative z-10">

            {/* LEFT */}
            <div>

              <p className="text-[#C8A75B] text-xs tracking-[0.3em] mb-4">
                BAIS HORA'AH
              </p>

              <h2 className="text-white font-serif text-4xl md:text-5xl leading-tight mb-6">
                Ask a Sha&apos;alah — <br />
                <span className="text-[#C8A75B] italic">
                  Get an Answer
                </span>
              </h2>

              <p className="text-gray-400 max-w-lg mb-8">
                Our Rabbanim are available to provide clear guidance on all
                matters of ribis and financial halacha — from simple questions
                to the most complex financial scenarios.
              </p>

              {/* CONTACT METHODS */}
              <div className="space-y-4">
                <ContactMethodCard
                  icon="📞"
                  title="Ribis Hotline"
                  description="Available during designated hours for real-time guidance"
                />

                <ContactMethodCard
                  icon="📝"
                  title="Online Submission Form"
                  description="Submit your question anytime — receive a prompt, reliable response"
                />

                <ContactMethodCard
                  icon="✉️"
                  title="Email"
                  description="Office@Ribis.org — for detailed or complex questions"
                />
              </div>
            </div>

            {/* RIGHT */}
            <div>
              <RabbiList />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}