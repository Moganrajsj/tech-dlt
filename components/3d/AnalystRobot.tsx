'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { HumanoidModernBot } from './models/HumanoidModernBot';

const HolographicPanel = ({ position, rotation, text }: { position: [number, number, number], rotation: [number, number, number], text: string }) => {
    return (
        <group position={position} rotation={rotation}>
            <mesh>
                <planeGeometry args={[0.8, 0.5]} />
                <meshPhysicalMaterial
                    color="#00d9ff"
                    transparent
                    opacity={0.1}
                    transmission={0.5}
                    thickness={0.1}
                    roughness={0}
                />
            </mesh>
            <mesh position={[0, 0, 0.01]}>
                <ringGeometry args={[0.38, 0.4, 4, 1, 0, Math.PI * 2]} />
                <meshBasicMaterial color="#00d9ff" transparent opacity={0.5} />
            </mesh>
            <Text
                position={[0, 0, 0.02]}
                fontSize={0.05}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                font="/fonts/Inter-Bold.woff" // Assuming font exists or fallback
            >
                {text}
            </Text>
        </group>
    );
};

export default function AnalystRobot() {
    const actionElements = (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group position={[0, 0.2, 0.2]}>
                <HolographicPanel
                    position={[-0.6, 0.3, 0]}
                    rotation={[0, 0.4, 0]}
                    text="DATA_STREAM_01\nANALYZING..."
                />
                <HolographicPanel
                    position={[0.6, 0.1, -0.2]}
                    rotation={[0, -0.4, 0]}
                    text="NEURAL_PATH_VX\nSTABLE"
                />
                <HolographicPanel
                    position={[0, -0.3, 0.1]}
                    rotation={[-0.2, 0, 0]}
                    text="SENSORY_INPUT\nACTIVE"
                />
            </group>
        </Float>
    );

    return (
        <group scale={1.2}>
            <HumanoidModernBot actionElement={actionElements} glowColor="#00d9ff" />
        </group>
    );
}
