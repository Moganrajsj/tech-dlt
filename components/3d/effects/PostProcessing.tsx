'use client';

import React from 'react';
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";

import { BlendFunction } from "postprocessing";

export default function PostProcessing({ quality = 'high' }: { quality?: 'high' | 'low' }): React.ReactNode {
    if (quality === 'low') return null;

    // Type casting to bypass React 19 / @react-three/postprocessing mismatches
    const NoiseAny = Noise as any;
    const VignetteAny = Vignette as any;

    // @ts-ignore
    // const noiseElement = <NoiseAny opacity={0.02} blendFunction={BlendFunction.OVERLAY} />;

    // @ts-ignore
    // const vignetteElement = <VignetteAny offset={0.5} darkness={0.5} eskil={false} blendFunction={BlendFunction.NORMAL} />;

    return (
        <EffectComposer enableNormalPass={false}>
            {/* Cinematic Bloom - Soft glow */}
            <Bloom
                intensity={0.5}
                luminanceThreshold={0.8}
                luminanceSmoothing={0.9}
                mipmapBlur
            />

            {/* Subtle Film Grain for realism */}
            {/* {noiseElement} */}

            {/* Cinematic Vignette */}
            {/* {vignetteElement} */}
        </EffectComposer>
    );
}
