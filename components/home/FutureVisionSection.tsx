'use client';

import { motion } from 'framer-motion';

const FutureVisionSection = () => {
    return (
        <section className="min-h-screen relative bg-transparent flex flex-col items-center justify-center py-24 px-6 overflow-hidden">
            <div className="container mx-auto max-w-7xl relative z-10 text-center">

                {/* Technical Structural Line - Unified Blue Style */}
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 3, ease: "easeOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-600/30 to-transparent -z-10"
                />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="text-slate-500 font-bold tracking-[0.8em] uppercase text-[10px] mb-12 block">
                        Final Revelation
                    </span>

                    <h2 className="text-white text-6xl md:text-8xl lg:text-[9rem] font-black tracking-tighter leading-[0.9] mb-12 uppercase italic">
                        The future <br />
                        <span className="text-blue-600">isn&apos;t coming.</span>
                    </h2>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.6 }}
                        transition={{ duration: 2, delay: 1 }}
                        className="text-slate-400 text-2xl md:text-3xl font-light tracking-[0.4em] uppercase"
                    >
                        It is already here.
                    </motion.div>
                </motion.div>

                {/* Gateway Structural Blueprint - Unified Style */}
                <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ duration: 2, delay: 0.5 }}
                    className="mt-32 w-px h-64 bg-gradient-to-b from-blue-600/60 to-transparent mx-auto relative"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 border border-blue-500/60 rotate-45 bg-[#020409]" />
                </motion.div>
            </div>

            {/* Background Decoration - RESTORED CINEMATIC GLOWS */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-600/5 rounded-full blur-[200px] -z-10 animate-glow-pulse-slow" />
        </section>
    );
};

export default FutureVisionSection;
