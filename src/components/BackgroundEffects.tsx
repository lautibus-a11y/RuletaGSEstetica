import React from 'react';

export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-brand-champagne">
      {/* Optimized Floating Orbs */}
      <div className="absolute top-[-5%] right-[-5%] w-[400px] h-[400px] bg-pink-100/30 rounded-full blur-[80px]" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-rose-50/30 rounded-full blur-[80px]" />
      
      {/* Subtle Texture Overlay - Simplified */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} 
      />

      {/* Reduced Sparkles */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full opacity-30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 2}px`,
              height: `${Math.random() * 3 + 2}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
