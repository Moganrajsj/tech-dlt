'use client';

import { motion } from 'framer-motion';

type VisualType = 'hero' | 'dashboard' | 'automation' | 'infrastructure' | 'humanoid';

interface Props {
    type: VisualType;
    className?: string;
}

const AdvancedTechVisual = ({ type, className = "" }: Props) => {
    const renderVisual = () => {
        switch (type) {
            case 'hero':
                return (
                    <svg viewBox="0 0 800 600" className="w-full h-full">
                        <defs>
                            <radialGradient id="heroGlow" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="#00eaff" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="#00eaff" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <circle cx="400" cy="300" r="300" fill="url(#heroGlow)" />
                        <motion.g
                            animate={{ rotate: 360 }}
                            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                            style={{ transformOrigin: '400px 300px' }}
                        >
                            <circle cx="400" cy="300" r="220" stroke="#00eaff" strokeWidth="0.5" fill="none" strokeDasharray="5 15" opacity="0.1" />
                            <circle cx="400" cy="300" r="180" stroke="#00eaff" strokeWidth="1" fill="none" opacity="0.05" />
                        </motion.g>
                    </svg>
                );
            case 'dashboard':
                return (
                    <svg viewBox="0 0 600 400" className="w-full h-full">
                        {/* Circular Radar Scan */}
                        <motion.g
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            style={{ transformOrigin: '300px 200px' }}
                        >
                            <circle cx="300" cy="200" r="150" stroke="#00eaff" strokeWidth="1" fill="none" strokeDasharray="10 20" opacity="0.2" />
                            <path d="M 300 50 V 200" stroke="#00eaff" strokeWidth="2" opacity="0.4" />
                            <rect x="298" y="50" width="4" height="40" fill="#00eaff" opacity="0.6">
                                <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
                            </rect>
                        </motion.g>

                        {/* Live Graphs */}
                        <g transform="translate(50, 250)">
                            {[...Array(20)].map((_, i) => (
                                <motion.rect
                                    key={i}
                                    x={i * 25}
                                    y={20}
                                    width="10"
                                    height="80"
                                    initial={{ scaleY: 0 }}
                                    animate={{
                                        scaleY: [0.2, 1, 0.4, 0.8, 0.2]
                                    }}
                                    transition={{
                                        duration: 2 + Math.random() * 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: i * 0.1
                                    }}
                                    style={{ transformOrigin: 'bottom' }}
                                    fill="#00eaff"
                                    opacity="0.3"
                                />
                            ))}
                        </g>

                        {/* Glowing Data Nodes */}
                        <g>
                            {[...Array(6)].map((_, i) => (
                                <motion.circle
                                    key={i}
                                    cx={100 + Math.random() * 400}
                                    cy={50 + Math.random() * 200}
                                    r="4"
                                    fill="#00eaff"
                                    animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
                                    transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                                />
                            ))}
                        </g>
                    </svg>
                );
            case 'automation': // Used for "Complexity to Clarity" -> Neural Network
                return (
                    <svg viewBox="0 0 600 600" className="w-full h-full">
                        <motion.g
                            animate={{ rotate: 360 }}
                            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                            style={{ transformOrigin: '300px 300px' }}
                        >
                            {/* Neural Nodes */}
                            {[...Array(12)].map((_, i) => {
                                const angle = (i / 12) * Math.PI * 2;
                                const r = 180 + Math.sin(i) * 40;
                                const x = 300 + Math.cos(angle) * r;
                                const y = 300 + Math.sin(angle) * r;
                                return (
                                    <g key={i}>
                                        <motion.circle
                                            cx={x} cy={y} r="5"
                                            fill="#00eaff"
                                            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
                                            transition={{ duration: 4, delay: i * 0.3, repeat: Infinity }}
                                        />
                                        {/* Flow Lines to center */}
                                        <motion.path
                                            d={`M ${x} ${y} L 300 300`}
                                            stroke="#00eaff"
                                            strokeWidth="0.5"
                                            opacity="0.1"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
                                        />
                                    </g>
                                );
                            })}
                            <circle cx="300" cy="300" r="20" fill="#00eaff" opacity="0.4" />
                            <circle cx="300" cy="300" r="40" stroke="#00eaff" strokeWidth="1" fill="none" opacity="0.1" />
                        </motion.g>
                    </svg>
                );
            case 'humanoid':
                return (
                    <svg viewBox="0 0 600 600" className="w-full h-full">
                        {/* Abstract Humanoid Silhouette formed by particles */}
                        <g>
                            {[...Array(40)].map((_, i) => {
                                // Simple head-and-shoulders silhouette mapping
                                let x, y;
                                if (i < 10) { // Head
                                    x = 300 + (Math.random() - 0.5) * 60;
                                    y = 200 + (Math.random() - 0.5) * 60;
                                } else { // Shoulders/Body
                                    x = 300 + (Math.random() - 0.5) * 160;
                                    y = 350 + (Math.random() - 0.5) * 150;
                                }
                                return (
                                    <motion.circle
                                        key={i}
                                        cx={x} cy={y} r={Math.random() * 3 + 1}
                                        fill="#00eaff"
                                        animate={{
                                            opacity: [0.1, 0.6, 0.1],
                                            y: y + (Math.random() - 0.5) * 10
                                        }}
                                        transition={{
                                            duration: 4 + Math.random() * 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />
                                );
                            })}
                        </g>
                        {/* Breathing Glow */}
                        <motion.circle
                            cx="300" cy="300" r="200"
                            fill="radial-gradient(circle, rgba(0,234,255,0.1) 0%, transparent 70%)"
                            animate={{ opacity: [0.1, 0.3, 0.1], scale: [0.9, 1.1, 0.9] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </svg>
                );
            case 'infrastructure': // Used for "Security" -> Cyber Shield
                return (
                    <svg viewBox="0 0 600 600" className="w-full h-full">
                        {/* Rotating Shield Wireframe */}
                        <motion.g
                            animate={{ rotateY: 360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            style={{ transformOrigin: '300px 300px', perspective: '1000px' }}
                        >
                            <path
                                d="M 300 100 L 450 150 V 350 C 450 450 300 500 300 500 C 300 500 150 450 150 350 V 150 L 300 100"
                                fill="none" stroke="#00eaff" strokeWidth="2" opacity="0.6"
                            />
                            {/* Inner Grid */}
                            <path d="M 200 200 H 400 M 200 250 H 400 M 200 300 H 400 M 200 350 H 400" stroke="#00eaff" strokeWidth="0.5" opacity="0.2" />
                            <path d="M 250 150 V 450 M 300 150 V 500 M 350 150 V 450" stroke="#00eaff" strokeWidth="0.5" opacity="0.2" />
                        </motion.g>

                        {/* Scanning Light Sweep */}
                        <motion.rect
                            x="150" y="100" width="300" height="2" fill="#00eaff"
                            animate={{ y: [100, 500, 100], opacity: [0, 0.8, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        />
                    </svg>
                );
        }
    };

    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            {renderVisual()}
        </div>
    );
};

export default AdvancedTechVisual;
