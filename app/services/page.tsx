'use client';

import { motion } from 'framer-motion';
import { services } from '@/data/services'; // Import shared data
import Link from 'next/link';
import { transitions, CHOREOGRAPHY, DURATIONS } from '@/data/motion';
import dynamic from 'next/dynamic';



// Reusing the precise Cinematic Card Component
const ServiceCard = ({ item, index }: { item: any, index: number }) => {
    return (
        <Link href={`/services/${item.slug}`}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...transitions.standard, delay: index * CHOREOGRAPHY.STAGGER_FAST }}
                className="group relative h-[450px] w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-900 hover:border-blue-500/50 transition-all duration-500 cursor-pointer shadow-2xl"
            >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={item.imageUrl}
                        alt={item.title}
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.opacity = '0';
                        }}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    {/* Cinematic Overlay - Exactly as requested */}
                    <div
                        className="absolute inset-0 z-[1]"
                        style={{
                            background: 'linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0.15))'
                        }}
                    />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-[2]">
                    <div className="mb-auto flex justify-between items-start">
                        <span className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-blue-400 border border-blue-500/30 rounded-full bg-slate-900/80 backdrop-blur-md shadow-lg">
                            {item.tag}
                        </span>
                        <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6] animate-pulse" />
                    </div>

                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none mb-4 group-hover:text-blue-400 transition-colors drop-shadow-2xl">
                        {item.title}
                    </h3>

                    <p className="text-white opacity-90 text-sm font-medium mb-8 max-w-[90%] leading-relaxed">
                        {item.desc}
                    </p>

                    <div className="flex items-center justify-between border-t border-white/10 pt-6">
                        <span className="text-white text-xs font-black uppercase tracking-[0.2em] group-hover:translate-x-2 transition-transform">
                            View Module
                        </span>
                        <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300 group-hover:scale-110 shadow-lg group-hover:shadow-blue-500/50">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

const ServicesPage = () => {
    return (
        <div className="relative min-h-screen overflow-hidden">


            <main className="relative z-10 bg-transparent pt-32 pb-20">
                <div className="container mx-auto px-6">

                    {/* Cinematic Header */}
                    <section className="min-h-[50vh] flex flex-col items-center justify-center text-center mb-20">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={transitions.standard}
                            className="text-blue-500 font-bold tracking-[0.5em] uppercase text-xs mb-8 block"
                        >
                            The Engine
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                ...transitions.standard,
                                delay: CHOREOGRAPHY.STAGGER_MEDIUM,
                                duration: DURATIONS.SLOW
                            }}
                            className="text-white text-6xl md:text-9xl font-black tracking-tighter leading-none"
                        >
                            Capabilities <br />
                            <span className="text-blue-600">& Power.</span>
                        </motion.h1>
                    </section>

                    {/* Service Categories */}
                    <div className="space-y-32">
                        {services.map((cat, catIndex) => (
                            <div key={catIndex}>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-4 mb-12"
                                >
                                    <div className="h-[2px] w-12 bg-blue-600" />
                                    <h2 className="text-white text-2xl font-black uppercase tracking-widest">{cat.category}</h2>
                                </motion.div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {cat.items.map((item, i) => (
                                        <ServiceCard key={i} item={item} index={i} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Final Connect Block */}
                    <section className="mt-40 text-center">
                        <h2 className="text-white text-4xl font-black uppercase tracking-tighter mb-8">
                            Don't see what you need?
                        </h2>
                        <p className="text-slate-400 mb-12 max-w-xl mx-auto">
                            We architect custom intelligent ecosystems for unique enterprise challenges.
                        </p>
                        <Link href="/contact" className="inline-block px-12 py-4 border border-blue-500 text-blue-500 font-black uppercase tracking-[0.3em] hover:bg-blue-600 hover:text-white transition-all rounded-full">
                            Challenge Us
                        </Link>
                    </section>
                </div>
            </main >
        </div >
    );
};

export default ServicesPage;
