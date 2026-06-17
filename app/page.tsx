import AboutSection from "@/components/AboutSection";
import AskSection from "@/components/AskSection";
import BankDirectorySection from "@/components/BankDirectory";
// import ContactSection from "@/components/ContactSection";
import EducationSection from "@/components/EducationSection";
import FeaturesGrid from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HeterIskaSection from "@/components/HeterIskaSection";
import Navbar from "@/components/Navbar"
import StoreSection from "@/components/StoreSection";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <main className="bg-[#0B1C2C] min-h-screen">
        <Navbar />
        <Hero />
      </main>
      {/* <GuidedStrip/> */}
      <FeaturesGrid/>
      <BankDirectorySection/>
      <EducationSection/>
      <AskSection/>
      <HeterIskaSection/>
      <AboutSection/>
      <StoreSection/>
      <section className="bg-[#0d1b2a] px-6 lg:px-16 py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#c9a84c 1px, transparent 1px), linear-gradient(90deg, #c9a84c 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-semibold mb-4">Join us</p>
          <h2 className="text-white font-serif text-4xl lg:text-5xl mb-5 leading-tight">
            Ready to bring halachic clarity to your finances?
          </h2>
          {/* <p className="text-[#8a9bb0] text-sm mb-8 leading-relaxed">
            Browse our bank directory, submit a sha'alah, or explore our educational library — it's all free.
          </p> */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/register" className="bg-[#c9a84c] text-[#0d1b2a] font-bold text-sm px-8 py-3.5 rounded-lg hover:bg-[#d4b567] transition">
              Create Free Account
            </Link>
            <Link href="/bank-directory" className="border border-white/20 text-white font-semibold text-sm px-8 py-3.5 rounded-lg hover:bg-white/10 transition">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
      <Footer/>

    </>
  )
}
export default Home;