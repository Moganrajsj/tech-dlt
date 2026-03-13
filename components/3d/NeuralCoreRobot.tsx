'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { HumanoidModernBot } from './models/HumanoidModernBot';

const TechComponent = ({ position }: { position: [number, number, number] }) => {
    return (
        <group position={position}>
            <mesh>
                <boxGeometry args={[0.2, 0.2, 0.2]} />
                <meshPhysicalMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0, 0, 0.11]}>
                <planeGeometry args={[0.15, 0.15]} />
                <meshStandardMaterial color="#00d9ff" emissive="#00d9ff" emissiveIntensity={2} />
            </mesh>
        </group>
    );
};

export default function NeuralCoreRobot() {
    const scanRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (scanRef.current) {
            scanRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.3;
        }
    });

    const actionElements = (
        <group position={[0, 0.2, 0.3]}>
            {/* Components being scanned */}
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
                <TechComponent position={[-0.3, 0, 0]} />
                <TechComponent position={[0.3, 0.1, -0.1]} />

                {/* Scanning Beam */}
                <mesh ref={scanRef} position={[0, 0, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[1, 0.02]} />
                    <meshBasicMaterial color="#00d9ff" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
                </mesh>
            </Float>
        </group>
    );

    return (
        <group scale={1.2}>
            <HumanoidModernBot actionElement={actionElements} glowColor="#00d9ff" />
        </group>
    );
}
