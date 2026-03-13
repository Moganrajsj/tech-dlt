'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, GradientTexture, useTexture, Instances, Instance, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { usePathname } from 'next/navigation';

// --- SHARED MATERIALS ---
const FluidLightMaterial = ({ color, distort = 0.5, speed = 2 }: { color: string, distort?: number, speed?: number }) => (
    <MeshDistortMaterial
        color={color}
        envMapIntensity={1}
        clearcoat={1}
        clearcoatRoughness={0.1}
        metalness={0.1}
        roughness={0.3}
        distort={distort}
        speed={speed}
        transparent
        opacity={0.8}
    />
);

// --- 1. ABOUT PAGE: Liquid Intelligence (Organic Flow) ---
const LiquidIntelligence = () => {
    return (
        <group>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh position={[0, 0, -2]} scale={[1.5, 1.5, 1.5]}>
                    <sphereGeometry args={[2, 64, 64]} />
                    <FluidLightMaterial color="#00bef3" distort={0.6} speed={3} />
                </mesh>
            </Float>
            <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.4} position={[3, -2, -4]}>
                <mesh scale={[1, 1, 1]}>
                    <sphereGeometry args={[1.5, 64, 64]} />
                    <FluidLightMaterial color="#4f46e5" distort={0.4} speed={2} />
                </mesh>
            </Float>
            {/* Ambient Glow */}
            <mesh position={[0, 0, -8]} scale={[10, 10, 1]}>
                <planeGeometry />
                <meshBasicMaterial color="#001e3c" transparent opacity={0.4}>
                    <GradientTexture stops={[0, 1]} colors={['#000000', '#00bef3']} size={1024} />
                </meshBasicMaterial>
            </mesh>
        </group>
    );
};

// --- 2. SERVICES PAGE: Structured Light Planes (System Architecture) ---
const ArchitecturePlanes = () => {
    const group = useRef<THREE.Group>(null!);

    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
        }
    });

    return (
        <group ref={group}>
            {Array.from({ length: 5 }).map((_, i) => (
                <Float key={i} speed={1} rotationIntensity={0.2} floatIntensity={0.5} position={[0, i * 0.5 - 1, 0]}>
                    <mesh
                        rotation={[-Math.PI / 2 + 0.2, 0, i * 0.5]}
                        position={[(i - 2) * 1.5, (i - 2) * 0.5, -2 + i * 0.5]}
                    >
                        <planeGeometry args={[6, 6, 32, 32]} />
                        <MeshDistortMaterial
                            color={i % 2 === 0 ? "#3b82f6" : "#06b6d4"}
                            speed={2}
                            distort={0.3}
                            transparent
                            opacity={0.15}
                            wireframe={false}
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                    {/* Wireframe overlay for tech feel */}
                    <mesh
                        rotation={[-Math.PI / 2 + 0.2, 0, i * 0.5]}
                        position={[(i - 2) * 1.5, (i - 2) * 0.5, -2 + i * 0.5]}
                    >
                        <planeGeometry args={[6, 6, 16, 16]} />
                        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.03} />
                    </mesh>
                </Float>
            ))}
        </group>
    );
};

// --- 3. TECHNOLOGY PAGE: Deep Vortex Tunnel (Computation) ---
const TechVortex = () => {
    const tunnelRef = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        if (tunnelRef.current) {
            tunnelRef.current.rotation.z = state.clock.elapsedTime * 0.05;
            // Pulse effect can be added via material props if converted to custom shader, 
            // but standard material animation is performant
        }
    });

    return (
        <group>
            <mesh ref={tunnelRef} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -5]}>
                <cylinderGeometry args={[2, 6, 20, 32, 1, true]} />
                <meshPhysicalMaterial
                    side={THREE.BackSide}
                    color="#0ea5e9"
                    emissive="#000000"
                    roughness={0.2}
                    metalness={0.8}
                    transparent
                    opacity={0.4}
                    wireframe
                />
            </mesh>
            {/* Inner Glow */}
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -8]}>
                <cylinderGeometry args={[0.5, 4, 20, 32, 1, true]} />
                <meshBasicMaterial
                    side={THREE.BackSide}
                    color="#3b82f6"
                    transparent
                    opacity={0.1}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
        </group>
    );
};

// --- 4. CAREERS PAGE: Upward Bloom Streams (Growth) ---
const UpwardStreams = () => {
    const count = 30;
    const meshRef = useRef<THREE.InstancedMesh>(null!);

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 15;
            const y = (Math.random() - 0.5) * 10;
            const z = (Math.random() - 0.5) * 5 - 2;
            const scale = Math.random() * 0.5 + 0.2;
            const speed = Math.random() * 0.5 + 0.2;
            temp.push({ x, y, z, scale, speed, initialY: y });
        }
        return temp;
    }, []);

    const dummy = new THREE.Object3D();

    useFrame((state) => {
        if (!meshRef.current) return;
        particles.forEach((p, i) => {
            p.y += p.speed * 0.02;
            if (p.y > 6) p.y = -6;

            dummy.position.set(p.x, p.y, p.z);
            dummy.scale.set(p.scale, p.scale * 4, p.scale); // Elongated streams
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
        </instancedMesh>
    );
};

// --- 5. CONTACT PAGE: Orbital Rings (Connection) ---
const OrbitalRings = () => {
    const group = useRef<THREE.Group>(null!);

    useFrame((state) => {
        if (group.current) {
            group.current.rotation.z = state.clock.elapsedTime * 0.02;
            group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
        }
    });

    return (
        <group ref={group} rotation={[0.4, 0, 0]}>
            {[3, 4.5, 6].map((radius, i) => (
                <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[radius, 0.02, 16, 100]} />
                    <meshBasicMaterial color={i === 1 ? "#3b82f6" : "#06b6d4"} transparent opacity={0.6} blending={THREE.AdditiveBlending} />
                </mesh>
            ))}
            {[3, 4.5, 6].map((radius, i) => (
                <mesh key={`glow-${i}`} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[radius, 0.08, 16, 100]} />
                    <meshBasicMaterial color={i === 1 ? "#3b82f6" : "#06b6d4"} transparent opacity={0.1} blending={THREE.AdditiveBlending} />
                </mesh>
            ))}
        </group>
    );
};

// --- MAIN DIRECTOR COMPONENT ---
const CinematicShaderBackground = () => {
    const pathname = usePathname();
    const isHome = pathname === '/' || pathname === '';

    if (isHome) return null;

    const getScene = () => {
        if (pathname.includes('/about')) return <LiquidIntelligence />;
        if (pathname.includes('/services')) return <ArchitecturePlanes />;
        if (pathname.includes('/technology')) return <TechVortex />;
        if (pathname.includes('/careers')) return <UpwardStreams />;
        if (pathname.includes('/contact')) return <OrbitalRings />;
        return <LiquidIntelligence />;
    };

    return (
        <group>
            {/* Global Env for Reflections */}
            <Environment preset="city" />

            {/* Cinematic Volumetric Haze (simulated via giant sprites or gradients) */}
            <mesh position={[0, 0, -10]} scale={[20, 10, 1]}>
                <planeGeometry />
                <meshBasicMaterial color="#000000" transparent opacity={0.8} />
            </mesh>

            {/* The Scene */}
            {getScene()}
        </group>
    );
};

export default CinematicShaderBackground;
