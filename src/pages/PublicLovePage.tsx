import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Heart, Share2, Sparkles, MapPin, 
  Calendar, MessageSquare, Send, ThumbsUp, Copy 
} from 'lucide-react';
import { Ring } from '../components/RingIcon';

export const PublicLovePage: React.FC = () => {
  const { coupleProfile, timelineEvents, memories, guestbook, addGuestbookMessage, addToast } = useApp();

  const [authorName, setAuthorName] = useState('');
  const [guestMsg, setGuestMsg] = useState('');

  const handlePostWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName || !guestMsg) return;

    addGuestbookMessage({
      coupleSlug: coupleProfile.slug,
      authorName,
      message: guestMsg
    });

    setAuthorName('');
    setGuestMsg('');
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/love/${coupleProfile.slug}`;
    navigator.clipboard.writeText(url);
    addToast('Public Love link copied! 📋', 'success');
  };

  const handleShareWhatsApp = () => {
    const text = `Check out ${coupleProfile.partner1Name} ❤️ ${coupleProfile.partner2Name}'s Love Story on Janno: ${window.location.origin}/love/${coupleProfile.slug}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-20 pt-4">
      
      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden border border-rose-500/30 shadow-2xl bg-slate-900">
        <div className="h-80 sm:h-[420px] w-full relative">
          <img
            src={coupleProfile.coverPhoto}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          <div className="absolute bottom-8 left-6 sm:left-12 right-6 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6">
            <div className="flex items-center gap-6 text-center sm:text-left">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-tr from-rose-600 to-amber-400 shadow-2xl shrink-0">
                <img
                  src={coupleProfile.profilePhoto}
                  alt="Avatar"
                  className="w-full h-full rounded-full object-cover border-4 border-slate-950"
                />
              </div>
              <div className="space-y-1">
                <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white flex items-center justify-center sm:justify-start gap-3">
                  {coupleProfile.partner1Name} <Heart className="w-7 h-7 text-rose-500 fill-rose-500 animate-pulse" /> {coupleProfile.partner2Name}
                </h1>
                <p className="text-sm text-rose-200/90 font-medium">
                  “{coupleProfile.nickname}” • {coupleProfile.location}
                </p>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleShareWhatsApp}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg transition flex items-center gap-2"
              >
                Share WhatsApp
              </button>
              <button
                onClick={handleCopyLink}
                className="px-4 py-2.5 rounded-xl bg-slate-950/80 border border-rose-500/30 text-rose-200 text-xs font-bold shadow-lg hover:bg-slate-900 transition flex items-center gap-2"
              >
                <Copy className="w-3.5 h-3.5 text-amber-400" /> Copy Link
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Love Story Section */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/60 border border-rose-500/20 space-y-4 max-w-4xl mx-auto text-center">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center justify-center gap-2">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> Our Love Story
        </span>
        <h2 className="font-serif text-3xl font-bold text-white">How We Fell In Love</h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto font-light">
          {coupleProfile.loveStory}
        </p>
      </div>

      {/* Love Story Highlights Timeline */}
      <div className="space-y-6">
        <h3 className="font-serif text-2xl font-bold text-white text-center">Journey Milestones</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {timelineEvents.slice(0, 3).map(ev => (
            <div key={ev.id} className="p-6 rounded-3xl bg-slate-900/60 border border-rose-500/20 space-y-3">
              <span className="text-xs font-bold text-rose-300">{ev.date}</span>
              <h4 className="font-serif text-lg font-bold text-white">{ev.title}</h4>
              <p className="text-xs text-slate-300 line-clamp-3">{ev.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Memory Gallery Highlights */}
      <div className="space-y-6">
        <h3 className="font-serif text-2xl font-bold text-white text-center">Cherished Memories</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {memories.slice(0, 4).map(m => (
            <div key={m.id} className="relative h-48 rounded-2xl overflow-hidden border border-rose-500/20 group">
              <img src={m.photoUrl} alt={m.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              <span className="absolute bottom-3 left-3 text-xs font-bold text-white">{m.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Guestbook Section */}
      <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-slate-900 border border-rose-500/30 space-y-8 shadow-2xl">
        <div className="text-center space-y-1 border-b border-slate-800 pb-4">
          <h3 className="font-serif text-2xl font-bold text-white flex items-center justify-center gap-2">
            <MessageSquare className="w-5 h-5 text-rose-400" /> Public Guestbook & Wishes
          </h3>
          <p className="text-xs text-slate-400">Leave your warm wishes for {coupleProfile.partner1Name} & {coupleProfile.partner2Name} ❤️</p>
        </div>

        {/* Wish Form */}
        <form onSubmit={handlePostWish} className="space-y-4 text-xs">
          <input
            type="text"
            placeholder="Your Name / Relationship"
            value={authorName}
            onChange={e => setAuthorName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
            required
          />
          <textarea
            rows={3}
            placeholder="Write a sweet wish..."
            value={guestMsg}
            onChange={e => setGuestMsg(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
            required
          />
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold shadow-lg flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" /> Post Wish to Love Page ❤️
          </button>
        </form>

        {/* Existing Guestbook Comments */}
        <div className="space-y-3">
          {guestbook.map(gb => (
            <div key={gb.id} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-rose-200">{gb.authorName}</span>
                <span className="text-[10px] text-slate-500">{gb.date}</span>
              </div>
              <p className="text-xs text-slate-300 italic">“{gb.message}”</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
