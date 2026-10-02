import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Heart, Sparkles, Send, Lock, ShieldCheck, Globe } from 'lucide-react';
import { Ring } from './RingIcon';

export const Footer: React.FC = () => {
  const { setCurrentView, addToast } = useApp();
  const [email, setEmail] = useState('');
  const [randomQuote, setRandomQuote] = useState('“Love isn’t something you find. Love is something that finds you.”');

  const quotes = [
    '“Love isn’t something you find. Love is something that finds you.”',
    '“In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.”',
    '“To love and be loved is to feel the sun from both sides.”',
    '“You are my today and all of my tomorrows.”',
    '“Whatever our souls are made of, his and mine are the same.”'
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    addToast('Subscribed to Janno Romantic Whispers 💌', 'love');
    setEmail('');
  };

  const getNewQuote = () => {
    const idx = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[idx]);
    addToast('New romantic quote inspired ❤️', 'info');
  };

  return (
    <footer className="relative z-10 bg-slate-950 border-t border-rose-950/50 text-slate-300 pt-16 pb-28 lg:pb-16 overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-400 p-0.5 shadow-lg shadow-rose-950/50">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Heart className="w-5 h-5 text-rose-500 fill-rose-500/30" />
                </div>
              </div>
              <span className="font-serif text-2xl font-bold bg-gradient-to-r from-rose-200 to-amber-200 bg-clip-text text-transparent">
                Janno
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The premier romantic couples & luxury wedding experience platform. Designed for lovers, newlyweds, proposals, anniversaries, and surprise moments.
            </p>

            {/* Random Romantic Quote Generator Box */}
            <div className="p-3.5 rounded-2xl bg-rose-950/30 border border-rose-500/20 text-xs italic text-rose-200 space-y-2">
              <p>{randomQuote}</p>
              <button
                onClick={getNewQuote}
                className="not-italic text-[10px] text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold"
              >
                <Sparkles className="w-3 h-3 text-amber-400" /> Inspire Me
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-rose-200 mb-4 tracking-wider uppercase">
              Explore Experiences
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => setCurrentView('couple')} className="hover:text-rose-300 transition">
                  Couple Profile & Live Counter
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('timeline')} className="hover:text-rose-300 transition">
                  Love Story Timeline
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('wedding')} className="hover:text-rose-300 transition">
                  Wedding Invitations (8 Themes)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('surprises')} className="hover:text-rose-300 transition">
                  Surprise Gift Unboxing 🎁
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('letters')} className="hover:text-rose-300 transition">
                  Wax-Sealed Love Letters 💌
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('countdowns')} className="hover:text-rose-300 transition">
                  Anniversary Countdowns ⏳
                </button>
              </li>
            </ul>
          </div>

          {/* Shareable Public Couples */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-rose-200 mb-4 tracking-wider uppercase">
              Public Love Pages
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => setCurrentView('public-love')} className="hover:text-rose-300 transition flex items-center gap-1.5">
                  <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                  Ahmed & Ayaan Public Page
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('gifts')} className="hover:text-rose-300 transition">
                  Romantic Digital Gift Marketplace
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('music')} className="hover:text-rose-300 transition">
                  Couple Music Hub 🎵
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('admin')} className="hover:text-amber-300 transition">
                  Platform Admin Portal 👑
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter / Whispers */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-rose-200 mb-4 tracking-wider uppercase">
              Love Whispers Newsletter
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Get weekly romantic date night ideas, gift inspirations, and surprise guides.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your love email..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500/60"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs font-medium flex items-center justify-center hover:opacity-90 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
            <div className="flex items-center gap-2 mt-4 text-[11px] text-slate-500">
              <Lock className="w-3 h-3 text-rose-400" />
              <span>100% Private & Encrypted Love Data</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Janno — Luxury Romantic Experience Platform. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-rose-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Bank-grade Privacy
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              Made with ❤️ for Lovers Worldwide
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
