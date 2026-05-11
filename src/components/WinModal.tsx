import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2 } from 'lucide-react';

interface WinModalProps {
  prize: { label: string; icon: any } | null;
  onClose: () => void;
}

export default function WinModal({ prize, onClose }: WinModalProps) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({ name: '' });

  if (!prize) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    
    // Simulate API call
    setTimeout(() => {
      setStep('success');
    }, 800);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`¡Hola! Acabo de ganar "${prize.label}" en GS Estética Integral y me gustaría reclamar mi premio. Mi nombre es ${formData.name}.`);
    window.open(`https://wa.me/541161546312?text=${text}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/10 backdrop-blur-sm" 
        />
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-md glass shadow-[0_32px_128px_-16px_rgba(251,207,232,0.5)] rounded-[32px] overflow-hidden"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/20 transition-colors z-10"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>

          <div className="p-8 md:p-10 pt-12 text-center">
            {step === 'form' ? (
              <>
                <div className="mb-6 flex justify-center">
                   <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center animate-glow">
                      <prize.icon className="w-10 h-10 text-rose-400" />
                   </div>
                </div>
                
                <h2 className="font-display text-3xl text-slate-800 mb-2">¡Felicitaciones!</h2>
                <p className="font-sans text-slate-500 mb-8">
                  Has ganado <span className="text-rose-400 font-semibold">{prize.label}</span>. 
                  Ingresa tu nombre para reclamar tu voucher.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Nombre Completo"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-12 px-6 rounded-2xl bg-white/40 border border-rose-100 focus:border-rose-300 focus:ring-0 outline-none font-sans text-sm transition-all"
                      required
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full h-12 mt-4 bg-gradient-to-r from-rose-300 to-rose-400 text-white font-sans text-sm font-medium tracking-widest uppercase rounded-2xl shadow-lg shadow-rose-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    Reclamar mi Premio
                  </button>
                </form>
              </>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10"
              >
                <div className="mb-6 flex justify-center">
                   <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center">
                      <CheckCircle2 className="w-12 h-12 text-green-400" />
                   </div>
                </div>
                <h2 className="font-display text-3xl text-slate-800 mb-4">¡Voucher Reservado!</h2>
                <p className="font-sans text-slate-500 mb-8 px-4">
                  Tu regalo especial está listo. ¡Haz clic abajo para confirmar vía WhatsApp y reservar tu sesión!
                </p>
                <button 
                  onClick={handleWhatsApp}
                  className="w-full h-14 bg-green-500 text-white font-sans text-sm font-medium tracking-widest uppercase rounded-2xl shadow-lg shadow-green-100 hover:bg-green-600 flex items-center justify-center gap-3 transition-all cursor-pointer"
                >
                  <Send className="w-5 h-5" />
                  Confirmar por WhatsApp
                </button>
              </motion.div>
            )}
            
            <p className="mt-8 text-[10px] text-slate-400 uppercase tracking-[0.2em]">
              GS Estética Integral • Aplican términos y condiciones
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
