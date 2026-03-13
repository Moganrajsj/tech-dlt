'use client';

import { shaderMaterial } from "@react-three/drei";
import { extend, ReactThreeFiber } from "@react-three/fiber";
import * as THREE from "three";

const HolographicMaterialImpl = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color("#3b82f6"),
    rimColor: new THREE.Color("#ffffff"),
  },
  // Vertex Shader
  `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // Fragment Shader
  `
  uniform float time;
  uniform vec3 color;
  uniform vec3 rimColor;
  
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  
  void main() {
    vec3 viewDir = normalize(cameraPosition - vPosition);
    vec3 normal = normalize(vNormal);
    
    // Fresnel / Rim effect
    float fresnel = dot(viewDir, normal);
    fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
    fresnel = pow(fresnel, 2.0);
    
    // Scanlines
    float scanline = sin(vPosition.y * 50.0 - time * 5.0) * 0.5 + 0.5;
    
    // Noise/grain
    float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453);
    
    // Combine
    vec3 finalColor = mix(color, rimColor, fresnel);
    float h_alpha = fresnel + (scanline * 0.1) + (noise * 0.05);
    
    gl_FragColor = vec4(finalColor, h_alpha * 0.8);
  }
  `
);

extend({ HolographicMaterialImpl });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      holographicMaterialImpl: any;
    }
  }
}

// Wrapper component to handle frame updates
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function HolographicMaterial(props: any) {
  const ref = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  // @ts-ignore
  return <holographicMaterialImpl ref={ref} transparent blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} {...props} />;
}
