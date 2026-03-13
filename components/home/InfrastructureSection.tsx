'use client';

import { motion } from 'framer-motion';
import CinematicTechCard from '@/components/home/CinematicTechCard';

const specs = [
    { title: "Military-Grade", detail: "End-to-end encryption standards for mission-critical operations." },
    { title: "Zero Latency", detail: "High-performance edge-computing response architecture." },
    { title: "99.9% Uptime", detail: "Fault-tolerant systems with global redundancy protocols." },
    { title: "Neural Shield", detail: "Proactive AI-driven threat detection and real-time security." }
];

const InfrastructureSection = () => {
    return (
        <section className="min-h-screen relative bg-transparent py-32 px-6 overflow-hidden flex items-center">
            <div className="container mx-auto max-w-7xl relative">

                {/* Background Pattern Accent - Unified Style */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[700px] pointer-events-none opacity-10">
                    <div className="w-full h-full border border-blue-500/10 rounded-[5rem] grid grid-cols-6 grid-rows-6">
                        {[...Array(36)].map((_, i) => (
                            <div key={i} className="border border-blue-500/5 flex items-center justify-center">
                                <div className="w-1 h-1 rounded-full bg-blue-500/10" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 text-center mb-32">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-blue-500 font-bold tracking-[0.4em] uppercase text-xs mb-10 block"
                    >
                        Core Stability
                    </motion.span>
                    <h2 className="text-white text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-12 uppercase">
                        Powerful. <span className="text-blue-600">Stable.</span> Secure.
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Left: Spec Cards - Unified Glass Style */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {specs.map((spec, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className="bg-slate-900/40 border border-white/10 p-10 rounded-3xl group hover:border-blue-500/50 backdrop-blur-xl transition-all duration-500"
                            >
                                <div className="h-1 w-12 bg-blue-600 mb-8 group-hover:w-full transition-all duration-700" />
                                <h3 className="text-white text-xl font-black mb-4 uppercase tracking-tighter group-hover:text-blue-400 transition-colors">{spec.title}</h3>
                                <p className="text-slate-400 text-sm font-medium leading-relaxed group-hover:text-white transition-colors">{spec.detail}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right: Technical Visual Core */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2 }}
                        className="relative h-[600px] flex items-center justify-center"
                    >
                        <CinematicTechCard
                            type="infrastructure"
                            label="Fortified Core"
                            description="Military-grade server infrastructure for the modern intelligent enterprise."
                            align="right"
                            imageSrc="/images/core-stability.png"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Background Decoration - RESTORED CINEMATIC GLOWS */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[180px] -z-10 animate-glow-drift" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[140px] -z-10 animate-glow-drift-reverse" />
        </section>
    );
};

export default InfrastructureSection;
