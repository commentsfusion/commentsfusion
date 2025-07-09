"use client";
import Navbar from "../components/landingPage_components/Navbar";
import Footer from "../components/landingPage_components/Footer";
import { useState } from "react";
import Image from "next/image";

export default function ContactUs() {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phoneNo: "",
        message: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", form);
        setForm({ fullName: "", email: "", phoneNo: "", message: "" });
    };

    return (
        <>
            <Navbar />
            <main className="pt-24 py-4 bg-[linear-gradient(to_bottom,_#000000_45%,_#33C6F4_100%)] bg-fixed text-white min-h-screen">
                <section className="max-w-6xl mx-auto px-4 sm:px-6">
                    <h1 className="text-2xl sm:text-5xl font-bold my-8 text-center">Contact Us</h1>

                    <div className="flex w-full max-w-5xl bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-12 text-white">

                        <div className="absolute inset-0 z-0">
                            <Image
                                src="/images/authPage/mascot.svg"
                                alt="Background Mascot"
                                fill
                                style={{ objectFit: "contain" }}
                                className="animate-float opacity-10"
                                priority
                            />
                        </div>

{/* <div className="w-full lg:w-1/2 space-y-4 pr-8 border-r border-gray-700 hidden lg:block">

    <h2 className="text-2xl font-bold mb-5 text-white">
        We're Here to Help
    </h2>


    <p className="text-lg text-white/80 leading-relaxed mb-4">
        Got a question, need support, or want to explore how Comments Fusion can help your team grow faster on LinkedIn? We'd love to hear from you.
    </p>


    <p className="text-lg text-white/80 leading-relaxed">
        Whether you're facing a technical issue, have feedback, or want to learn more about premium features, our team is just a message away.
    </p>
</div> */}
 <div
  className="
    w-full 
    md:w-1/2
    space-y-6
    md:pr-10
    border-b
    md:border-b-0
    md:border-r
    border-gray-700
    pb-6
    md:pb-0
    mb-6
    md:mb-0
    px-4
    md:px-0
  "
>

        <h2 className="text-2xl font-bold mb-5 text-white">
            We're Here to Help
        </h2>
        <p className="text-lg text-white/80 leading-relaxed mb-4">
            Got a question, need support, or want to explore how Comments Fusion can help your team grow faster on LinkedIn? We'd love to hear from you.
        </p>
        <p className="text-lg text-white/80 leading-relaxed">
            Whether you're facing a technical issue, have feedback, or want to learn more about premium features, our team is just a message away.
        </p>
    </div>

                        {/* Contact Form */}
                        <form
                            onSubmit={handleSubmit}
                            // className="w-full lg:w-1/2 p-6 space-y-6"
                            className="w-full lg:w-1/2 p-4 space-y-4"

                        >
                            <div>
                                <label htmlFor="fullName" className="block text-white text-sm font-medium mb-2">
                                    Full name
                                </label>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    required
                                    value={form.fullName}
                                    onChange={handleChange}
                                    className="w-full h-10 px-3 rounded-lg border border-white/70 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-300"

                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full h-10 px-3 rounded-lg border border-white/70 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-300"

                                />
                            </div>
                            <div>
                                <label htmlFor="phoneNo" className="block text-white text-sm font-medium mb-2">
                                    Phone no.
                                </label>
                                <input
                                    id="phoneNo"
                                    name="phoneNo"
                                    type="tel"
                                    value={form.phoneNo}
                                    onChange={handleChange}
                                    className="w-full h-10 px-3 rounded-lg border border-white/70 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-300"

                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-white text-sm font-medium mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    required
                                    value={form.message}
                                    onChange={handleChange}
                                    className="w-full h-10 px-3 rounded-lg border border-white/70 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-300"
                                />
                            </div>
                            <button
                                type="submit"

                                className="w-full h-10 px-3 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-400 transition-colors shadow-[0_0_15px_0_rgba(34,211,238,0.4)] text-lg mx-auto" 
                               
                                
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </section>
                <Footer />
            </main>
        </>
    );
}