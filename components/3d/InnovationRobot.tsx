'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { HumanoidModernBot } from './models/HumanoidModernBot';

const DigitalElement = ({ position, color }: { position: [number, number, number], color: string }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.01;
            meshRef.current.rotation.y += 0.012;
        }
    });

    return (
        <mesh ref={meshRef} position={position}>
            <octahedronGeometry args={[0.1]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.8} />
        </mesh>
    );
};

export default function InnovationRobot() {
    const actionElements = (
        <group position={[0, 0.2, 0.3]}>
            <Float speed={5} rotationIntensity={2} floatIntensity={1}>
                {/* Cluster of digital nodes */}
                <DigitalElement position={[-0.4, 0.2, 0]} color="#3b82f6" />
                <DigitalElement position={[0.4, -0.2, 0.1]} color="#06b6d4" />
                <DigitalElement position={[0, 0.4, -0.1]} color="#8b5cf6" />
                {/* Connecting lines */}
                <mesh position={[0, 0.1, 0]}>
                    <torusGeometry args={[0.5, 0.005, 16, 100]} />
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
                </mesh>
            </Float>
        </group>
    );

    return (
        <group scale={1.2}>
            <HumanoidModernBot actionElement={actionElements} glowColor="#3b82f6" />
        </group>
    );
}
