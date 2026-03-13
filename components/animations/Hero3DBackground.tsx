'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Network background with points and lines
function TechNetwork() {
    const { mouse } = useThree();
    const count = 100;
    const points = useMemo(() => {
        const p = [];
        for (let i = 0; i < count; i++) {
            // Deterministic "randomness" to satisfy purity checks
            p.push(new THREE.Vector3(
                Math.sin(i * 0.12) * 7.5,
                Math.cos(i * 0.23) * 7.5,
                Math.sin(i * 0.45) * 5
            ));
        }
        return p;
    }, []);

    const linesRef = useRef<THREE.LineSegments>(null);
    const pointsRef = useRef<THREE.Points>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        if (pointsRef.current && linesRef.current) {
            const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
            const linePositions = linesRef.current.geometry.attributes.position.array as Float32Array;
            let lineIdx = 0;

            for (let i = 0; i < count; i++) {
                const i3 = i * 3;

                // Slow floating movement
                const ox = Math.sin(t * 0.2 + i) * 0.05;
                const oy = Math.cos(t * 0.3 + i) * 0.05;

                // Mouse interaction
                const dx = (mouse.x * 5) - positions[i3];
                const dy = (mouse.y * 5) - positions[i3 + 1];
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 3) {
                    positions[i3] += dx * 0.02;
                    positions[i3 + 1] += dy * 0.02;
                }

                positions[i3] += ox;
                positions[i3 + 1] += oy;

                // Update lines (simplified: connect to next few neighbors)
                for (let j = i + 1; j < Math.min(i + 3, count); j++) {
                    const j3 = j * 3;
                    linePositions[lineIdx++] = positions[i3];
                    linePositions[lineIdx++] = positions[i3 + 1];
                    linePositions[lineIdx++] = positions[i3 + 2];
                    linePositions[lineIdx++] = positions[j3];
                    linePositions[lineIdx++] = positions[j3 + 1];
                    linePositions[lineIdx++] = positions[j3 + 2];
                }
            }
            pointsRef.current.geometry.attributes.position.needsUpdate = true;
            linesRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    const initialPositions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            arr[i * 3] = points[i].x;
            arr[i * 3 + 1] = points[i].y;
            arr[i * 3 + 2] = points[i].z;
        }
        return arr;
    }, [points]);

    return (
        <group>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[initialPositions, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial size={0.08} color="#23A9E1" transparent opacity={0.6} sizeAttenuation />
            </points>
            <lineSegments ref={linesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[new Float32Array(count * 18), 3]}
                    />
                </bufferGeometry>
                <lineBasicMaterial color="#0F6FAE" transparent opacity={0.3} />
            </lineSegments>
        </group>
    );
}

// Center Core
function Core() {
    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <Sphere args={[1, 64, 64]} scale={1.5}>
                <MeshDistortMaterial
                    color="#23A9E1"
                    attach="material"
                    distort={0.4}
                    speed={1.5}
                    roughness={0.1}
                    metalness={0.9}
                />
            </Sphere>
        </Float>
    );
}

const Hero3DBackground = () => {
    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 75 }}
                style={{ background: 'transparent' }}
                dpr={[1, 2]}
            >
                <ambientLight intensity={0.6} />
                <pointLight position={[10, 10, 10]} intensity={2} color="#23A9E1" />
                <pointLight position={[-10, -10, -10]} intensity={1.5} color="#0F6FAE" />
                <TechNetwork />
                <Core />
            </Canvas>
        </div>
    );
};

export default Hero3DBackground;
