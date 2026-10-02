import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { soundManager } from '../utils/sound';
import { triggerWeddingFireworks, triggerLoveConfetti } from '../utils/confetti';
import { Clock, Heart, Sparkles, PartyPopper, Calendar } from 'lucide-react';
import { Ring } from '../components/RingIcon';

export const CountdownsPage: React.FC = () => {
  const { coupleProfile, addToast } = useApp();

  // Wedding Countdown Timer state
  const [weddingDays, setWeddingDays] = useState(127);
  const [weddingHours, setWeddingHours] = useState(8);
  const [weddingMinutes, setWeddingMinutes] = useState(42);
  const [weddingSeconds, setWeddingSeconds] = useState(19);

  // Anniversary Countdown Timer state
  const [annivDays, setAnnivDays] = useState(260);
  const [annivHours, setAnnivHours] = useState(14);
  const [annivMinutes, setAnnivMinutes] = useState(22);
  const [annivSeconds, setAnnivSeconds] = useState(45);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      
      // Wedding date calculation
      const weddingDateObj = new Date(coupleProfile.weddingDate || '2027-06-12');
      const wDiff = Math.max(0, weddingDateObj.getTime() - now.getTime());
      const wD = Math.floor(wDiff / (1000 * 60 * 60 * 24));
      const wH = Math.floor((wDiff / (1000 * 60 * 60)) % 24);
      const wM = Math.floor((wDiff / 1000 / 60) % 60);
      const wS = Math.floor((wDiff / 1000) % 60);

      setWeddingDays(wD);
      setWeddingHours(wH);
      setWeddingMinutes(wM);
      setWeddingSeconds(wS);

      // Anniversary calculation
      const annivDateObj = new Date(coupleProfile.relationshipStartDate);
      annivDateObj.setFullYear(now.getFullYear() + (now > annivDateObj ? 1 : 0));
      const aDiff = Math.max(0, annivDateObj.getTime() - now.getTime());
      const aD = Math.floor(aDiff / (1000 * 60 * 60 * 24));
      const aH = Math.floor((aDiff / (1000 * 60 * 60)) % 24);
      const aM = Math.floor((aDiff / 1000 / 60) % 60);
      const aS = Math.floor((aDiff / 1000) % 60);

      setAnnivDays(aD);
      setAnnivHours(aH);
      setAnnivMinutes(aM);
      setAnnivSeconds(aS);
    }, 1000);

    return () => clearInterval(timer);
  }, [coupleProfile]);

  const handleTestWeddingCelebration = () => {
    soundManager.playUnboxCelebrationSound();
    triggerWeddingFireworks();
    addToast('The Big Day Fireworks Triggered! 💍🎉', 'love');
  };

  const handleTestAnnivCelebration = () => {
    soundManager.playShimmerSound();
    triggerLoveConfetti();
    addToast('Happy Anniversary Celebration Triggered! ❤️🎉', 'love');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold uppercase tracking-wider">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          Eternal Clocks of Love
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
          Anniversary & Wedding Countdowns
        </h1>
        <p className="text-sm text-slate-300">
          Counting down every single second until your next golden milestones.
        </p>
      </div>

      {/* 1. WEDDING COUNTDOWN BOARD */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-amber-950/80 via-slate-900 to-rose-950/80 border-2 border-amber-500/40 shadow-2xl space-y-8 text-center relative overflow-hidden">
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center justify-center gap-2">
            <Ring className="w-4 h-4" /> The Big Day Is Coming 💍
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            {coupleProfile.partner1Name} & {coupleProfile.partner2Name}’s Wedding Day
          </h2>
          <p className="text-xs text-slate-300">Target Date: {coupleProfile.weddingDate || 'June 12, 2027'}</p>
        </div>

        {/* Live Wedding Timer Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="p-6 rounded-3xl bg-slate-950/80 border border-amber-500/30 shadow-xl">
            <span className="font-serif text-4xl sm:text-6xl font-bold text-amber-300 block">{weddingDays}</span>
            <span className="text-xs text-slate-400 uppercase font-semibold mt-2 block">Days</span>
          </div>
          <div className="p-6 rounded-3xl bg-slate-950/80 border border-amber-500/30 shadow-xl">
            <span className="font-serif text-4xl sm:text-6xl font-bold text-amber-300 block">{weddingHours}</span>
            <span className="text-xs text-slate-400 uppercase font-semibold mt-2 block">Hours</span>
          </div>
          <div className="p-6 rounded-3xl bg-slate-950/80 border border-amber-500/30 shadow-xl">
            <span className="font-serif text-4xl sm:text-6xl font-bold text-amber-300 block">{weddingMinutes}</span>
            <span className="text-xs text-slate-400 uppercase font-semibold mt-2 block">Minutes</span>
          </div>
          <div className="p-6 rounded-3xl bg-slate-950/80 border border-amber-500/30 shadow-xl">
            <span className="font-serif text-4xl sm:text-6xl font-bold text-rose-500 animate-pulse block">{weddingSeconds}</span>
            <span className="text-xs text-slate-400 uppercase font-semibold mt-2 block">Seconds</span>
          </div>
        </div>

        <button
          onClick={handleTestWeddingCelebration}
          className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-600 to-pink-600 text-white font-bold text-xs shadow-xl hover:scale-105 transition inline-flex items-center gap-2"
        >
          <PartyPopper className="w-4 h-4 text-amber-300" /> Test Wedding Fireworks & Confetti 🎉
        </button>
      </div>

      {/* 2. NEXT ANNIVERSARY COUNTDOWN BOARD */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-rose-950/80 via-slate-900 to-pink-950/80 border-2 border-rose-500/40 shadow-2xl space-y-8 text-center relative overflow-hidden">
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-rose-300 font-bold flex items-center justify-center gap-2">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> Our Next Anniversary ❤️
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Celebrating Eternal Love
          </h2>
          <p className="text-xs text-slate-300">Anniversary Date: {coupleProfile.relationshipStartDate}</p>
        </div>

        {/* Live Anniversary Timer Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="p-6 rounded-3xl bg-slate-950/80 border border-rose-500/30 shadow-xl">
            <span className="font-serif text-4xl sm:text-5xl font-bold text-rose-200 block">{annivDays}</span>
            <span className="text-xs text-slate-400 uppercase font-semibold mt-2 block">Days</span>
          </div>
          <div className="p-6 rounded-3xl bg-slate-950/80 border border-rose-500/30 shadow-xl">
            <span className="font-serif text-4xl sm:text-5xl font-bold text-rose-200 block">{annivHours}</span>
            <span className="text-xs text-slate-400 uppercase font-semibold mt-2 block">Hours</span>
          </div>
          <div className="p-6 rounded-3xl bg-slate-950/80 border border-rose-500/30 shadow-xl">
            <span className="font-serif text-4xl sm:text-5xl font-bold text-rose-200 block">{annivMinutes}</span>
            <span className="text-xs text-slate-400 uppercase font-semibold mt-2 block">Minutes</span>
          </div>
          <div className="p-6 rounded-3xl bg-slate-950/80 border border-rose-500/30 shadow-xl">
            <span className="font-serif text-4xl sm:text-5xl font-bold text-rose-500 animate-pulse block">{annivSeconds}</span>
            <span className="text-xs text-slate-400 uppercase font-semibold mt-2 block">Seconds</span>
          </div>
        </div>

        <button
          onClick={handleTestAnnivCelebration}
          className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-xs shadow-xl hover:scale-105 transition inline-flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-amber-300" /> Test Anniversary Love Celebration 🎉
        </button>
      </div>

    </div>
  );
};
