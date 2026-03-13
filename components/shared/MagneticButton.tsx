'use client';

import { useRef, useState, ReactNode } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

const MagneticButton = ({ children, className = "", onClick }: MagneticButtonProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Mouse position relative to center of button
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring physics
    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();

        // Calculate distance from center
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const moveX = (clientX - centerX) * 0.35; // Strength of pull
        const moveY = (clientY - centerY) * 0.35;

        x.set(moveX);
        y.set(moveY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    return (
        <div
            className="magnetic-wrap"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setIsHovered(true)}
        >
            <motion.div
                ref={ref}
                onClick={onClick}
                style={{
                    x: springX,
                    y: springY,
                }}
                className={`relative cursor-pointer transition-shadow duration-500 ${className}`}
            >
                {/* Neon Glow Layer */}
                <motion.div
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        scale: isHovered ? 1.2 : 0.8,
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 blur-2xl rounded-full -z-10"
                />

                {children}

                {/* Border Glow */}
                <motion.div
                    animate={{
                        opacity: isHovered ? 1 : 0.3,
                    }}
                    className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                />
            </motion.div>
        </div>
    );
};

export default MagneticButton;
