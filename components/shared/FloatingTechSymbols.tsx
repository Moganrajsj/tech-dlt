'use client';

import { motion } from 'framer-motion';

const symbols = [
    // Neural Node SVG
    <svg key="neural" viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="50" cy="50" r="4" fill="currentColor" />
        <path d="M 50 40 L 50 10 M 50 60 L 50 90 M 40 50 L 10 50 M 60 50 L 90 50" stroke="currentColor" strokeWidth="1" />
        <circle cx="50" cy="10" r="3" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="50" cy="90" r="3" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="10" cy="50" r="3" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="90" cy="50" r="3" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>,
    // Tech Glyph
    <svg key="glyph" viewBox="0 0 100 100" className="w-full h-full">
        <rect x="30" y="30" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1" />
        <rect x="40" y="40" width="20" height="20" fill="currentColor" opacity="0.5" />
        <path d="M 20 20 L 30 30 M 80 80 L 70 70 M 20 80 L 30 70 M 80 20 L 70 30" stroke="currentColor" strokeWidth="1" />
    </svg>,
    // Signal Wave
    <svg key="signal" viewBox="0 0 100 100" className="w-full h-full">
        <path d="M 10 50 Q 25 20, 40 50 T 70 50 T 90 50" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="40" cy="50" r="4" fill="currentColor" />
    </svg>,
    // Network Node
    <svg key="network" viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="20" cy="20" r="5" stroke="currentColor" fill="none" />
        <circle cx="80" cy="20" r="5" stroke="currentColor" fill="none" />
        <circle cx="50" cy="80" r="5" stroke="currentColor" fill="none" />
        <path d="M 25 20 L 75 20 M 22 25 L 47 75 M 78 25 L 53 75" stroke="currentColor" strokeWidth="0.5" />
    </svg>
];

const FloatingTechSymbols = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {[...Array(12)].map((_, i) => {
                const Symbol = symbols[i % symbols.length];
                const size = 40 + (i * 10);
                const duration = 20 + (i * 5);

                return (
                    <motion.div
                        key={i}
                        initial={{
                            x: `${Math.random() * 100}%`,
                            y: `${Math.random() * 100}%`,
                            opacity: 0
                        }}
                        animate={{
                            y: ['-10%', '110%'],
                            opacity: [0, 0.08, 0.08, 0],
                            rotate: 360
                        }}
                        transition={{
                            duration: duration,
                            repeat: Infinity,
                            delay: i * 2,
                            ease: "linear"
                        }}
                        className="absolute text-[#00eaff]"
                        style={{ width: size, height: size }}
                    >
                        {Symbol}
                    </motion.div>
                );
            })}
        </div>
    );
};

export default FloatingTechSymbols;
