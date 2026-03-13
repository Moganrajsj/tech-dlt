'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const NeuralConnections = () => {
    const count = 40;
    const lines = useMemo(() => {
        return new Array(count).fill(0).map(() => ({
            position: [
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15
            ],
            speed: Math.random() * 0.2 + 0.1,
            size: Math.random() * 0.05 + 0.02
        }));
    }, []);

    return (
        <group>
            {lines.map((item, i) => (
                <Float key={i} speed={item.speed} rotationIntensity={2} floatIntensity={1}>
                    <mesh position={new THREE.Vector3(...item.position)}>
                        <icosahedronGeometry args={[item.size, 0]} />
                        <meshBasicMaterial color="#3b82f6" transparent opacity={0.6} wireframe />
                    </mesh>
                </Float>
            ))}
        </group>
    );
};

export default function AboutScene() {
    const galaxyRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (galaxyRef.current) {
            galaxyRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
            galaxyRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
        }
    });

    return (
        <group>
            <ambientLight intensity={0.5} />
            <pointLight position={[0, 0, 0]} intensity={2} color="#3b82f6" />
            
            <group ref={galaxyRef}>
                <NeuralConnections />
            </group>
        </group>
    );
}
