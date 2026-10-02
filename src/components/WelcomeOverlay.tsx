import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { soundManager } from '../utils/sound';
import { triggerLoveConfetti } from '../utils/confetti';
import { Heart, Sparkles, Music, VolumeX, Volume2, Gift, ArrowRight } from 'lucide-react';

interface WelcomeOverlayProps {
  onExplore: () => void;
  onOpenSurprise: () => void;
}

export const WelcomeOverlay: React.FC<WelcomeOverlayProps> = ({ onExplore, onOpenSurprise }) => {
  const { isMuted, toggleMute, isAmbientPlaying, toggleAmbientMusic } = useApp();
  const [step, setStep] = useState<number>(1);

  const handleStartMelody = () => {
    soundManager.playShimmerSound();
    if (!isAmbientPlaying) {
      toggleAmbientMusic();
    }
  };

  const handleOpenSurpriseClick = () => {
    soundManager.playUnboxCelebrationSound();
    triggerLoveConfetti();
    onOpenSurprise();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 text-white overflow-hidden p-4">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-radial-gradient from-rose-900/30 via-slate-950 to-slate-950 pointer-events-none" />
      
      {/* Background Floating Light Spheres */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-rose-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Top Ambient Audio Bar on Welcome Screen */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-3">
        <button
          onClick={() => { handleStartMelody(); }}
          className={`px-4 py-2 rounded-2xl text-xs font-semibold backdrop-blur-md border transition-all flex items-center gap-2 ${
            isAmbientPlaying
              ? 'bg-rose-500/20 border-rose-500/50 text-rose-200 shadow-lg shadow-rose-950/50 animate-pulse'
              : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
          }`}
        >
          <Music className={`w-4 h-4 ${isAmbientPlaying ? 'text-rose-400 animate-spin' : ''}`} />
          {isAmbientPlaying ? 'Romantic Music Playing 🎵' : 'Play Romantic Music'}
        </button>

        <button
          onClick={toggleMute}
          className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-rose-400" />}
        </button>
      </div>

      {/* Central Welcome Card */}
      <div className="relative z-10 max-w-xl w-full text-center space-y-8 animate-fade-in px-4">
        
        {/* Glowing Heart Logo Icon */}
        <div className="relative inline-block group cursor-pointer" onClick={() => setStep((prev) => (prev % 3) + 1)}>
          <div className="absolute -inset-4 bg-gradient-to-r from-rose-600 via-pink-500 to-amber-400 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse" />
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-slate-950 border-2 border-rose-500/40 flex items-center justify-center mx-auto shadow-2xl">
            <Heart className="w-12 h-12 sm:w-14 sm:h-14 text-rose-500 fill-rose-500 animate-bounce" />
          </div>
        </div>

        {/* Text Sequence */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs uppercase tracking-widest font-sans font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Luxury Couples & Wedding Experience
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-amber-200">
            Welcome to Janno ❤️
          </h1>

          <p className="font-serif text-lg sm:text-xl text-rose-200/90 italic font-light">
            “Where your love story becomes a beautiful memory.”
          </p>

          <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            Some memories deserve more than a photo… <span className="text-rose-300 font-semibold">they deserve a story.</span>
          </p>
        </div>

        {/* Question Banner */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-rose-500/20 backdrop-blur-md max-w-md mx-auto">
          <p className="text-sm font-medium text-rose-200">
            Are you ready for a beautiful surprise? ✨
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={handleOpenSurpriseClick}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 text-white font-bold text-sm shadow-xl shadow-rose-950/80 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 border border-rose-400/30"
          >
            <Gift className="w-5 h-5 text-amber-300 animate-bounce" />
            <span>Open My Surprise 💝</span>
          </button>

          <button
            onClick={onExplore}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/90 border border-rose-500/30 text-rose-200 hover:text-white font-bold text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
          >
            <span>Begin Your Love Story ✨</span>
            <ArrowRight className="w-4 h-4 text-rose-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
