'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { HumanoidModernBot } from './models/HumanoidModernBot';

const CommunicationPulse = () => {
    const pulseRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (pulseRef.current) {
            pulseRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.2);
            const material = pulseRef.current.material as THREE.MeshBasicMaterial;
            if (material) {
                material.opacity = 0.5 - Math.sin(state.clock.elapsedTime * 3) * 0.3;
            }
        }
    });

    return (
        <mesh ref={pulseRef}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshBasicMaterial color="#00d9ff" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
        </mesh>
    );
};

export default function CommunicationRobot() {
    return (
        <group scale={1.2}>
            <HumanoidModernBot
                actionElement={<CommunicationPulse />}
                glowColor="#00d9ff"
            />
        </group>
    );
}
