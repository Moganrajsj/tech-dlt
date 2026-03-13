'use client';

import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Mesh, Group, Vector2 } from 'three';
import * as THREE from 'three';

interface HybridTrackingProps {
    enableMouseTracking?: boolean;
    trackingIntensity?: number;
}

export default function AnalystRobotHybrid({
    enableMouseTracking = true,
    trackingIntensity = 0.5
}: HybridTrackingProps = {}) {
    const groupRef = useRef<Group>(null);
    const brainRef = useRef<Mesh>(null);
    const mousePosition = useRef(new Vector2(0, 0));
    const targetRotation = useRef(new Vector2(0, 0));
    const currentRotation = useRef(new Vector2(0, 0));
    const [isUserInteracting, setIsUserInteracting] = useState(false);

    // Track mouse position
    useThree(({ viewport }) => {
        const handleMouseMove = (event: MouseEvent) => {
            mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mousePosition.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        const handleMouseDown = () => setIsUserInteracting(true);
        const handleMouseUp = () => setIsUserInteracting(false);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    });

    useFrame((state) => {
        if (groupRef.current) {
            // Gentle floating animation (always active)
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

            // Mouse tracking (only when not manually controlling)
            if (enableMouseTracking && !isUserInteracting) {
                targetRotation.current.x = mousePosition.current.y * 0.15 * trackingIntensity;
                targetRotation.current.y = mousePosition.current.x * 0.2 * trackingIntensity;

                // Smooth lerp
                currentRotation.current.x = THREE.MathUtils.lerp(
                    currentRotation.current.x,
                    targetRotation.current.x,
                    0.05
                );
                currentRotation.current.y = THREE.MathUtils.lerp(
                    currentRotation.current.y,
                    targetRotation.current.y,
                    0.05
                );

                // Apply subtle rotation (blends with OrbitControls)
                groupRef.current.rotation.x += (currentRotation.current.x - groupRef.current.rotation.x) * 0.1;
                groupRef.current.rotation.y += (currentRotation.current.y - groupRef.current.rotation.y) * 0.1;
            }
        }

        if (brainRef.current) {
            // Pulsing brain core
            const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
            brainRef.current.scale.set(scale, scale, scale);
        }
    });

    return (
        <group ref={groupRef} position={[0, 0, 0]}>
            {/* Head - Angular precision design */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[1.2, 1.4, 1]} />
                <meshStandardMaterial
                    color="#1a1a2e"
                    metalness={0.8}
                    roughness={0.2}
                    transparent
                    opacity={0.9}
                />
            </mesh>

            {/* Transparent front panel */}
            <mesh position={[0, 0, 0.51]}>
                <planeGeometry args={[1, 1.2]} />
                <meshPhysicalMaterial
                    color="#00BEF3"
                    transparent
                    opacity={0.15}
                    metalness={0.9}
                    roughness={0.1}
                    transmission={0.5}
                />
            </mesh>

            {/* Neural brain core */}
            <mesh ref={brainRef} position={[0, 0.2, 0.3]}>
                <sphereGeometry args={[0.35, 32, 32]} />
                <meshStandardMaterial
                    color="#00BEF3"
                    emissive="#00BEF3"
                    emissiveIntensity={0.8}
                    transparent
                    opacity={0.7}
                />
            </mesh>

            {/* Neural circuit lines */}
            {[...Array(6)].map((_, i) => (
                <mesh key={i} position={[
                    Math.sin(i * Math.PI / 3) * 0.3,
                    0.2 + Math.cos(i * Math.PI / 3) * 0.2,
                    0.3
                ]}>
                    <sphereGeometry args={[0.03, 16, 16]} />
                    <meshStandardMaterial
                        color="#4DD4FF"
                        emissive="#4DD4FF"
                        emissiveIntensity={1}
                    />
                </mesh>
            ))}

            {/* Eyes - Analytical */}
            <mesh position={[-0.25, 0, 0.51]}>
                <circleGeometry args={[0.08, 32]} />
                <meshStandardMaterial
                    color="#00BEF3"
                    emissive="#00BEF3"
                    emissiveIntensity={1.5}
                />
            </mesh>
            <mesh position={[0.25, 0, 0.51]}>
                <circleGeometry args={[0.08, 32]} />
                <meshStandardMaterial
                    color="#00BEF3"
                    emissive="#00BEF3"
                    emissiveIntensity={1.5}
                />
            </mesh>

            {/* Holographic interface elements */}
            {[-0.8, 0.8].map((x, i) => (
                <mesh key={i} position={[x, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                    <planeGeometry args={[0.3, 0.02]} />
                    <meshStandardMaterial
                        color="#00BEF3"
                        emissive="#00BEF3"
                        emissiveIntensity={0.6}
                        transparent
                        opacity={0.7}
                    />
                </mesh>
            ))}

            {/* Neck */}
            <mesh position={[0, -0.9, 0]}>
                <cylinderGeometry args={[0.25, 0.3, 0.4, 8]} />
                <meshStandardMaterial
                    color="#2a2a3e"
                    metalness={0.9}
                    roughness={0.3}
                />
            </mesh>

            {/* Point lights for glow */}
            <pointLight position={[0, 0.2, 0.5]} intensity={2} color="#00BEF3" distance={3} />
            <pointLight position={[-0.25, 0, 0.6]} intensity={1} color="#00BEF3" distance={1} />
            <pointLight position={[0.25, 0, 0.6]} intensity={1} color="#00BEF3" distance={1} />
        </group>
    );
}
