import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CoupleProfile } from '../types';
import { 
  Heart, Calendar, MapPin, Music, Edit3, Sparkles, 
  Share2, Save, X, Clock, Check
} from 'lucide-react';
import { Ring } from '../components/RingIcon';

export const CoupleProfilePage: React.FC = () => {
  const { coupleProfile, setCoupleProfile, addToast, setCurrentView } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<CoupleProfile>(coupleProfile);

  // Live relationship counter
  const [counter, setCounter] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(coupleProfile.relationshipStartDate);
      const now = new Date();
      const diffMs = Math.abs(now.getTime() - start.getTime());
      
      const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const years = Math.floor(totalDays / 365);
      const remainingDaysAfterYears = totalDays % 365;
      const months = Math.floor(remainingDaysAfterYears / 30);
      const days = remainingDaysAfterYears % 30;

      setCounter({
        years,
        months,
        days,
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds()
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [coupleProfile.relationshipStartDate]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setCoupleProfile(formData);
    setIsEditing(false);
    addToast('Couple profile updated successfully ❤️', 'love');
  };

  const handleCopyPublicLink = () => {
    const url = `${window.location.origin}/love/${coupleProfile.slug}`;
    navigator.clipboard.writeText(url);
    addToast('Public love link copied to clipboard! 📋', 'success');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      
      {/* Profile Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-rose-500/30 shadow-2xl bg-slate-900">
        
        {/* Cover Photo */}
        <div className="h-72 sm:h-96 w-full relative">
          <img
            src={coupleProfile.coverPhoto}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={handleCopyPublicLink}
              className="px-4 py-2 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-rose-500/30 text-rose-200 text-xs font-semibold backdrop-blur-md flex items-center gap-2 transition"
            >
              <Share2 className="w-3.5 h-3.5 text-amber-400" /> Share Love Page
            </button>
            <button
              onClick={() => { setFormData(coupleProfile); setIsEditing(true); }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs font-semibold shadow-lg flex items-center gap-2 transition hover:scale-105"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit Profile
            </button>
          </div>
        </div>

        {/* Profile Details Bar */}
        <div className="relative px-6 sm:px-10 pb-8 pt-0 -mt-20 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
            
            {/* Couple Profile Avatar */}
            <div className="relative w-36 h-36 rounded-full p-1 bg-gradient-to-tr from-rose-600 via-pink-500 to-amber-400 shadow-2xl shrink-0">
              <img
                src={coupleProfile.profilePhoto}
                alt="Couple Avatar"
                className="w-full h-full rounded-full object-cover border-4 border-slate-950"
              />
              <div className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-rose-600 border-2 border-slate-950 flex items-center justify-center text-white shadow-lg">
                <Heart className="w-5 h-5 fill-white" />
              </div>
            </div>

            <div className="space-y-1">
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white flex items-center justify-center sm:justify-start gap-3">
                <span>{coupleProfile.partner1Name}</span>
                <Heart className="w-7 h-7 text-rose-500 fill-rose-500 animate-pulse" />
                <span>{coupleProfile.partner2Name}</span>
              </h1>
              <p className="text-sm text-rose-200/90 font-medium">
                “{coupleProfile.nickname}” • <span className="text-slate-400">{coupleProfile.location}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-2xl bg-rose-950/60 border border-rose-500/30 text-rose-300 backdrop-blur-md">
            <Ring className="w-4 h-4 text-amber-400" />
            <span>Wedding: {coupleProfile.weddingDate || 'June 12, 2027'}</span>
          </div>
        </div>
      </div>

      {/* LIVE RELATIONSHIP COUNTER SECTION */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-rose-950/80 via-slate-900 to-amber-950/80 border border-rose-500/40 shadow-2xl text-center space-y-6">
        <div className="space-y-1">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 animate-spin" /> Live Relationship Counter
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Together For
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-rose-500/20 shadow-lg">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-rose-200 to-rose-400 block">
              {counter.years}
            </span>
            <span className="text-xs text-slate-400 uppercase font-medium mt-1 block">Years</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-rose-500/20 shadow-lg">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-rose-200 to-rose-400 block">
              {counter.months}
            </span>
            <span className="text-xs text-slate-400 uppercase font-medium mt-1 block">Months</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-rose-500/20 shadow-lg">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-rose-200 to-rose-400 block">
              {counter.days}
            </span>
            <span className="text-xs text-slate-400 uppercase font-medium mt-1 block">Days</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-rose-500/20 shadow-lg">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-400 block">
              {counter.hours}
            </span>
            <span className="text-xs text-slate-400 uppercase font-medium mt-1 block">Hours</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-rose-500/20 shadow-lg">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-400 block">
              {counter.minutes}
            </span>
            <span className="text-xs text-slate-400 uppercase font-medium mt-1 block">Mins</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-rose-500/20 shadow-lg">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-rose-500 animate-pulse block">
              {counter.seconds}
            </span>
            <span className="text-xs text-slate-400 uppercase font-medium mt-1 block">Secs</span>
          </div>
        </div>

        <p className="text-xs text-rose-200/80 italic">
          Started on {coupleProfile.relationshipStartDate} • Every second with you is a blessing.
        </p>
      </div>

      {/* LOVE STORY & FAVORITES GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Love Story Text */}
        <div className="lg:col-span-8 p-8 rounded-3xl bg-slate-900/60 border border-rose-500/20 space-y-4">
          <h3 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" /> Our Love Story
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed font-light whitespace-pre-line">
            {coupleProfile.loveStory}
          </p>

          <div className="pt-4 border-t border-slate-800 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Personal Message</h4>
            <blockquote className="italic text-rose-200 text-sm border-l-2 border-rose-500 pl-4 py-1">
              “{coupleProfile.personalMessage}”
            </blockquote>
          </div>
        </div>

        {/* Right: Couple Facts & Favorites */}
        <div className="lg:col-span-4 p-8 rounded-3xl bg-slate-900/60 border border-rose-500/20 space-y-6">
          <h3 className="font-serif text-xl font-bold text-white">Couple Favorites</h3>

          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
              <Music className="w-5 h-5 text-rose-400" />
              <div>
                <p className="text-slate-400">Favorite Song</p>
                <p className="font-semibold text-white">{coupleProfile.favoriteSong}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <div>
                <p className="text-slate-400">Favorite Theme Color</p>
                <p className="font-semibold text-white">{coupleProfile.favoriteColor}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
              <Calendar className="w-5 h-5 text-rose-400" />
              <div>
                <p className="text-slate-400">Engagement Date</p>
                <p className="font-semibold text-white">{coupleProfile.engagementDate || 'Feb 14, 2025'}</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative max-w-2xl w-full my-8 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-rose-500/30 text-white space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="font-serif text-2xl font-bold flex items-center gap-2">
                <Heart className="w-6 h-6 text-rose-500" /> Edit Couple Profile
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Partner 1 Name</label>
                  <input
                    type="text"
                    value={formData.partner1Name}
                    onChange={e => setFormData({ ...formData, partner1Name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Partner 2 Name</label>
                  <input
                    type="text"
                    value={formData.partner2Name}
                    onChange={e => setFormData({ ...formData, partner2Name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Couple Nickname</label>
                  <input
                    type="text"
                    value={formData.nickname}
                    onChange={e => setFormData({ ...formData, nickname: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Relationship Start Date</label>
                  <input
                    type="date"
                    value={formData.relationshipStartDate}
                    onChange={e => setFormData({ ...formData, relationshipStartDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Wedding Date</label>
                  <input
                    type="date"
                    value={formData.weddingDate || ''}
                    onChange={e => setFormData({ ...formData, weddingDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Love Story</label>
                <textarea
                  rows={4}
                  value={formData.loveStory}
                  onChange={e => setFormData({ ...formData, loveStory: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Personal Message</label>
                <input
                  type="text"
                  value={formData.personalMessage}
                  onChange={e => setFormData({ ...formData, personalMessage: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold shadow-lg flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
