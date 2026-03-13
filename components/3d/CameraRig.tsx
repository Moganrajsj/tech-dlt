'use client';

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function CameraRig({ children }: { children: React.ReactNode }) {
    const group = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (group.current) {
            // Subtle rotation based on mouse or time
            // Implementing the user's requested subtle movement
            group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;

            // Optional: Add mouse parallax if desired later
            // const mouseX = state.mouse.x * 0.5;
            // const mouseY = state.mouse.y * 0.5;
            // group.current.rotation.y += (mouseX - group.current.rotation.y) * 0.05;
            // group.current.rotation.x += (-mouseY - group.current.rotation.x) * 0.05;
        }
    });

    return <group ref={group}>{children}</group>;
}
