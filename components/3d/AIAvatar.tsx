'use client';

import { useRef, useMemo, Suspense } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

// Import our new high-quality robots
const AnalystRobot = dynamic(() => import('./AnalystRobot'), { ssr: false });
const InnovationRobot = dynamic(() => import('./InnovationRobot'), { ssr: false });
const NeuralCoreRobot = dynamic(() => import('./NeuralCoreRobot'), { ssr: false });
const FriendlyRobot = dynamic(() => import('./FriendlyRobot'), { ssr: false });
const CommunicationRobot = dynamic(() => import('./CommunicationRobot'), { ssr: false });

// Legacy Home Robot for preservation
const HomeRobot = () => (
    <group scale={1.8}>
        <mesh position={[0, 0.3, 0]}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshPhysicalMaterial
                color="#ffffff"
                metalness={0.8}
                roughness={0.2}
                clearcoat={1}
            />
        </mesh>
        <mesh position={[0, 0.25, 0.85]} scale={[0.8, 0.2, 0.5]}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color="#00bef3" emissive="#00bef3" emissiveIntensity={2} />
        </mesh>
        <Sparkles count={50} scale={4} size={2} color="#00bef3" />
    </group>
);

const AIAvatar = () => {
    const pathname = usePathname();
    const groupRef = useRef<THREE.Group>(null);
    const { size } = useThree();
    const isMobile = size.width < 768;

    useFrame((state) => {
        if (groupRef.current) {
            const time = state.clock.getElapsedTime();
            // Balanced idle movement
            groupRef.current.position.y = (isMobile ? -0.5 : 0) + Math.sin(time * 0.4) * 0.1;
            groupRef.current.rotation.y = Math.sin(time * 0.2) * 0.1;
        }
    });

    const isHome = pathname === '/' || pathname === '';

    if (!isHome) return null; // Remove robots as background visuals on internal pages

    const getRobot = () => {
        if (isHome) return <HomeRobot />;
        return null;
    };

    return (
        <group>
            {/* Cinematic Background Lighting for all Bots */}
            <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
            <pointLight position={[-10, 5, -5]} intensity={0.5} color="#7000ff" />

            <Suspense fallback={null}>
                <group
                    ref={groupRef}
                    position={isMobile ? [0, -1, -3] : [2.5, -0.5, 0]}
                    scale={isHome ? (isMobile ? 1.0 : 1.8) : (isMobile ? 0.5 : 0.9)}
                >
                    {getRobot()}
                </group>
                <Environment preset="city" />
            </Suspense>
        </group>
    );
};

export default AIAvatar;
