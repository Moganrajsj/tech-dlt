'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AdvancedTechVisual from '@/components/shared/AdvancedTechVisual';

type VisualType = 'hero' | 'dashboard' | 'automation' | 'infrastructure' | 'humanoid';

interface CinematicTechCardProps {
    type: VisualType;
    label?: string;
    description?: string;
    align?: 'left' | 'right';
    className?: string;
    imageSrc?: string;
    videoSrc?: string;
}

const CinematicTechCard = ({ type, label, description, align = 'right', className = "", imageSrc, videoSrc }: CinematicTechCardProps) => {

    const alignmentClasses = align === 'right' ? 'items-end text-right' : 'items-start text-left';
    const [imageError, setImageError] = useState(false);

    return (
        <div className={`relative group w-full h-[500px] overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-2xl hover:border-blue-500/50 transition-all duration-700 shadow-2xl shadow-black/80 ${className}`}>

            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-900/40 to-blue-900/10 opacity-40 group-hover:opacity-20 transition-opacity duration-700 z-10 pointer-events-none" />

                {videoSrc ? (
                    <video
                        src={videoSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-1000 ease-out opacity-60 group-hover:opacity-80"
                    />
                ) : imageSrc && !imageError ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={imageSrc}
                        alt={label || "Technical Visual"}
                        className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-1000 ease-out opacity-60 group-hover:opacity-80"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    /* Tech Visual Fallback */
                    <AdvancedTechVisual type={type} className="w-full h-full scale-110 opacity-30 group-hover:scale-125 group-hover:opacity-60 transition-all duration-1000 ease-out blur-[1px] group-hover:blur-0" />
                )}
            </div>

            {/* Content Overlay */}
            <div className={`absolute inset-0 p-10 flex flex-col justify-end z-20 pointer-events-none ${alignmentClasses}`}>

                {label && (
                    <div className="mb-auto inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-blue-500/30 bg-slate-900/80 backdrop-blur-md shadow-lg shadow-blue-500/20">
                        <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6] animate-pulse" />
                        <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{label}</span>
                    </div>
                )}

                {/* Scanning Animation Layer */}
                <div className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent animate-[scan_4s_linear_infinite]" />
                </div>

                {description && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <p className="text-white text-lg font-bold leading-relaxed max-w-md drop-shadow-2xl group-hover:text-blue-200 transition-colors">
                            {description}
                        </p>
                    </motion.div>
                )}

                {/* Decorative Tech Dots */}
                <div className="absolute bottom-10 right-10 flex gap-1.5">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-1 h-1 bg-blue-500/40 rounded-full group-hover:bg-blue-400 transition-colors" />
                    ))}
                </div>
            </div>

            {/* Corner Accents - Minimal */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-white/5 rounded-tl-3xl group-hover:border-blue-500/30 transition-colors duration-500 z-20" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-white/5 rounded-br-3xl group-hover:border-blue-500/30 transition-colors duration-500 z-20" />
        </div>
    );
};

export default CinematicTechCard;
