import Footer from "@/components/Footer"
import Hero from "@/components/Hero"
import Navbar from "@/components/Navbar"
import bgimage from '../public/assets/bgimage.png'
import Experience from "@/components/Experience"
import InternshipEducation from "@/components/InternshipEducation"
import Certifications from "@/components/Certifications"

const Home =()=>{
  return(
    <div className="bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${bgimage.src})` }}>
     <Navbar/>
     <Hero/>
     <Experience/>
     <InternshipEducation/>
     <Certifications/>
     {/* <About/>
     <Projects/>
     <Services/> */}
     <Footer/>

    </div>
  )
}
export default Home