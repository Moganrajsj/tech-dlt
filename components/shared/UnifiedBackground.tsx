'use client';

import { motion } from 'framer-motion';

const UnifiedBackground = () => {
    return (
        <div className="fixed inset-0 w-full h-full z-[-1] bg-[#05070d] overflow-hidden">
            {/* Subtle Animated Grid Layer */}
            <motion.div
                initial={{ opacity: 0.3 }}
                animate={{
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute inset-0 w-full h-full"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(59, 130, 246, 0.05) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(59, 130, 246, 0.05) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Subtle Gradient Radial Glow */}
            <div
                className="absolute inset-0 w-full h-full opacity-30"
                style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 70%)'
                }}
            />

            {/* Noise Texture Overlay (Simulated with SVG filter or subtle CSS) */}
            <div className="absolute inset-0 w-full h-full opacity-[0.02] pointer-events-none mix-blend-overlay">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <filter id="noiseFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>
            </div>
        </div>
    );
};

export default UnifiedBackground;
