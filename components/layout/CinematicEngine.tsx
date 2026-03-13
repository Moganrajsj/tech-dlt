'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function CinematicEngine() {
    const pathname = usePathname();
    const { scrollYProgress } = useScroll();

    // Auto Contrast Adaptive Logic
    const overlayOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 0.6, 0.7, 0.5]);
    const blueHighlightIntensity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.4, 0.2]);

    useEffect(() => {
        // Dynamic CSS variables for contrast adjustment
        const root = document.documentElement;

        const updateThemeVariables = () => {
            if (pathname.includes('/technology')) {
                root.style.setProperty('--cinematic-intensity', '0.8');
                root.style.setProperty('--accent-glow', 'rgba(59, 130, 246, 0.5)');
            } else if (pathname === '/') {
                root.style.setProperty('--cinematic-intensity', '1.0');
                root.style.setProperty('--accent-glow', 'rgba(37, 99, 235, 0.6)');
            } else {
                root.style.setProperty('--cinematic-intensity', '0.6');
                root.style.setProperty('--accent-glow', 'rgba(96, 165, 250, 0.4)');
            }
        };

        updateThemeVariables();
    }, [pathname]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[100]">
            {/* Global Cinematic Color Grading Overlay */}

            {/* 1. Vignette - Focuses attention on center */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.4)_100%)]" />

            {/* 2. Deep Navy Shadows - Adds depth and weight */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/80" />

            {/* 3. Adaptive Blue Highlights - "Electric" feel */}
            <motion.div
                style={{ opacity: blueHighlightIntensity }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.1)_0%,transparent_50%)]"
            />

            {/* 4. Contrast Wash - Dynamically adjusted by scroll */}
            <motion.div
                style={{ opacity: overlayOpacity }}
                className="absolute inset-0 bg-black/20"
            />

            {/* 5. Film Grain / Texture - Subtle premium touch */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    );
}
