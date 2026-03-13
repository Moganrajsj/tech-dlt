'use client';

import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import AILaboratoryEnvironment from '@/components/3d/AILaboratoryEnvironment';

// --- GLOBAL BACKGROUND ENGINE ---
const BackgroundEngine = () => {
    return (
        <AILaboratoryEnvironment />
    );
};

const CinematicUniverse = () => {
    return (
        <div className="fixed inset-0 w-full h-full z-[-1] bg-[#02040a]">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 45 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
            >
                <BackgroundEngine />
            </Canvas>

            {/* Layered Atmospheric Filters - RESTORED ORIGINAL SYSTEM */}
            <div className="absolute inset-0 pointer-events-none bg-radial-vignette-matte z-10" />
            <div className="absolute inset-0 pointer-events-none bg-grid-blueprint opacity-[0.03] z-20" />
            <div className="absolute inset-0 pointer-events-none bg-noise-texture opacity-[0.02] z-30" />

            {/* Holographic Shimmer Overlays */}
            <div className="absolute inset-0 pointer-events-none opacity-20 z-40 bg-gradient-to-tr from-blue-500/5 via-transparent to-blue-500/5 animate-glow-pulse-slow" />
        </div>
    );
};

export default CinematicUniverse;
