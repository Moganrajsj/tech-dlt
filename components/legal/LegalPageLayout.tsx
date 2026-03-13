'use client';

import { motion } from 'framer-motion';
import { transitions, CHOREOGRAPHY, DURATIONS } from '@/data/motion';

interface LegalPageLayoutProps {
    title: string;
    lastUpdated: string;
    children: React.ReactNode;
}

const LegalPageLayout = ({ title, lastUpdated, children }: LegalPageLayoutProps) => {
    return (
        <main className="min-h-screen bg-transparent pt-40 pb-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...transitions.standard, duration: DURATIONS.SLOW }}
                    className="text-center mb-16"
                >
                    <span className="text-blue-500 font-bold tracking-[0.5em] uppercase text-xs mb-6 block">
                        Legal Documentation
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 uppercase italic">
                        {title}
                    </h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">
                        Last updated: {lastUpdated}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...transitions.standard, delay: CHOREOGRAPHY.STAGGER_MEDIUM }}
                    className="glass-card p-10 md:p-16 border-white/5 bg-slate-950/40 text-left"
                >
                    <div className="space-y-8 text-slate-400 font-medium leading-relaxed
                        [&>h2]:text-white [&>h2]:text-3xl [&>h2]:font-black [&>h2]:italic [&>h2]:tracking-tighter [&>h2]:uppercase [&>h2]:mt-12 [&>h2]:mb-6
                        [&>p]:mb-4
                        [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-3
                        [&>ul>li>strong]:text-blue-400 [&>ul>li>strong]:font-black
                        [&>p>strong]:text-blue-400 [&>p>strong]:font-black
                    ">
                        {children}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-12 text-center"
                >
                    <p className="text-slate-600 text-sm font-bold uppercase tracking-[0.2em]">
                        Contact: <a href="mailto:info@techdlt.com" className="text-blue-500 hover:text-white transition-colors">info@techdlt.com</a>
                    </p>
                </motion.div>
            </div>
        </main>
    );
};

export default LegalPageLayout;
