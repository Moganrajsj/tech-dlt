'use client';

import { motion } from 'framer-motion';
import CinematicTechCard from '@/components/home/CinematicTechCard';

const SolutionSection = () => {
    return (
        <section className="min-h-screen relative bg-transparent flex items-center py-32 px-6 overflow-hidden">
            <div className="container mx-auto max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    {/* Left: Content */}
                    <div className="relative z-10 w-full">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-blue-500 font-bold tracking-[0.4em] uppercase text-xs mb-10 block"
                        >
                            The Transformation
                        </motion.span>

                        <div className="relative mb-12">
                            <h2 className="text-white text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] uppercase">
                                Tech-DLT transforms <br />
                                <span className="text-blue-600">complexity into clarity.</span>
                            </h2>
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="text-slate-400 text-xl font-medium max-w-xl leading-relaxed border-l-2 border-slate-800 pl-10 mb-14"
                        >
                            We architect high-performance digital neural networks that unify fragmented ecosystems into a single, intelligent flow.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex items-center gap-8"
                        >
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-14 h-14 rounded-full border border-white/10 bg-slate-900 flex items-center justify-center text-[10px] text-slate-500 font-bold hover:border-blue-500/40 transition-colors">
                                        <span>0{i}</span>
                                    </div>
                                ))}
                            </div>
                            <span className="text-slate-500 font-bold tracking-[0.2em] text-[10px] uppercase">Global Engineering Standards</span>
                        </motion.div>
                    </div>

                    {/* Right: Technical Transformation Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className="relative hidden lg:block"
                    >
                        <CinematicTechCard
                            type="automation"
                            label="Autonomous Logic"
                            description="Architecting the digital future with precision automation."
                            align="right"
                            className="h-[600px]"
                            videoSrc="/videos/whisk-tech.mp4"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Background Decoration - RESTORED CINEMATIC GLOWS */}
            <div className="absolute top-1/4 right-0 w-[700px] h-[700px] bg-blue-600/5 rounded-full blur-[140px] -z-10 animate-glow-shift-1" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-[110px] -z-10 animate-glow-drift" />
        </section>
    );
};

export default SolutionSection;
