'use client';

import React, { useEffect, useRef } from 'react';
import { Renderer, Camera, Transform, Geometry, Program, Mesh, Color } from 'ogl';

interface ThreadsBackgroundProps {
    amplitude?: number;
    enableMouseInteraction?: boolean;
}

const vertex = `
  attribute vec3 position;
  attribute float offset;

  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uAmplitude;
  uniform vec2 uMouse;

  varying float vHighlight;

  void main() {
    vec3 pos = position;
    
    // Create organic waving motion
    float noise = sin(pos.x * 1.5 + uTime + offset) * cos(pos.y * 1.0 + uTime * 0.5);
    pos.z += noise * uAmplitude;
    pos.y += sin(pos.x * 0.5 + uTime * 0.2) * 0.2;

    // Mouse parallax
    pos.x += uMouse.x * (pos.z + 1.0) * 0.1;
    pos.y += uMouse.y * (pos.z + 1.0) * 0.1;

    vHighlight = smoothstep(-0.2, 0.2, pos.z);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragment = `
  precision highp float;
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vHighlight;

  void main() {
    float alpha = uOpacity * (0.3 + vHighlight * 0.7);
    gl_FragColor = vec4(uColor, alpha);
  }
`;

const ThreadsBackground: React.FC<ThreadsBackgroundProps> = ({
    amplitude = 0.4,
    enableMouseInteraction = true,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;

        const renderer = new Renderer({
            alpha: true,
            antialias: true
        });
        const gl = renderer.gl;
        container.appendChild(gl.canvas);

        const camera = new Camera(gl, { fov: 45 });
        camera.position.z = 4;

        const scene = new Transform();

        function resize() {
            const width = container.clientWidth;
            const height = container.clientHeight;
            if (width && height) {
                renderer.setSize(width, height);
                camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
            }
        }
        window.addEventListener('resize', resize, false);
        resize();

        const threadCount = 60;
        const pointsPerThread = 80;
        const meshes: Mesh[] = [];

        const threadColors = [
            new Color('#2563eb'), // electric blue
            new Color('#00d4ff'), // cyan
            new Color('#3b82f6'), // soft teal glow (approx)
        ];

        for (let i = 0; i < threadCount; i++) {
            const positions = new Float32Array(pointsPerThread * 3);
            const offsets = new Float32Array(pointsPerThread);

            const xBase = (Math.random() - 0.5) * 8;
            const yBase = (Math.random() - 0.5) * 6;
            const zBase = (Math.random() - 0.5) * 2;
            const angle = (Math.random() - 0.5) * 0.5; // Slight diagonal angle
            const speed = 0.15 + Math.random() * 0.3;

            for (let j = 0; j < pointsPerThread; j++) {
                const t = j / (pointsPerThread - 1);
                const x = (t - 0.5) * 5;
                const y = x * angle;

                positions.set([x, y, 0], j * 3);
                offsets[j] = Math.random() * 10;
            }

            const geometry = new Geometry(gl, {
                position: { size: 3, data: positions },
                offset: { size: 1, data: offsets },
            });

            const program = new Program(gl, {
                vertex,
                fragment,
                uniforms: {
                    uTime: { value: 0 },
                    uColor: { value: threadColors[i % threadColors.length] },
                    uOpacity: { value: 0.1 + Math.random() * 0.15 },
                    uAmplitude: { value: amplitude },
                    uMouse: { value: [0, 0] },
                },
                transparent: true,
                depthTest: true,
                depthWrite: false,
            });

            const mesh = new Mesh(gl, { mode: gl.LINE_STRIP, geometry, program });
            mesh.position.set(xBase, yBase, zBase);
            (mesh as any).userData = { speed, xBase, yBase };

            scene.addChild(mesh);
            meshes.push(mesh);
        }

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        };
        if (enableMouseInteraction) {
            window.addEventListener('mousemove', handleMouseMove);
        }

        let request: number;
        const update = (t: number) => {
            request = requestAnimationFrame(update);
            const time = t * 0.001;

            meshes.forEach((mesh, i) => {
                mesh.program.uniforms.uTime.value = time * (mesh as any).userData.speed;
                mesh.program.uniforms.uMouse.value = [
                    mouseRef.current.x * 0.5,
                    mouseRef.current.y * 0.5
                ];

                // Subtle slow movement across the screen
                mesh.position.x = (mesh as any).userData.xBase + Math.sin(time * 0.1 + i) * 0.2;
                mesh.position.y = (mesh as any).userData.yBase + Math.cos(time * 0.08 + i) * 0.2;
            });

            renderer.render({ scene, camera });
        };
        request = requestAnimationFrame(update);

        return () => {
            cancelAnimationFrame(request);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            if (container.contains(gl.canvas)) {
                container.removeChild(gl.canvas);
            }
        };
    }, [amplitude, enableMouseInteraction]);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 z-0"
            style={{ pointerEvents: 'none' }}
        />
    );
};

export default ThreadsBackground;
