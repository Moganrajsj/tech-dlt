'use client';

export default function Lighting() {
    return (
        <>
            <ambientLight intensity={1.5} color="#ffffff" />
            <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
            <pointLight position={[-5, -5, 5]} intensity={1} color="#3b82f6" distance={20} />
            <spotLight position={[0, 10, 0]} intensity={1} angle={0.5} penumbra={1} color="#eff6ff" />
        </>
    );
}
