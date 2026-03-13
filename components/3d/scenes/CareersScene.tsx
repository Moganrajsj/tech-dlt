'use client';

import { Sparkles, PerspectiveCamera } from '@react-three/drei';

export default function CareersScene() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />
            <ambientLight intensity={1.5} />
            {/* Upward Energy */}
            <Sparkles count={800} scale={[20, 20, 10]} size={4} speed={2} opacity={0.6} color="#3b82f6" />
            <fog attach="fog" args={['#ffffff', 8, 25]} />
        </>
    );
}
