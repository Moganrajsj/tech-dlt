'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Suspense, ReactNode } from 'react';
import type { OrbitControls as OrbitControlsType } from 'three-stdlib';
import * as THREE from 'three';

interface InteractiveRobotSceneProps {
    children: ReactNode;
    cameraPosition?: [number, number, number];
    enableManualControls?: boolean;
    enableAutoRotate?: boolean;
    autoResetDelay?: number; // Seconds of inactivity before auto-reset
    className?: string;
}

// Camera controller that handles auto-reset
function CameraController({
    controlsRef,
    autoResetDelay = 5,
    initialPosition
}: {
    controlsRef: React.RefObject<OrbitControlsType | null>;
    autoResetDelay: number;
    initialPosition: [number, number, number];
}) {
    const lastInteractionTime = useRef(Date.now());
    const isResetting = useRef(false);

    useEffect(() => {
        const controls = controlsRef.current;
        if (!controls) return;

        const handleInteraction = () => {
            lastInteractionTime.current = Date.now();
            isResetting.current = false;
        };

        // Listen for user interactions
        controls.addEventListener('start', handleInteraction);
        controls.addEventListener('change', handleInteraction);

        return () => {
            controls.removeEventListener('start', handleInteraction);
            controls.removeEventListener('change', handleInteraction);
        };
    }, [controlsRef]);

    useFrame((state) => {
        const controls = controlsRef.current;
        if (!controls) return;

        const timeSinceInteraction = (Date.now() - lastInteractionTime.current) / 1000;

        // Auto-reset camera after inactivity
        if (timeSinceInteraction > autoResetDelay && !isResetting.current) {
            isResetting.current = true;

            // Smoothly lerp camera back to initial position
            const targetPosition = new THREE.Vector3(...initialPosition);
            const currentPosition = state.camera.position;

            // Gentle lerp back to original position
            currentPosition.lerp(targetPosition, 0.02);

            // Reset target to center
            const currentTarget = controls.target;
            const targetCenter = new THREE.Vector3(0, 0, 0);
            currentTarget.lerp(targetCenter, 0.02);

            controls.update();

            // Check if reset is complete
            if (currentPosition.distanceTo(targetPosition) < 0.01) {
                isResetting.current = false;
                lastInteractionTime.current = Date.now();
            }
        }
    });

    return null;
}

export default function InteractiveRobotScene({
    children,
    cameraPosition = [0, 0, 5],
    enableManualControls = true,
    enableAutoRotate = false,
    autoResetDelay = 5,
    className = "w-full h-full"
}: InteractiveRobotSceneProps) {
    const controlsRef = useRef<OrbitControlsType>(null);

    return (
        <div className={className}>
            <Canvas
                camera={{
                    position: cameraPosition,
                    fov: 50,
                    near: 0.1,
                    far: 1000
                }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance"
                }}
            >
                <Suspense fallback={null}>
                    {/* Lighting setup */}
                    <ambientLight intensity={0.3} />
                    <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
                    <directionalLight position={[-5, 3, -5]} intensity={0.5} color="#60A5FA" />
                    <directionalLight position={[0, -5, -5]} intensity={0.8} color="#00BEF3" />
                    <Environment preset="city" />

                    {/* Robot model */}
                    {children}

                    {/* Premium Interactive Controls */}
                    {enableManualControls && (
                        <>
                            <OrbitControls
                                ref={controlsRef}

                                // Smooth cinematic damping
                                enableDamping={true}
                                dampingFactor={0.08}

                                // Rotation
                                enableRotate={true}
                                rotateSpeed={0.5}

                                // Zoom with limits
                                enableZoom={true}
                                zoomSpeed={0.6}
                                minDistance={3}
                                maxDistance={8}

                                // No panning
                                enablePan={false}

                                // Angle constraints
                                minPolarAngle={Math.PI / 4}
                                maxPolarAngle={Math.PI / 1.5}

                                // Optional auto-rotate
                                autoRotate={enableAutoRotate}
                                autoRotateSpeed={0.5}

                                target={[0, 0, 0]}
                                makeDefault
                            />

                            {/* Auto-reset controller */}
                            <CameraController
                                controlsRef={controlsRef}
                                autoResetDelay={autoResetDelay}
                                initialPosition={cameraPosition}
                            />
                        </>
                    )}
                </Suspense>
            </Canvas>
        </div>
    );
}
