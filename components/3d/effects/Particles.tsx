'use client';

import { Sparkles } from '@react-three/drei';

export default function Particles({
    count = 100,
    scale = 10,
    size = 2,
    speed = 0.4,
    opacity = 0.6,
    color = "#3b82f6"
}: {
    count?: number;
    scale?: number | [number, number, number];
    size?: number;
    speed?: number;
    opacity?: number;
    color?: string;
}) {
    return (
        <Sparkles
            count={count}
            scale={scale}
            size={size}
            speed={speed}
            opacity={opacity}
            color={color}
        />
    );
}
