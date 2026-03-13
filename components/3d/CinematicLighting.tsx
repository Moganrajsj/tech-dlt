'use client';

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from 'three';

interface CinematicLightingProps {
    theme?: 'dramatic' | 'cool' | 'ambient';
}

export default function CinematicLighting({ theme = 'dramatic' }: CinematicLightingProps) {
    const keyLightRef = useRef<THREE.DirectionalLight>(null);
    const fillLightRef = useRef<THREE.PointLight>(null);
    const rimLightRef = useRef<THREE.SpotLight>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // Subtle movement for lights to feel "alive"
        if (keyLightRef.current) {
            keyLightRef.current.position.x = 5 + Math.sin(time * 0.5) * 2;
        }
        if (fillLightRef.current) {
            fillLightRef.current.intensity = (theme === 'cool' ? 0.8 : 0.5) + Math.sin(time * 0.8) * 0.1;
        }
    });

    const getColors = () => {
        switch (theme) {
            case 'cool':
                return {
                    key: "#60a5fa", // Blue 400
                    fill: "#1e40af", // Blue 800
                    rim: "#ffffff",
                    intensity: 1.5
                };
            case 'ambient':
                return {
                    key: "#3b82f6", // Blue 500
                    fill: "#172554", // Blue 950
                    rim: "#60a5fa",
                    intensity: 0.8
                };
            default: // dramatic
                return {
                    key: "#ffffff",
                    fill: "#1e3a8a", // Blue 900
                    rim: "#3b82f6", // Blue 500
                    intensity: 2
                };
        }
    };

    const colors = getColors();

    return (
        <group>
            {/* Ambient Light - Soft baseline */}
            <ambientLight intensity={0.2} color="#1e3a8a" />

            {/* Key Light - Primary source, dramatic shadows */}
            <directionalLight
                ref={keyLightRef}
                position={[5, 5, 5]}
                intensity={colors.intensity}
                color={colors.key}
                castShadow
            />

            {/* Fill Light - Softens shadows, adds color depth */}
            <pointLight
                ref={fillLightRef}
                position={[-5, -2, 2]}
                intensity={1}
                color={colors.fill}
            />

            {/* Rim Light - Defines edges, creates depth */}
            <spotLight
                ref={rimLightRef}
                position={[0, 10, -10]}
                intensity={colors.intensity * 1.5}
                color={colors.rim}
                angle={0.3}
                penumbra={1}
            />

            {/* Atmospheric Fog adjustment handled in GlobalCanvas */}
        </group>
    );
}
