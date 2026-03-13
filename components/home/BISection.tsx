'use client';

import { motion } from 'framer-motion';
import CinematicTechCard from '@/components/home/CinematicTechCard';

const features = [
    {
        title: "Predictive Analytics",
        detail: "ML-driven foresight that anticipates market shifts before they occur.",
        icon: (
            <svg viewBox="0 0 100 100" className="w-10 h-10">
                <path d="M 10 80 Q 30 20 50 50 T 90 10" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="90" cy="10" r="4" fill="currentColor" />
                <path d="M 10 80 H 90 M 10 10 V 80" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            </svg>
        ),
        color: "text-white"
    },
    {
        title: "Real-time Sync",
        detail: "Instant data propagation across your entire global architecture.",
        icon: (
            <svg viewBox="0 0 100 100" className="w-10 h-10">
                <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 5" />
                <path d="M 50 15 V 35 M 50 65 V 85 M 15 50 H 35 M 65 50 H 85" stroke="currentColor" strokeWidth="2" />
                <circle cx="50" cy="50" r="5" fill="currentColor" />
            </svg>
        ),
        color: "text-white"
    },
    {
        title: "Intelligent Logic",
        detail: "Autonomous decision-making engines that optimize operational flow.",
        icon: (
            <svg viewBox="0 0 100 100" className="w-10 h-10">
                <rect x="30" y="30" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M 50 10 V 30 M 50 70 V 90 M 10 50 H 30 M 70 50 H 90" stroke="currentColor" strokeWidth="2" />
                <circle cx="50" cy="50" r="8" stroke="currentColor" fill="none" />
            </svg>
        ),
        color: "text-white"
    }
];

const BISection = () => {
    return (
        <section className="min-h-screen relative bg-transparent py-32 px-6 overflow-hidden">
            <div className="container mx-auto max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-20 items-center mb-32">
                    {/* Left: Content */}
                    <div className="lg:w-2/5">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-blue-500 font-bold tracking-[0.4em] uppercase text-xs mb-8 block"
                        >
                            01 — Strategic Intelligence
                        </motion.span>

                        <h2 className="text-white text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] mb-8 uppercase">
                            See your business <br />
                            <span className="text-blue-600">in real time.</span>
                        </h2>

                        <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed mb-10 max-w-md border-l-2 border-slate-800 pl-8">
                            Our holographic dashboard systems provide a complete 360-degree view of your operational architecture.
                        </p>
                    </div>

                    {/* Right: Technical Dashboard Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="lg:w-3/5 relative w-full"
                    >
                        <CinematicTechCard
                            type="dashboard"
                            label="Enterprise Dashboard"
                            description="Real-time strategic oversight with advanced telemetry."
                            align="left"
                            className="h-[600px]"
                            imageSrc="/images/strategic-intelligence.png"
                        />
                    </motion.div>
                </div>

                {/* Bottom: Feature Cards - Unified Style */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className="relative h-full p-10 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-2xl hover:border-blue-500/50 transition-all duration-500 shadow-2xl shadow-black/80 group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className={`text-4xl mb-8 ${item.color} group-hover:text-blue-500 transition-colors duration-500`}>
                                {item.icon}
                            </div>
                            <h3 className="text-white text-2xl font-black mb-4 uppercase tracking-tighter group-hover:text-blue-400 transition-colors">{item.title}</h3>
                            <p className="text-slate-400 font-medium text-base leading-relaxed group-hover:text-white transition-colors">{item.detail}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background Decoration - RESTORED CINEMATIC GLOWS */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10 animate-glow-drift" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-400/5 rounded-full blur-[100px] -z-10 animate-glow-drift" />
        </section>
    );
};

export default BISection;
