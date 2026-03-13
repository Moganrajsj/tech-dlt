'use client';

import emailjs from "@emailjs/browser";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FooterEmail() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const sendEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;
        setStatus('loading');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, type: 'Quick' }),
            });

            if (response.ok) {
                setStatus('success');
                setEmail("");
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 5000);
            }
        } catch (error) {
            console.error('Error sending inquiry:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <div className="w-full max-w-sm">
            <h5 className="font-extrabold text-sm uppercase tracking-widest mb-4 text-[#0f172a]">Quick Inquiry</h5>
            <form onSubmit={sendEmail} className="flex flex-col gap-3">
                <div className="relative">
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={status === 'loading'}
                        className="w-full bg-white border border-slate-200 shadow-sm rounded-full px-6 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#00bef3] focus:ring-1 focus:ring-[#00bef3] transition-all font-medium disabled:opacity-50"
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-gradient-to-r from-[#00bef3] to-[#0071bc] hover:from-[#00ace0] hover:to-[#0060a0] text-white font-bold text-xs uppercase tracking-widest py-4 rounded-full transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden relative group"
                >
                    <span className="relative z-10 transition-transform duration-300 inline-block">
                        {status === 'loading' ? "Sending..." : "Submit Inquiry"}
                    </span>
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>

                <AnimatePresence>
                    {status === 'success' && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-green-400 text-xs font-bold mt-2 flex items-center gap-2"
                        >
                            <span className="text-lg">✅</span> Inquiry sent successfully!
                        </motion.p>
                    )}
                    {status === 'error' && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-red-400 text-xs font-bold mt-2 flex items-center gap-2"
                        >
                            <span className="text-lg">❌</span> Failed to send. Try again.
                        </motion.p>
                    )}
                </AnimatePresence>
            </form>
        </div>
    );
}
