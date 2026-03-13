'use client';

import { useRef, useMemo, Suspense } from 'react';
import { useFrame, useThree, extend } from '@react-three/fiber';
import { Float, Sparkles, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { usePathname } from 'next/navigation';

// --- HOLOGRAPHIC SHADER SYSTEM ---

// 1. Generic Hologram Shader: Scanlines, Fresnel, Glow
const HologramMaterial = shaderMaterial(
    {
        uTime: 0,
        uColor: new THREE.Color("#00bef3"),
        uOpacity: 0.5,
    },
    // Vertex Shader
    `
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
    // Fragment Shader
    `
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uOpacity;

    void main() {
        vec3 viewDir = normalize(-vPosition);
        float fresnel = pow(1.0 - dot(viewDir, vNormal), 3.0);
        
        // Scanlines
        float scanline = sin(vUv.y * 200.0 + uTime * 5.0) * 0.1 + 0.9;
        
        // Flickering
        float flicker = sin(uTime * 20.0) * 0.05 + 0.95;
        
        float alpha = uOpacity * (fresnel + 0.1) * scanline * flicker;
        gl_FragColor = vec4(uColor, alpha);
    }
    `
);

// 2. Holographic Grid Shader
const GridMaterial = shaderMaterial(
    {
        uTime: 0,
        uColor: new THREE.Color("#00bef3"),
    },
    `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
    `
    varying vec2 vUv;
    uniform float uTime;
    uniform vec3 uColor;

    void main() {
        vec2 grid = abs(fract(vUv * 10.0 - 0.5) - 0.5) / fwidth(vUv * 10.0);
        float line = min(grid.x, grid.y);
        float mask = 1.0 - min(line, 1.0);
        
        // Moving pulse
        float pulse = sin(vUv.y * 10.0 - uTime * 2.0) * 0.5 + 0.5;
        
        gl_FragColor = vec4(uColor, mask * 0.2 * pulse);
    }
    `
);

extend({ HologramMaterial, GridMaterial });

declare global {
    namespace JSX {
        interface IntrinsicElements {
            hologramMaterial: any;
            gridMaterial: any;
        }
    }
}

// --- SHARED CONFIG ---
const THEME = {
    primary: "#00bef3",
    secondary: "#3b82f6",
    background: "#02040a"
};

// --- SCENE COMPONENTS ---

// 1. HUD Circles / Rings Component
const HUDCircle = ({ radius, speed, opacity, rotation = [0, 0, 0] }: any) => {
    const ref = useRef<THREE.Mesh>(null!);
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.z += state.clock.getDelta() * speed;
            const mat = ref.current.material as THREE.ShaderMaterial;
            if (mat.uniforms) mat.uniforms.uTime.value = state.clock.getElapsedTime();
        }
    });

    return (
        <mesh ref={ref} rotation={rotation}>
            <ringGeometry args={[radius, radius + 0.02, 128]} />
            <shaderMaterial
                transparent
                side={THREE.DoubleSide}
                uniforms={{
                    uTime: { value: 0 },
                    uColor: { value: new THREE.Color(THEME.primary) },
                    uOpacity: { value: opacity }
                }}
                vertexShader={`
                    varying vec2 vUv;
                    void main() {
                        vUv = uv;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `}
                fragmentShader={`
                    varying vec2 vUv;
                    uniform float uTime;
                    uniform vec3 uColor;
                    uniform float uOpacity;
                    void main() {
                        float dash = step(0.5, sin(vUv.x * 50.0 + uTime * 2.0));
                        gl_FragColor = vec4(uColor, uOpacity * dash);
                    }
                `}
            />
        </mesh>
    );
};

// 2. Floating Interface Panel
const FloatingPanel = ({ position, scale = [1, 1, 1], rotation = [0, 0, 0] }: any) => {
    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} position={position}>
            <mesh rotation={rotation} scale={scale}>
                <planeGeometry args={[1, 1]} />
                <shaderMaterial
                    transparent
                    side={THREE.DoubleSide}
                    uniforms={{
                        uTime: { value: 0 },
                        uColor: { value: new THREE.Color(THEME.primary) }
                    }}
                    vertexShader={`
                        varying vec2 vUv;
                        void main() {
                            vUv = uv;
                            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                        }
                    `}
                    fragmentShader={`
                        varying vec2 vUv;
                        uniform float uTime;
                        uniform vec3 uColor;
                        void main() {
                            vec2 border = step(0.98, abs(vUv - 0.5) * 2.0);
                            float mask = max(border.x, border.y);
                            float scanline = sin(vUv.y * 100.0 + uTime * 10.0) * 0.1 + 0.9;
                            gl_FragColor = vec4(uColor, (mask * 0.5 + 0.1) * scanline);
                        }
                    `}
                />
            </mesh>
        </Float>
    );
};

// HOME: Central Intelligence Core
const HomeScene = () => {
    const coreRef = useRef<THREE.Mesh>(null!);
    useFrame((state) => {
        if (coreRef.current) {
            coreRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
            const mat = coreRef.current.material as THREE.ShaderMaterial;
            if (mat.uniforms) mat.uniforms.uTime.value = state.clock.getElapsedTime();
        }
    });

    return (
        <group>
            {/* Pulsing Core */}
            <Float speed={3} rotationIntensity={1} floatIntensity={2}>
                <mesh ref={coreRef}>
                    <sphereGeometry args={[1.2, 64, 64]} />
                    <shaderMaterial
                        transparent
                        uniforms={{
                            uTime: { value: 0 },
                            uColor: { value: new THREE.Color(THEME.primary) },
                            uOpacity: { value: 0.6 }
                        }}
                        vertexShader={`
                            varying vec3 vNormal;
                            varying vec2 vUv;
                            void main() {
                                vNormal = normalize(normalMatrix * normal);
                                vUv = uv;
                                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                            }
                        `}
                        fragmentShader={`
                            varying vec3 vNormal;
                            varying vec2 vUv;
                            uniform float uTime;
                            uniform vec3 uColor;
                            uniform float uOpacity;
                            void main() {
                                float pulse = sin(uTime * 2.0) * 0.1 + 0.9;
                                float fresnel = pow(1.0 - dot(vec3(0.0, 0.0, 1.0), vNormal), 2.0);
                                float scanline = sin(vUv.y * 50.0 + uTime * 5.0) * 0.2 + 0.8;
                                gl_FragColor = vec4(uColor, uOpacity * (fresnel + 0.1) * pulse * scanline);
                            }
                        `}
                    />
                </mesh>
            </Float>

            {/* Orbiting HUD Elements */}
            <HUDCircle radius={2} speed={0.2} opacity={0.3} rotation={[Math.PI / 2.5, 0.2, 0]} />
            <HUDCircle radius={2.2} speed={-0.3} opacity={0.2} rotation={[Math.PI / 3, -0.4, 0]} />

            {/* Floating Dashboards */}
            <FloatingPanel position={[3, 1, -2]} scale={[2, 1.2, 1]} rotation={[0, -0.5, 0]} />
            <FloatingPanel position={[-3, -1, -1]} scale={[1.5, 1, 1]} rotation={[0, 0.5, 0]} />

            <Sparkles count={100} scale={12} size={2} speed={0.5} opacity={0.4} color={THEME.primary} />
        </group>
    );
};

// ABOUT: AI Research Lab (Neural Waves + Panels)
const NeuralWaves = () => {
    const meshRef = useRef<THREE.Mesh>(null!);
    useFrame((state) => {
        if (meshRef.current) {
            const mat = meshRef.current.material as THREE.ShaderMaterial;
            if (mat.uniforms) mat.uniforms.uTime.value = state.clock.getElapsedTime();
        }
    });

    return (
        <group>
            <group position={[0, -2, -5]} rotation={[-Math.PI / 3, 0, 0]}>
                <mesh ref={meshRef}>
                    <planeGeometry args={[30, 30, 100, 100]} />
                    <shaderMaterial
                        transparent
                        uniforms={{
                            uTime: { value: 0 },
                            uColor: { value: new THREE.Color(THEME.primary) }
                        }}
                        vertexShader={`
                            varying vec2 vUv;
                            uniform float uTime;
                            void main() {
                                vUv = uv;
                                vec3 pos = position;
                                pos.z += sin(pos.x * 0.3 + uTime * 0.5) * 1.5;
                                pos.z += cos(pos.y * 0.2 + uTime * 0.7) * 1.0;
                                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                            }
                        `}
                        fragmentShader={`
                            varying vec2 vUv;
                            uniform float uTime;
                            uniform vec3 uColor;
                            void main() {
                                float grid = abs(fract(vUv.y * 20.0 - uTime * 0.1) - 0.5);
                                float mask = smoothstep(0.48, 0.5, grid);
                                gl_FragColor = vec4(uColor, mask * 0.15);
                            }
                        `}
                    />
                </mesh>
            </group>

            <FloatingPanel position={[4, 2, -3]} scale={[3, 2, 1]} rotation={[0, -0.8, 0]} />
            <FloatingPanel position={[-4, -2, -2]} scale={[2, 1.5, 1]} rotation={[0, 0.8, 0]} />

            <Sparkles count={150} scale={15} size={1} speed={0.4} opacity={0.3} color={THEME.primary} />
        </group>
    );
};

// SERVICES: AI Operations Grid (Nodes + Modular Panels)
const DataGrid = () => {
    const gridRef = useRef<THREE.Mesh>(null!);
    useFrame((state) => {
        if (gridRef.current) {
            const mat = gridRef.current.material as THREE.ShaderMaterial;
            if (mat.uniforms) mat.uniforms.uTime.value = state.clock.getElapsedTime();
        }
    });

    return (
        <group>
            <group position={[0, -5, -10]} rotation={[-Math.PI / 2, 0, 0]}>
                <mesh ref={gridRef}>
                    <planeGeometry args={[50, 50]} />
                    <shaderMaterial
                        transparent
                        side={THREE.DoubleSide}
                        uniforms={{
                            uTime: { value: 0 },
                            uColor: { value: new THREE.Color(THEME.secondary) }
                        }}
                        vertexShader={`
                            varying vec2 vUv;
                            void main() {
                                vUv = uv;
                                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                            }
                        `}
                        fragmentShader={`
                            varying vec2 vUv;
                            uniform float uTime;
                            uniform vec3 uColor;
                            void main() {
                                vec2 grid = abs(fract(vUv * 15.0) - 0.5);
                                float line = min(grid.x, grid.y);
                                float mask = step(0.48, 1.0 - line);
                                
                                // Dynamic flow
                                float flow = sin(vUv.x * 10.0 + vUv.y * 5.0 - uTime * 2.0) * 0.5 + 0.5;
                                gl_FragColor = vec4(uColor, mask * 0.2 * flow);
                            }
                        `}
                    />
                </mesh>
            </group>

            <FloatingPanel position={[0, 3, -15]} scale={[10, 6, 1]} />
            <HUDCircle radius={4} speed={0.1} opacity={0.1} rotation={[Math.PI / 2, 0, 0]} position={[0, -4.9, -10]} />

            <Sparkles count={120} scale={20} size={2} speed={0.3} opacity={0.4} color={THEME.primary} />
        </group>
    );
};

// TECHNOLOGY: Computational Tunnel
const LightTunnel = () => {
    const meshRef = useRef<THREE.Mesh>(null!);
    useFrame((state) => {
        if (meshRef.current) {
            const mat = meshRef.current.material as THREE.ShaderMaterial;
            if (mat.uniforms) mat.uniforms.uTime.value = state.clock.getElapsedTime();
            meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.1;
        }
    });

    return (
        <group position={[0, 0, -15]}>
            <mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[6, 6, 60, 64, 1, true]} />
                <shaderMaterial
                    transparent
                    side={THREE.BackSide}
                    uniforms={{
                        uTime: { value: 0 },
                        uColor: { value: new THREE.Color(THEME.primary) }
                    }}
                    vertexShader={`
                        varying vec2 vUv;
                        void main() {
                            vUv = uv;
                            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                        }
                    `}
                    fragmentShader={`
                        varying vec2 vUv;
                        uniform float uTime;
                        uniform vec3 uColor;
                        void main() {
                            float gridX = abs(fract(vUv.x * 20.0) - 0.5);
                            float gridY = abs(fract(vUv.y * 5.0 - uTime * 1.5) - 0.5);
                            float mask = step(0.49, max(gridX, gridY));
                            
                            float fade = smoothstep(0.0, 0.4, vUv.y) * smoothstep(1.0, 0.6, vUv.y);
                            gl_FragColor = vec4(uColor, mask * 0.6 * fade);
                        }
                    `}
                />
            </mesh>

            <HUDCircle radius={3} speed={0.5} opacity={0.3} rotation={[0, 0, 0]} />
            <HUDCircle radius={3.5} speed={-0.2} opacity={0.1} rotation={[0, 0, 0]} />

            <Sparkles count={200} scale={[15, 15, 40]} size={2} speed={2} opacity={0.6} color={THEME.primary} />
        </group>
    );
};

// CAREERS: Evolution Workspace (Light Beams + Bubbles)
const AscensionStreams = () => {
    return (
        <group>
            {/* Uplifting Beams with Shader */}
            {Array.from({ length: 20 }).map((_, i) => (
                <Float key={i} speed={2 + Math.random() * 2} rotationIntensity={0} floatIntensity={5}>
                    <mesh position={[(Math.random() - 0.5) * 20, -15, (Math.random() - 0.5) * 15]}>
                        <cylinderGeometry args={[0.01, 0.05, 30]} />
                        <shaderMaterial
                            transparent
                            uniforms={{
                                uTime: { value: 0 },
                                uColor: { value: new THREE.Color(THEME.primary) }
                            }}
                            vertexShader={`
                                varying vec2 vUv;
                                void main() {
                                    vUv = uv;
                                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                                }
                            `}
                            fragmentShader={`
                                varying vec2 vUv;
                                uniform float uTime;
                                uniform vec3 uColor;
                                void main() {
                                    float fade = smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.8, vUv.y);
                                    float scan = sin(vUv.y * 10.0 - uTime * 2.0) * 0.1 + 0.9;
                                    gl_FragColor = vec4(uColor, 0.15 * fade * scan);
                                }
                            `}
                        />
                    </mesh>
                </Float>
            ))}

            {/* Structural HUD Lines */}
            {Array.from({ length: 12 }).map((_, i) => (
                <Float key={`l-${i}`} speed={1} rotationIntensity={0} floatIntensity={8}>
                    <mesh position={[(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 5]} rotation={[0, 0, Math.PI / 2]}>
                        <planeGeometry args={[3, 0.01]} />
                        <meshBasicMaterial color={THEME.primary} transparent opacity={0.2} />
                    </mesh>
                </Float>
            ))}

            {/* Opportunity Panels */}
            <FloatingPanel position={[4, 2, -5]} scale={[2, 1.5, 1]} rotation={[0, -0.6, 0]} />
            <FloatingPanel position={[-5, 4, -8]} scale={[1.8, 1, 1]} rotation={[0, 0.5, 0]} />

            {/* Friendly Data Bubbles */}
            {Array.from({ length: 10 }).map((_, i) => (
                <Float key={`b-${i}`} speed={2} rotationIntensity={0.5} floatIntensity={3}>
                    <mesh position={[(Math.random() - 0.5) * 25, (Math.random() - 0.5) * 20, -5]}>
                        <sphereGeometry args={[0.25, 16, 16]} />
                        <meshBasicMaterial color={THEME.primary} transparent opacity={0.15} wireframe />
                    </mesh>
                </Float>
            ))}

            <Sparkles count={300} scale={[40, 40, 20]} size={2} speed={0.5} opacity={0.4} color="#ffffff" />
        </group>
    );
};

// CONTACT: Signal Hub (Communication Rings + Radiating Signals)
const EnergyRings = () => {
    const groupRef = useRef<THREE.Group>(null!);
    const signalRef = useRef<THREE.Group>(null!);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
            groupRef.current.children.forEach((child: any, i) => {
                if (child.material?.uniforms) {
                    child.material.uniforms.uTime.value = state.clock.getElapsedTime();
                }
            });
        }
        if (signalRef.current) {
            signalRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
            signalRef.current.children.forEach((child: any) => {
                if (child.material) {
                    child.material.opacity = 0.05 + Math.sin(state.clock.getElapsedTime() * 2.0) * 0.05;
                }
            });
        }
    });

    return (
        <group position={[0, 0, -8]}>
            <group ref={groupRef}>
                {/* Central Communication Core */}
                <mesh>
                    <sphereGeometry args={[0.15, 32, 32]} />
                    <shaderMaterial
                        transparent
                        uniforms={{
                            uTime: { value: 0 },
                            uColor: { value: new THREE.Color(THEME.primary) }
                        }}
                        vertexShader={`void main() { gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`}
                        fragmentShader={`
                            uniform float uTime;
                            uniform vec3 uColor;
                            void main() {
                                float pulse = sin(uTime * 15.0) * 0.5 + 0.5;
                                gl_FragColor = vec4(uColor, 0.5 + pulse * 0.5);
                            }
                        `}
                    />
                </mesh>

                {/* Orbiting Dashed HUD Rings */}
                {[2.5, 4, 5.5, 7].map((r, i) => (
                    <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
                        <ringGeometry args={[r, r + 0.02, 128]} />
                        <shaderMaterial
                            transparent
                            side={THREE.DoubleSide}
                            uniforms={{
                                uTime: { value: 0 },
                                uColor: { value: new THREE.Color(THEME.primary) },
                                uOpacity: { value: 0.4 }
                            }}
                            vertexShader={`
                                varying vec3 vPosition;
                                void main() {
                                    vPosition = position;
                                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                                }
                            `}
                            fragmentShader={`
                                varying vec3 vPosition;
                                uniform float uTime;
                                uniform vec3 uColor;
                                uniform float uOpacity;
                                void main() {
                                    float angle = atan(vPosition.y, vPosition.x);
                                    float dash = step(0.5, sin(angle * (20.0 + float(${i})) + uTime * 4.0));
                                    gl_FragColor = vec4(uColor, uOpacity * dash);
                                }
                            `}
                        />
                    </mesh>
                ))}
            </group>

            {/* Radiating Signal Lines */}
            <group ref={signalRef}>
                {Array.from({ length: 36 }).map((_, i) => {
                    const angle = (i / 36) * Math.PI * 2;
                    return (
                        <mesh key={i} rotation={[0, 0, angle]}>
                            <planeGeometry args={[12, 0.005]} />
                            <meshBasicMaterial color={THEME.primary} transparent opacity={0.1} blending={THREE.AdditiveBlending} />
                        </mesh>
                    );
                })}
            </group>

            {/* Floating Communication Panels */}
            <FloatingPanel position={[5, 2, -6]} scale={[2.5, 1.5, 1]} rotation={[0, -0.7, 0]} />
            <FloatingPanel position={[-6, -2, -5]} scale={[2, 1.2, 1]} rotation={[0, 0.6, 0]} />

            <Sparkles count={120} scale={[25, 25, 10]} size={3} speed={0.5} opacity={0.4} color={THEME.secondary} />
        </group>
    );
};

// --- GLOBAL CAMERA CONTROLLER ---
const CameraTransitionController = () => {
    const pathname = usePathname();
    const vec = new THREE.Vector3();

    const targetState = useMemo(() => {
        if (pathname === '/' || pathname === '') return { pos: [0, 0, 10], lookAt: [0, 0, 0] };
        if (pathname.includes('/about')) return { pos: [0, 2, 8], lookAt: [0, 0, 0] };
        if (pathname.includes('/services')) return { pos: [0, 5, 12], lookAt: [0, 0, 0] };
        if (pathname.includes('/technology')) return { pos: [0, 0, 15], lookAt: [0, 0, -20] };
        if (pathname.includes('/careers')) return { pos: [0, -5, 10], lookAt: [0, 10, 0] };
        if (pathname.includes('/contact')) return { pos: [0, 0, 12], lookAt: [0, 0, 0] };
        return { pos: [0, 0, 10], lookAt: [0, 0, 0] };
    }, [pathname]);

    useFrame((state, delta) => {
        state.camera.position.lerp(vec.set(...targetState.pos as [number, number, number]), delta * 1.5);
        state.camera.lookAt(...targetState.lookAt as [number, number, number]);
    });

    return null;
};

// --- MAIN ENGINE ---
const AILaboratoryEnvironment = () => {
    const pathname = usePathname();
    const isHome = pathname === '/' || pathname === '';

    const getScene = () => {
        if (isHome) return <HomeScene />;
        if (pathname.includes('/about')) return <NeuralWaves />;
        if (pathname.includes('/services')) return <DataGrid />;
        if (pathname.includes('/technology')) return <LightTunnel />;
        if (pathname.includes('/careers')) return <AscensionStreams />;
        if (pathname.includes('/contact')) return <EnergyRings />;
        return <HomeScene />;
    };

    return (
        <group>
            <CameraTransitionController />
            <fog attach="fog" args={[THEME.background, 5, 30]} />

            <Suspense fallback={null}>
                <group>{getScene()}</group>
            </Suspense>
        </group>
    );
};

export default AILaboratoryEnvironment;
