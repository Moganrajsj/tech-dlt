'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const FinalCTASection = () => {
    return (
        <section className="min-h-screen relative bg-transparent flex flex-col items-center justify-center py-40 px-6 overflow-hidden">

            <div className="container mx-auto max-w-5xl relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-white text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-12 uppercase">
                        Ready to <br /><span className="text-blue-600">transform?</span>
                    </h2>

                    <p className="text-slate-400 text-xl md:text-2xl font-medium mb-16 max-w-2xl mx-auto leading-relaxed border-l-4 border-blue-600 pl-10">
                        Join the elite organizations worldwide leveraging Tech-DLT to architect the next generation of business intelligence.
                    </p>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block"
                    >
                        <Link href="/contact" className="inline-block px-16 py-6 border-2 border-blue-600 text-blue-600 font-black uppercase tracking-[0.4em] hover:bg-blue-600 hover:text-white transition-all rounded-full shadow-lg shadow-blue-500/20">
                            Initiate Integration
                        </Link>
                    </motion.div>

                    <div className="mt-40 flex flex-wrap justify-center gap-16 opacity-10">
                        {['TECH-DLT', 'CORE-SYNC', 'NEURAL-LINK', 'SECURE-GATE'].map((tag, i) => (
                            <span key={i} className="text-white text-[10px] font-bold tracking-[0.5em] uppercase">{tag}</span>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Subtle Gradient Finish */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-600/20 to-transparent -z-10" />
        </section>
    );
};

export default FinalCTASection;
