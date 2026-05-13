import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { cn } from '@/src/lib/utils';
import { Sparkles, Gift, Heart, Star, Sparkle, Zap, Flower, Scissors } from 'lucide-react';

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

function HelpCircle(props: any) {
    return <Flower {...props} />; // Using Flower as fallback if HelpCircle feels too medical/less aesthetic
}

interface GlassRouletteProps {
  onWin: (prize: typeof PRIZES[0]) => void;
}

export default function GlassRoulette({ onWin }: GlassRouletteProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const controls = useAnimation();
  const wheelRef = useRef<HTMLDivElement>(null);

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

    // Roulette has 8 segments (45 degrees each)
    const segmentAngle = 360 / PRIZES.length;
    const spins = 8 + Math.floor(Math.random() * 5); // 8-13 full rotations
    // The pointer is at the top (0 deg). 
    // Segment 0 is at -segmentAngle/2 to +segmentAngle/2
    // To land on selectedPrize.id, we need to rotate so that segment is at 0 deg.
    // The rotation is clockwise.
    const targetRotation = spins * 360 - (selectedPrize.id * segmentAngle);
    
    // Add some random offset within the segment for realism
    const offset = (Math.random() - 0.5) * (segmentAngle * 0.7);
    const finalRotation = targetRotation + offset;

    await controls.start({
      rotate: finalRotation,
      transition: {
        duration: 8,
        ease: [0.2, 0.8, 0.3, 1], // Very smooth deceleration
      },
    });

    setRotation(finalRotation % 360);
    setIsSpinning(false);
    
    // Trigger confetti
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#fbcfe8', '#fdf2f8', '#ffffff', '#fb7185'],
      ticks: 400
    });

    setTimeout(() => {
        onWin(selectedPrize);
    }, 1000);
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Pointer */}
      <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 z-30 filter drop-shadow-xl">
        <motion.div 
          animate={isSpinning ? {
            rotate: [0, -5, 5, -5, 5, 0],
            transition: { repeat: Infinity, duration: 0.4 }
          } : { rotate: 0 }}
          className="w-8 h-12 bg-white glass flex items-center justify-center rounded-b-full shadow-lg border-rose-200 origin-top"
        >
           <div className="w-2 h-2 bg-rose-300 rounded-full animate-pulse" />
        </motion.div>
      </div>

      {/* Roulette Wheel */}
      <div className="relative w-[320px] h-[320px] md:w-[500px] md:h-[500px] rounded-full shadow-[0_32px_64px_-16px_rgba(251,207,232,0.4)] glass-dark overflow-hidden">
        {/* Background glow inner */}
        <div className="absolute inset-0 rounded-full border border-white/40 z-10 pointer-events-none" />
        
        <motion.div
           animate={controls}
           initial={{ rotate: 0 }}
           style={{ willChange: 'transform' }}
           className="w-full h-full relative origin-center"
        >
          {PRIZES.map((prize, index) => {
            const angle = (360 / PRIZES.length) * index;
            const nextAngle = (360 / PRIZES.length) * (index + 1);
            
            // Calculate SVG path for the segment
            const startAngle = (angle - 90) * (Math.PI / 180);
            const endAngle = (nextAngle - 90) * (Math.PI / 180);
            
            const x1 = 50 + 50 * Math.cos(startAngle);
            const y1 = 50 + 50 * Math.sin(startAngle);
            const x2 = 50 + 50 * Math.cos(endAngle);
            const y2 = 50 + 50 * Math.sin(endAngle);
            
            const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;

            return (
              <div
                key={prize.id}
                className="absolute inset-0"
              >
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible">
                  <path 
                    d={pathData} 
                    fill={index % 2 === 0 ? "rgba(255, 241, 242, 0.95)" : "rgba(255, 255, 255, 0.98)"}
                    stroke="rgba(251, 207, 232, 0.4)"
                    strokeWidth="0.5"
                  />
                </svg>

                {/* Prize Content Centered in Segment (SVG Only) */}
                <div 
                  className="absolute inset-0 flex flex-col items-center pt-10 md:pt-16 pointer-events-none"
                  style={{ transform: `rotate(${angle + (360 / PRIZES.length) / 2}deg)` }}
                >
                   <div className="flex flex-col items-center">
                     <prize.icon className="w-8 h-8 md:w-14 md:h-14 text-rose-500/90 mb-3 drop-shadow-sm" />
                   </div>
                </div>

                {/* Decoration: Outer Perimeter Pin */}
                <div 
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full border border-rose-100 shadow-sm z-20"
                  style={{ transform: `translateX(-50%) rotate(${angle}deg) translateY(6px)` }}
                />
              </div>
            );
          })}
          
          <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none shadow-inner" />
        </motion.div>

        {/* Center Button */}
        <div className="absolute inset-0 flex items-center justify-center z-40 bg-transparent">
           <button 
             onClick={spin}
             disabled={isSpinning}
             className={cn(
               "w-24 h-24 md:w-32 md:h-32 rounded-full glass shadow-2xl flex items-center justify-center group transition-all duration-500",
               isSpinning ? "opacity-50 cursor-not-allowed" : "hover:scale-105 active:scale-95 cursor-pointer"
             )}
           >
             <div className="absolute inset-2 border border-rose-200/30 rounded-full group-hover:scale-110 transition-transform duration-700" />
             <div className="flex flex-col items-center">
               <span className="font-display italic text-2xl md:text-3xl text-rose-400">GS</span>
               <span className="font-sans text-[8px] md:text-[10px] tracking-[0.3em] text-rose-300 uppercase mt-1">Girar</span>
             </div>
           </button>
        </div>
      </div>

      {/* Floating Sparkles around wheel */}
      <AnimatePresence>
        {!isSpinning && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -inset-10 pointer-events-none"
          >
              <Sparkle className="absolute top-10 right-10 w-4 h-4 text-rose-200 animate-pulse" />
              <Sparkle className="absolute bottom-10 left-10 w-3 h-3 text-rose-100 animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 -left-4 w-1 h-1 bg-rose-200 rounded-full animate-ping" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
