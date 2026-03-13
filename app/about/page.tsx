'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { transitions, CHOREOGRAPHY, DURATIONS } from '@/data/motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import SpotlightCard from '@/components/animations/SpotlightCard';



const AboutPage = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<'idle' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;

        const formData = new FormData(formRef.current);
        const name = formData.get('user_name') as string;
        const email = formData.get('user_email') as string;
        const message = formData.get('message') as string;

        if (!name.trim() || !email.trim() || !message.trim()) {
            alert('Transmission error: All fields are required to initiate the link.');
            return;
        }

        const recipient = 'info@techdlt.com';
        const subject = 'Inquiry from About Page – Tech DLT';
        const bodyContent = `Name: ${name}\r\nEmail: ${email}\r\nMessage: ${message}`;
        const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyContent)}`;

        window.location.href = mailtoLink;
        setStatus('success');
        setTimeout(() => {
            formRef.current?.reset();
            setStatus('idle');
        }, 1500);
    };

    const teams = [
        {
            name: "AI & Innovation Team",
            description: "Builds smart, data-driven solutions that automate workflows and unlock new business opportunities.",
            icon: "AI",
            bgImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200"
        },
        {
            name: "Enterprise Solutions Team",
            description: "Experts in SAP and ERP systems delivering robust infrastructure for large-scale operations.",
            icon: "ERP",
            bgImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200"
        },
        {
            name: "Blockchain & Security Team",
            description: "Develops secure, transparent digital frameworks for modern enterprises.",
            icon: "WEB3",
            bgImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800"
        },
        {
            name: "Digital Strategy Team",
            description: "Crafts high-impact marketing and growth strategies powered by analytics and creativity.",
            icon: "SEO",
            bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
        }
    ];

    const locations = [
        {
            type: "Head Office",
            address: "Suite 19, No 102, Concord Building, Mong Kok, Hong Kong (SAR-China)",
        },
        {
            type: "Marketing Office",
            address: "Block A, Olympia Tech Park, Guindy, Chennai, Tamil Nadu, India",
        },
        {
            type: "Registered Office",
            address: "No-1, Nallanahalli Post, Dharmapuri, Tamil Nadu, India",
        }
    ];

    const highlights = [
        "150+ industry experts and innovators",
        "15+ years of technology experience",
        "End-to-end digital transformation services",
        "Scalable enterprise solutions",
        "Client-focused, results-driven approach",
        "Global presence with local expertise"
    ];

    const portfolioCompanies: { name: string; logo?: string }[] = [
        { name: "E-man Energies", logo: "/images/portfolio/E-man.jpg" },
        { name: "DAIMLER TRUCK", logo: "/images/portfolio/Daimler Truck.png" },
        { name: "E-man Mobility", logo: "/images/portfolio/e-man moblity.jpg" },
        { name: "Automak Engineering", logo: "/images/portfolio/automack.png" },
        { name: "Gemini and Co", logo: "/images/portfolio/Gemini_and_ co.png" },
        { name: "Ugan Foods", logo: "/images/portfolio/ugan-logo.png" },
        { name: "TM Tradeline", logo: "/images/portfolio/tm international trade line.png" },
        { name: "Gemini Solariess", logo: "/images/portfolio/gemini solariss.jpeg" },
        { name: "Finofles (Lakshmi Pipes)", logo: "/images/portfolio/finofles _lakshmi_pipes.png" },
        { name: "Mayaa Naturals", logo: "/images/portfolio/mayaa-naturals-.avif" },
        { name: "GB Exports", logo: "/images/portfolio/gb exports logo.png" },
        { name: "VPJ Traders", logo: "/images/portfolio/vpj logo.png" },
        { name: "SRJ Exim", logo: "/images/portfolio/SRJ International EXIM Logo Design.png" },
        { name: "Fuseon Charging Station", logo: "/images/portfolio/fuseon charging station.jpeg" },
        { name: "Subakalyanamalai", logo: "/images/portfolio/subakalyanamalai.jpg" },
        { name: "DK Traders", logo: "/images/portfolio/DK traders.png" },
        { name: "INDEXO" },
        { name: "DEALSDOUBLE.AI" },
        { name: "ELECTRONO", logo: "/images/portfolio/Electrono.png" },
        { name: "LOADERMAN" }
    ];

    return (
        <div className="relative min-h-screen overflow-hidden">
            <main className="relative z-10 bg-transparent pt-32 pb-20">
                <div className="container mx-auto px-6">
                    {/* Hero Section */}
                    <section className="min-h-[70vh] flex flex-col items-center justify-center text-center mb-40">
                        <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={transitions.standard}
                            className="text-blue-500 font-bold tracking-[0.5em] uppercase text-xs mb-8 block"
                        >
                            Innovation Protocol
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                ...transitions.standard,
                                delay: CHOREOGRAPHY.STAGGER_MEDIUM,
                                duration: DURATIONS.SLOW
                            }}
                            className="text-white text-6xl md:text-[8rem] font-black tracking-tighter leading-none mb-12 uppercase italic"
                        >
                            Architecting <br />
                            <span className="text-blue-600">The Future.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ ...transitions.standard, delay: CHOREOGRAPHY.STAGGER_SLOW }}
                            className="text-slate-400 text-xl md:text-2xl font-medium max-w-4xl mx-auto leading-relaxed"
                        >
                            <strong>Tech-DLT</strong> is a forward-thinking software engine delivering next-generation digital solutions that help businesses grow faster, smarter, and more efficiently.
                        </motion.p>
                    </section>

                    {/* Mission & Background */}
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-40 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-12"
                        >
                            <SpotlightCard className="p-12 md:p-16 space-y-8 relative z-10" spotlightColor="rgba(59, 130, 246, 0.15)">
                                <h2 className="text-white text-4xl font-black tracking-tighter uppercase italic">The Core Engine</h2>
                                <p className="text-slate-300 text-lg leading-relaxed">
                                    With a dynamic team of <span className="text-blue-400 font-bold">150+ skilled professionals</span>, we combine deep technical expertise with real-world business understanding to build scalable, secure, and high-performance systems. Our mission is to transform ideas into powerful digital experiences that drive measurable results.
                                </p>
                                <div className="flex flex-wrap gap-4 pt-4">
                                    {["SAP", "AI", "Blockchain", "ERP"].map(tag => (
                                        <span key={tag} className="px-5 py-2 rounded-full bg-slate-100 border border-slate-200 text-xs font-black text-blue-600 uppercase tracking-widest">{tag}</span>
                                    ))}
                                </div>
                            </SpotlightCard>

                            <SpotlightCard className="p-12 md:p-16 space-y-8 relative z-10" spotlightColor="rgba(59, 130, 246, 0.15)">
                                <h2 className="text-white text-4xl font-black tracking-tighter uppercase italic">Bridging The Gap</h2>
                                <p className="text-slate-300 text-lg leading-relaxed">
                                    Founded by entrepreneurs with <span className="text-white font-extrabold">15+ years of combined IT experience</span>, Tech-DLT bridges the gap between technology and business success. We don’t just deliver software — we create <strong>intelligent ecosystems</strong> that help organizations innovate, automate, and outperform.
                                </p>
                            </SpotlightCard>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full group-hover:bg-blue-500/30 transition-all duration-700" />
                            <div className="relative rounded-[48px] overflow-hidden border border-white/10 shadow-2xl shadow-blue-500/10 aspect-square lg:aspect-auto lg:h-[700px]">
                                <img
                                    src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200"
                                    alt="AI Research Infrastructure"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-transparent to-transparent opacity-60" />
                                <div className="absolute bottom-8 left-8 right-8 p-8 bg-white rounded-[32px] shadow-2xl border border-slate-100">
                                    <span className="text-blue-600 font-black text-[10px] uppercase tracking-widest block mb-2">Protocol: INNOVATION-01</span>
                                    <h3 className="text-[#111111] text-2xl font-black uppercase italic tracking-tighter">Neural Research Core</h3>
                                </div>
                            </div>
                        </motion.div>
                    </section>

                    {/* Specialized Teams */}
                    <section className="mb-40">
                        <div className="text-center mb-20">
                            <h2 className="text-white text-5xl md:text-7xl font-black tracking-tighter uppercase italic mb-6">Expert Teams</h2>
                            <p className="text-slate-500 font-bold tracking-widest uppercase text-xs">A unified innovation engine</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {teams.map((team, idx) => (
                                <motion.div
                                    key={team.name}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                    className="relative h-[450px] rounded-[32px] overflow-hidden group shadow-xl hover:shadow-2xl transition-all border border-slate-100/10"
                                >
                                    {/* Background Image Layer */}
                                    <div className="absolute inset-0 z-0">
                                        <img
                                            src={team.bgImage}
                                            alt={team.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                                        />
                                        {/* Dark Overlay with Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900/40 group-hover:opacity-80 transition-opacity duration-500" />
                                    </div>

                                    {/* Content Layer */}
                                    <div className="relative z-10 h-full p-10 flex flex-col justify-end">
                                        <div className="text-blue-500 font-black text-3xl mb-6 group-hover:text-blue-400 transition-colors group-hover:-translate-y-2 duration-500">{team.icon}</div>
                                        <h3 className="text-white text-2xl font-black mb-4 uppercase tracking-tighter italic group-hover:text-blue-300 transition-colors">{team.name}</h3>
                                        <p className="text-slate-300 text-sm leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity line-clamp-3">{team.description}</p>
                                    </div>

                                    {/* Corner Accents */}
                                    <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-white/5 rounded-tl-3xl group-hover:border-blue-500/30 transition-colors duration-500 pointer-events-none" />
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    <section className="mb-40" id="clients">
                        <SpotlightCard className="py-20 px-8 md:px-16" spotlightColor="rgba(59, 130, 246, 0.2)">
                            <div className="text-center mb-16 relative z-10">
                                <h2 className="text-white text-4xl md:text-5xl font-black tracking-tighter uppercase italic mb-6">Our Clients</h2>
                                <p className="text-blue-500 font-bold tracking-widest uppercase text-xs opacity-80">Companies We Have Worked With</p>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 relative z-10">
                                {portfolioCompanies.map((company, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: (idx % 5) * 0.1, duration: 0.4 }}
                                        className="flex flex-col items-center justify-center p-6 rounded-3xl bg-slate-900/40 border border-slate-700/50 hover:border-blue-500/50 hover:bg-slate-800 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-500 group"
                                    >
                                        <div className="h-20 w-full mb-6 relative flex items-center justify-center">
                                            {company.logo ? (
                                                <img
                                                    src={company.logo}
                                                    alt={`${company.name} logo`}
                                                    className="max-h-full max-w-full object-contain transition-all duration-700 transform group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="text-white font-black text-xl italic tracking-tighter group-hover:text-blue-400 transition-all duration-500 text-center uppercase break-all px-2">
                                                    {company.name}
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-slate-300 font-bold text-[10px] md:text-xs text-center uppercase tracking-wider group-hover:text-white transition-colors duration-300">
                                            {company.name}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </SpotlightCard>
                    </section>

                    {/* Locations */}
                    <section className="mb-40">
                        <SpotlightCard className="py-20 px-10 md:px-20" spotlightColor="rgba(59, 130, 246, 0.2)">
                            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-16">
                                <div className="lg:col-span-1">
                                    <h2 className="text-white text-5xl font-black tracking-tighter uppercase italic mb-8">Global Footprint</h2>
                                    <p className="text-slate-300 font-medium leading-relaxed">Headquartered in Chennai and Hong Kong, serving global clients with local precision.</p>
                                </div>
                                <div className="lg:col-span-2 space-y-12">
                                    {locations.map(loc => (
                                        <div key={loc.type} className="space-y-4">
                                            <h4 className="text-blue-500 font-black uppercase tracking-widest text-xs opacity-80">{loc.type}</h4>
                                            <p className="text-white text-2xl font-bold tracking-tight group-hover:text-blue-200 transition-colors">{loc.address}</p>
                                        </div>
                                    ))}
                                    <div className="pt-8 text-slate-400 font-bold italic line-clamp-1 border-t border-white/5 opacity-80">
                                        Strategic operations in Hosur and Chennai.
                                    </div>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        </SpotlightCard>
                    </section>

                    {/* Quick Message to Our AI Team Section */}
                    <section id="contact-ai" className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-12"
                        >
                            <div className="space-y-6">
                                <h2 className="text-white text-5xl font-black tracking-tighter uppercase italic">Initiate AI Sync</h2>
                                <p className="text-slate-400 text-lg font-medium leading-relaxed">
                                    Our humans — assisted by very smart AI — are ready to chat. Whether you're interested in digital transformation, private server ecosystems, or next-gen automation, we're one signal away.
                                </p>
                            </div>

                            <div className="space-y-10">
                                <div className="flex items-start space-x-6 group">
                                    <div className="w-14 h-14 rounded-2xl bg-blue-600/20 flex items-center justify-center flex-shrink-0 text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-lg shadow-blue-600/10">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                    </div>
                                    <div>
                                        <p className="text-blue-500 font-black uppercase text-[10px] tracking-[0.3em] mb-2">Protocol: Email</p>
                                        <a href="mailto:info@techdlt.com" className="text-white text-2xl font-bold hover:text-blue-400 transition-colors tracking-tight italic">info@techdlt.com</a>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-6 group">
                                    <div className="w-14 h-14 rounded-2xl bg-blue-600/20 flex items-center justify-center flex-shrink-0 text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-lg shadow-blue-600/10">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
                                        <div>
                                            <p className="text-blue-500 font-black uppercase text-[10px] tracking-[0.3em] mb-2">Region: India</p>
                                            <p className="text-white text-xl font-bold tracking-tight">+91 99524 49499</p>
                                        </div>
                                        <div>
                                            <p className="text-blue-500 font-black uppercase text-[10px] tracking-[0.3em] mb-2">Region: Hong Kong</p>
                                            <p className="text-white text-xl font-bold tracking-tight">+852 6264 5265</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <SpotlightCard className="p-10" spotlightColor="rgba(59, 130, 246, 0.1)">
                                <h4 className="text-blue-500 font-black uppercase tracking-widest text-xs mb-4 italic opacity-80">Corporate Philosophy</h4>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    At Tech-DLT, we believe the future belongs to businesses that embrace innovation. We don’t just deliver software — we create intelligent ecosystems that help organizations innovate, automate, and outperform.
                                </p>
                            </SpotlightCard>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="relative z-10"
                        >
                            <SpotlightCard className="p-10 md:p-14 space-y-8 flex flex-col justify-center h-full" spotlightColor="rgba(59, 130, 246, 0.2)">
                                <div className="space-y-4 text-center lg:text-left">
                                    <h3 className="text-white text-3xl font-black italic uppercase tracking-tighter">Quick Message to Our AI Team</h3>
                                    <p className="text-blue-400 font-bold uppercase text-[10px] tracking-[0.2em] opacity-80">Bypass the noise. Connect to the core.</p>
                                </div>

                            {status === 'success' ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="h-full flex flex-col items-center justify-center p-12 bg-green-500/10 border border-green-500/20 rounded-[32px] text-center space-y-6"
                                >
                                    <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-600 text-4xl">
                                        ✅
                                    </div>
                                    <div>
                                        <h4 className="text-white text-2xl font-black italic mb-2">Message sent successfully!</h4>
                                        <p className="text-slate-300 font-medium">Our AI has notified the humans. Expect a reply soon.</p>
                                    </div>
                                </motion.div>
                            ) : (
                                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <input
                                            name="user_name"
                                            type="text"
                                            placeholder="Identity / Name"
                                            className="w-full bg-slate-800/50 border border-slate-700 p-5 rounded-2xl text-white focus:border-blue-500 outline-none transition-all placeholder:text-slate-500 font-bold text-sm"
                                        />
                                        <input
                                            name="user_email"
                                            type="email"
                                            placeholder="Sync / Email"
                                            className="w-full bg-slate-800/50 border border-slate-700 p-5 rounded-2xl text-white focus:border-blue-500 outline-none transition-all placeholder:text-slate-500 font-bold text-sm"
                                        />
                                    </div>
                                    <textarea
                                        name="message"
                                        placeholder="Transmission Details / Your Message"
                                        rows={5}
                                        className="w-full bg-slate-800/50 border border-slate-700 p-5 rounded-2xl text-white focus:border-blue-500 outline-none transition-all placeholder:text-slate-500 font-bold text-sm resize-none"
                                    ></textarea>
                                    <button
                                        type="submit"
                                        className="w-full py-6 bg-blue-600 text-white font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-white hover:text-blue-600 transition-all shadow-2xl shadow-blue-600/20 active:scale-95 text-xs"
                                    >
                                        Transmit Pulse
                                    </button>
                                    </form>
                                )}
                            </SpotlightCard>
                        </motion.div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default AboutPage;
