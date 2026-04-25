import About from "./components/About";
import Contact from "./components/Contact";
import Cursor from "./components/Cursor";
import Divider from "./components/Divider";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Services from "./components/Services";
import Skills from "./components/Skills";


export default function Home() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Divider />
        <About />
        <Divider />
        <Skills />
        <Divider />
        <Services />
        <Divider />
        <Contact />
      </main>
      <Footer />
    </>
  );
}