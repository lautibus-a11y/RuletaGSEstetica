/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import IntroReveal from './components/IntroReveal';
import BackgroundEffects from './components/BackgroundEffects';
import GlassRoulette from './components/GlassRoulette';
import WinModal from './components/WinModal';
import { MapPin, Instagram, Facebook } from 'lucide-react';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [winningPrize, setWinningPrize] = useState<{ label: string; icon: any } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Automatic reveal after 5s or can be manual
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative h-screen overflow-hidden flex flex-col items-center justify-between py-10 px-6">
      <AnimatePresence>
        {showIntro && (
          <IntroReveal onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      <BackgroundEffects />

      {/* Logo Fijo sobre el contenido */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="flex flex-col items-center gap-1 z-20"
      >
        <div className="w-14 h-14 border border-rose-200 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-md shadow-sm">
          <span className="font-display italic text-2xl text-rose-400">GS</span>
        </div>
        <span className="font-sans text-[10px] font-semibold tracking-[0.4em] text-slate-700">ESTÉTICA INTEGRAL</span>
      </motion.div>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl z-10">
        {/* Contenido Hero */}
        <div className="text-center mb-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="font-display text-4xl md:text-6xl text-slate-800 mb-4 leading-tight"
          >
            Un Toque de <span className="italic text-rose-400">Resplandor</span>
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8 }}
            className="mb-4 inline-block px-4 py-1.5 bg-rose-50/50 backdrop-blur-sm rounded-full border border-rose-100"
          >
            <span className="font-sans text-[9px] uppercase tracking-[0.1em] text-rose-500 font-bold">
              ✨ Tu mejor versión empieza con un mimo ✨
            </span>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="font-display italic text-xl md:text-2xl text-slate-700"
          >
            Gira para descubrir tu regalo
          </motion.h3>
        </div>

        {/* Ruleta - Ajustada para no ocupar todo el alto */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="relative z-10 my-4 scale-[0.8] md:scale-90 lg:scale-100"
        >
          <GlassRoulette onWin={setWinningPrize} />
        </motion.section>
      </div>

      {/* Footer Simplificado al máximo */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="w-full flex flex-col items-center gap-4 z-20"
      >
        <div className="flex items-center gap-6">
          <a href="https://www.instagram.com/gs.esteticaintegral/" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/50 rounded-full border border-rose-100 hover:border-rose-300 transition-all active:scale-90">
            <Instagram className="w-4 h-4 text-slate-600" />
          </a>
          <div className="flex flex-col items-center">
            <span className="font-sans text-[8px] uppercase tracking-[0.3em] text-slate-400">
              © 2026 GS Estética Integral
            </span>
            <span className="font-sans text-[7px] uppercase tracking-[0.2em] text-slate-300 mt-1">
              Desarrollado por BroadCastweb
            </span>
          </div>
          <a href="#" className="p-2.5 bg-white/50 rounded-full border border-rose-100 hover:border-rose-300 transition-all active:scale-90">
            <Facebook className="w-4 h-4 text-slate-600" />
          </a>
        </div>
      </motion.section>

      <WinModal 
        prize={winningPrize} 
        onClose={() => setWinningPrize(null)} 
      />
    </main>
  );
}
