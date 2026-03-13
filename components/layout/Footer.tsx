'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { usePathname } from 'next/navigation';
import FooterEmail from './FooterEmail';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pathname = usePathname();
    const [dimFactor, setDimFactor] = useState(1);

    const { ref: heroRef, inView: heroInView } = useInView({
        threshold: 0.2,
        triggerOnce: true,
    });

    const { ref: linksRef, inView: linksInView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    // Dimming effect ref for scroll-based background dimming
    const { ref: dimRef, inView: footerInView } = useInView({
        threshold: 0.1,
        triggerOnce: false,
    });

    // Animated gradient background
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;
        let currentDim = 1;

        const resize = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };

        resize();
        window.addEventListener('resize', resize);

        // Floating particles
        const particles: Array<{
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            opacity: number;
        }> = [];

        // Create particles
        const particleCount = window.innerWidth < 768 ? 20 : 40;
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.offsetWidth,
                y: Math.random() * canvas.offsetHeight,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.2,
                speedY: (Math.random() - 0.5) * 0.2,
                opacity: Math.random() * 0.3 + 0.1,
            });
        }

        const animate = () => {
            time += 0.005;

            // Smoothly transition the dimming factor when footer is in view
            const targetDim = footerInView ? 0.8 : 1;
            currentDim += (targetDim - currentDim) * 0.05;

            ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

            // Animated gradient background - Light Theme
            const gradient = ctx.createLinearGradient(
                0,
                0,
                canvas.offsetWidth,
                canvas.offsetHeight
            );

            // Soft white/blue gradient
            const hue1 = 200 + Math.sin(time) * 10;
            const hue2 = 210 + Math.cos(time * 0.7) * 10;

            // Very subtle gradient on white background
            gradient.addColorStop(0, `hsla(${hue1}, 70%, 98%, 1)`);
            gradient.addColorStop(0.5, `hsla(${hue2}, 60%, 96%, 1)`);
            gradient.addColorStop(1, `hsla(${hue1 + 10}, 70%, 94%, 1)`);

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

            // Update and draw particles 
            particles.forEach((particle) => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.offsetWidth;
                if (particle.x > canvas.offsetWidth) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.offsetHeight;
                if (particle.y > canvas.offsetHeight) particle.y = 0;

                const finalOpacity = particle.opacity;

                // Draw particle (Brand Blue)
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 190, 243, ${finalOpacity})`; // Tech-DLT Blue
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [footerInView]);

    const footerLinks = {
        company: [
            { name: 'Home', href: '/' },
            { name: 'About Us', href: '/about' },
            { name: 'Services', href: '/services' },
            { name: 'Store', href: '/store' },
            { name: 'Careers', href: '/careers' },
            { name: 'Contact', href: '/contact' },
        ],
        solutions: [
            { name: 'SAP Consulting', href: '/services' },
            { name: 'Blockchain', href: '/services' },
            { name: 'AI Development', href: '/services' },
            { name: 'ERP Solutions', href: '/services' },
            { name: 'Market Research', href: '/store' },
        ],
        legal: [
            { name: 'Privacy Policy', href: '/privacy' },
            { name: 'Terms of Service', href: '/terms' },
            { name: 'Cookie Policy', href: '/cookies' },
        ],
    };

    return (
        <footer
            ref={dimRef}
            className="relative overflow-hidden border-t border-slate-200 z-50"
            style={{ backgroundColor: '#ffffff !important', color: '#0f172a !important' }} // Force Light Theme
        >
            {/* 1. Animated Background Canvas - Light Mode Force */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
            />

            {/* Main Content Wrapper */}
            <div className="relative z-10 pt-20 pb-12">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

                        {/* 1. Brand Section (3 Cols) */}
                        <div className="lg:col-span-3 space-y-6">
                            <Link href="/" className="inline-block relative z-20">
                                <div className="h-12 flex items-center">
                                    <img src="/logo.png" alt="Tech-DLT Logo" className="h-full w-auto object-contain" />
                                </div>
                            </Link>
                            <p className="text-base leading-relaxed text-slate-600 font-medium pr-4">
                                Architecting futuristic business management systems through intelligent technology and professional global expertise.
                            </p>

                            <div className="flex space-x-3">
                                {/* Instagram */}
                                <Link
                                    href="https://instagram.com/techdlt"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 bg-white border border-slate-200 text-slate-500 hover:text-[#00bef3] hover:border-[#00bef3] hover:shadow-md hover:-translate-y-1 group relative z-20"
                                    aria-label="Instagram"
                                >
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </Link>

                                {/* Facebook */}
                                <Link
                                    href="https://facebook.com/techdlt"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 bg-white border border-slate-200 text-slate-500 hover:text-[#00bef3] hover:border-[#00bef3] hover:shadow-md hover:-translate-y-1 group relative z-20"
                                    aria-label="Facebook"
                                >
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </Link>

                                {/* X (Twitter) */}
                                <Link
                                    href="https://x.com/techdlt"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 bg-white border border-slate-200 text-slate-500 hover:text-[#00bef3] hover:border-[#00bef3] hover:shadow-md hover:-translate-y-1 group relative z-20"
                                    aria-label="X (Twitter)"
                                >
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        {/* 2. Company Links (2 Cols) */}
                        <div className="lg:col-span-2 pl-0 lg:pl-4">
                            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-6">Company</h4>
                            <ul className="space-y-3">
                                {footerLinks.company.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-slate-600 hover:text-[#00bef3] transition-colors font-medium text-[15px] block py-1"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 3. Solutions Links (2 Cols) */}
                        <div className="lg:col-span-2">
                            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-6">Solutions</h4>
                            <ul className="space-y-3">
                                {footerLinks.solutions.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-slate-600 hover:text-[#00bef3] transition-colors font-medium text-[15px] block py-1"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 4. Legal Links (2 Cols) */}
                        <div className="lg:col-span-2">
                            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-6">Legal</h4>
                            <ul className="space-y-3">
                                {footerLinks.legal.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-slate-600 hover:text-[#00bef3] transition-colors font-medium text-[15px] block py-1"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 5. Quick Inquiry (3 Cols) */}
                        <div className="lg:col-span-3">
                            <FooterEmail />
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-slate-200/60 transition-colors">
                    <div className="container mx-auto px-6 md:px-12">
                        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                            <div className="text-sm font-semibold text-slate-500">
                                © {currentYear} Tech-DLT • Building for the Future
                            </div>

                            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
                                <Link href="mailto:info@techdlt.com" className="font-bold text-sm text-slate-600 hover:text-[#00bef3] transition-colors uppercase tracking-wider">
                                    info@techdlt.com
                                </Link>
                                <Link href="tel:+919952449499" className="font-bold text-sm text-slate-600 hover:text-[#00bef3] transition-colors uppercase tracking-wider">
                                    +91 99524 49499
                                </Link>
                                <Link href="tel:+85262645265" className="font-bold text-sm text-slate-600 hover:text-[#00bef3] transition-colors uppercase tracking-wider">
                                    +852 6264 5265
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
