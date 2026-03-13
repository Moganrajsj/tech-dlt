'use client';

import { useRef, useLayoutEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export default function SceneTransition({ children }: { children: React.ReactNode }) {
    const group = useRef<THREE.Group>(null);

    useLayoutEffect(() => {
        if (!group.current) return;

        // Reset state
        group.current.scale.set(0.9, 0.9, 0.9);
        // Access materials if possible to fade opacity, but often scenes have many materials.
        // Easiest "cinematic" entrance is scale + subtle rotation + position drift.

        const ctx = gsap.context(() => {
            gsap.to(group.current!.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 1.5,
                ease: "power3.out"
            });

            // Optional: Add a "dolly in" effect
            gsap.from(group.current!.position, {
                z: -2,
                duration: 1.5,
                ease: "expo.out"
            });
        }, group);

        // Cleanup: animate out? 
        // For simple route switches, the component unmounts. 
        // To animate out, we'd need AnimatePresence-like logic which requires a global store.
        // For now, let's focus on premium *entrance*.

        return () => ctx.revert();
    }, []);

    return <group ref={group}>{children}</group>;
}
