import AboutSection from "./components/AboutSection";
import AskSection from "./components/AskSection";
import BankDirectorySection from "./components/BankDirectory";
import ContactSection from "./components/ContactSection";
import EducationSection from "./components/EducationSection";
import FeaturesGrid from "./components/Features";
import Footer from "./components/Footer";
import GuidedStrip from "./components/GuidedStrip";
import Hero from "./components/Hero";
import HeterIskaSection from "./components/HeterIskaSection";
import Navbar from "./components/Navbar"
import StoreSection from "./components/StoreSection";

const Home = () => {
  return (
    <>
      <main className="bg-[#0B1C2C] min-h-screen">
        <Navbar />
        <Hero />
      </main>
      <GuidedStrip/>
      <FeaturesGrid/>
      <BankDirectorySection/>
      <EducationSection/>
      <AskSection/>
      <HeterIskaSection/>
      <AboutSection/>
      <StoreSection/>
      <ContactSection/>
      <Footer/>

    </>
  )
}
export default Home;