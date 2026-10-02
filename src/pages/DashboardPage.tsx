import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Heart, Gift, Mail, Image as ImageIcon, 
  Calendar, Music, Sparkles, ArrowRight, Clock, Plus 
} from 'lucide-react';
import { Ring } from '../components/RingIcon';

export const DashboardPage: React.FC = () => {
  const { coupleProfile, surprises, letters, memories, setCurrentView, setActiveSurpriseToUnbox } = useApp();

  const pendingSurprises = surprises.filter(s => !s.isOpened);

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20">
      
      {/* Dashboard Welcome Header */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-rose-950/80 via-slate-900 to-amber-950/80 border border-rose-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Couple Personal Hub
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Welcome Back, {coupleProfile.partner1Name} & {coupleProfile.partner2Name} ❤️
          </h1>
          <p className="text-sm text-rose-200/90 font-light">
            “{coupleProfile.personalMessage}”
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setCurrentView('surprises')}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-xs shadow-lg hover:scale-105 transition flex items-center gap-2"
          >
            <Gift className="w-4 h-4 text-amber-300" /> Create Surprise 🎁
          </button>
          <button
            onClick={() => setCurrentView('letters')}
            className="px-5 py-3 rounded-2xl bg-slate-900 border border-rose-500/30 text-rose-200 font-bold text-xs hover:bg-slate-800 transition flex items-center gap-2"
          >
            <Mail className="w-4 h-4 text-rose-400" /> Write Love Letter 💌
          </button>
        </div>
      </div>

      {/* DASHBOARD CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Love Days */}
        <div 
          onClick={() => setCurrentView('couple')}
          className="p-6 rounded-3xl bg-slate-900/70 border border-rose-500/20 backdrop-blur-md shadow-xl hover:border-rose-500/50 transition cursor-pointer group space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-rose-600/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
              <Heart className="w-5 h-5 fill-rose-500" />
            </div>
            <span className="text-[10px] uppercase font-bold text-rose-300">Live Counter</span>
          </div>
          <div>
            <h3 className="font-serif text-3xl font-bold text-white">1,218 Days</h3>
            <p className="text-xs text-slate-400 mt-0.5">Together since {coupleProfile.relationshipStartDate}</p>
          </div>
          <div className="text-xs text-rose-400 font-semibold flex items-center gap-1 pt-2 border-t border-slate-800">
            <span>View Couple Profile</span> <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 2: Wedding Countdown */}
        <div 
          onClick={() => setCurrentView('countdowns')}
          className="p-6 rounded-3xl bg-slate-900/70 border border-rose-500/20 backdrop-blur-md shadow-xl hover:border-rose-500/50 transition cursor-pointer group space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Ring className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase font-bold text-amber-400">Wedding Day</span>
          </div>
          <div>
            <h3 className="font-serif text-3xl font-bold text-white">127 Days</h3>
            <p className="text-xs text-slate-400 mt-0.5">June 12, 2027 • Grand Celebration</p>
          </div>
          <div className="text-xs text-amber-400 font-semibold flex items-center gap-1 pt-2 border-t border-slate-800">
            <span>View Countdowns</span> <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 3: Pending Surprises */}
        <div 
          onClick={() => setCurrentView('surprises')}
          className="p-6 rounded-3xl bg-slate-900/70 border border-rose-500/20 backdrop-blur-md shadow-xl hover:border-rose-500/50 transition cursor-pointer group space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-pink-600/20 border border-pink-500/40 flex items-center justify-center text-pink-400">
              <Gift className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase font-bold text-pink-300">{pendingSurprises.length} Pending</span>
          </div>
          <div>
            <h3 className="font-serif text-3xl font-bold text-white">{surprises.length} Surprises</h3>
            <p className="text-xs text-slate-400 mt-0.5">Ready for cinematic unboxing</p>
          </div>
          <div className="text-xs text-pink-400 font-semibold flex items-center gap-1 pt-2 border-t border-slate-800">
            <span>Open Surprise Hub</span> <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 4: Memories */}
        <div 
          onClick={() => setCurrentView('memories')}
          className="p-6 rounded-3xl bg-slate-900/70 border border-rose-500/20 backdrop-blur-md shadow-xl hover:border-rose-500/50 transition cursor-pointer group space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-300">
              <ImageIcon className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase font-bold text-rose-300">Vault</span>
          </div>
          <div>
            <h3 className="font-serif text-3xl font-bold text-white">{memories.length} Photos</h3>
            <p className="text-xs text-slate-400 mt-0.5">Categorized across 6 albums</p>
          </div>
          <div className="text-xs text-rose-400 font-semibold flex items-center gap-1 pt-2 border-t border-slate-800">
            <span>Open Gallery</span> <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

      </div>

      {/* DASHBOARD SECTION: RECENT MEMORIES & QUICK LOVE LETTER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Recent Memories Carousel */}
        <div className="lg:col-span-8 p-8 rounded-3xl bg-slate-900/60 border border-rose-500/20 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-rose-400" /> Recent Photo Memories
            </h3>
            <button
              onClick={() => setCurrentView('memories')}
              className="text-xs text-rose-400 font-semibold hover:underline"
            >
              View All Photos
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {memories.slice(0, 3).map(mem => (
              <div key={mem.id} className="relative h-44 rounded-2xl overflow-hidden border border-rose-500/20 group cursor-pointer" onClick={() => setCurrentView('memories')}>
                <img src={mem.photoUrl} alt={mem.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs font-bold truncate">{mem.title}</p>
                  <p className="text-[10px] text-rose-300">{mem.album}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Quick Love Song & Notes */}
        <div className="lg:col-span-4 p-8 rounded-3xl bg-slate-900/60 border border-rose-500/20 space-y-6">
          <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
            <Music className="w-5 h-5 text-rose-400" /> Our Song ❤️
          </h3>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-rose-500/30 space-y-2">
            <p className="text-xs font-bold text-rose-200">{coupleProfile.favoriteSong}</p>
            <p className="text-[11px] text-slate-400">Attached to Love Story & Surprises</p>
            <button
              onClick={() => setCurrentView('music')}
              className="w-full mt-2 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs"
            >
              Open Couple Music Hub 🎵
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
