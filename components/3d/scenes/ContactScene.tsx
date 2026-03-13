'use client';

import { PerspectiveCamera, Environment, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const Portal = () => {
    return (
        <group>
            <mesh>
                <torusGeometry args={[3, 0.05, 16, 100]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
            </mesh>
            <mesh>
                <circleGeometry args={[2.9, 64]} />
                <meshBasicMaterial color="#eff6ff" transparent opacity={0.1} side={THREE.DoubleSide} />
            </mesh>
        </group>
    );
};

export default function ContactScene() {
    return (
        <group>
            <ambientLight intensity={1} />
            <Portal />
            <Sparkles count={500} scale={15} size={3} speed={0.8} opacity={0.6} color="#ffffff" />
        </group>
    );
}
