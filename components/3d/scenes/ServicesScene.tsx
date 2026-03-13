'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import HolographicMaterial from '../shaders/HolographicMaterial';
import * as THREE from 'three';

const Module = ({ position, title }: { position: [number, number, number], title: string }) => {
    return (
        <group position={position}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh>
                    <boxGeometry args={[1.5, 1, 0.1]} />
                    <HolographicMaterial color="#3b82f6" />
                </mesh>
                <mesh position={[0, 0, -0.05]}>
                    <boxGeometry args={[1.6, 1.1, 0.05]} />
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
                </mesh>
            </Float>
        </group>
    );
};

export default function ServicesScene() {
    return (
        <group>
            <ambientLight intensity={0.5} />
            <pointLight position={[0, 5, 0]} intensity={2} color="#3b82f6" />

            <group position={[0, 0, 0]}>
                <Module position={[-2.5, 1.5, 0]} title="BI" />
                <Module position={[0, 1.5, 0]} title="AI" />
                <Module position={[2.5, 1.5, 0]} title="Chat" />
                <Module position={[-1.5, -0.5, 0]} title="Apps" />
                <Module position={[1.5, -0.5, 0]} title="Infrastructure" />
            </group>

            <gridHelper args={[20, 20, "#3b82f6", "#1e293b"]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -2]} />
        </group>
    );
}
