'use client';

import { useLayoutEffect, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { usePathname } from 'next/navigation';
import * as THREE from 'three';

import { DURATIONS } from '@/data/motion';

export const scrollRefs = {
    mainObject: { current: null as THREE.Object3D | null },
    secondaryObject: { current: null as THREE.Object3D | null },
    vfx: { current: null as THREE.Object3D | null },
};

// Target positions for each page
const pageCameraTargets: Record<string, { position: [number, number, number], rotation: [number, number, number] }> = {
    '/': { position: [0, 0, 10], rotation: [0, 0, 0] },
    '/about': { position: [5, 2, 8], rotation: [0, 0.5, 0] },
    '/services': { position: [-5, 3, 10], rotation: [0, -0.3, 0] },
    '/technology': { position: [0, -2, 12], rotation: [0.2, 0, 0] },
    '/careers': { position: [8, 0, 10], rotation: [0, 0.8, 0] },
    '/contact': { position: [0, 0, 15], rotation: [0, 0, 0] },
};

export default function ScrollController() {
    const { camera, scene } = useThree();
    const pathname = usePathname();

    // 1. PAGE TRANSITIONS (Camera Fly-through)
    useEffect(() => {
        const target = pageCameraTargets[pathname] || pageCameraTargets['/'];

        // Kill existing camera tweens to avoid conflicts
        gsap.killTweensOf(camera.position);
        gsap.killTweensOf(camera.rotation);

        // Fly to page sector
        gsap.to(camera.position, {
            x: target.position[0],
            y: target.position[1],
            z: target.position[2],
            duration: DURATIONS.CINEMATIC,
            ease: "expo.inOut"
        });

        gsap.to(camera.rotation, {
            x: target.rotation[0],
            y: target.rotation[1],
            z: target.rotation[2],
            duration: DURATIONS.CINEMATIC,
            ease: "expo.inOut"
        });

        // Ambient lighting shift based on page - matching cinematic timing
        if (pathname === '/about') {
            gsap.to(scene.fog, { far: 25, duration: DURATIONS.CINEMATIC, ease: "power2.inOut" });
        } else if (pathname === '/technology') {
            gsap.to(scene.fog, { far: 18, duration: DURATIONS.CINEMATIC, ease: "power2.inOut" });
        } else {
            gsap.to(scene.fog, { far: 20, duration: DURATIONS.CINEMATIC, ease: "power2.inOut" });
        }

    }, [pathname, camera, scene]);

    // 2. SCROLL CHOREOGRAPHY (Home Page Specific)
    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (pathname !== '/') return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: 'main',
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 2,
                    invalidateOnRefresh: true,
                }
            });

            // Home Page Scroll Stages
            tl.to(camera.position, { z: 6, duration: 1.5, ease: "power2.inOut" }, 0);

            // Chaos/Problem
            tl.to(camera.position, { z: 12, duration: 1.5 }, 1.5);
            if (scrollRefs.secondaryObject.current) {
                tl.to(scrollRefs.secondaryObject.current.scale, { x: 1, y: 1, z: 1, duration: 1 }, 1.5);
            }

            // Solution/Clarity
            tl.to(camera.position, { z: 8, duration: 1.5 }, 3);
            if (scrollRefs.secondaryObject.current) {
                tl.to(scrollRefs.secondaryObject.current.scale, { x: 0, y: 0, z: 0, duration: 1 }, 3);
            }
            if (scrollRefs.vfx.current) {
                tl.to(scrollRefs.vfx.current.scale, { x: 1, y: 1, z: 1, duration: 1 }, 3.5);
            }
        });

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [camera, scene, pathname]);

    return null;
}
