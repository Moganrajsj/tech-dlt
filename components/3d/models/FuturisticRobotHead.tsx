'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';

export const FuturisticRobotHead = () => {
    const groupRef = useRef<THREE.Group>(null);
    const neuralRef = useRef<THREE.Group>(null);
    const eyeRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (groupRef.current) {
            // Smooth rotation loop
            groupRef.current.rotation.y = t * 0.15;
            // Subtle breathing tilt
            groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.05;
        }
        if (neuralRef.current) {
            neuralRef.current.rotation.y = -t * 0.2;
        }
        if (eyeRef.current) {
            // Eyes pulse and slightly follow the "viewer" or just wander
            const pulse = (Math.sin(t * 2) + 1) / 2;
            eyeRef.current.children.forEach((eye: any) => {
                if (eye.material) {
                    eye.material.emissiveIntensity = 2 + pulse * 4;
                }
            });
        }
    });

    // Generate procedural neural lines - more complex this time
    const neuralLines = useMemo(() => {
        const lines = [];
        for (let i = 0; i < 25; i++) {
            const points = [];
            const radius = 0.8 + Math.random() * 0.4;
            for (let j = 0; j < 8; j++) {
                const angle = (j / 8) * Math.PI * 2;
                points.push(new THREE.Vector3(
                    Math.cos(angle) * radius * (Math.random() * 0.5 + 0.5),
                    (j / 4 - 1) * 1.5,
                    Math.sin(angle) * radius * (Math.random() * 0.5 + 0.5)
                ));
            }
            const curve = new THREE.CatmullRomCurve3(points);
            lines.push(curve);
        }
        return lines;
    }, []);

    return (
        <group ref={groupRef}>
            {/* --- Core Neural Structure --- */}
            <group ref={neuralRef}>
                {neuralLines.map((curve, i) => (
                    <mesh key={i}>
                        <tubeGeometry args={[curve, 40, 0.003, 8, false]} />
                        <meshBasicMaterial color="#00d9ff" transparent opacity={0.3} />
                    </mesh>
                ))}
            </group>

            {/* --- Main Infrastructure (Interior) --- */}
            <mesh scale={0.9}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color="#001a33" metalness={1} roughness={0.2} />
            </mesh>

            {/* --- Head Geometry (Outer Shell - Multi-layered) --- */}

            {/* Cranium / Top Head - High-end Ceramic/Glass mix */}
            <mesh position={[0, 0.4, 0]} scale={[1, 1.15, 1]}>
                <sphereGeometry args={[1, 128, 128, 0, Math.PI * 2, 0, Math.PI * 0.65]} />
                <meshPhysicalMaterial
                    color="#ffffff"
                    roughness={0.05}
                    metalness={0.1}
                    transmission={0.4}
                    thickness={2}
                    clearcoat={1}
                    clearcoatRoughness={0}
                    ior={1.45}
                    reflectivity={1}
                />
            </mesh>

            {/* Face Plate - Sleeker, more vertical */}
            <mesh position={[0, -0.2, 0.15]} scale={[0.85, 0.9, 0.9]}>
                <sphereGeometry args={[1, 64, 64, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
                <meshPhysicalMaterial
                    color="#f8fafc"
                    roughness={0.1}
                    metalness={0.2}
                    clearcoat={1}
                />
            </mesh>

            {/* Jaw / Chin Structure - Modular look */}
            <group position={[0, -0.8, 0.2]}>
                <mesh scale={[0.7, 0.4, 0.6]}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshPhysicalMaterial color="#ffffff" roughness={0.2} metalness={0.5} />
                </mesh>
                <mesh position={[0, -0.3, 0.1]} scale={[0.4, 0.2, 0.3]}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshPhysicalMaterial color="#00d9ff" emissive="#00d9ff" emissiveIntensity={1} />
                </mesh>
            </group>

            {/* --- Facial Features --- */}

            {/* Cybernetic Eye Visor */}
            <mesh position={[0, 0.4, 0.82]} scale={[0.9, 0.12, 0.15]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="#020617" metalness={1} roughness={0} />
            </mesh>

            {/* Glowing Eyes Pulse Group */}
            <group ref={eyeRef} position={[0, 0.4, 0.9]}>
                <mesh position={[-0.3, 0, 0]}>
                    <sphereGeometry args={[0.06, 32, 32]} />
                    <meshStandardMaterial color="#00d9ff" emissive="#00d9ff" emissiveIntensity={5} />
                </mesh>
                <mesh position={[0.3, 0, 0]}>
                    <sphereGeometry args={[0.06, 32, 32]} />
                    <meshStandardMaterial color="#00d9ff" emissive="#00d9ff" emissiveIntensity={5} />
                </mesh>
            </group>

            {/* --- Advanced Tech Accents --- */}

            {/* Lateral Cooling/Sensor Vents */}
            {[-1, 1].map((side) => (
                <group key={side} position={[side * 1.05, 0.4, -0.1]}>
                    <mesh rotation={[0, 0, Math.PI / 2]}>
                        <cylinderGeometry args={[0.35, 0.4, 0.15, 32]} />
                        <meshPhysicalMaterial color="#cbd5e1" roughness={0.1} metalness={0.8} />
                    </mesh>
                    <mesh position={[side * 0.08, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                        <torusGeometry args={[0.32, 0.015, 16, 64]} />
                        <meshBasicMaterial color="#00d9ff" transparent opacity={0.6} />
                    </mesh>
                </group>
            ))}

            {/* Floating Data Rings */}
            <group rotation={[Math.PI / 12, 0, 0]}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[1.8, 0.005, 16, 100]} />
                    <meshBasicMaterial color="#00d9ff" transparent opacity={0.2} />
                </mesh>
                <mesh rotation={[Math.PI / 2, Math.PI / 4, 0]}>
                    <torusGeometry args={[2.0, 0.003, 16, 100]} />
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
                </mesh>
            </group>

            {/* Ambient Particles */}
            <Sparkles
                count={80}
                scale={4}
                size={1.5}
                speed={0.3}
                opacity={0.4}
                color="#00d9ff"
            />

            {/* Floating Holographic Shards */}
            <Float speed={4} rotationIntensity={1.5} floatIntensity={1}>
                <mesh position={[1.4, 0.8, -0.5]} rotation={[1, 2, 3]}>
                    <tetrahedronGeometry args={[0.08]} />
                    <meshStandardMaterial color="#00d9ff" emissive="#00d9ff" emissiveIntensity={2} transparent opacity={0.7} />
                </mesh>
                <mesh position={[-1.6, -0.4, 0.5]} rotation={[3, 2, 1]}>
                    <octahedronGeometry args={[0.06]} />
                    <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} transparent opacity={0.6} />
                </mesh>
            </Float>

        </group>
    );
};
