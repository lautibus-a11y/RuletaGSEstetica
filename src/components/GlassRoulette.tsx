import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, useAnimation, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { cn } from '@/src/lib/utils';
import { Sparkles, Heart, Star, Sparkle, Zap, Flower, Scissors } from 'lucide-react';
import { gsap } from 'gsap';

const PRIZES = [
  { id: 0, label: 'Reflexología + limpieza de cutis + peeling ($35.000)', icon: Sparkles, color: '#fdf2f8', probability: 0.125 },
  { id: 1, label: 'Limpieza profunda + aparatología x 2 ($36.000)', icon: Zap, color: '#fbcfe8', probability: 0.125 },
  { id: 2, label: 'Facial + masaje relajante espalda ($35.000)', icon: Heart, color: '#fdf2f8', probability: 0.125 },
  { id: 3, label: 'Masajes integral con reflexología ($30.000)', icon: Flower, color: '#fbcfe8', probability: 0.125 },
  { id: 4, label: 'Dermaplaning peeling con bisturí + aparatología ($25.000)', icon: Scissors, color: '#fdf2f8', probability: 0.125 },
  { id: 5, label: 'Pase libre aparatología corporal x zona ($30.000)', icon: Sparkle, color: '#fbcfe8', probability: 0.125 },
  { id: 6, label: 'Facial incluye peeling + aparatología ($25.000)', icon: Star, color: '#fdf2f8', probability: 0.125 },
  { id: 7, label: 'Lifting de pestañas + diseño de cejas ($22.000)', icon: Sparkles, color: '#fbcfe8', probability: 0.125 },
];

interface GlassRouletteProps {
  onWin: (prize: typeof PRIZES[0]) => void;
}

export default function GlassRoulette({ onWin }: GlassRouletteProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const controls = useAnimation();
  const winAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    winAudio.current = new Audio('/win.mp3');
  }, []);

  // Pre-calculate segments background for performance
  const wheelBackground = useMemo(() => {
    return PRIZES.map((_, index) => {
      const segmentAngle = 360 / PRIZES.length;
      const angle = segmentAngle * index;
      const nextAngle = segmentAngle * (index + 1);
      
      const startAngle = (angle - 90) * (Math.PI / 180);
      const endAngle = (nextAngle - 90) * (Math.PI / 180);
      
      const x1 = 50 + 50 * Math.cos(startAngle);
      const y1 = 50 + 50 * Math.sin(startAngle);
      const x2 = 50 + 50 * Math.cos(endAngle);
      const y2 = 50 + 50 * Math.sin(endAngle);
      
      const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;
      return (
        <path 
          key={index}
          d={pathData} 
          fill={index % 2 === 0 ? "rgba(255, 241, 242, 0.98)" : "rgba(255, 255, 255, 1)"}
          stroke="rgba(251, 207, 232, 0.3)"
          strokeWidth="0.2"
        />
      );
    });
  }, []);

  const spin = async () => {
    if (isSpinning) return;
    setIsSpinning(true);
    
    // Weighted selection logic
    const totalWeight = PRIZES.reduce((acc, p) => acc + p.probability, 0);
    let random = Math.random() * totalWeight;
    let selectedPrize = PRIZES[0];
    
    for (const prize of PRIZES) {
      if (random < prize.probability) {
        selectedPrize = prize;
        break;
      }
      random -= prize.probability;
    }

    const segmentAngle = 360 / PRIZES.length;
    const spins = 10 + Math.floor(Math.random() * 5); // Increased spins for better feel
    const targetRotation = spins * 360 - (selectedPrize.id * segmentAngle);
    const offset = (Math.random() - 0.5) * (segmentAngle * 0.7);
    const finalRotation = targetRotation + offset;

    await controls.start({
      rotate: finalRotation,
      transition: {
        duration: 7, // Slightly faster for responsiveness
        ease: [0.15, 0, 0.15, 1], // Custom snappy but smooth ease
      },
    });

    setIsSpinning(false);
    
    if (winAudio.current) {
      winAudio.current.currentTime = 0;
      winAudio.current.play().catch(e => console.log("Audio play failed:", e));
    }
    
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#fbcfe8', '#fdf2f8', '#ffffff', '#fb7185'],
      ticks: 400
    });

    setTimeout(() => {
        onWin(selectedPrize);
    }, 800);
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Pointer */}
      <div className="absolute top-[-25px] left-1/2 -translate-x-1/2 z-30">
        <motion.div 
          animate={isSpinning ? {
            rotate: [0, -8, 8, -8, 8, 0],
            transition: { repeat: Infinity, duration: 0.3 }
          } : { rotate: 0 }}
          className="w-7 h-11 bg-white flex items-center justify-center rounded-b-full shadow-lg border border-rose-100 origin-top"
        >
           <div className="w-2 h-2 bg-rose-400 rounded-full" />
        </motion.div>
      </div>

      {/* Roulette Wheel Container */}
      <div className="relative w-[310px] h-[310px] md:w-[480px] md:h-[480px] rounded-full shadow-[0_20px_50px_rgba(251,207,232,0.3)] bg-white/10 overflow-hidden border border-white/30">
        <motion.div
           animate={controls}
           initial={{ rotate: 0 }}
           style={{ 
             willChange: 'transform',
             transformStyle: 'preserve-3d',
             backfaceVisibility: 'hidden'
           }}
           className="w-full h-full relative origin-center"
        >
          {/* Static Background SVG for all segments */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
            {wheelBackground}
          </svg>

          {/* Prize Icons and Pins */}
          {PRIZES.map((prize, index) => {
            const angle = (360 / PRIZES.length) * index;
            return (
              <React.Fragment key={prize.id}>
                {/* Prize Icon */}
                <div 
                  className="absolute inset-0 flex flex-col items-center pt-10 md:pt-16 pointer-events-none"
                  style={{ transform: `rotate(${angle + (360 / PRIZES.length) / 2}deg)` }}
                >
                   <prize.icon className="w-8 h-8 md:w-14 md:h-14 text-rose-500/80 mb-3" />
                </div>

                {/* Outer Pin */}
                <div 
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-rose-100 rounded-full z-20"
                  style={{ transform: `translateX(-50%) rotate(${angle}deg) translateY(6px)` }}
                />
              </React.Fragment>
            );
          })}
        </motion.div>

        {/* Center Button */}
        <div className="absolute inset-0 flex items-center justify-center z-40">
           <button 
             onClick={spin}
             disabled={isSpinning}
             className={cn(
               "w-20 h-20 md:w-28 md:h-28 rounded-full glass shadow-xl flex items-center justify-center group transition-all duration-300",
               isSpinning ? "opacity-40 cursor-not-allowed" : "hover:scale-105 active:scale-95 cursor-pointer"
             )}
           >
             <div className="flex flex-col items-center">
               <span className="font-display italic text-2xl md:text-3xl text-rose-400">GS</span>
               <span className="font-sans text-[8px] md:text-[9px] tracking-[0.2em] text-rose-300 uppercase">Girar</span>
             </div>
           </button>
        </div>
      </div>

      {/* Floating Sparkles */}
      <AnimatePresence>
        {!isSpinning && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -inset-8 pointer-events-none"
          >
              <Sparkle className="absolute top-8 right-8 w-4 h-4 text-rose-200 animate-pulse" />
              <Sparkle className="absolute bottom-8 left-8 w-3 h-3 text-rose-100 animate-pulse" style={{ animationDelay: '1s' }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
