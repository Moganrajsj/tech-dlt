'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';

export const NeuralConnections = () => {
    const count = 15;
    const lines = useMemo(() => {
        return new Array(count).fill(0).map(() => ({
            position: [Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 5 - 2] as [number, number, number],
            speed: Math.random() * 0.2 + 0.1
        }));
    }, []);

    return (
        <group>
            {lines.map((line, i) => (
                <group key={i} position={new THREE.Vector3(...line.position)}>
                    {/* Simple floating spheres as nodes */}
                    <mesh>
                        <sphereGeometry args={[0.03, 16, 16]} />
                        <meshBasicMaterial color="#3b82f6" transparent opacity={0.6} />
                    </mesh>
                </group>
            ))}
        </group>
    );
};

export const CyberHead = () => {
    const meshRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
            meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
        }
    });

    return (
        <group ref={meshRef} scale={[1.5, 1.5, 1.5]}>
            {/* Abstract Head Shape - Main Cranium */}
            <mesh position={[0, 0.5, 0]}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshPhysicalMaterial
                    color="#ffffff"
                    roughness={0.2}
                    metalness={0.1}
                    clearcoat={1}
                    clearcoatRoughness={0.2}
                    transmission={0}
                />
            </mesh>
            {/* Jaw/Chin area */}
            <mesh position={[0, -0.6, 0.2]} scale={[0.9, 0.8, 0.9]}>
                <sphereGeometry args={[0.8, 32, 32]} />
                <meshPhysicalMaterial
                    color="#f8fafc"
                    roughness={0.3}
                    metalness={0.2}
                />
            </mesh>
            {/* Glowing "Visor" */}
            <mesh position={[0, 0.4, 0.85]} scale={[1, 0.2, 0.5]} rotation={[0, 0, 0]}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial
                    color="#3b82f6"
                    emissive="#3b82f6"
                    emissiveIntensity={2}
                    transparent
                    opacity={0.8}
                />
            </mesh>
            {/* Rings */}
            <group rotation={[Math.PI / 3, 0, 0]}>
                <mesh>
                    <torusGeometry args={[1.8, 0.01, 16, 100]} />
                    <meshBasicMaterial color="#3b82f6" transparent opacity={0.3} />
                </mesh>
            </group>
            <group rotation={[-Math.PI / 3, 0, 0]}>
                <mesh>
                    <torusGeometry args={[2.2, 0.01, 16, 100]} />
                    <meshBasicMaterial color="#3b82f6" transparent opacity={0.2} />
                </mesh>
            </group>
            <Sparkles count={30} scale={4} size={2} speed={0.4} opacity={0.4} color="#3b82f6" />
        </group>
    );
};
