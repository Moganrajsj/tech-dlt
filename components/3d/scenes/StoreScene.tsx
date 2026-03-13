'use client';

import { PerspectiveCamera, Float, useGLTF, Stage, MeshReflectorMaterial, BakeShadows } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

// Placeholder store item if no model available
function ProductPlaceholder() {
    return (
        <group>
            {/* Box Package */}
            <mesh position={[0, 0.5, 0]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.8} />
            </mesh>
            {/* Glowing Edge */}
            <mesh position={[0, 0.5, 0]}>
                <boxGeometry args={[1.02, 1.02, 1.02]} />
                <meshBasicMaterial color="#3b82f6" wireframe />
            </mesh>
        </group>
    )
}

export default function StoreScene() {
    const platformRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (platformRef.current) {
            platformRef.current.rotation.y += 0.005;
        }
    });

    return (
        <>
            <PerspectiveCamera makeDefault position={[3, 3, 5]} fov={50} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <spotLight position={[0, 10, 0]} intensity={2} angle={0.5} penumbra={1} castShadow />

            <group position={[0, -1, 0]}>
                {/* Rotating Display Platform */}
                <group ref={platformRef}>
                    <Float speed={2} rotationIntensity={0} floatIntensity={1} floatingRange={[0, 0.2]}>
                        <ProductPlaceholder />
                    </Float>
                </group>

                {/* Reflective info floor */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
                    <planeGeometry args={[20, 20]} />
                    <meshStandardMaterial color="#101010" roughness={1} metalness={0.8} />
                </mesh>
            </group>

            <fog attach="fog" args={['#101010', 5, 20]} />
            <BakeShadows />
        </>
    );
}
