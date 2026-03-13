'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { HumanoidModernBot } from './models/HumanoidModernBot';

export default function FriendlyRobot() {
    const welcomeRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (welcomeRef.current) {
            // Subtle welcoming hand-like rotation
            welcomeRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
        }
    });

    const actionElements = (
        <group ref={welcomeRef} position={[0, -0.2, 0.4]}>
            <Sparkles count={20} scale={1} size={1} speed={0.5} opacity={0.5} color="#ffffff" />
            <mesh position={[0, 0, 0]}>
                <torusGeometry args={[0.3, 0.002, 16, 100]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
            </mesh>
        </group>
    );

    return (
        <group scale={1.2}>
            <HumanoidModernBot actionElement={actionElements} glowColor="#ffffff" />
        </group>
    );
}
