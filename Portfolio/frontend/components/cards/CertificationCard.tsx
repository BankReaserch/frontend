const CertificationCard=({
  icon,
  title,
  subtitle,
  org
}:{
  icon:React.ReactNode
  title:string
  subtitle:string
  org:string
}) =>{
  return(
    <div className="border border-[#d4a056]/40 rounded-xl p-8 text-center bg-black/30 backdrop-blur-sm hover:border-[#d4a056] transition">

      <div className="flex justify-center mb-4 text-[#d4a056]">
        {icon}
      </div>

      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      <p className="text-gray-300">
        {subtitle}
      </p>

      <p className="text-gray-400 text-sm mt-2">
        {org}
      </p>

    </div>
  )
}

export default CertificationCard