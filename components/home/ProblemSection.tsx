'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const problems = [
    {
        title: "Data Fragmentation",
        description: "Fragmented systems lead to operational blind spots. We unify dispersed data into a single, cohesive neural flow.",
        image: "/images/home/data-fragmentation.png",
        icon: (
            <svg viewBox="0 0 100 100" className="w-16 h-16">
                <rect x="20" y="20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <rect x="60" y="20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <rect x="40" y="60" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path d="M 40 30 H 60 M 30 40 V 60 M 70 40 V 60" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
        ),
    },
    {
        title: "Latency Bottlenecks",
        description: "Seconds of delay result in millions of lost opportunity. Our core-sync engines operate at near-zero latency.",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200",
        icon: (
            <svg viewBox="0 0 100 100" className="w-16 h-16">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="180 180" />
                <path d="M 50 20 V 50 L 70 70" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="50" cy="50" r="4" fill="currentColor" />
            </svg>
        ),
    },
    {
        title: "Scalability Limits",
        description: "Rigid architectures crumble under growth. We design elastic digital ecosystems that expand with your vision.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
        icon: (
            <svg viewBox="0 0 100 100" className="w-16 h-16">
                <path d="M 10 90 L 40 60 M 40 60 H 25 M 40 60 V 75" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M 40 60 L 90 10 M 90 10 H 70 M 90 10 V 30" fill="none" stroke="currentColor" strokeWidth="2" />
                <rect x="10" y="70" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            </svg>
        ),
    },
];

const ProblemSection = () => {
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: false
    });

    return (
        <section className="min-h-screen relative bg-transparent py-32 px-6" ref={ref}>
            <div className="container mx-auto max-w-7xl">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-32"
                >
                    <span className="text-blue-500 font-bold tracking-[0.4em] uppercase text-xs mb-8 block">
                        The Challenge
                    </span>
                    <h2 className="text-white text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] mb-6 uppercase">
                        Modern businesses face
                        <br />
                        <span className="text-blue-600">unprecedented complexity</span>
                    </h2>
                </motion.div>

                {/* Problem Cards Grid - Unified Style */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {problems.map((problem, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="group relative h-full"
                        >
                            {/* Unified Glass Card */}
                            <div className="relative h-full bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 overflow-hidden hover:border-blue-500/50 transition-all duration-500 shadow-2xl shadow-black/80 flex flex-col justify-between group">
                                {problem.image && (
                                    <>
                                        <img 
                                            src={problem.image as string} 
                                            alt={problem.title} 
                                            className="absolute inset-0 w-full h-full object-cover z-0 opacity-20 group-hover:opacity-40 transition-all duration-700 group-hover:scale-110" 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent z-0" />
                                    </>
                                )}

                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                                {/* Icon Container */}
                                <div className="relative mb-10 h-16 flex items-start justify-start text-slate-500 group-hover:text-blue-500 transition-colors duration-500 z-10">
                                    <span className="w-16 h-16 opacity-60 group-hover:opacity-100 transition-opacity">
                                        {problem.icon}
                                    </span>

                                    {/* Numbering - Services Style */}
                                    <span className="absolute top-0 right-0 text-7xl font-black text-white/[0.02] group-hover:text-blue-500/[0.05] transition-colors pointer-events-none uppercase">
                                        0{index + 1}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="relative z-10">
                                    <h3 className="text-white text-2xl font-black mb-6 uppercase tracking-tighter group-hover:text-blue-400 transition-colors">
                                        {problem.title}
                                    </h3>
                                    <p className="text-slate-400 text-lg leading-relaxed font-medium group-hover:text-white transition-colors">
                                        {problem.description}
                                    </p>
                                </div>

                                {/* Subtle Technical Finish */}
                                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background Decoration - RESTORED CINEMATIC GLOWS */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -z-10 animate-glow-drift" />
            <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[100px] -z-10 animate-glow-drift-reverse" />
        </section>
    );
};

export default ProblemSection;
