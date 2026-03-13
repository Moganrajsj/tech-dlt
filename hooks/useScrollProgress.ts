'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook to track vertical scroll progress (0 to 1)
 */
export function useScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            // Calculate scroll progress as a percentage of total scrollable height
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (totalHeight === 0) return;

            const currentScroll = window.scrollY;
            const currentProgress = currentScroll / totalHeight;

            setProgress(Math.max(0, Math.min(1, currentProgress)));
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Initial call
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return progress;
}
