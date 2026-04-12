import Navbar from "./Navbar"
import Footer from "./Footer"
import bgimage from '../public/assets/bgimage.png'
const Wrapper=({children}:{children:React.ReactNode})=>{
    return(
        < div className="bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${bgimage.src})` }}>
        <Navbar/>
        {children}
        <Footer/>
        </div>
    )
}
export default Wrapper