'use client';

import { useEffect, useRef } from 'react';

const NeuralGridBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number>(0);
    const timeRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = Math.max(window.innerHeight, document.documentElement.scrollHeight);
        };
        resizeCanvas();

        window.addEventListener('resize', resizeCanvas);

        // Particles setup
        const particles: { x: number, y: number, size: number, speedX: number, speedY: number, opacity: number }[] = [];
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }

        const draw = () => {
            if (!ctx || !canvas) return;

            timeRef.current += 0.002;
            const time = timeRef.current;

            // Deep Cinematic Black Background Gradient
            const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            bgGradient.addColorStop(0, '#05070d');
            bgGradient.addColorStop(1, '#020409');
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 1. Subtle Animated Blue Neural Grid (3% Opacity)
            const gridSize = 100;
            ctx.strokeStyle = 'rgba(0, 234, 255, 0.03)';
            ctx.lineWidth = 1;

            for (let x = 0; x < canvas.width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
            for (let y = 0; y < canvas.height; y += gridSize) {
                const offset = Math.sin(time + y * 0.001) * 20; // Subtle motion
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.setLineDash([5, offset + 50]); // Animated dash
                ctx.stroke();
            }
            ctx.setLineDash([]);

            // 2. Floating AI Particles in Neon Cyan
            particles.forEach(p => {
                p.x += p.speedX;
                p.y += p.speedY;

                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                // Soft Blur Glow for particles
                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
                gradient.addColorStop(0, `rgba(0, 234, 255, ${p.opacity})`);
                gradient.addColorStop(1, 'rgba(0, 234, 255, 0)');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
                ctx.fill();

                // Core particle
                ctx.fillStyle = `rgba(0, 234, 255, ${p.opacity * 1.5})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // 3. Neural Connections (Subtle)
            ctx.strokeStyle = 'rgba(0, 234, 255, 0.02)';
            ctx.lineWidth = 0.5;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 200) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            animationFrameRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#05070d]">
            <canvas
                ref={canvasRef}
                className="absolute inset-0"
            />
        </div>
    );
};

export default NeuralGridBackground;
