import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LoveLetter } from '../types';
import { soundManager } from '../utils/sound';
import { 
  Mail, Send, Heart, Sparkles, Feather, Image, 
  Lock, Check, Music, X, Eye, Bookmark 
} from 'lucide-react';

export const LoveLettersPage: React.FC = () => {
  const { letters, setLetters, coupleProfile, addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'received' | 'write'>('received');
  const [selectedLetter, setSelectedLetter] = useState<LoveLetter | null>(letters[0] || null);
  const [isOpenAnimationPlaying, setIsOpenAnimationPlaying] = useState(false);

  // Writer state
  const [newLetter, setNewLetter] = useState<Omit<LoveLetter, 'id' | 'coupleId' | 'date'>>({
    toName: coupleProfile.partner2Name,
    fromName: coupleProfile.partner1Name,
    subject: 'A Secret Whispered to Your Heart',
    message: '',
    fontStyle: 'handwriting',
    backgroundTheme: 'parchment',
    waxSeal: 'heart',
    isOpened: false
  });

  const handleOpenLetterClick = (letter: LoveLetter) => {
    soundManager.playEnvelopeOpenSound();
    setIsOpenAnimationPlaying(true);
    setSelectedLetter(letter);

    // Mark opened in state
    setLetters(prev =>
      prev.map(l => (l.id === letter.id ? { ...l, isOpened: true } : l))
    );

    setTimeout(() => {
      setIsOpenAnimationPlaying(false);
    }, 600);
  };

  const handleSendLetter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLetter.message) return;

    soundManager.playShimmerSound();
    const created: LoveLetter = {
      ...newLetter,
      id: `ltr_${Date.now()}`,
      coupleId: coupleProfile.id,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };

    setLetters(prev => [created, ...prev]);
    setSelectedLetter(created);
    setActiveTab('received');
    addToast('Love letter sealed & delivered with love ❤️', 'love');

    setNewLetter({
      toName: coupleProfile.partner2Name,
      fromName: coupleProfile.partner1Name,
      subject: 'A Secret Whispered to Your Heart',
      message: '',
      fontStyle: 'handwriting',
      backgroundTheme: 'parchment',
      waxSeal: 'heart',
      isOpened: false
    });
  };

  const getWaxSealIcon = (wax: string) => {
    switch (wax) {
      case 'crown': return '👑';
      case 'ring': return '💍';
      case 'rose': return '🌹';
      default: return '❤️';
    }
  };

  const getBgStyle = (theme: string) => {
    switch (theme) {
      case 'rose-gold':
        return 'bg-gradient-to-br from-rose-950 via-pink-950 to-slate-950 border-rose-500/40 text-rose-100';
      case 'midnight':
        return 'bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 border-indigo-500/40 text-indigo-100';
      case 'silk':
        return 'bg-gradient-to-br from-amber-950 via-rose-950 to-slate-950 border-amber-500/40 text-amber-100';
      default: // parchment
        return 'bg-[#FFFBF2] text-slate-900 border-amber-900/30 font-serif';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-rose-900/30 pb-6 text-center sm:text-left">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Mail className="w-3.5 h-3.5 text-rose-400" />
            Digital Love Letters
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Wax-Sealed Love Notes 💌
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Write eternal handwritten notes sealed with romantic wax emblems.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-rose-500/20">
          <button
            onClick={() => setActiveTab('received')}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
              activeTab === 'received'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-950/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mail className="w-4 h-4" /> Letter Inbox ({letters.length})
          </button>
          <button
            onClick={() => setActiveTab('write')}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
              activeTab === 'write'
                ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg shadow-rose-950/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Feather className="w-4 h-4 text-amber-300" /> Write New Letter
          </button>
        </div>
      </div>

      {activeTab === 'received' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Letter List */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-300 px-1">
              Your Romantic Mailbox
            </h3>

            <div className="space-y-3">
              {letters.map(letter => (
                <div
                  key={letter.id}
                  onClick={() => handleOpenLetterClick(letter)}
                  className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                    selectedLetter?.id === letter.id
                      ? 'bg-rose-950/50 border-rose-500 shadow-lg'
                      : 'bg-slate-900/60 border-slate-800 hover:border-rose-500/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-rose-600/20 border border-rose-500/40 flex items-center justify-center text-lg">
                      {getWaxSealIcon(letter.waxSeal)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white leading-snug">{letter.subject}</h4>
                      <p className="text-xs text-rose-300/80">From: {letter.fromName} → To: {letter.toName}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">{letter.date}</span>
                    {letter.isOpened ? (
                      <span className="text-[10px] text-emerald-400 font-medium">Read ✓</span>
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/30 text-rose-200 border border-rose-400/30 animate-pulse">
                        Sealed 💌
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Selected Letter Display Area */}
          <div className="lg:col-span-7">
            {selectedLetter ? (
              <div className={`p-8 sm:p-12 rounded-3xl border shadow-2xl space-y-6 transition-all duration-500 ${getBgStyle(selectedLetter.backgroundTheme)} ${isOpenAnimationPlaying ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
                
                {/* Wax Seal Header */}
                <div className="flex items-center justify-between border-b border-current/20 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center text-2xl shadow-xl">
                      {getWaxSealIcon(selectedLetter.waxSeal)}
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-widest opacity-75 font-sans font-bold">Official Love Letter</span>
                      <h2 className="text-2xl font-bold font-serif leading-tight">{selectedLetter.subject}</h2>
                    </div>
                  </div>
                  <span className="text-xs opacity-70 font-sans">{selectedLetter.date}</span>
                </div>

                {/* Letter Body */}
                <div className="space-y-4 py-4">
                  <p className="text-base font-semibold">Dearest {selectedLetter.toName},</p>
                  <p className="text-base sm:text-lg leading-relaxed whitespace-pre-line italic">
                    {selectedLetter.message}
                  </p>
                  <div className="pt-6 text-right font-serif text-lg font-bold">
                    <p className="text-xs uppercase tracking-wider opacity-70 font-sans">Forever Yours,</p>
                    <p className="text-xl text-rose-600">{selectedLetter.fromName} ❤️</p>
                  </div>
                </div>

                {/* Optional Attached Photo */}
                {selectedLetter.photoUrl && (
                  <div className="rounded-2xl overflow-hidden border border-current/20 shadow-lg max-h-64">
                    <img src={selectedLetter.photoUrl} alt="Attached" className="w-full h-full object-cover" />
                  </div>
                )}

              </div>
            ) : (
              <div className="p-12 rounded-3xl bg-slate-900/40 border border-slate-800 text-center space-y-3">
                <Mail className="w-12 h-12 text-slate-600 mx-auto" />
                <p className="text-slate-400 text-sm">Select a letter to unfold its romance.</p>
              </div>
            )}
          </div>

        </div>
      ) : (
        /* WRITE NEW LETTER FORM */
        <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-slate-900 border border-rose-500/30 text-white space-y-6 shadow-2xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Feather className="w-6 h-6 text-amber-400" />
            <h2 className="font-serif text-2xl font-bold">Compose Love Letter</h2>
          </div>

          <form onSubmit={handleSendLetter} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">To</label>
                <input
                  type="text"
                  value={newLetter.toName}
                  onChange={e => setNewLetter({ ...newLetter, toName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">From</label>
                <input
                  type="text"
                  value={newLetter.fromName}
                  onChange={e => setNewLetter({ ...newLetter, fromName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Subject</label>
              <input
                type="text"
                placeholder="e.g. My Promise to You ❤️"
                value={newLetter.subject}
                onChange={e => setNewLetter({ ...newLetter, subject: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Background Theme</label>
                <select
                  value={newLetter.backgroundTheme}
                  onChange={e => setNewLetter({ ...newLetter, backgroundTheme: e.target.value as any })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                >
                  <option value="parchment">📜 Vintage Parchment</option>
                  <option value="rose-gold">🌹 Rose Gold Velvet</option>
                  <option value="midnight">🌙 Midnight Star</option>
                  <option value="silk">✨ Champagne Silk</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Wax Seal Emblem</label>
                <select
                  value={newLetter.waxSeal}
                  onChange={e => setNewLetter({ ...newLetter, waxSeal: e.target.value as any })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                >
                  <option value="heart">❤️ Heart Emblem</option>
                  <option value="rose">🌹 Blooming Rose</option>
                  <option value="ring">💍 Diamond Ring</option>
                  <option value="crown">👑 Royal Crown</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Love Message</label>
              <textarea
                rows={6}
                placeholder="Write your heart out..."
                value={newLetter.message}
                onChange={e => setNewLetter({ ...newLetter, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500 text-sm leading-relaxed"
                required
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition"
              >
                <Send className="w-4 h-4" /> Seal & Deliver Letter 💌
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
