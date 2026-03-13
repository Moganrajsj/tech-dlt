'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Sparkles, PerspectiveCamera, Torus, Sphere, Box, Icosahedron, Cloud } from '@react-three/drei';
import * as THREE from 'three';
import { usePathname } from 'next/navigation';

// --- SHARED GEOMETRY ---

const NeuralConnections = () => {
    const count = 15;
    const lines = useMemo(() => {
        return new Array(count).fill(0).map(() => ({
            position: [Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 5 - 2],
            speed: Math.random() * 0.2 + 0.1
        }));
    }, []);

    return (
        <group>
            {lines.map((line, i) => (
                <Float key={i} speed={line.speed} rotationIntensity={0.5} floatIntensity={1}>
                    <mesh position={new THREE.Vector3(...line.position)}>
                        <sphereGeometry args={[0.03, 16, 16]} />
                        <meshBasicMaterial color="#00bef3" transparent opacity={0.6} />
                    </mesh>
                </Float>
            ))}
        </group>
    );
};

const CyberHead = () => {
    const meshRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
            meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
        }
    });

    return (
        <group ref={meshRef} scale={[1.5, 1.5, 1.5]}>
            {/* Abstract Head Shape - Main Cranium */}
            <mesh position={[0, 0.5, 0]}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshPhysicalMaterial
                    color="#ffffff"
                    roughness={0.2}
                    metalness={0.1}
                    clearcoat={1}
                    clearcoatRoughness={0.2}
                    transmission={0}
                />
            </mesh>
            {/* Jaw/Chin area */}
            <mesh position={[0, -0.6, 0.2]} scale={[0.9, 0.8, 0.9]}>
                <sphereGeometry args={[0.8, 32, 32]} />
                <meshPhysicalMaterial
                    color="#f8fafc"
                    roughness={0.3}
                    metalness={0.2}
                />
            </mesh>
            {/* Glowing "Visor" */}
            <mesh position={[0, 0.4, 0.85]} scale={[1, 0.2, 0.5]} rotation={[0, 0, 0]}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial
                    color="#00bef3"
                    emissive="#00bef3"
                    emissiveIntensity={2}
                    transparent
                    opacity={0.8}
                />
            </mesh>
            {/* Rings */}
            <group rotation={[Math.PI / 3, 0, 0]}>
                <mesh>
                    <torusGeometry args={[1.8, 0.01, 16, 100]} />
                    <meshBasicMaterial color="#00bef3" transparent opacity={0.3} />
                </mesh>
            </group>
            <group rotation={[-Math.PI / 3, 0, 0]}>
                <mesh>
                    <torusGeometry args={[2.2, 0.01, 16, 100]} />
                    <meshBasicMaterial color="#00bef3" transparent opacity={0.2} />
                </mesh>
            </group>
            <Sparkles count={30} scale={4} size={2} speed={0.4} opacity={0.4} color="#00bef3" />
        </group>
    );
};

// --- SCENES ---

const HomeScene = () => (
    <>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
        <ambientLight intensity={1.5} color="#ffffff" />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
        <pointLight position={[-5, -5, 5]} intensity={1} color="#00bef3" distance={20} />
        <spotLight position={[0, 10, 0]} intensity={1} angle={0.5} penumbra={1} color="#eff6ff" />
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.2, 0.2]}>
            <CyberHead />
        </Float>
        <NeuralConnections />
        <Stars radius={100} depth={50} count={500} factor={4} saturation={0} fade speed={0.5} />
        <fog attach="fog" args={['#ffffff', 5, 20]} />
    </>
);

const ServicesScene = () => (
    <>
        <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={50} />
        <ambientLight intensity={1} />
        <gridHelper args={[50, 50, 0xbfdbfe, 0xf1f5f9]} position={[0, -2, 0]} />
        <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
            <group position={[0, 2, 0]}>
                <Sparkles count={200} scale={[20, 10, 20]} size={4} speed={0.4} opacity={0.6} color="#00bef3" />
                {Array.from({ length: 10 }).map((_, i) => (
                    <mesh key={i} position={[Math.random() * 10 - 5, Math.random() * 5, Math.random() * 5 - 2]}>
                        <icosahedronGeometry args={[0.2, 0]} />
                        <meshStandardMaterial color="#60a5fa" wireframe />
                    </mesh>
                ))}
            </group>
        </Float>
        <fog attach="fog" args={['#ffffff', 5, 25]} />
    </>
);

const AboutScene = () => (
    <>
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={45} />
        <ambientLight intensity={1} />
        <Sparkles count={500} scale={[20, 5, 5]} size={3} speed={0.8} opacity={0.5} color="#00bef3" noise={0.5} />
        <Float speed={2} rotationIntensity={0.2} floatIntensity={2}>
            <group position={[5, 0, -5]}>
                <Sphere args={[2, 32, 32]} position={[-8, 2, 0]}>
                    <meshStandardMaterial color="#bfdbfe" opacity={0.2} transparent wireframe />
                </Sphere>
                <Sphere args={[1.5, 32, 32]} position={[-2, -2, 2]}>
                    <meshStandardMaterial color="#bfdbfe" opacity={0.2} transparent wireframe />
                </Sphere>
            </group>
        </Float>
        <fog attach="fog" args={['#ffffff', 5, 25]} />
    </>
);

const StoreScene = () => (
    <>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <ambientLight intensity={1} />
        <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
            <Icosahedron args={[1.5, 0]} position={[-4, 2, -2]}>
                <meshStandardMaterial color="#e0f2fe" wireframe />
            </Icosahedron>
            <Torus args={[1, 0.05, 16, 32]} position={[4, -2, -3]} rotation={[1, 1, 0]}>
                <meshStandardMaterial color="#00bef3" transparent opacity={0.4} />
            </Torus>
            <Box args={[0.8, 0.8, 0.8]} position={[0, 1, 2]} rotation={[0.5, 0.5, 0]}>
                <meshStandardMaterial color="#60a5fa" opacity={0.5} transparent />
            </Box>
        </Float>
        <Sparkles count={100} scale={15} size={2} opacity={0.3} color="#93c5fd" />
        <fog attach="fog" args={['#ffffff', 5, 20]} />
    </>
);

const CareersScene = () => (
    <>
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />
        <ambientLight intensity={1.5} />
        {/* Upward Energy */}
        <Sparkles count={800} scale={[20, 20, 10]} size={4} speed={2} opacity={0.6} color="#00bef3" />
        <fog attach="fog" args={['#ffffff', 8, 25]} />
    </>
);

const ContactScene = () => (
    <>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={40} />
        <ambientLight intensity={1} />
        <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.2}>
            <Cloud opacity={0.5} segments={20} bounds={[10, 2, 2]} volume={10} color="#eff6ff" />
        </Float>
        <Stars radius={50} depth={50} count={2000} factor={4} saturation={0} fade speed={0.5} />
        <fog attach="fog" args={['#ffffff', 5, 30]} />
    </>
);

// --- MANAGER ---

const SceneManager = () => {
    const pathname = usePathname();

    if (pathname === '/') return <HomeScene />;
    if (pathname.includes('/services')) return <ServicesScene />;
    if (pathname.includes('/about')) return <AboutScene />;
    if (pathname.includes('/store')) return <StoreScene />;
    if (pathname.includes('/careers')) return <CareersScene />;
    if (pathname.includes('/contact')) return <ContactScene />;

    return <HomeScene />;
};

const Global3DBackground = () => {
    return (
        <div className="fixed inset-0 w-full h-full z-[-1]">
            <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
                <SceneManager />
            </Canvas>
            {/* Gradient Overlays for blend */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/50 to-white/90 pointer-events-none" />
            <div className="absolute inset-0 bg-white/40 pointer-events-none mix-blend-overlay" />
        </div>
    );
};

export default Global3DBackground;
