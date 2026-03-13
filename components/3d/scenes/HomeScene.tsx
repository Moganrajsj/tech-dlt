'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei';
import HolographicMaterial from '../shaders/HolographicMaterial';
import { scrollRefs } from '../controls/ScrollController';
import * as THREE from 'three';

// A component to visualize the "Chaos/Problem" section
const DataStorm = () => {
    const points = useMemo(() => {
        const p = [];
        for (let i = 0; i < 2000; i++) {
            p.push(new THREE.Vector3(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20
            ));
        }
        return p;
    }, []);

    const ref = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y += 0.005;
        }
    });

    return (
        <group ref={ref}>
            {points.map((pos, i) => (
                <mesh key={i} position={pos}>
                    <boxGeometry args={[0.02, 0.1, 0.01]} />
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
                </mesh>
            ))}
        </group>
    );
};

// Holographic Charts for BI Scene
const BICharts = () => {
    return (
        <group>
            {[...Array(5)].map((_, i) => (
                <mesh key={i} position={[(i - 2) * 0.5, Math.sin(i) * 0.5, 0]}>
                    <boxGeometry args={[0.3, Math.random() * 2, 0.1]} />
                    <HolographicMaterial color="#3b82f6" />
                </mesh>
            ))}
        </group>
    );
};

export default function HomeScene() {
    return (
        <>
            {/* Ambient lighting specific to home */}
            <spotLight position={[5, 10, 5]} intensity={2} color="#00d9ff" />

            {/* Visual Effects Layer (Holograms for transitions) */}
            <group ref={(node) => {
                if (scrollRefs.vfx) scrollRefs.vfx.current = node;
            }} scale={0}>
                <group>
                    <sphereGeometry args={[2.5, 64, 64]} />
                    <HolographicMaterial color="#00d9ff" rimColor="#ffffff" />
                    <BICharts />
                </group>
            </group>

            {/* Chaos elements for Scene 2 */}
            <group ref={(node) => {
                if (scrollRefs.secondaryObject) scrollRefs.secondaryObject.current = node;
            }} scale={0}>
                <DataStorm />
            </group>

            <Sparkles count={200} scale={10} size={2} speed={0.5} opacity={0.3} color="#ffffff" />
        </>
    );
}
