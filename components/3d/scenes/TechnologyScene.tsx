'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';

const ServerModule = ({ position }: { position: [number, number, number] }) => {
    return (
        <group position={position}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
                <mesh>
                    <boxGeometry args={[1, 1.5, 1]} />
                    <meshStandardMaterial color="#020617" metalness={0.9} roughness={0.1} />
                </mesh>
                {/* Glowing lines */}
                <mesh position={[0, 0, 0.51]}>
                    <planeGeometry args={[0.8, 1.3]} />
                    <meshBasicMaterial color="#00d9ff" transparent opacity={0.1} />
                </mesh>
                {[...Array(5)].map((_, i) => (
                    <mesh key={i} position={[0, (i - 2) * 0.2, 0.52]}>
                        <boxGeometry args={[0.6, 0.02, 0.01]} />
                        <meshBasicMaterial color={Math.random() > 0.5 ? "#00d9ff" : "#ffffff"} />
                    </mesh>
                ))}
            </Float>
        </group>
    );
};

export default function TechnologyScene() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
        }
    });

    return (
        <group>
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={2} color="#00d9ff" />

            <group ref={groupRef}>
                {/* Server Core Visuals */}
                {[...Array(8)].map((_, i) => (
                    <ServerModule
                        key={i}
                        position={[
                            Math.cos((i / 8) * Math.PI * 2) * 4,
                            0,
                            Math.sin((i / 8) * Math.PI * 2) * 4
                        ]}
                    />
                ))}
            </group>

            <Sparkles count={400} scale={20} size={2} speed={0.4} opacity={0.3} color="#00d9ff" />
        </group>
    );
}
