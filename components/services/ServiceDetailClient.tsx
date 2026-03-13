'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ServiceDetailClient({ service }: { service: any }) {
    if (!service) return null;

    return (
        <main className="min-h-screen relative bg-black pt-32 pb-20 overflow-hidden">
            {/* Dynamic Cinematic Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${service.imageGradient} opacity-20 pointer-events-none transition-all duration-1000`} />
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 pointer-events-none mix-blend-overlay" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <Link href="/services" className="text-slate-400 hover:text-white transition-colors uppercase text-xs tracking-[0.2em] flex items-center gap-2">
                        ← Back to Services
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <div className="flex flex-col justify-center">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-blue-500 font-bold tracking-[0.5em] uppercase text-xs mb-8 block"
                        >
                            {service.tag}
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 1 }}
                            className="text-white text-5xl md:text-7xl font-black tracking-tighter leading-none mb-10 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-slate-500"
                        >
                            {service.title}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-slate-300 text-xl leading-relaxed mb-12"
                        >
                            {service.fullDesc}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Link href="/contact" className="inline-block px-12 py-5 bg-blue-600 text-white font-black uppercase tracking-[0.3em] rounded-full hover:bg-white hover:text-blue-900 transition-all shadow-xl shadow-blue-600/20">
                                {service.cta}
                            </Link>
                        </motion.div>
                    </div>

                    <div className="relative">
                        {/* Feature Highlights */}
                        <div className="space-y-6 mt-10 lg:mt-0">
                            {service.features?.map((feature: string, i: number) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + (i * 0.1) }}
                                    className="glass-card p-8 border-l-4 border-blue-500/50 bg-white/5 backdrop-blur-md"
                                >
                                    <h3 className="text-white text-xl font-bold tracking-tight">{feature}</h3>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
