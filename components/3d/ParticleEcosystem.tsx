'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { usePathname } from 'next/navigation';

// --- SHARED PARTICLE COMPONENT ---
const BaseParticles = ({ count = 2000, color = "#00d9ff", size = 0.05, opacity = 0.6, type = "default" }: any) => {
    const pointsRef = useRef<THREE.Points>(null!);
    const { mouse } = useThree();

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const velocities = new Float32Array(count);
        const randoms = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            // Initial positions based on type
            if (type === "wave") {
                positions[i * 3] = (Math.random() - 0.5) * 20;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
            } else if (type === "grid") {
                positions[i * 3] = (Math.random() - 0.5) * 20;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
            } else if (type === "tunnel") {
                const angle = Math.random() * Math.PI * 2;
                const radius = 2 + Math.random() * 5;
                positions[i * 3] = Math.cos(angle) * radius;
                positions[i * 3 + 1] = Math.sin(angle) * radius;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
            } else if (type === "upward") {
                positions[i * 3] = (Math.random() - 0.5) * 15;
                positions[i * 3 + 1] = (Math.random() - 1) * 10;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
            } else if (type === "orbit") {
                const angle = Math.random() * Math.PI * 2;
                const radius = 4 + Math.random() * 2;
                positions[i * 3] = Math.cos(angle) * radius;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 2;
                positions[i * 3 + 2] = Math.sin(angle) * radius;
            } else {
                positions[i * 3] = (Math.random() - 0.5) * 30;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
            }
            velocities[i] = 0.1 + Math.random() * 0.5;
            randoms[i] = Math.random();
        }
        return { positions, velocities, randoms };
    }, [count, type]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
            if (type === "wave") {
                // Neural wave pattern
                const x = positions[i * 3];
                positions[i * 3 + 1] = Math.sin(x * 0.5 + time * 0.5 + particles.randoms[i] * 2) * 1.5;
                positions[i * 3 + 2] += Math.cos(time * 0.2 + particles.randoms[i]) * 0.005;
            } else if (type === "grid") {
                // Dynamic particle grid
                positions[i * 3 + 1] += Math.sin(time * 0.3 + particles.randoms[i] * 10) * 0.002;
                positions[i * 3] += Math.cos(time * 0.3 + particles.randoms[i] * 10) * 0.002;
            } else if (type === "tunnel") {
                // Vortex tunnel effect
                positions[i * 3 + 2] += particles.velocities[i] * 0.1;
                if (positions[i * 3 + 2] > 10) positions[i * 3 + 2] = -20;

                // Spiral motion
                const angle = 0.01 * particles.velocities[i];
                const x = positions[i * 3];
                const y = positions[i * 3 + 1];
                positions[i * 3] = x * Math.cos(angle) - y * Math.sin(angle);
                positions[i * 3 + 1] = x * Math.sin(angle) + y * Math.cos(angle);
            } else if (type === "upward") {
                // Uplifting upward flow
                positions[i * 3 + 1] += particles.velocities[i] * 0.02;
                if (positions[i * 3 + 1] > 10) positions[i * 3 + 1] = -10;
                positions[i * 3] += Math.sin(time * 0.5 + particles.randoms[i] * 5) * 0.005;
            } else if (type === "orbit") {
                // Circular orbit pattern
                const angle = time * 0.1 * particles.velocities[i];
                const radius = 4 + particles.randoms[i] * 2;
                positions[i * 3] = Math.cos(angle + particles.randoms[i] * Math.PI * 2) * radius;
                positions[i * 3 + 2] = Math.sin(angle + particles.randoms[i] * Math.PI * 2) * radius;
                positions[i * 3 + 1] += Math.sin(time * 0.5 + particles.randoms[i]) * 0.002;
            }
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;

        // Subtle mouse interaction
        pointsRef.current.rotation.y += 0.001;
        pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, mouse.x * 0.5, 0.02);
        pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, mouse.y * 0.5, 0.02);
    });

    return (
        <Points ref={pointsRef} positions={particles.positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color={color}
                size={size}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                opacity={opacity}
            />
        </Points>
    );
};

// --- NEURAL CONNECTIONS ---
const NeuralConnections = ({ color }: { color: string }) => {
    const linesRef = useRef<THREE.LineSegments>(null!);
    const count = 40;

    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 2 * 3);
        for (let i = 0; i < count; i++) {
            const x1 = (Math.random() - 0.5) * 15;
            const y1 = (Math.random() - 0.5) * 10;
            const z1 = (Math.random() - 0.5) * 5;
            const x2 = x1 + (Math.random() - 0.5) * 4;
            const y2 = y1 + (Math.random() - 0.5) * 4;
            const z2 = z1 + (Math.random() - 0.5) * 2;
            positions[i * 6] = x1;
            positions[i * 6 + 1] = y1;
            positions[i * 6 + 2] = z1;
            positions[i * 6 + 3] = x2;
            positions[i * 6 + 4] = y2;
            positions[i * 6 + 5] = z2;
        }
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geo;
    }, []);

    useFrame((state) => {
        if (!linesRef.current) return;
        linesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        linesRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
    });

    return (
        <lineSegments ref={linesRef} geometry={geometry}>
            <lineBasicMaterial color={color} transparent opacity={0.1} blending={THREE.AdditiveBlending} />
        </lineSegments>
    );
};

// --- MAIN ECOSYSTEM COMPONENT ---
const ParticleEcosystem = () => {
    const pathname = usePathname();
    const isHome = pathname === '/' || pathname === '';

    if (isHome) return null;

    const getParticleConfig = () => {
        if (pathname.includes('/about')) {
            return { type: "wave", color: "#00d9ff", count: 2500, size: 0.04 };
        }
        if (pathname.includes('/services')) {
            return { type: "grid", color: "#3b82f6", count: 2000, size: 0.06 };
        }
        if (pathname.includes('/technology')) {
            return { type: "tunnel", color: "#0ea5e9", count: 4000, size: 0.03 };
        }
        if (pathname.includes('/careers')) {
            return { type: "upward", color: "#ffffff", count: 1800, size: 0.05, opacity: 0.4 };
        }
        if (pathname.includes('/contact')) {
            return { type: "orbit", color: "#22d3ee", count: 1500, size: 0.07 };
        }
        return { type: "default", color: "#00d9ff", count: 1000, size: 0.05 };
    };

    const config = getParticleConfig();
    const showConnections = pathname.includes('/about') || pathname.includes('/services');

    return (
        <group>
            <BaseParticles {...config} />
            <BaseParticles
                {...config}
                count={config.count / 2}
                size={config.size * 0.4}
                opacity={0.15}
                color="#ffffff"
            />
            {showConnections && <NeuralConnections color={config.color} />}
        </group>
    );
};

export default ParticleEcosystem;
