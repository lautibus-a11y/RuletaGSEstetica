import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'motion/react';

interface IntroRevealProps {
  onComplete: () => void;
}

export default function IntroReveal({ onComplete }: IntroRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 1,
            delay: 0.5,
            onComplete
          });
        }
      });

      tl.fromTo('.petal', {
        y: 'random(100, 1000)',
        opacity: 0,
        scale: 0,
        rotate: 'random(0, 360)'
      }, {
        y: '-=500',
        x: '+=random(-100, 100)',
        opacity: 'random(0.4, 0.8)',
        scale: 'random(0.5, 1.5)',
        rotate: '+=720',
        duration: 'random(5, 8)',
        stagger: {
          each: 0.1,
          from: "random"
        },
        repeat: -1,
        yoyo: true,
        ease: 'none'
      });

      tl.fromTo(logoRef.current, 
        { scale: 0.8, opacity: 0, filter: 'blur(10px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 2, ease: 'expo.out' },
        0.5
      );

      tl.fromTo(textRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: 'power2.out' },
        "-=1"
      );

      tl.to('.line-reveal', {
        width: '100%',
        duration: 1.5,
        ease: 'power4.inOut'
      }, "-=0.5");
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white overflow-hidden"
    >
      {/* Fondos animados */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-rose-100/50 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-red-50/50 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Pétalos Rojos Flotantes Distribuidos (Más transparentes) */}
      {Array.from({ length: 40 }).map((_, i) => (
        <div 
          key={i} 
          className="petal absolute z-10 pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: '18px',
            height: '24px',
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.4) 0%, rgba(220, 38, 38, 0.3) 100%)',
            borderRadius: '50% 0 50% 50%',
            boxShadow: 'inset -2px -2px 5px rgba(0,0,0,0.05)',
            filter: 'blur(0.5px)'
          }}
        />
      ))}

      <div className="relative z-20 flex flex-col items-center">
        <div ref={logoRef} className="mb-8 relative">
          <div className="w-24 h-24 border border-rose-200 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-md">
            <span className="font-display italic text-4xl text-rose-400">GS</span>
          </div>
          <div className="absolute -inset-4 border border-rose-100/30 rounded-full animate-spin-slow" style={{ animationDuration: '10s' }} />
        </div>

        <div ref={textRef} className="text-center px-4">
          <h1 className="font-display text-4xl md:text-5xl tracking-[0.2em] text-slate-800 mb-4 uppercase">
            GS Estética Integral
          </h1>
          <div className="w-0 h-[1px] bg-rose-200 mx-auto line-reveal mb-4" />
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-rose-400">
            Tu belleza en buenas manos
          </p>
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        onClick={onComplete}
        className="absolute bottom-12 font-sans text-[10px] uppercase tracking-[0.5em] text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
      >
        Desliza para entrar
      </motion.button>
    </div>
  );
}
