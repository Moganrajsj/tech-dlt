'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { transitions, CHOREOGRAPHY, DURATIONS } from '@/data/motion';
import dynamic from 'next/dynamic';



const CareersPage = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [fileName, setFileName] = useState<string | null>(null);

    const culture = [
        { title: "Elite Specialists", text: "Join a curated team of ~150 professional engineers and strategic consultants." },
        { title: "Global Nexus", text: "Operate across our high-performance hubs in Chennai and Hong Kong." },
        { title: "Future Building", text: "Architect the next generation of SAP modules and AI-driven business logic." }
    ];

    const [easterEggToast, setEasterEggToast] = useState<{ show: boolean; message: string }>({ show: false, message: "" });
    const [secretPortal, setSecretPortal] = useState(false);
    const keyBuffer = useRef("");

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            keyBuffer.current = (keyBuffer.current + e.key.toLowerCase()).slice(-6);
            if (keyBuffer.current === "future") {
                setSecretPortal(true);
                setTimeout(() => setSecretPortal(false), 8000);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);

            // Easter Egg Trigger
            const fileNameLower = file.name.toLowerCase();
            if (fileNameLower.includes('resume') || fileNameLower.includes('cv')) {
                setEasterEggToast({
                    show: true,
                    message: "Resume detected.\nScanning for legendary skills…\nResult: Promising candidate energy detected."
                });
                setTimeout(() => setEasterEggToast({ show: false, message: "" }), 5000);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;

        const formData = new FormData(formRef.current);
        const name = formData.get('user_name') as string;
        const email = formData.get('user_email') as string;
        const phone = formData.get('user_phone') as string;
        const position = formData.get('position') as string;
        const message = formData.get('message') as string;

        if (!name.trim() || !email.trim() || !phone.trim() || !position.trim() || !message.trim()) {
            alert('Protocol Error: All fields are mandatory to initiate the application link.');
            return;
        }

        setStatus('sending');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    position,
                    message,
                    type: 'Career'
                }),
            });

            if (response.ok) {
                setStatus('success');
                setTimeout(() => {
                    formRef.current?.reset();
                    setFileName(null);
                    setStatus('idle');
                }, 5000);
            } else {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 5000);
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <div className="relative min-h-screen">
            {/* Easter Egg Toast */}
            <AnimatePresence>
                {easterEggToast.show && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="fixed bottom-10 right-10 z-[100] glass-card p-6 border-blue-500/30 bg-blue-600/10 backdrop-blur-xl max-w-sm"
                    >
                        <div className="flex items-start space-x-4">
                            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 animate-pulse">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            <div>
                                <h4 className="text-white font-black text-xs uppercase tracking-widest mb-2">AI Node Analysis</h4>
                                <p className="text-slate-300 text-sm font-medium leading-relaxed whitespace-pre-line">
                                    {easterEggToast.message}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>


            {/* Secret Portal Easter Egg */}
            <AnimatePresence>
                {secretPortal && (
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 100, opacity: 0 }}
                        className="fixed top-1/2 right-10 -translate-y-1/2 z-[100] glass-card p-12 border-blue-500/50 bg-black/95 backdrop-blur-3xl max-w-sm"
                    >
                        <div className="font-mono text-cyan-400 text-xs mb-4 animate-pulse">{"//"} SECRET_PORTAL_DETECTED</div>
                        <h3 className="text-white text-3xl font-black italic uppercase tracking-tighter mb-4">You found it.</h3>
                        <p className="text-slate-300 font-medium leading-relaxed mb-8">
                            We like people who explore.<br />
                            Send your resume directly to stand out from the noise.
                        </p>
                        <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest italic">
                            Protocol: CURIOSITY_VALUED
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Page Content */}
            <div className="relative z-10 pt-40 pb-32">
                <div className="container mx-auto px-6 md:px-12">
                    {/* Header */}
                    <div className="max-w-7xl mx-auto mb-32">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center text-left">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ ...transitions.standard, duration: DURATIONS.SLOW }}
                            >
                                <span className="text-blue-500 font-black text-xs uppercase tracking-[0.4em] mb-6 block">Join the Mission</span>
                                <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-10 leading-[0.9]">
                                    Shape the <br />
                                    <span className="text-blue-500">Future of AI</span>
                                </h1>
                                <p className="text-slate-300 text-xl font-medium max-w-xl">
                                    We're building intelligent systems that redefine how businesses operate and innovate. If you’re passionate about AI and solving real-world challenges, join our journey.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1.2 }}
                                className="relative h-[500px] rounded-[48px] overflow-hidden border border-white/10 group shadow-2xl"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200"
                                    alt="Collaborative AI Innovation"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[5s]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-transparent to-transparent opacity-40" />
                                <div className="absolute top-8 right-8 px-6 py-2 bg-white border border-slate-100 rounded-full shadow-lg">
                                    <span className="text-[#111111] text-[10px] font-black uppercase tracking-widest">Culture: INNOVATION-DRIVEN</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Why Work With Us */}
                    <div className="mb-40">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">Why Work With Us</h2>
                            <div className="w-20 h-1 bg-blue-600 mx-auto mt-6 shadow-[0_0_15px_rgba(37,99,235,1)]" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { title: "Cutting-Edge Tech", text: "Work on the absolute forefront of artificial intelligence and machine learning technologies." },
                                { title: "Real-World Impact", text: "Solve meaningful challenges that directly move the needle for businesses and society." },
                                { title: "Global Synergy", text: "Collaborate with a high-caliber global team of forward-thinking innovators." },
                                { title: "Growth Engine", text: "Benefit from continuous learning opportunities and a clear path for technical career progression." },
                                { title: "Modern Culture", text: "Deeply value a flexible and inclusive work environment designed for creative excellence." },
                                { title: "AI Ecosystem", text: "Join a curated team of professional engineers and strategic consultants reshaping the industry." }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ ...transitions.standard, delay: index * 0.1 }}
                                    className="bg-white rounded-[32px] p-10 group shadow-xl hover:shadow-2xl transition-all border border-slate-100"
                                >
                                    <h3 className="text-xl font-black text-[#111111] mb-4 group-hover:text-blue-600 transition-colors uppercase italic">{item.title}</h3>
                                    <p className="text-[#333333] font-medium leading-relaxed">{item.text}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Application Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={transitions.standard}
                        className="max-w-5xl mx-auto p-16 md:p-24 bg-white rounded-[48px] shadow-2xl relative overflow-hidden border border-slate-100"
                        id="apply"
                    >
                        <div className="relative z-10">
                            <h2 className="text-5xl md:text-7xl font-black text-[#111111] mb-8 tracking-tighter text-center uppercase italic">Apply <span className="text-blue-600">Now</span></h2>
                            <p className="text-[#333333] text-center text-lg max-w-2xl mx-auto mb-16 font-medium">
                                Join us in building the next generation of intelligent technology. Submit your resume and portfolio through the application form.
                            </p>

                            {status === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-10 p-6 bg-green-500/20 border border-green-500/50 rounded-2xl text-center text-green-400 font-bold"
                                >
                                    Your application has been transmitted securely. Our team will review it shortly.
                                </motion.div>
                            )}

                            {status === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-10 p-6 bg-red-500/20 border border-red-500/50 rounded-2xl text-center text-red-400 font-bold"
                                >
                                    Failed to transmit application. Please try again.
                                </motion.div>
                            )}

                            <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <label className="block text-slate-500 text-xs font-black uppercase tracking-widest pl-2">Full Name</label>
                                    <input required name="user_name" type="text" className="w-full bg-slate-50 border border-slate-200 rounded-[20px] px-8 py-5 text-[#111111] font-bold focus:bg-white focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400" placeholder="John Doe" />
                                </div>
                                <div className="space-y-4">
                                    <label className="block text-slate-500 text-xs font-black uppercase tracking-widest pl-2">Email Address</label>
                                    <input required name="user_email" type="email" className="w-full bg-slate-50 border border-slate-200 rounded-[20px] px-8 py-5 text-[#111111] font-bold focus:bg-white focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400" placeholder="john@example.com" />
                                </div>
                                <div className="space-y-4">
                                    <label className="block text-slate-500 text-xs font-black uppercase tracking-widest pl-2">Phone Number</label>
                                    <input required name="user_phone" type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-[20px] px-8 py-5 text-[#111111] font-bold focus:bg-white focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400" placeholder="+1 234 567 890" />
                                </div>
                                <div className="space-y-4">
                                    <label className="block text-slate-500 text-xs font-black uppercase tracking-widest pl-2">Interested Domain</label>
                                    <select required name="position" className="w-full bg-slate-50 border border-slate-200 rounded-[20px] px-8 py-5 text-[#111111] font-bold focus:bg-white focus:border-blue-500 focus:outline-none transition-all appearance-none cursor-pointer">
                                        <option value="">Select Domain</option>
                                        <option value="AI / ML Engineering">AI / ML Engineering</option>
                                        <option value="Software Development">Software Development</option>
                                        <option value="Data Science & Analytics">Data Science & Analytics</option>
                                        <option value="Product Design & UX">Product Design & UX</option>
                                        <option value="Technical Operations">Technical Operations</option>
                                    </select>
                                </div>

                                <div className="md:col-span-2 relative">
                                    <label className="block text-slate-500 text-xs font-black uppercase tracking-widest pl-2 mb-4">Resume Node (Manual Attachment Required)</label>
                                    <div className="relative group">
                                        <input
                                            type="file"
                                            name="resume"
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleFileChange}
                                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                        />
                                        <div className="py-12 border-2 border-dashed border-slate-200 rounded-[32px] text-center bg-slate-50 group-hover:border-blue-500/30 transition-all">
                                            <span className="text-slate-500 font-black uppercase tracking-[0.2em] text-xs group-hover:text-blue-600 transition-colors">
                                                {fileName || "Select Resume File"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="md:col-span-2 space-y-4">
                                    <label className="block text-slate-500 text-xs font-black uppercase tracking-widest pl-2">Tell us about your interest in AI</label>
                                    <textarea required name="message" rows={5} className="w-full bg-slate-50 border border-slate-200 rounded-[20px] px-8 py-5 text-[#111111] font-bold focus:bg-white focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400" placeholder="What excites you about artificial intelligence?"></textarea>
                                </div>

                                <div className="md:col-span-2 text-center">
                                    <p className="text-blue-600 text-sm font-bold mb-6 italic">
                                        "After clicking transmit, your email app will open. Please attach your resume and send manually."
                                    </p>
                                    <button
                                        type="submit"
                                        disabled={status === 'sending'}
                                        className="w-full px-12 py-7 bg-blue-600 text-white text-lg uppercase tracking-[0.3em] font-black rounded-[24px] hover:bg-[#111111] hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-blue-600/20 disabled:bg-blue-800 disabled:cursor-not-allowed"
                                    >
                                        {status === 'sending' ? 'Transmitting securely...' : 'Transmit Application'}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Background Soft Glow */}
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default CareersPage;
