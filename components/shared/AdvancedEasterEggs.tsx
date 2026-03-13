'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AdvancedEasterEggs = () => {
    const [activeEffect, setActiveEffect] = useState<string | null>(null);
    const [achievements, setAchievements] = useState<string[]>([]);
    const [showAchievement, setShowAchievement] = useState<string | null>(null);
    const [mouseEnergy, setMouseEnergy] = useState(0);
    const mouseRef = useRef({ x: 0, y: 0, lastCheck: Date.now(), totalDist: 0 });

    // Achievement Tracking
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('ai-achievements') || '[]');
        setAchievements(saved);

        // Initial Time-based Greeting
        const hour = new Date().getHours();
        setTimeout(() => {
            if (hour >= 5 && hour < 12) {
                setActiveEffect('greeting-morning');
            } else if (hour >= 20 || hour < 5) {
                setActiveEffect('greeting-night');
            }
            setTimeout(() => setActiveEffect(null), 6000);
        }, 2000);
    }, []);

    const unlockAchievement = (id: string) => {
        const saved = JSON.parse(localStorage.getItem('ai-achievements') || '[]');
        if (!saved.includes(id)) {
            const next = [...saved, id];
            localStorage.setItem('ai-achievements', JSON.stringify(next));
            setAchievements(next);
            if (next.length >= 2) {
                setShowAchievement('AI Explorer');
                setTimeout(() => setShowAchievement(null), 5000);
            }
        }
    };

    // Keyboard & Mouse Listeners
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'A') {
                e.preventDefault();
                setActiveEffect('glitch-mode');
                unlockAchievement('glitch');
                setTimeout(() => setActiveEffect(null), 8000);
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            const now = Date.now();
            const dx = e.clientX - mouseRef.current.x;
            const dy = e.clientY - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            mouseRef.current.totalDist += dist;
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;

            if (now - mouseRef.current.lastCheck > 100) {
                const velocity = mouseRef.current.totalDist / (now - mouseRef.current.lastCheck);
                if (velocity > 15) {
                    setMouseEnergy(prev => Math.min(prev + 1, 100));
                } else {
                    setMouseEnergy(prev => Math.max(prev - 2, 0));
                }
                mouseRef.current.totalDist = 0;
                mouseRef.current.lastCheck = now;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // Energy Effect Trigger
    useEffect(() => {
        if (mouseEnergy >= 100 && activeEffect !== 'energy-pulse') {
            setActiveEffect('energy-pulse');
            unlockAchievement('energy');
            setTimeout(() => {
                setActiveEffect(null);
                setMouseEnergy(0);
            }, 5000);
        }
    }, [mouseEnergy, activeEffect]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
            <AnimatePresence>
                {/* 1. Keyboard Glitch Panel */}
                {activeEffect === 'glitch-mode' && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0.2, 0.5, 0.2, 0.8, 0], transition: { duration: 0.5, repeat: 2 } }}
                            className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay"
                        />
                        <motion.div
                            initial={{ x: '-100%', opacity: 0 }}
                            animate={{ x: '10%', opacity: 1 }}
                            exit={{ x: '-100%', opacity: 0 }}
                            className="absolute top-1/4 left-0 glass-card p-10 border-cyan-500/40 bg-black/90 backdrop-blur-3xl max-w-md"
                        >
                            <div className="flex items-center space-x-4 mb-6">
                                <span className="text-cyan-400 font-mono text-xl animate-pulse">⚡</span>
                                <h3 className="text-white font-black uppercase tracking-[0.2em]">Hidden AI Diagnostic Mode</h3>
                            </div>
                            <p className="text-slate-300 text-lg font-medium italic leading-relaxed">
                                “Reality is just data.<br />And data can be optimized.”
                            </p>
                        </motion.div>
                    </>
                )}

                {/* 2. Achievement Badge */}
                {showAchievement && (
                    <motion.div
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 20, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        className="absolute top-0 left-1/2 -translate-x-1/2 glass-card px-8 py-4 border-yellow-500/30 bg-black/90 backdrop-blur-2xl flex items-center space-x-4"
                    >
                        <span className="text-2xl">🏆</span>
                        <div>
                            <p className="text-yellow-500 text-[10px] font-black uppercase tracking-widest">Achievement Unlocked</p>
                            <p className="text-white font-bold leading-none">AI Explorer</p>
                            <p className="text-slate-500 text-[9px] mt-1 italic">You see beyond the interface.</p>
                        </div>
                    </motion.div>
                )}

                {/* 3. Time-based Greetings */}
                {(activeEffect === 'greeting-morning' || activeEffect === 'greeting-night') && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="absolute bottom-20 left-10 glass-card p-8 border-white/10 bg-black/60 backdrop-blur-xl"
                    >
                        <p className="text-white text-xl font-black italic mb-2 leading-tight">
                            {activeEffect === 'greeting-morning' ? "Good morning." : "Working late?"}
                        </p>
                        <p className="text-slate-400 font-medium text-sm">
                            {activeEffect === 'greeting-morning'
                                ? "Ready to build something intelligent?"
                                : "The best ideas usually come at night."}
                        </p>
                    </motion.div>
                )}

                {/* 4. Mouse Energy Mode */}
                {activeEffect === 'energy-pulse' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-20 right-10 flex flex-col items-end"
                    >
                        <div className="glass-card p-6 border-cyan-400/50 bg-cyan-400/10 backdrop-blur-xl text-right">
                            <p className="text-white font-black italic mb-1 uppercase tracking-tighter">Energy levels detected.</p>
                            <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest">Creativity increasing...</p>
                        </div>
                        <motion.div
                            animate={{ width: ['0%', '100%', '0%'] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="h-1 bg-cyan-400 mt-2 rounded-full shadow-[0_0_15px_#00bef3]"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mouse Trail Canvas Overlay */}
            {mouseEnergy > 50 && (
                <div className="absolute inset-0 pointer-events-none opacity-50 bg-radial-gradient from-cyan-500/5 to-transparent" />
            )}
        </div>
    );
};

export default AdvancedEasterEggs;
