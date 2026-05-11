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
    <main className="relative min-h-screen">
      <AnimatePresence>
        {showIntro && (
          <IntroReveal onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      <BackgroundEffects />

      <div className="container mx-auto px-6 pt-16 pb-20 flex flex-col items-center">
        {/* Logo Fijo sobre el contenido */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col items-center gap-2 mb-12"
        >
          <div className="w-16 h-16 border border-rose-200 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-md shadow-sm">
            <span className="font-display italic text-3xl text-rose-400">GS</span>
          </div>
          <span className="font-sans text-[12px] font-semibold tracking-[0.5em] text-slate-700">ESTÉTICA INTEGRAL</span>
        </motion.div>

        {/* Contenido Hero Optimizado para Mobile */}
        <div className="text-center mb-10 max-w-2xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="font-display text-4xl md:text-7xl text-slate-800 mb-6 leading-tight"
          >
            Un Toque de <span className="italic text-rose-400">Resplandor</span>
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8 }}
            className="mb-6 inline-block px-6 py-2 bg-rose-50/50 backdrop-blur-sm rounded-full border border-rose-100"
          >
            <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-rose-500 font-bold">
              ✨ Tu mejor versión empieza con un mimo ✨
            </span>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="font-display italic text-2xl md:text-3xl text-slate-700"
          >
            Gira para descubrir tu regalo
          </motion.h3>
        </div>

        {/* Ruleta - Ajustada para Mobile */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="relative z-10 mb-20 scale-[0.95] md:scale-100"
        >
          <GlassRoulette onWin={setWinningPrize} />
        </motion.section>

        {/* Sección Info Simplificada */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="w-full max-w-lg border-t border-rose-100 pt-12 flex flex-col items-center gap-8"
        >
          <div className="flex flex-col items-center text-center">
            <h4 className="font-display text-xl text-slate-800 mb-2">Ubicación</h4>
            <div className="flex items-center gap-2 text-slate-500">
              <MapPin className="w-4 h-4 text-rose-300" />
              <span className="font-sans text-sm">Visítanos y renová tu energía</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a href="https://www.instagram.com/gs.esteticaintegral/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/50 rounded-full border border-rose-100 hover:border-rose-300 transition-all active:scale-90">
              <Instagram className="w-5 h-5 text-slate-600" />
            </a>
            <a href="#" className="p-3 bg-white/50 rounded-full border border-rose-100 hover:border-rose-300 transition-all active:scale-90">
              <Facebook className="w-5 h-5 text-slate-600" />
            </a>
          </div>
        </motion.section>
      </div>

      <WinModal 
        prize={winningPrize} 
        onClose={() => setWinningPrize(null)} 
      />

      <footer className="w-full py-8 text-center bg-white/30 backdrop-blur-md">
         <p className="font-sans text-[9px] uppercase tracking-[0.4em] text-slate-400">
           © 2026 GS Estética Integral • Desarrollado por BroadCastweb
         </p>
      </footer>
    </main>
  );
}
