'use client';

import { motion } from 'framer-motion';
import CinematicTechCard from '@/components/home/CinematicTechCard';

const ConversationalAISection = () => {
    return (
        <section className="min-h-screen relative bg-transparent flex items-center justify-center py-32 px-6 overflow-hidden">
            <div className="container mx-auto max-w-7xl relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    {/* Left: Technical Frequency Visual - Unified Glass Style */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2 }}
                        className="order-2 lg:order-1 relative"
                    >
                        {/* Frequency Analysis Container */}
                        <div className="relative">
                            <CinematicTechCard
                                type="automation"
                                label="Natural Intelligence"
                                description="Deep-linguistic neural processing for human-level dialogue."
                                align="left"
                                className="h-[500px]"
                                imageSrc="/images/natural-intelligence.png"
                            />
                        </div>
                    </motion.div>

                    {/* Right: Content */}
                    <div className="order-1 lg:order-2">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-blue-500 font-bold tracking-[0.4em] uppercase text-xs mb-8 block"
                        >
                            Natural Intelligence
                        </motion.span>

                        <h2 className="text-white text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-10 leading-[0.95] uppercase">
                            Conversations <br /> that <span className="text-blue-600">never sleep.</span>
                        </h2>

                        <p className="text-slate-400 text-xl font-medium mb-12 leading-relaxed max-w-xl border-l-2 border-slate-800 pl-10">
                            Deploy high-performance conversational neural networks that engage with the fluidity and intelligence of a human expert, 24/7.
                        </p>

                        <div className="space-y-6">
                            {[
                                "Omnichannel Neural Sync",
                                "Zero-Latency Realtime Response",
                                "Advanced Sentiment Logic"
                            ].map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.5 + (i * 0.1) }}
                                    className="flex items-center gap-6 text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em] group hover:text-blue-400 transition-all duration-300"
                                >
                                    <div className="w-12 h-[1px] bg-slate-800 group-hover:bg-blue-600 group-hover:w-16 transition-all duration-500" />
                                    {feature}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Decoration - RESTORED CINEMATIC GLOWS */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[160px] -z-10 animate-glow-drift" />
            <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[120px] -z-10 animate-glow-drift-reverse" />
        </section>
    );
};

export default ConversationalAISection;
