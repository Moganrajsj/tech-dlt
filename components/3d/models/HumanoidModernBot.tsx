'use client';

import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, useCursor } from '@react-three/drei';
import * as THREE from 'three';

interface HumanoidModernBotProps {
    actionElement?: React.ReactNode;
    color?: string;
    glowColor?: string;
}

// Helper for smooth interpolation
const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

export const HumanoidModernBot = ({ actionElement, glowColor = "#00d9ff" }: HumanoidModernBotProps) => {
    const groupRef = useRef<THREE.Group>(null);
    const headRef = useRef<THREE.Group>(null);
    const torsoRef = useRef<THREE.Group>(null);
    const leftArmRef = useRef<THREE.Group>(null);
    const rightArmRef = useRef<THREE.Group>(null);

    // State for interactive hovering
    const [hovered, setHovered] = useState(false);
    useCursor(hovered);

    const { mouse, viewport } = useThree();

    // Internal state for procedural animation targets
    const targetHeadRot = useRef(new THREE.Vector2(0, 0));
    const randomLookTimer = useRef(0);

    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime();

        // --- 1. ORGANIC BREATHING & FLOATING (Compound Sine Waves) ---
        if (groupRef.current) {
            // Mix of slow deep breath and faster shallow breath
            const breathY = Math.sin(t * 0.8) * 0.03 + Math.sin(t * 1.5) * 0.01;
            groupRef.current.position.y = lerp(groupRef.current.position.y, breathY, 0.1);
        }

        if (torsoRef.current) {
            // Subtle chest expansion
            const breathScale = 1 + Math.sin(t * 0.8) * 0.02;
            torsoRef.current.scale.set(breathScale, 1, breathScale);

            // Micro-rotation (drift)
            torsoRef.current.rotation.z = Math.sin(t * 0.2) * 0.02;
        }

        // --- 2. HEAD TRACKING & SACCADIC MOVEMENT (The "Real" Feel) ---
        if (headRef.current) {
            randomLookTimer.current -= delta;

            // If hovering, look intently at mouse. If not, occasionally look around.
            let lookX = (mouse.x * viewport.width) / 4;
            let lookY = (mouse.y * viewport.height) / 4;

            if (!hovered) {
                // Occasional random glances
                if (randomLookTimer.current <= 0) {
                    // Pick new random target every 2-5 seconds
                    targetHeadRot.current.set(
                        (Math.random() - 0.5) * 1, // Random X look
                        (Math.random() - 0.5) * 0.5 // Random Y look
                    );
                    randomLookTimer.current = 2 + Math.random() * 3;
                }

                // Blend mouse presence with random looking (still aware of user, but distracted)
                lookX = lerp(lookX, targetHeadRot.current.x, 0.7);
                lookY = lerp(lookY, targetHeadRot.current.y, 0.7);
            }

            // Apply smooth dampening to head rotation
            headRef.current.rotation.y = THREE.MathUtils.damp(headRef.current.rotation.y, lookX * 0.5, 4, delta);
            headRef.current.rotation.x = THREE.MathUtils.damp(headRef.current.rotation.x, -lookY * 0.5, 4, delta);

            // Add subtle high-frequency "servo jitter" for realism
            headRef.current.rotation.y += (Math.random() - 0.5) * 0.002;
            headRef.current.rotation.x += (Math.random() - 0.5) * 0.002;
        }

        // --- 3. ARM KINEMATICS (Flowing Motion) ---
        if (leftArmRef.current) {
            // Complex wave for arm to stop it looking like a metronome
            const armRot = Math.sin(t * 0.5) * 0.1 + Math.cos(t * 0.3) * 0.05 + Math.sin(t * 1.2) * 0.02;
            leftArmRef.current.rotation.z = -0.2 + armRot;
            leftArmRef.current.rotation.x = Math.sin(t * 0.4) * 0.05;
        }
        if (rightArmRef.current) {
            const armRot = Math.sin(t * 0.6 + 1) * 0.1 + Math.cos(t * 0.4) * 0.05;
            rightArmRef.current.rotation.z = 0.2 + armRot;
            rightArmRef.current.rotation.x = Math.cos(t * 0.5) * 0.05;
        }
    });

    return (
        <group
            ref={groupRef}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            {/* --- Head --- */}
            <group ref={headRef} position={[0, 1.8, 0]}>
                {/* Cranium */}
                <mesh scale={[0.4, 0.45, 0.4]}>
                    <sphereGeometry args={[1, 64, 64]} />
                    <meshPhysicalMaterial
                        color="#ffffff"
                        roughness={0.1}
                        metalness={0.6}
                        clearcoat={1}
                        clearcoatRoughness={0.1}
                        transmission={0}
                        envMapIntensity={2}
                    />
                </mesh>
                {/* Face Plate (Black Glass) */}
                <mesh position={[0, -0.05, 0.35]} scale={[0.32, 0.38, 0.1]}>
                    <sphereGeometry args={[1, 64, 64]} />
                    <meshPhysicalMaterial
                        color="#000000"
                        roughness={0}
                        metalness={1}
                        clearcoat={1}
                        envMapIntensity={3}
                    />
                </mesh>
                {/* Glowing Eyes (Blinking Logic could be added here) */}
                <group position={[0, 0, 0.42]}>
                    <mesh position={[-0.1, 0, 0]}>
                        <sphereGeometry args={[0.02, 16, 16]} />
                        <meshStandardMaterial color={glowColor} emissive={glowColor} emissiveIntensity={8} toneMapped={false} />
                    </mesh>
                    <mesh position={[0.1, 0, 0]}>
                        <sphereGeometry args={[0.02, 16, 16]} />
                        <meshStandardMaterial color={glowColor} emissive={glowColor} emissiveIntensity={8} toneMapped={false} />
                    </mesh>
                </group>
            </group>

            {/* --- Neck --- */}
            <mesh position={[0, 1.5, 0]}>
                <cylinderGeometry args={[0.08, 0.12, 0.3, 32]} />
                <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Neck Ring Detail */}
            <mesh position={[0, 1.5, 0]} rotation={[0, 0, 0]}>
                <torusGeometry args={[0.1, 0.02, 16, 32]} />
                <meshStandardMaterial color={glowColor} emissive={glowColor} emissiveIntensity={2} />
            </mesh>


            {/* --- Torso --- */}
            <group ref={torsoRef} position={[0, 0.8, 0]}>
                {/* Upper Chest Shell */}
                <mesh scale={[0.6, 0.7, 0.45]}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshPhysicalMaterial
                        color="#f8fafc"
                        roughness={0.2}
                        metalness={0.4}
                        clearcoat={1}
                    />
                </mesh>
                {/* Inner Mechanics (Visible on sides) */}
                <mesh scale={[0.5, 0.6, 0.4]}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.1} />
                </mesh>

                {/* Arc Reactor Core Pulse */}
                <mesh position={[0, 0.15, 0.23]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.12, 0.12, 0.05, 32]} />
                    <meshStandardMaterial color="#000000" metalness={1} roughness={0.2} />
                </mesh>
                <mesh position={[0, 0.15, 0.26]} rotation={[Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[0.06, 0.09, 32]} />
                    <meshStandardMaterial color={glowColor} emissive={glowColor} emissiveIntensity={5} toneMapped={false} />
                </mesh>

                {/* Lower Torso / Waist */}
                <mesh position={[0, -0.6, 0]} scale={[0.38, 0.5, 0.3]}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshPhysicalMaterial color="#334155" metalness={0.8} roughness={0.3} />
                </mesh>
            </group>

            {/* --- Shoulders & Arms --- */}
            {/* Left Arm */}
            <group ref={leftArmRef} position={[-0.55, 1.35, 0]}>
                <mesh>
                    <sphereGeometry args={[0.15, 32, 32]} />
                    <meshPhysicalMaterial color="#ffffff" metalness={0.5} roughness={0.1} clearcoat={1} />
                </mesh>
                <mesh position={[0, -0.4, 0]}>
                    <cylinderGeometry args={[0.09, 0.07, 0.7, 32]} />
                    <meshPhysicalMaterial color="#ffffff" metalness={0.4} roughness={0.2} />
                </mesh>
                <mesh position={[0, -0.8, 0]}>
                    <sphereGeometry args={[0.08, 16, 16]} />
                    <meshStandardMaterial color="#334155" metalness={0.8} />
                </mesh>
            </group>

            {/* Right Arm */}
            <group ref={rightArmRef} position={[0.55, 1.35, 0]}>
                <mesh>
                    <sphereGeometry args={[0.15, 32, 32]} />
                    <meshPhysicalMaterial color="#ffffff" metalness={0.5} roughness={0.1} clearcoat={1} />
                </mesh>
                <mesh position={[0, -0.4, 0]}>
                    <cylinderGeometry args={[0.09, 0.07, 0.7, 32]} />
                    <meshPhysicalMaterial color="#ffffff" metalness={0.4} roughness={0.2} />
                </mesh>
                <mesh position={[0, -0.8, 0]}>
                    <sphereGeometry args={[0.08, 16, 16]} />
                    <meshStandardMaterial color="#334155" metalness={0.8} />
                </mesh>
            </group>

            {/* --- Action Elements (Passed via props) --- */}
            <group position={[0, 1, 0.8]}>
                {actionElement}
            </group>

            {/* Cinematic Lighting Refinement for the Robot Itself */}
            <pointLight position={[0, 2, 1]} intensity={5} color={glowColor} distance={2} decay={2} />
            <RimLight />
        </group>
    );
};

// Subtle rim light effect for separation
const RimLight = () => (
    <spotLight
        position={[0, 4, -2]}
        angle={1}
        penumbra={1}
        intensity={10}
        color="#ffffff"
    />
);
