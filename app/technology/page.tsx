'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { transitions, CHOREOGRAPHY, DURATIONS } from '@/data/motion';
import dynamic from 'next/dynamic';



const SectionHeader = ({ title, subtitle, light = true }: { title: string, subtitle: string, light?: boolean }) => {
    return (
        <div className="mb-16">
            <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`text-blue-500 font-black text-xs uppercase tracking-[0.4em] mb-4 block`}
            >
                {subtitle}
            </motion.span>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`text-4xl md:text-5xl lg:text-6xl font-black ${light ? 'text-white' : 'text-slate-900'} tracking-tighter leading-none`}
            >
                {title}
            </motion.h2>
        </div>
    );
};

const ArchitectureCard = ({ title, desc, index, bgImage }: { title: string, desc: string, index: number, bgImage?: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...transitions.standard, delay: index * CHOREOGRAPHY.STAGGER_FAST }}
            className={`group p-10 rounded-[40px] shadow-xl border transition-all duration-500 hover:translate-y-[-8px] hover:shadow-2xl relative overflow-hidden flex flex-col justify-end ${bgImage ? 'min-h-[320px] border-slate-800' : 'bg-white border-slate-100'}`}
        >
            {bgImage && (
                <>
                    <img src={bgImage} alt={title} className="absolute inset-0 w-full h-full object-cover z-0 opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-[1s] ease-in-out" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-[#0a0f1d]/80 to-transparent z-0"></div>
                </>
            )}
            <div className="relative z-10 mt-auto pt-8">
                <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mb-8 transition-all duration-500 group-hover:w-full" />
                <h3 className={`text-2xl font-black mb-4 tracking-tighter uppercase ${bgImage ? 'text-white' : 'text-[#111111]'}`}>{title}</h3>
                <p className={`font-medium leading-relaxed ${bgImage ? 'text-slate-300' : 'text-[#333333]'}`}>{desc}</p>
            </div>
        </motion.div>
    );
};

const TechPillar = ({ category, items }: { category: string, items: { name: string, desc: string }[] }) => {
    return (
        <div className="space-y-8">
            <h3 className="text-blue-500 font-black text-xs uppercase tracking-[0.3em] pl-4 border-l-2 border-blue-500 mb-10">
                {category}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ ...transitions.standard, delay: i * CHOREOGRAPHY.STAGGER_FAST }}
                        className="relative group cursor-default"
                    >
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 group-hover:border-blue-500/50 group-hover:bg-blue-50 transition-all duration-300 shadow-sm group-hover:shadow-md">
                            <span className="text-[#111111] font-bold text-sm text-center block group-hover:text-blue-600 transition-colors">
                                {item.name}
                            </span>
                        </div>
                        {/* Tooltip-style Hover Description */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 p-4 bg-blue-600 text-white text-xs rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none shadow-2xl transform translate-y-2 group-hover:translate-y-0 text-center">
                            {item.desc}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-blue-600" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const TechnologyPage = () => {
    const techStack = [
        {
            category: "Frontend Engineering",
            items: [
                { name: "React.js", desc: "Component-based UI library for powerful web applications." },
                { name: "Next.js", desc: "Full-stack framework for production-grade React apps." },
                { name: "TypeScript", desc: "Type-safe scalability for mission-critical code." },
                { name: "Tailwind CSS", desc: "Utility-first styling for precise design control." },
                { name: "Framer Motion", desc: "Production-ready motion library for cinematic UI." },
                { name: "GSAP", desc: "Professional scroll and timeline-based animations." },
                { name: "Three.js", desc: "3D graphics engine for immersive web experiences." },
                { name: "React Three Fiber", desc: "Declarative Three.js for flexible 3D pipelines." }
            ]
        },
        {
            category: "Backend & APIs",
            items: [
                { name: "Node.js", desc: "High-performance JavaScript runtime for server-side logic." },
                { name: "Python", desc: "Primary language for data science and AI workloads." },
                { name: "Express.js", desc: "Minimalist web framework for lightning-fast APIs." },
                { name: "FastAPI", desc: "Modern, high-performance Python framework for AI APIs." },
                { name: "GraphQL", desc: "Client-specific data fetching for complex frontends." },
                { name: "REST APIs", desc: "Standardized communication for universal connectivity." },
                { name: "WebSockets", desc: "Real-time, bi-directional event-driven communication." },
                { name: "Microservices", desc: "Decoupled architecture for independent component scaling." }
            ]
        },
        {
            category: "Cloud & Infrastructure",
            items: [
                { name: "AWS", desc: "Global cloud infrastructure for limitless scalability." },
                { name: "Microsoft Azure", desc: "Enterprise cloud services for integrated ecosystems." },
                { name: "Google Cloud", desc: "Specialized infrastructure for Big Data and ML." },
                { name: "Docker", desc: "Containerization for consistent deployment environments." },
                { name: "Kubernetes", desc: "Orchestration for automated container management." },
                { name: "Terraform", desc: "Infrastructure as Code for predictable environment setup." },
                { name: "CI/CD", desc: "Automated pipelines for continuous delivery and integration." },
                { name: "Edge Computing", desc: "Low-latency processing closer to the source." }
            ]
        },
        {
            category: "AI & Data Engineering",
            items: [
                { name: "TensorFlow", desc: "End-to-end platform for machine learning models." },
                { name: "PyTorch", desc: "Dynamic computation graph for advanced AI research." },
                { name: "OpenAI APIs", desc: "Large Language Model integration for intelligent agents." },
                { name: "LangChain", desc: "Framework for building sophisticated LLM applications." },
                { name: "ML Pipelines", desc: "Automated workflows for model training and deployment." },
                { name: "AI Agents", desc: "Autonomous software entities for task completion." },
                { name: "Automation", desc: "System-wide intelligence for operational efficiency." },
                { name: "Neural Networks", desc: "Deep learning architectures for pattern recognition." }
            ]
        }
    ];

    const architectureGrid = [
        { title: "Private Servers", desc: "Dedicated bare-metal performance with complete data sovereignty and isolation.", bgImage: "/images/technology/private-server.png" },
        { title: "Distributed Core", desc: "Multi-region processing hub ensuring zero latency for global enterprise users.", bgImage: "/images/technology/distributed-core.png" },
        { title: "Secure Mesh", desc: "Zero-trust network architecture with end-to-end encrypted neural pathways.", bgImage: "/images/technology/secure-mesh.png" },
        { title: "AI Infrastructure", desc: "GPU-accelerated clusters optimized specifically for large-scale model inference.", bgImage: "/images/technology/ai-infrastructure.png" },
        { title: "Cloud Architecture", desc: "Hybrid-cloud strategy combining AWS scalability with private data centers.", bgImage: "/images/technology/cloud-architecture.png" },
        { title: "Data Pipelines", desc: "High-throughput streaming architectures for real-time predictive analytics.", bgImage: "/images/technology/data-pipelines.png" }
    ] as const;

    return (
        <div className="relative min-h-screen overflow-hidden text-white">


            <main className="relative z-10 bg-transparent">
                {/* Cinematic Background Overlay */}
                <div className="fixed inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 pointer-events-none z-[-1]" />

                <div className="container mx-auto px-6 max-w-7xl">
                    {/* 1. Hero Section */}
                    <section className="min-h-[70vh] flex flex-col items-center justify-center text-center pt-20">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-blue-500 font-bold tracking-[0.4em] uppercase text-xs mb-8 block"
                        >
                            Engineering Protocol 4.0
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 1.2 }}
                            className="text-white text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-12"
                        >
                            Built for <br />
                            <span className="text-blue-500">The Infinite Scale.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="max-w-3xl mx-auto text-slate-400 text-xl md:text-2xl font-medium leading-relaxed"
                        >
                            Our technology philosophy centers on "Reliability through Intelligence."
                            We don't just write code; we architect resilient ecosystems where secure infrastructure
                            and AI-driven logic operate as a single, unified organism.
                        </motion.p>
                    </section>

                    {/* 2. Architecture Grid */}
                    <section className="py-32">
                        <SectionHeader title="Core Engineering Architecture" subtitle="Systems Design" />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {architectureGrid.map((item, i) => (
                                <ArchitectureCard key={i} title={item.title} desc={item.desc} index={i} bgImage={'bgImage' in item ? item.bgImage : undefined} />
                            ))}
                        </div>
                    </section>

                    {/* 3. Tech Stack showcase */}
                    <section className="py-32">
                        <SectionHeader title="The Enterprise Technology Stack" subtitle="Engineering Pillars" />

                        {/* Large Infrastructure Visualization */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="relative w-full h-[500px] mb-24 rounded-[48px] overflow-hidden border border-slate-200 bg-white group shadow-2xl"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600"
                                alt="Advanced Digital Infrastructure"
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div className="absolute bottom-12 left-12 max-w-lg">
                                <span className="text-blue-400 font-black text-xs uppercase tracking-[0.4em] mb-4 block">Hardware Logic</span>
                                <h3 className="text-white text-4xl font-black uppercase italic tracking-tighter leading-none mb-6">GPU-Accelerated Neural clusters</h3>
                                <p className="text-slate-300 font-medium leading-relaxed">Dedicated computational environments engineered for high-velocity model inference and global data orchestration.</p>
                            </div>
                        </motion.div>

                        <div className="space-y-24">
                            {techStack.map((pillar, i) => (
                                <TechPillar key={i} category={pillar.category} items={pillar.items} />
                            ))}
                        </div>
                    </section>

                    {/* 4. Visual System Architecture Diagram - REDESIGNED FUTURISTIC PIPELINE */}
                    <section className="py-32">
                        <SectionHeader title="Universal System Flow" subtitle="Integration Logic" />
                        
                        <div className="relative p-12 md:p-24 rounded-[64px] bg-[#02040a] border border-blue-500/20 overflow-hidden shadow-[0_0_100px_rgba(37,99,235,0.1)]">
                            {/* Animated Background Mesh */}
                            <div className="absolute inset-0 opacity-20 pointer-events-none" 
                                style={{
                                    backgroundImage: `radial-gradient(circle at 2px 2px, #3b82f6 1px, transparent 0)`,
                                    backgroundSize: '40px 40px'
                                }} 
                            />
                            
                            {/* Futuristic Pipeline Container */}
                            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-4 lg:min-h-[400px]">
                                {[
                                    { 
                                        name: "Client Systems", 
                                        desc: "Multi-platform user access",
                                        icon: (
                                            <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9-3-9" />
                                            </svg>
                                        )
                                    },
                                    { 
                                        name: "Unified API Gateway", 
                                        desc: "Secure entry & traffic routing",
                                        icon: (
                                            <svg className="w-10 h-10 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        )
                                    },
                                    { 
                                        name: "AI Orchestration", 
                                        desc: "Neural logic & model management",
                                        icon: (
                                            <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                            </svg>
                                        )
                                    },
                                    { 
                                        name: "Secure Cloud Services", 
                                        desc: "Elastic compute & functions",
                                        icon: (
                                            <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                            </svg>
                                        )
                                    },
                                    { 
                                        name: "Distributed Databases", 
                                        desc: "Real-time global data storage",
                                        icon: (
                                            <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                                            </svg>
                                        )
                                    }
                                ].map((step, i) => (
                                    <div key={i} className="relative flex flex-col items-center flex-1 w-full lg:w-auto">
                                        {/* Connecting Line (Desktop) */}
                                        {i < 4 && (
                                            <div className="hidden lg:block absolute left-1/2 top-1/2 w-full h-[2px] bg-gradient-to-r from-blue-500/40 via-blue-500/80 to-blue-500/40 z-0">
                                                {/* Data Flow Animation */}
                                                <motion.div 
                                                    animate={{ x: ['0%', '100%'], opacity: [0, 1, 0] }}
                                                    transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: i * 0.4 }}
                                                    className="w-20 h-full bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,1)]"
                                                />
                                            </div>
                                        )}

                                        {/* Glassmorphism Card */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.15 }}
                                            whileHover={{ scale: 1.05, y: -10 }}
                                            className="relative z-10 w-full max-w-[220px] p-6 rounded-[32px] bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-blue-500/50 transition-all duration-500 flex flex-col items-center text-center group shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                                        >
                                            <div className="mb-6 p-4 rounded-2xl bg-slate-900 shadow-inner group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500">
                                                {step.icon}
                                            </div>
                                            <h4 className="text-white text-sm font-black uppercase tracking-tighter mb-3 leading-tight group-hover:text-blue-400 transition-colors">
                                                {step.name}
                                            </h4>
                                            <p className="text-slate-500 text-[10px] font-bold leading-relaxed">
                                                {step.desc}
                                            </p>
                                            
                                            {/* Glow effect */}
                                            <div className="absolute inset-0 rounded-[32px] bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                        </motion.div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* 5. Security & Performance */}
                    <section className="py-32">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                            <SectionHeader
                                title="Zero-Trust. Infinite Scale."
                                subtitle="Security & Reliability"
                            />
                            <div className="grid grid-cols-2 gap-8">
                                {[
                                    { label: "Uptime", value: "99.99%" },
                                    { label: "Encryption", value: "AES-256" },
                                    { label: "Latency", value: "<15ms" },
                                    { label: "Security", value: "SOC 2" }
                                ].map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl"
                                    >
                                        <div className="text-3xl font-black text-[#111111] mb-2">{stat.value}</div>
                                        <div className="text-blue-600 font-black text-[10px] uppercase tracking-widest">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* 6. Mini Case Study Examples */}
                    <section className="py-32">
                        <SectionHeader title="Engineering Success Stories" subtitle="Technology in Action" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                {
                                    client: "Global Finance Corp",
                                    challenge: "Scaling real-time trading data to 10M+ users.",
                                    result: "Implemented distributed edge cache reducing latency by 70%.",
                                    tech: "Edge Computing, Next.js, Redis",
                                    bgImage: "/images/technology/global-finance-case.png"
                                },
                                {
                                    client: "EcoLogistics SA",
                                    challenge: "Automating fleet management across 3 continents.",
                                    result: "Custom AI pipelines increased operational speed by 45%.",
                                    tech: "Python, TensorFlow, AWS Lambda",
                                    bgImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1600"
                                }
                            ].map((caseStudy, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    className="relative group overflow-hidden p-12 rounded-[48px] border border-white/10 bg-slate-900 shadow-2xl min-h-[500px] flex flex-col justify-end"
                                >
                                    {caseStudy.bgImage && (
                                        <>
                                            <img 
                                                src={caseStudy.bgImage} 
                                                alt={caseStudy.client} 
                                                className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 group-hover:opacity-60 transition-all duration-700 group-hover:scale-110" 
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-[#02040a]/80 to-transparent z-0" />
                                        </>
                                    )}
                                    <div className="relative z-10">
                                        <span className="text-blue-400 font-bold uppercase text-[10px] tracking-widest mb-6 block opacity-70">Legacy Transformation</span>
                                        <h4 className="text-2xl font-black mb-6 uppercase italic text-white group-hover:text-blue-400 transition-colors">Case: {caseStudy.client}</h4>
                                        <div className="space-y-6 text-slate-300 font-medium">
                                            <p><span className="text-white font-black">Challenge:</span> {caseStudy.challenge}</p>
                                            <p><span className="text-white font-black">Impact:</span> {caseStudy.result}</p>
                                        </div>
                                        <div className="mt-10 pt-10 border-t border-white/10 flex gap-4 flex-wrap">
                                            {caseStudy.tech.split(', ').map((tag, t) => (
                                                <span key={t} className="px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-[10px] text-blue-400 font-black uppercase tracking-widest">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* 7. Final Call-to-Action */}
                    <section className="py-40 text-center">
                        <div className="max-w-4xl mx-auto p-20 rounded-[64px] bg-white border border-slate-100 text-[#111111] shadow-2xl">
                            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-10 leading-none">
                                Ready to engineer <br /> your next breakthrough?
                            </h2>
                            <Link href="/contact" className="inline-block px-12 py-5 bg-blue-600 text-white rounded-full font-black uppercase tracking-[0.3em] hover:bg-[#111111] transition-all transform hover:scale-105 active:scale-95 duration-300">
                                Initialize Project
                            </Link>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default TechnologyPage;
