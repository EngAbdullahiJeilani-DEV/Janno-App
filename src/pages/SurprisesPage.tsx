import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SurpriseGift, GiftType } from '../types';
import { soundManager } from '../utils/sound';
import { triggerLoveConfetti } from '../utils/confetti';
import { 
  Gift, Heart, Sparkles, Clock, Send, Play, 
  Calendar, Check, Plus, Lock, Music, Image as ImageIcon, X 
} from 'lucide-react';

export const SurprisesPage: React.FC = () => {
  const { surprises, setSurprises, coupleProfile, addToast, activeSurpriseToUnbox, setActiveSurpriseToUnbox } = useApp();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Unboxing stage control
  const [unboxStage, setUnboxStage] = useState<'prompt' | 'unboxing' | 'revealed'>('prompt');
  const [photoIndex, setPhotoIndex] = useState(0);

  // Creator state
  const [newSurprise, setNewSurprise] = useState<Omit<SurpriseGift, 'id' | 'coupleId' | 'isOpened'>>({
    senderName: coupleProfile.partner1Name,
    recipientName: coupleProfile.partner2Name,
    giftType: 'ring',
    title: 'A Romantic Surprise For My Queen ❤️',
    personalMessage: 'You are one of the most beautiful chapters of my life. Every single day with you is a gift from heaven. I love you endlessly!',
    scheduledDate: new Date().toISOString().split('T')[0],
    isAnonymous: false,
    photoUrls: [
      'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'
    ],
    songTitle: 'Perfect - Ed Sheeran'
  });

  const giftTypes: { type: GiftType; label: string; icon: string }[] = [
    { type: 'ring', label: 'Ring 💍', icon: '💍' },
    { type: 'roses', label: 'Roses 🌹', icon: '🌹' },
    { type: 'box', label: 'Gift Box 🎁', icon: '🎁' },
    { type: 'letter', label: 'Love Letter 💌', icon: '💌' },
    { type: 'chocolate', label: 'Chocolate 🍫', icon: '🍫' },
    { type: 'teddy', label: 'Teddy Bear 🧸', icon: '🧸' },
    { type: 'memories', label: 'Photo Memories 📸', icon: '📸' },
    { type: 'song', label: 'Love Song 🎵', icon: '🎵' },
    { type: 'premium', label: 'Premium Gift 💎', icon: '💎' }
  ];

  const handleStartUnboxing = () => {
    soundManager.playUnboxCelebrationSound();
    triggerLoveConfetti();
    setUnboxStage('unboxing');

    setTimeout(() => {
      setUnboxStage('revealed');
    }, 1800);
  };

  const handleCreateSurprise = (e: React.FormEvent) => {
    e.preventDefault();
    const item: SurpriseGift = {
      ...newSurprise,
      id: `srp_${Date.now()}`,
      coupleId: coupleProfile.id,
      isOpened: false
    };

    setSurprises(prev => [item, ...prev]);
    setIsCreateModalOpen(false);
    addToast('Romantic surprise scheduled & delivered! 🎁', 'love');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-rose-900/30 pb-6 text-center sm:text-left">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Gift className="w-3.5 h-3.5 text-amber-400" />
            Cinematic Gift Experiences
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Surprise Gift Hub 🎁
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Create magical unboxing celebrations for your partner with music, confetti, & photos.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 text-white font-bold text-xs shadow-xl shadow-rose-950/80 hover:scale-105 transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Create New Surprise
        </button>
      </div>

      {/* Surprises List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {surprises.map(srp => (
          <div
            key={srp.id}
            className="p-6 rounded-3xl bg-slate-900/70 border border-rose-500/20 backdrop-blur-md shadow-xl space-y-4 hover:border-rose-500/50 transition group"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-2xl shadow-lg">
                🎁
              </div>
              <span className="text-[10px] px-3 py-1 rounded-full bg-rose-500/20 text-rose-200 border border-rose-400/30 font-semibold uppercase">
                {srp.isOpened ? 'Opened ✓' : 'Ready to Unbox 🎁'}
              </span>
            </div>

            <div>
              <h3 className="font-serif text-xl font-bold text-white group-hover:text-rose-300 transition">
                {srp.title}
              </h3>
              <p className="text-xs text-rose-300/90 mt-1">
                From: {srp.isAnonymous ? 'Secret Admirer 🤫' : srp.senderName} → To: {srp.recipientName}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 text-xs text-slate-300 line-clamp-2 italic">
              “{srp.personalMessage}”
            </div>

            <button
              onClick={() => {
                setActiveSurpriseToUnbox(srp);
                setUnboxStage('prompt');
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-xs shadow-lg hover:scale-105 transition flex items-center justify-center gap-2"
            >
              <Gift className="w-4 h-4 text-amber-300" /> Open Unboxing Experience 💝
            </button>
          </div>
        ))}
      </div>

      {/* CINEMATIC UNBOXING OVERLAY MODAL */}
      {activeSurpriseToUnbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-2xl text-white overflow-hidden">
          
          <button
            onClick={() => setActiveSurpriseToUnbox(null)}
            className="absolute top-6 right-6 p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>

          {/* STAGE 1: PROMPT */}
          {unboxStage === 'prompt' && (
            <div className="max-w-md w-full text-center space-y-8 animate-fade-in p-8 rounded-3xl bg-slate-900/90 border border-rose-500/40 shadow-2xl">
              <div className="relative w-24 h-24 mx-auto rounded-full bg-rose-600/20 border-2 border-rose-500 flex items-center justify-center text-4xl shadow-2xl animate-bounce">
                🎁
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">A Romantic Delivery</span>
                <h2 className="font-serif text-2xl font-bold text-white">
                  Someone special has prepared something for you… ❤️
                </h2>
                <p className="text-sm text-slate-300">Are you ready for your surprise?</p>
              </div>

              <button
                onClick={handleStartUnboxing}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 text-white font-bold text-base shadow-2xl shadow-rose-950 hover:scale-105 transition flex items-center justify-center gap-3"
              >
                <Gift className="w-5 h-5 text-amber-300 animate-bounce" />
                <span>OPEN YOUR SURPRISE 🎁</span>
              </button>
            </div>
          )}

          {/* STAGE 2: UNBOXING ANIMATION */}
          {unboxStage === 'unboxing' && (
            <div className="text-center space-y-6 animate-pulse">
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-tr from-rose-600 to-amber-400 p-1 shadow-2xl animate-spin">
                <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-5xl">
                  🎁
                </div>
              </div>
              <h3 className="font-serif text-3xl font-bold text-rose-200">
                Unlocking Your Gift Box... ✨
              </h3>
            </div>
          )}

          {/* STAGE 3: REVEALED */}
          {unboxStage === 'revealed' && (
            <div className="max-w-2xl w-full p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-rose-950/90 to-slate-950/95 border border-rose-500/50 shadow-2xl space-y-8 text-center animate-fade-in">
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-200 text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-4 h-4 text-amber-400" /> Surprise Unboxed!
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                {activeSurpriseToUnbox.title}
              </h2>

              {/* Photo Slideshow */}
              {activeSurpriseToUnbox.photoUrls && activeSurpriseToUnbox.photoUrls.length > 0 && (
                <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-rose-500/30 shadow-xl">
                  <img
                    src={activeSurpriseToUnbox.photoUrls[photoIndex]}
                    alt="Surprise Photo"
                    className="w-full h-full object-cover transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  {activeSurpriseToUnbox.photoUrls.length > 1 && (
                    <div className="absolute bottom-3 inset-x-0 flex justify-center gap-2">
                      {activeSurpriseToUnbox.photoUrls.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setPhotoIndex(i)}
                          className={`w-2.5 h-2.5 rounded-full ${photoIndex === i ? 'bg-rose-500' : 'bg-white/40'}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Personalized Message */}
              <div className="p-6 rounded-2xl bg-slate-950/80 border border-rose-500/30 space-y-3">
                <blockquote className="font-serif text-lg sm:text-xl text-rose-100 italic leading-relaxed">
                  “{activeSurpriseToUnbox.personalMessage}”
                </blockquote>
                <p className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                  — Forever Yours, {activeSurpriseToUnbox.isAnonymous ? 'Secret Admirer 🤫' : activeSurpriseToUnbox.senderName}
                </p>
              </div>

              <div className="pt-2">
                <h3 className="font-serif text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-200 to-amber-300">
                  I Love You ❤️
                </h3>
              </div>

            </div>
          )}

        </div>
      )}

      {/* CREATE SURPRISE MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="max-w-lg w-full my-8 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-rose-500/30 text-white space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="font-serif text-xl font-bold flex items-center gap-2">
                <Gift className="w-5 h-5 text-amber-400" /> Create Romantic Surprise
              </h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSurprise} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Gift Type</label>
                <select
                  value={newSurprise.giftType}
                  onChange={e => setNewSurprise({ ...newSurprise, giftType: e.target.value as GiftType })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                >
                  {giftTypes.map(g => (
                    <option key={g.type} value={g.type}>{g.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Surprise Title</label>
                <input
                  type="text"
                  placeholder="e.g. A Surprise For My Soulmate ❤️"
                  value={newSurprise.title}
                  onChange={e => setNewSurprise({ ...newSurprise, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Personal Romantic Message</label>
                <textarea
                  rows={4}
                  placeholder="Write a message that will show when they open the box..."
                  value={newSurprise.personalMessage}
                  onChange={e => setNewSurprise({ ...newSurprise, personalMessage: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                  required
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="anon"
                  checked={newSurprise.isAnonymous}
                  onChange={e => setNewSurprise({ ...newSurprise, isAnonymous: e.target.checked })}
                  className="rounded bg-slate-950 border-slate-800 text-rose-600 focus:ring-rose-500"
                />
                <label htmlFor="anon" className="text-slate-300">Send as Secret Admirer 🤫</label>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold shadow-lg flex items-center gap-2"
                >
                  <Send className="w-4 h-4" /> Save & Schedule Surprise
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
