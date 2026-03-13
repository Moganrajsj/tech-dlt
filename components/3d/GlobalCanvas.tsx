'use client';

import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect, useRef } from "react";
import SceneManager from "./SceneManager";
import { PerformanceMonitor, Environment, Stars } from "@react-three/drei";
import CameraRig from "./CameraRig";
import PostProcessing from "./effects/PostProcessing";
import ScrollController, { scrollRefs } from "./controls/ScrollController";
import { FuturisticRobotHead } from "./models/FuturisticRobotHead";
import * as THREE from 'three';
import { usePathname } from 'next/navigation';
import CinematicLighting from "./CinematicLighting";

import { motion } from "framer-motion";
import { DURATIONS, EASING } from "@/data/motion";

export default function GlobalCanvas() {
    const [dpr, setDpr] = useState(1.5);
    const [quality, setQuality] = useState<'high' | 'low'>('high');
    const pathname = usePathname();

    const isTechnologyPage = pathname.includes('/technology');
    const isHomePage = pathname === '/';
    const isDarkTheme = isTechnologyPage || isHomePage;

    useEffect(() => {
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
            setDpr(1);
            setQuality('low');
        }
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                scale: [1, 1.02, 1],
            }}
            transition={{
                duration: 10,
                ease: EASING.AMBIENT as any,
                repeat: Infinity,
                opacity: { duration: DURATIONS.SLOW }
            }}
            className="fixed inset-0 w-full h-full z-[-2] pointer-events-none transition-colors duration-1000 bg-black"
        >
            <Canvas
                camera={{ position: [0, 0, 10], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                dpr={dpr}
            >
                <PerformanceMonitor
                    onDecline={() => { setDpr(1); setQuality('low'); }}
                    onIncline={() => { setDpr(1.5); setQuality('high'); }}
                />

                <PostProcessing quality={quality} />
                <ScrollController />

                <Suspense fallback={null}>
                    {/* Professional Lighting Rig */}
                    <CinematicLighting theme={
                        isTechnologyPage ? 'cool' :
                            pathname === '/' ? 'dramatic' : 'ambient'
                    } />

                    {/* PERSISTENT GLOBAL ASSETS (The Robot) */}
                    <group ref={(node) => {
                        if (scrollRefs.mainObject) scrollRefs.mainObject.current = node;
                    }}>
                        <FuturisticRobotHead />
                    </group>

                    <Environment preset="city" />
                    <Stars
                        radius={100}
                        depth={50}
                        count={1000}
                        factor={4}
                        saturation={0}
                        fade
                        speed={1}
                    />

                    {/* DYNAMIC PAGE SCENES */}
                    <SceneManager />
                </Suspense>

                <fog attach="fog" args={['#020617', 8, 30]} />
            </Canvas>
        </motion.div>
    );
}
