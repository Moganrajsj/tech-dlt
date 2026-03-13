'use client';

import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Suspense, ReactNode } from 'react';
import type { OrbitControls as OrbitControlsType } from 'three-stdlib';

interface RobotSceneProps {
    children: ReactNode;
    cameraPosition?: [number, number, number];
    enableControls?: boolean;
    enableAutoRotate?: boolean;
    className?: string;
}

export default function RobotScene({
    children,
    cameraPosition = [0, 0, 5],
    enableControls = true,
    enableAutoRotate = false,
    className = "w-full h-full"
}: RobotSceneProps) {
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
                    {/* Ambient lighting */}
                    <ambientLight intensity={0.3} />

                    {/* Key light */}
                    <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />

                    {/* Fill light */}
                    <directionalLight position={[-5, 3, -5]} intensity={0.5} color="#60A5FA" />

                    {/* Rim light */}
                    <directionalLight position={[0, -5, -5]} intensity={0.8} color="#00BEF3" />

                    {/* Environment for reflections */}
                    <Environment preset="city" />

                    {/* Robot model */}
                    {children}

                    {/* Premium Interactive Controls */}
                    {enableControls && (
                        <OrbitControls
                            ref={controlsRef}

                            // Smooth damping for cinematic feel
                            enableDamping={true}
                            dampingFactor={0.08}

                            // Rotation controls
                            enableRotate={true}
                            rotateSpeed={0.5} // Gentle rotation

                            // Zoom controls with limits
                            enableZoom={true}
                            zoomSpeed={0.6}
                            minDistance={3} // Prevent getting too close
                            maxDistance={8} // Prevent zooming too far

                            // Pan disabled for focused experience
                            enablePan={false}

                            // Angle limits - keep camera above ground
                            minPolarAngle={Math.PI / 4} // 45 degrees from top
                            maxPolarAngle={Math.PI / 1.5} // 120 degrees (prevent going under)

                            // Azimuth limits (optional - remove for 360° rotation)
                            // minAzimuthAngle={-Math.PI / 2}
                            // maxAzimuthAngle={Math.PI / 2}

                            // Auto-rotate when idle (optional)
                            autoRotate={enableAutoRotate}
                            autoRotateSpeed={0.5} // Slow, cinematic

                            // Target (what the camera looks at)
                            target={[0, 0, 0]}

                            // Make controls feel premium
                            makeDefault
                        />
                    )}
                </Suspense>
            </Canvas>
        </div>
    );
}
