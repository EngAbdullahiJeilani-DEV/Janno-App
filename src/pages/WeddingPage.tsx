import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WeddingInvitation, InvitationTheme } from '../types';
import { 
  Calendar, MapPin, Share2, Sparkles, Check, 
  Edit3, Eye, Printer, Users, Heart, Save, Plus, X 
} from 'lucide-react';
import { Ring } from '../components/RingIcon';

export const WeddingPage: React.FC = () => {
  const { invitations, setInvitations, coupleProfile, rsvps, addToast, setActiveInvitationView, setCurrentView } = useApp();
  const [activeInvitation, setActiveInvitation] = useState<WeddingInvitation>(invitations[0]);
  const [selectedTheme, setSelectedTheme] = useState<InvitationTheme>(activeInvitation.theme);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState<WeddingInvitation>(activeInvitation);

  const themes: { id: InvitationTheme; name: string; bg: string; text: string; accent: string }[] = [
    { id: 'luxury-gold', name: 'Luxury Gold 👑', bg: 'from-amber-950 via-slate-950 to-yellow-950', text: 'text-amber-200', accent: 'border-amber-500/50' },
    { id: 'elegant-rose', name: 'Elegant Rose 🌹', bg: 'from-rose-950 via-slate-950 to-pink-950', text: 'text-rose-200', accent: 'border-rose-500/50' },
    { id: 'royal-burgundy', name: 'Royal Burgundy 🍷', bg: 'from-red-950 via-slate-950 to-rose-950', text: 'text-rose-100', accent: 'border-red-600/50' },
    { id: 'islamic-wedding', name: 'Islamic Wedding 🌙', bg: 'from-emerald-950 via-slate-950 to-teal-950', text: 'text-emerald-200', accent: 'border-emerald-500/50' },
    { id: 'minimal-white', name: 'Minimal White 🕊️', bg: 'from-slate-900 via-slate-950 to-slate-900', text: 'text-slate-100', accent: 'border-slate-400/50' },
    { id: 'black-gold', name: 'Modern Black & Gold ✨', bg: 'from-slate-950 via-black to-amber-950', text: 'text-amber-300', accent: 'border-amber-400/50' },
    { id: 'floral-wedding', name: 'Floral Wedding 🌸', bg: 'from-pink-950 via-slate-950 to-rose-950', text: 'text-pink-200', accent: 'border-pink-500/50' },
    { id: 'classic-traditional', name: 'Classic Traditional 💒', bg: 'from-amber-950 via-rose-950 to-slate-950', text: 'text-amber-100', accent: 'border-amber-500/50' }
  ];

  const handleSaveInvitation = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: WeddingInvitation = { ...formData, theme: selectedTheme };
    setActiveInvitation(updated);
    setInvitations([updated]);
    setIsEditing(false);
    addToast('Wedding invitation updated successfully! 💍', 'love');
  };

  const handleCopyRSVPLink = () => {
    const url = `${window.location.origin}/invitation/${activeInvitation.id}`;
    navigator.clipboard.writeText(url);
    addToast('Public wedding guest link copied! 📋', 'success');
  };

  const activeThemeObj = themes.find(t => t.id === selectedTheme) || themes[0];

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-rose-900/30 pb-6 text-center sm:text-left">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Ring className="w-3.5 h-3.5 text-amber-400" />
            Digital Wedding Invitation Suite
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            The Big Day Is Coming 💍
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Generate digital luxury invitations with 8 designer themes and guest RSVP tracker.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyRSVPLink}
            className="px-5 py-3 rounded-2xl bg-slate-900 border border-rose-500/30 text-rose-200 text-xs font-bold hover:bg-slate-800 transition flex items-center gap-2"
          >
            <Share2 className="w-4 h-4 text-amber-400" /> Share Invitation Link
          </button>

          <button
            onClick={() => { setFormData(activeInvitation); setIsEditing(true); }}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs font-bold shadow-lg hover:scale-105 transition flex items-center gap-2"
          >
            <Edit3 className="w-4 h-4" /> Customize Details
          </button>
        </div>
      </div>

      {/* 8 THEME SELECTOR BAR */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">Select Invitation Theme (8 Designs)</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {themes.map(t => (
            <button
              key={t.id}
              onClick={() => setSelectedTheme(t.id)}
              className={`p-3 rounded-2xl text-center text-xs font-bold border transition ${
                selectedTheme === t.id
                  ? 'bg-rose-600 text-white border-rose-400 shadow-xl scale-105'
                  : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* LIVE INVITATION PREVIEW BOARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Preview Card */}
        <div className="lg:col-span-8">
          <div className={`p-8 sm:p-14 rounded-3xl bg-gradient-to-b ${activeThemeObj.bg} border-2 ${activeThemeObj.accent} shadow-2xl space-y-8 text-center relative overflow-hidden`}>
            
            {/* Islamic Wedding Crescent Emblem if Islamic Theme */}
            {selectedTheme === 'islamic-wedding' && (
              <div className="space-y-2">
                <p className="font-serif text-lg text-emerald-300 italic">bismillahi r-rahmani r-rahim</p>
                <p className="text-xs text-emerald-200/80 uppercase tracking-widest">In the name of Allah, Most Gracious, Most Merciful</p>
              </div>
            )}

            {/* Header Rings Emblem */}
            <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto shadow-xl">
              <Ring className="w-8 h-8 text-amber-300" />
            </div>

            {/* Couple Names */}
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest opacity-80 font-semibold">Together with their families</span>
              <h2 className={`font-serif text-4xl sm:text-6xl font-bold ${activeThemeObj.text}`}>
                {formData.brideName} & {formData.groomName}
              </h2>
              <p className="text-sm opacity-90 italic max-w-md mx-auto pt-2">
                “{formData.weddingMessage}”
              </p>
            </div>

            {/* Date, Time & Venue */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto py-4 border-y border-current/20">
              <div className="p-3">
                <span className="text-[10px] uppercase tracking-wider opacity-70 block">Date</span>
                <span className="font-serif text-lg font-bold">{formData.weddingDate}</span>
              </div>
              <div className="p-3 border-y sm:border-y-0 sm:border-x border-current/20">
                <span className="text-[10px] uppercase tracking-wider opacity-70 block">Time</span>
                <span className="font-serif text-lg font-bold">{formData.weddingTime}</span>
              </div>
              <div className="p-3">
                <span className="text-[10px] uppercase tracking-wider opacity-70 block">Dress Code</span>
                <span className="font-serif text-sm font-bold">{formData.dressCode}</span>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center justify-center gap-1">
                <MapPin className="w-4 h-4" /> {formData.venueName}
              </span>
              <p className="text-xs opacity-80">{formData.address}</p>
            </div>

            {/* RSVP Deadline */}
            <div className="pt-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold">
                Kindly RSVP by {formData.rsvpDeadline}
              </span>
            </div>

          </div>
        </div>

        {/* Right: Guest RSVP Stats & List */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="p-6 rounded-3xl bg-slate-900/70 border border-rose-500/20 space-y-4">
            <h3 className="font-serif text-xl font-bold text-white flex items-center justify-between">
              <span>Guest RSVPs ({rsvps.length})</span>
              <span className="text-xs font-sans px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300">
                Total Attending: {rsvps.reduce((s, r) => s + (r.attendance === 'attending' ? r.guestCount : 0), 0)}
              </span>
            </h3>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {rsvps.map(r => (
                <div key={r.id} className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-white">{r.guestName} ({r.guestCount} guests)</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                      r.attendance === 'attending' 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                        : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {r.attendance}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">Meal: {r.mealPreference}</p>
                  {r.message && <p className="text-[11px] text-rose-200 italic">“{r.message}”</p>}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* EDIT MODAL */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="max-w-xl w-full my-8 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-rose-500/30 text-white space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-serif text-lg font-bold flex items-center gap-2">
                <Ring className="w-5 h-5 text-amber-400" /> Edit Wedding Invitation
              </h3>
              <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveInvitation} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Bride Name</label>
                  <input
                    type="text"
                    value={formData.brideName}
                    onChange={e => setFormData({ ...formData, brideName: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Groom Name</label>
                  <input
                    type="text"
                    value={formData.groomName}
                    onChange={e => setFormData({ ...formData, groomName: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Wedding Date</label>
                  <input
                    type="text"
                    value={formData.weddingDate}
                    onChange={e => setFormData({ ...formData, weddingDate: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Wedding Time</label>
                  <input
                    type="text"
                    value={formData.weddingTime}
                    onChange={e => setFormData({ ...formData, weddingTime: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Venue Name</label>
                <input
                  type="text"
                  value={formData.venueName}
                  onChange={e => setFormData({ ...formData, venueName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Wedding Message</label>
                <textarea
                  rows={3}
                  value={formData.weddingMessage}
                  onChange={e => setFormData({ ...formData, weddingMessage: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold"
                >
                  Save Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
