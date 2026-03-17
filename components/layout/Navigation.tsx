'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { navigationLinks } from '@/data/navigation';
import { transitions, DURATIONS } from '@/data/motion';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = navigationLinks;

  const [logoClicks, setLogoClicks] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  useEffect(() => {
    if (logoClicks === 5) {
      setShowEasterEgg(true);
      setLogoClicks(0);
      setTimeout(() => setShowEasterEgg(false), 5000);
    }
    const timer = setTimeout(() => setLogoClicks(0), 2000);
    return () => clearTimeout(timer);
  }, [logoClicks]);

  return (
    <nav
      className={`sticky lg:fixed top-0 w-full z-50 transition-all duration-700 ${scrolled
        ? 'py-3 lg:py-4 bg-[#F5F5F5] shadow-[0_2px_10px_rgba(0,0,0,0.08)]'
        : 'py-4 lg:py-10 bg-[#F5F5F5] shadow-[0_1px_3px_rgba(0,0,0,0.05)]'
        }`}
    >
      <div className="container mx-auto px-5 md:px-12 flex items-center justify-between relative">
        {/* Left: Logo Section */}
        <div className="flex-shrink-0 relative z-50">
          <div
            onClick={() => setLogoClicks(prev => prev + 1)}
            className="cursor-pointer"
          >
            <Link href="/" className="flex items-center group pointer-events-none">
              <div className="h-10 md:h-12 flex items-center transition-all duration-500">
                <img
                  src="/logo.png"
                  alt="Tech-DLT Official logo"
                  className="h-full w-auto object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Logo Easter Egg Popup */}
          <AnimatePresence>
            {showEasterEgg && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                className="absolute top-full left-0 mt-4 glass-card p-6 border-cyan-500/30 bg-black/90 backdrop-blur-xl w-64 z-[100] shadow-[0_0_30px_rgba(0,190,243,0.2)]"
              >
                <div className="font-mono text-[10px] text-cyan-400 mb-2">
                  {">"} TechDLT AI Console v1.0
                </div>
                <p className="text-white text-xs font-bold leading-relaxed mb-4">
                  Hello, curious human.<br />
                  You found the hidden interface.
                </p>
                <div className="text-slate-500 text-[9px] uppercase tracking-widest font-black italic">
                  Tip: Great AI starts with great curiosity.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Center: Desktop Menu */}
        <div className="hidden lg:flex flex-grow justify-center">
          <div className="flex items-center space-x-1">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.name} href={link.href} className="relative px-5 py-2 group">
                  <span className={`relative z-10 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-500 ${isActive ? 'text-[#1ba6c4]' : 'text-[#111] group-hover:text-[#1ba6c4]'}`}>
                    {link.name}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-x-4 bottom-0 h-[2px] bg-[#1ba6c4] shadow-[0_0_10px_rgba(27,166,196,0.4)]"
                      transition={transitions.micro}
                    />
                  )}
                  <div className="absolute inset-0 bg-[#1ba6c4]/5 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300 -z-10" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right: CTA Button & Mobile Menu Button */}
        <div className="flex items-center space-x-6 flex-shrink-0">
          <div className="hidden md:flex">
            <Link href="/contact" className="group relative px-8 py-3 bg-[#1ba6c4] text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full overflow-hidden transition-all shadow-[0_4px_14px_rgba(27,166,196,0.25)] hover:shadow-[0_6px_20px_rgba(27,166,196,0.4)] active:scale-95">
              <div
                className="absolute inset-0 bg-[#0d8da8] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500"
              />
              <span className="relative z-10 transition-colors duration-500">Initiate Link</span>
            </Link>
          </div>

          <div className="flex lg:hidden items-center">
            <button
              className="group relative z-50 w-12 h-12 flex flex-col justify-center items-center gap-1.5 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              suppressHydrationWarning
            >
              <motion.div
                animate={mobileMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                className="w-8 h-[2px] bg-[#111] group-hover:bg-[#1ba6c4] transition-colors"
              />
              <motion.div
                animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-8 h-[2px] bg-[#111]/60 group-hover:bg-[#1ba6c4] transition-colors"
              />
              <motion.div
                animate={mobileMenuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                className="w-8 h-[2px] bg-[#111] group-hover:bg-[#1ba6c4] transition-colors"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 bg-[#1ba6c4] z-40 flex flex-col items-center justify-center p-6"
          >
            <div className="flex flex-col space-y-8 text-center">
              {links.map((link, i) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-5xl font-black text-white hover:opacity-80 tracking-tighter items-center lowercase italic"
                >
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {link.name}<span className="text-white">.</span>
                  </motion.span>
                </Link>
              ))}
              <div className="pt-12">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-10 py-5 bg-white text-[#1ba6c4] rounded-full font-black uppercase tracking-widest text-xs hover:bg-[#F5F5F5] transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
