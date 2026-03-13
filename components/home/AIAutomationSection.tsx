'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import CinematicTechCard from '@/components/home/CinematicTechCard';

const AIAutomationSection = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const yVal1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const yVal2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

    return (
        <section ref={sectionRef} className="min-h-screen relative bg-transparent py-32 px-6 overflow-hidden flex items-center">
            <div className="container mx-auto max-w-7xl relative">

                {/* Background Assistant Visual Container - Unified Static Style */}
                <div className="absolute inset-0 flex items-center justify-center opacity-5 lg:opacity-10 pointer-events-none">
                    <motion.div
                        style={{ y: yVal1 }}
                        className="relative z-0 text-[400px] leading-none text-white font-thin select-none"
                    >
                        ΛI
                    </motion.div>
                </div>

                <div className="relative z-10 text-center flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="mb-14"
                    >
                        <span className="text-blue-500 font-bold tracking-[0.4em] uppercase text-xs mb-8 block">
                            Automation Systems
                        </span>
                        <h2 className="text-white text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-10 uppercase">
                            Amplify <br />
                            <span className="text-blue-600">Human Potential.</span>
                        </h2>
                    </motion.div>

                    {/* Technical Panel System */}
                    <div className="relative w-full max-w-5xl mt-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        {/* Left: Card Architecture */}
                        <motion.div
                            style={{ y: yVal1 }}
                            className="relative"
                        >
                            <CinematicTechCard
                                type="humanoid"
                                label="Autonomous Agents"
                                description="AI that acts, adapts, and evolves with your enterprise growth."
                                align="left"
                                imageSrc="/images/automation-systems.png"
                            />
                        </motion.div>

                        {/* Right: Visionary Statement */}
                        <motion.div
                            style={{ y: yVal2 }}
                            className="text-left md:pl-10"
                        >
                            <p className="text-slate-400 text-xl md:text-3xl font-medium leading-relaxed border-l-4 border-blue-600 pl-10">
                                "Our AI solutions don&apos;t just replace tasks; they <span className="text-white">accelerate the velocity</span> of your entire organization."
                            </p>

                            <div className="mt-12 flex items-center gap-6">
                                <div className="h-[1px] w-12 bg-blue-600" />
                                <div className="text-[10px] font-bold text-slate-500 tracking-[0.4em] uppercase">Operational Excellence Protocol</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Background Decoration - RESTORED CINEMATIC GLOWS */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[150px] -z-10 animate-glow-pulse-slow" />
        </section>
    );
};

export default AIAutomationSection;
