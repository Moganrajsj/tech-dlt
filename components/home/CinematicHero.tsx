'use client';

import { motion } from 'framer-motion';
import ThreadsBackground from '@/components/animations/ThreadsBackground';

const HologramBackground = () => {
    return (
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
            {/* Soft Radial Center Glow */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)'
                }}
            />

            {/* Subtle Circuit/Node Pattern Overlay */}
            <svg width="100%" height="100%" className="absolute inset-0 opacity-[0.02] text-blue-500">
                <pattern id="circuitPattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                    <path d="M 0 100 H 40 M 60 100 H 100 M 100 100 V 60 M 100 40 V 0 M 100 100 L 140 140 M 160 160 L 200 200" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="50" cy="100" r="2" fill="currentColor" />
                    <circle cx="100" cy="50" r="2" fill="currentColor" />
                    <circle cx="150" cy="150" r="2" fill="currentColor" />
                    <path d="M 200 100 H 160 M 140 100 H 100" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#circuitPattern)" />
            </svg>

            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.005),rgba(0,0,255,0.01))] bg-[size:100%_4px,3px_100%] pointer-events-none opacity-[0.02]" />
        </div>
    );
};

const CinematicHero = () => {
    return (
        <section className="min-h-screen relative flex items-center justify-center pt-20 overflow-hidden bg-[#05070a]">
            {/* Dynamic Background Video */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover opacity-60"
                >
                    <source src="/videos/hero-home.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-[#02040a]/40 backdrop-blur-[1px]" />
            </div>

            {/* Cinematic Threads Layer */}
            <ThreadsBackground />

            {/* Hologram Overlay Layer */}
            <HologramBackground />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center"
                >
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-blue-500 font-bold tracking-[0.5em] uppercase text-xs mb-8 block"
                    >
                        Intelligence Redefined
                    </motion.span>

                    <h1 className="text-white text-6xl md:text-9xl font-black tracking-tighter leading-[0.9] mb-12 uppercase">
                        Transcending <br />
                        <span className="text-blue-600">Innovation.</span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.8 }}
                        className="text-slate-400 text-lg md:text-xl font-medium tracking-widest max-w-3xl mx-auto mb-16 uppercase leading-relaxed text-center"
                    >
                        Architecting high-performance digital neural networks <br className="hidden md:block" /> for the elite intelligence era.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.2 }}
                    >
                        <button 
                            className="px-12 py-4 border border-blue-600 text-blue-600 font-black uppercase tracking-[0.3em] hover:bg-blue-600 hover:text-white transition-all rounded-full shadow-lg shadow-blue-500/20 bg-black/20 backdrop-blur-sm relative z-20"
                            suppressHydrationWarning
                        >
                            Challenge Us
                        </button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30 z-10">
                <div className="w-px h-16 bg-gradient-to-b from-blue-600 to-transparent" />
                <span className="text-blue-600 text-[10px] uppercase tracking-[0.4em] font-bold">Scroll</span>
            </div>
        </section>
    );
};

export default CinematicHero;
