import Wrapper from "@/components/Wrapper"
import { Mail, MapPin, Linkedin, Github } from "lucide-react"

export default function Page() {
    return (
        <Wrapper>
            <section
                id="contact"
                className="py-24 px-6 text-white min-h-screen bg-cover bg-center pb-0"
            >
                <div className="max-w-6xl mx-auto">

                    {/* Title */}
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-script text-[#d4a056] mb-4">
                            Get In Touch
                        </h2>

                        <p className="text-gray-300">
                            Open to Security Engineering & Full Stack Opportunities
                        </p>

                        <div className="w-64 h-[2px] bg-gradient-to-r from-transparent via-[#d4a056] to-transparent mx-auto mt-6"></div>
                    </div>

                    {/* Main Grid */}
                    <div className="grid md:grid-cols-2 gap-8">

                        {/* Contact Info */}
                        <div className="border border-[#d4a056]/40 rounded-xl p-8 bg-black/30 backdrop-blur-sm">

                            <h3 className="text-xl font-semibold mb-6">
                                Contact Information
                            </h3>

                            <div className="space-y-6 text-gray-300">

                                <div className="flex items-center gap-4">
                                    <Mail className="text-[#d4a056]" />
                                    <span>samiralam@email.com</span>
                                </div>

                                <div className="flex items-center gap-4">
                                    <MapPin className="text-[#d4a056]" />
                                    <span>India</span>
                                </div>

                                <div className="flex items-center gap-4">
                                    <Linkedin className="text-[#d4a056]" />
                                    <span>linkedin.com/in/samiramrullah</span>
                                </div>

                                <div className="flex items-center gap-4">
                                    <Github className="text-[#d4a056]" />
                                    <span>github.com/samir-alam</span>
                                </div>

                            </div>

                            {/* Internship Card */}
                            <div className="mt-10 border border-[#d4a056]/40 rounded-xl p-6 bg-black/20">

                                <h4 className="font-semibold mb-4">
                                    Futurescape Technology Pvt Ltd
                                </h4>

                                <p className="text-sm text-gray-300 mb-3">
                                    Security Intern
                                </p>

                                <ul className="text-sm text-gray-300 space-y-2">
                                    <li>✔ Built secure React + Flask application on AWS</li>
                                    <li>✔ Implemented authentication & APIs</li>
                                    <li>✔ Python detection model using OpenCV</li>
                                    <li>✔ Security monitoring dashboards</li>
                                </ul>

                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="border border-[#d4a056]/40 rounded-xl p-8 bg-black/30 backdrop-blur-sm">

                            <h3 className="text-xl font-semibold mb-6">
                                Contact Form
                            </h3>

                            <form className="space-y-5">

                                <div>
                                    <label className="text-sm text-gray-300">Name</label>
                                    <input
                                        type="text"
                                        className="w-full mt-1 bg-transparent border border-[#d4a056]/30 rounded-md p-3 focus:outline-none focus:border-[#d4a056]"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-300">Email</label>
                                    <input
                                        type="email"
                                        className="w-full mt-1 bg-transparent border border-[#d4a056]/30 rounded-md p-3 focus:outline-none focus:border-[#d4a056]"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-300">Subject</label>
                                    <input
                                        type="text"
                                        className="w-full mt-1 bg-transparent border border-[#d4a056]/30 rounded-md p-3 focus:outline-none focus:border-[#d4a056]"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-300">Message</label>
                                    <textarea
                                        rows={5}
                                        className="w-full mt-1 bg-transparent border border-[#d4a056]/30 rounded-md p-3 focus:outline-none focus:border-[#d4a056]"
                                    />
                                </div>

                                {/* Button */}
                                <button
                                    type="submit"
                                    className="w-full mt-4 py-3 rounded-md font-medium text-black bg-gradient-to-r from-[#d4a056] to-[#b37c35] hover:scale-105 transition"
                                >
                                    Send Message
                                </button>

                            </form>
                        </div>

                    </div>

                    {/* Social Icons */}
                    <div className="flex justify-center gap-6 mt-12">

                        <a href="#" className="border border-[#d4a056] p-3 rounded-full hover:bg-[#d4a056] hover:text-black transition">
                            <Linkedin size={20} />
                        </a>

                        <a href="#" className="border border-[#d4a056] p-3 rounded-full hover:bg-[#d4a056] hover:text-black transition">
                            <Github size={20} />
                        </a>

                        <a href="#" className="border border-[#d4a056] p-3 rounded-full hover:bg-[#d4a056] hover:text-black transition">
                            <Mail size={20} />
                        </a>

                    </div>

                    {/* Footer Text */}
                    <div className="text-center mt-10 text-gray-300 text-sm">
                        © 2026 Samir Alam
                        <br />
                        Application Security Engineer | MERN Stack Developer
                    </div>

                </div>
            </section>
        </Wrapper>
    )
}