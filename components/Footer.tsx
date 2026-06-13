import FooterColumn from "./utils/FooterColumn";
import { MailIcon, PhoneIcon } from "./utils/icons";


export default function Footer() {
  return (
    <footer className="bg-[#0B1C2C] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* TOP */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">

          {/* BRAND */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#C8A75B] rounded-lg flex items-center justify-center text-black font-bold">
                ר
              </div>
              <span className="text-xl font-semibold">Ribis.org</span>
            </div>

            <p className="text-gray-400 mb-6 max-w-sm">
              Awareness. Information. Application. Standing at the intersection
              of halachic law and modern finance.
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
            title="SERVICES"
            links={[
              { label: "Bank Directory", href: "/banks" },
              { label: "Kosher Brokers", href: "/brokers" },
              { label: "Investments", href: "/Investments" },
              { label: "Businesses", href: "/businesses" },
            ]}
          />
           <FooterColumn
            title="EDUCATION"
            links={[
              { label: "Shiurim", href: "/banks" },
              { label: "Bulletins", href: "/brokers" },
              { label: "FAQ", href: "/Q&A" },
              { label: "Programs", href: "/programs" },
              { label: "Alerts", href: "/alerts" },
            ]}
          />


          <FooterColumn
            title="DEPARTMENTS"
            links={[
              { label: "Bais Horaah", href: "/bais-horaah" },
              { label: "Heter Iska", href: "/heter-iska" },
              { label: "Donate", href: "/donate" },
              { label: "Contact", href: "/contact" },
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