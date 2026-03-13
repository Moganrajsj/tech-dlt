'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { transitions, CHOREOGRAPHY, DURATIONS } from '@/data/motion';
import dynamic from 'next/dynamic';



const ContactPage = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;

        const formData = new FormData(formRef.current);
        const name = formData.get('user_name') as string;
        const email = formData.get('user_email') as string;
        const message = formData.get('message') as string;

        if (!name.trim() || !email.trim() || !message.trim()) {
            alert('Transmission error: All fields are required to initiate the link.');
            return;
        }

        setStatus('sending' as any);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message }),
            });

            if (response.ok) {
                setStatus('success');
                setTimeout(() => {
                    formRef.current?.reset();
                    setStatus('idle');
                }, 5000);
            } else {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 5000);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden">


            <main className="relative z-10 bg-transparent pt-32 pb-20">
                <div className="container mx-auto px-6">
                    <section className="min-h-[80vh] flex flex-col items-center justify-center text-center">
                        <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={transitions.standard}
                            className="text-blue-500 font-bold tracking-[0.5em] uppercase text-xs mb-8 block"
                        >
                            Contact Protocol
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                ...transitions.standard,
                                delay: CHOREOGRAPHY.STAGGER_MEDIUM,
                                duration: DURATIONS.SLOW
                            }}
                            className="text-white text-5xl md:text-8xl font-black tracking-tighter leading-tight mb-8"
                        >
                            Let’s Build the Future <br />
                            <span className="text-blue-500">of AI Together.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ ...transitions.standard, delay: 0.4 }}
                            className="text-slate-400 text-xl md:text-2xl max-w-3xl font-medium leading-relaxed mb-16"
                        >
                            Have a question, idea, or project in mind? Our team is ready to help you explore how advanced AI solutions can transform your business.
                        </motion.p>

                        <div className="max-w-6xl w-full mt-10">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ ...transitions.standard, delay: CHOREOGRAPHY.STAGGER_SLOW }}
                                className="bg-white rounded-[48px] shadow-2xl p-10 md:p-16 border border-slate-100 relative z-10"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 text-left">
                                    <div className="space-y-12">
                                        <div>
                                            <h2 className="text-[#111111] text-3xl font-black uppercase tracking-tighter italic mb-6">Get in Touch</h2>
                                            <p className="text-[#333333] font-medium mb-8">Reach out to us and a member of our AI solutions team will respond promptly.</p>

                                            <div className="space-y-6">
                                                <div className="flex items-start space-x-4 group">
                                                    <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center flex-shrink-0 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-blue-600 font-black uppercase text-[10px] tracking-widest mb-1">Email Protocol</p>
                                                        <a href="mailto:info@techdlt.com" className="text-[#111111] text-lg font-bold hover:text-blue-600 transition-colors">info@techdlt.com</a>
                                                    </div>
                                                </div>
                                                <div className="flex items-start space-x-4 group">
                                                    <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center flex-shrink-0 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-blue-600 font-black uppercase text-[10px] tracking-widest mb-1">Region: India</p>
                                                        <a href="tel:+919952449499" className="text-[#111111] text-lg font-bold hover:text-blue-600 transition-colors">+91 99524 49499</a>
                                                    </div>
                                                </div>
                                                <div className="flex items-start space-x-4 group">
                                                    <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center flex-shrink-0 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-blue-600 font-black uppercase text-[10px] tracking-widest mb-1">Region: Hong Kong</p>
                                                        <a href="tel:+85262645265" className="text-[#111111] text-lg font-bold hover:text-blue-600 transition-colors">+852 6264 5265</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-8 border-t border-slate-100">
                                            <h2 className="text-[#111111] text-2xl font-black uppercase tracking-tighter italic mb-6">How We Can Help</h2>
                                            <ul className="space-y-3">
                                                {['AI strategy and consulting', 'Custom AI solution development', 'System integration and automation', 'Technical support and partnerships'].map((item, i) => (
                                                    <li key={i} className="flex items-center space-x-3 text-[#333333]">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shadow-sm" />
                                                        <span className="font-bold">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {status === 'success' && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-600 font-bold text-sm"
                                            >
                                                Your message has been sent successfully.
                                            </motion.div>
                                        )}

                                        {status === 'error' && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-600 font-bold text-sm"
                                            >
                                                Failed to send message. Please try again.
                                            </motion.div>
                                        )}
                                    </div>

                                    <div className="bg-slate-50 p-8 md:p-12 border border-slate-200 rounded-[40px] shadow-sm">
                                        <h3 className="text-[#111111] text-2xl font-black italic mb-8">Start a Conversation</h3>
                                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                                            <div className="space-y-4">
                                                <div className="relative">
                                                    <input
                                                        name="user_name"
                                                        type="text"
                                                        placeholder="Name"
                                                        className="w-full bg-white border border-slate-200 p-5 rounded-[20px] text-[#111111] focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 font-bold"
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <input
                                                        name="user_email"
                                                        type="email"
                                                        placeholder="Email"
                                                        className="w-full bg-white border border-slate-200 p-5 rounded-[20px] text-[#111111] focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 font-bold"
                                                    />
                                                </div>
                                                <textarea
                                                    name="message"
                                                    placeholder="Message"
                                                    rows={4}
                                                    className="w-full bg-white border border-slate-200 p-5 rounded-[20px] text-[#111111] focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 font-bold"
                                                ></textarea>
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={status === 'sending'}
                                                className="w-full py-5 bg-blue-600 text-white font-black uppercase tracking-[0.4em] rounded-[20px] hover:bg-[#111111] transition-all shadow-xl shadow-blue-600/20 scale-[1.02] active:scale-95 disabled:bg-blue-800 disabled:cursor-not-allowed"
                                            >
                                                {status === 'sending' ? 'Transmitting securely...' : 'Initiate Link'}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default ContactPage;
