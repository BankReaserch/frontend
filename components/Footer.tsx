import Link from "next/link";
import FooterColumn from "./utils/FooterColumn";
import { MailIcon, PhoneIcon } from "./utils/icons";
import { Noto_Rashi_Hebrew } from "next/font/google";

const notoRashi = Noto_Rashi_Hebrew({
  subsets: ["hebrew"],
  weight: ["900"],
});


export default function Footer() {
  return (
    <footer className="bg-[#0B1C2C] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* TOP */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">



          {/* BRAND */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Link href="/" className="flex items-center gap-2">
                <div
                  className={`w-9 h-9 rounded-md bg-[#C8A75B] flex items-center justify-center text-3xl  text-black font-bold ${notoRashi.className}`}
                >
                  ר
                </div>

                <span className="text-white text-lg font-bold">
                  Ribis
                  <span
                    className="
      inline-block
      w-1.5
      h-1.5
      bg-[#C8A75B]
      rounded-full
      mx-[2px]
      translate-y-[1px]
    "
                  />
                  <span className="text-white text-lg font-bold">
                    org
                  </span>
                </span>
              </Link>

            </div>

            <p className="text-gray-400 mb-6 max-w-sm">
              INFORMATION · AWARENESS · RESOURCES <br />
              Halachic Guidance for Modern Finance.
            </p>

            {/* CONTACT */}
            <div className="space-y-3 text-gray-400 text-sm">

              <div className="flex items-center gap-2">
                <MailIcon />
                Office@Ribis.org
              </div>

              <div className="flex items-center gap-2">
                <PhoneIcon />
                732.228.8558
              </div>

            </div>
          </div>
          <FooterColumn
            title="Home"
            links={[
              { label: "About", href: "/about" },
              { label: "Team", href: "/about/#team" },
              { label: "Highlights", href: "/highlights" },
              { label: "Contact", href: "/contact" },
              { label: "Donate", href: "/donate" }
            ]}
          />

          <FooterColumn
            title="Information"
            links={[
              { label: "Banks", href: "/banks" },
              { label: "Brokers", href: "/brokers" },
              { label: "Investments", href: "/Investments" },
              { label: "Businesses", href: "/businesses" },
            ]}
          />
          <FooterColumn
            title="Awareness"
            links={[
              { label: "Shiurim", href: "/banks" },
              { label: "Q&A", href: "/Q&A" },
              { label: "Articles", href: "/article" },
              { label: "Programs", href: "/programs" },
              { label: "Alerts", href: "/alerts" },
            ]}
          />


          <FooterColumn
            title="Resources"
            links={[
              { label: "Bais Horaah", href: "/bais-horaah" },
              { label: "Heter Iska", href: "/heter-iska" },
            ]}
          />
        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between gap-4 text-sm text-gray-500">

          <p>
            © 2026 Ribis.org · Information is for general purposes only and does
            not constitute financial or legal advice.
          </p>

          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition">
              Terms of Service
            </span>
            <span className="hover:text-white cursor-pointer transition">
              Privacy Policy
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}