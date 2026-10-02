import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { soundManager } from '../utils/sound';
import { triggerWeddingFireworks } from '../utils/confetti';
import { 
  Calendar, MapPin, Check, X, HelpCircle, 
  Send, Heart, Sparkles 
} from 'lucide-react';
import { Ring } from '../components/RingIcon';

export const PublicInvitationPage: React.FC = () => {
  const { invitations, addRSVP, addToast } = useApp();
  const invitation = invitations[0];

  const [guestName, setGuestName] = useState('');
  const [attendance, setAttendance] = useState<'attending' | 'not-attending' | 'maybe'>('attending');
  const [guestCount, setGuestCount] = useState(2);
  const [mealPreference, setMealPreference] = useState('Halal Gourmet');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName) return;

    soundManager.playUnboxCelebrationSound();
    triggerWeddingFireworks();

    addRSVP({
      invitationId: invitation.id,
      guestName,
      attendance,
      guestCount,
      mealPreference,
      message
    });

    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20 pt-6">
      
      {/* Wedding Invitation Card */}
      <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-amber-950 via-slate-950 to-rose-950 border-2 border-amber-500/40 shadow-2xl space-y-8 text-center relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center mx-auto shadow-xl">
          <Ring className="w-8 h-8 text-amber-300 animate-bounce" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">Official Wedding Invitation</span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-amber-200">
            {invitation.brideName} & {invitation.groomName}
          </h1>
          <p className="text-sm text-slate-300 italic max-w-lg mx-auto">
            “{invitation.weddingMessage}”
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto py-6 border-y border-amber-500/30 text-amber-100">
          <div>
            <span className="text-[10px] uppercase tracking-wider opacity-70 block">Date</span>
            <span className="font-serif text-xl font-bold">{invitation.weddingDate}</span>
          </div>
          <div className="border-y sm:border-y-0 sm:border-x border-amber-500/30 py-2 sm:py-0">
            <span className="text-[10px] uppercase tracking-wider opacity-70 block">Time</span>
            <span className="font-serif text-xl font-bold">{invitation.weddingTime}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider opacity-70 block">Dress Code</span>
            <span className="font-serif text-sm font-bold">{invitation.dressCode}</span>
          </div>
        </div>

        <div className="space-y-1 text-slate-200">
          <span className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center justify-center gap-1">
            <MapPin className="w-4 h-4" /> {invitation.venueName}
          </span>
          <p className="text-xs text-slate-400">{invitation.address}</p>
        </div>
      </div>

      {/* RSVP FORM SECTION */}
      <div className="max-w-xl mx-auto p-8 rounded-3xl bg-slate-900 border border-rose-500/30 text-white space-y-6 shadow-2xl">
        <div className="text-center space-y-1 border-b border-slate-800 pb-4">
          <h2 className="font-serif text-2xl font-bold text-rose-200 flex items-center justify-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" /> Guest RSVP Submission
          </h2>
          <p className="text-xs text-slate-400">Please confirm your attendance by {invitation.rsvpDeadline}</p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-3">
            <Sparkles className="w-8 h-8 text-emerald-400 mx-auto animate-spin" />
            <h3 className="font-serif text-xl font-bold text-emerald-200">RSVP Confirmed! 🎉</h3>
            <p className="text-xs text-slate-300">
              Thank you, {guestName}! We cannot wait to celebrate our special day with you.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmitRSVP} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Your Full Name</label>
              <input
                type="text"
                placeholder="e.g. Tariq Al-Mansoor"
                value={guestName}
                onChange={e => setGuestName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-2">Will you be attending?</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setAttendance('attending')}
                  className={`p-3 rounded-xl border font-bold flex items-center justify-center gap-2 transition ${
                    attendance === 'attending' 
                      ? 'bg-emerald-600 text-white border-emerald-400 shadow-lg' 
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <Check className="w-4 h-4" /> Attending ✅
                </button>
                <button
                  type="button"
                  onClick={() => setAttendance('not-attending')}
                  className={`p-3 rounded-xl border font-bold flex items-center justify-center gap-2 transition ${
                    attendance === 'not-attending' 
                      ? 'bg-rose-600 text-white border-rose-400 shadow-lg' 
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <X className="w-4 h-4" /> Regretfully No ❌
                </button>
                <button
                  type="button"
                  onClick={() => setAttendance('maybe')}
                  className={`p-3 rounded-xl border font-bold flex items-center justify-center gap-2 transition ${
                    attendance === 'maybe' 
                      ? 'bg-amber-600 text-white border-amber-400 shadow-lg' 
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <HelpCircle className="w-4 h-4" /> Unsure 🤔
                </button>
              </div>
            </div>

            {attendance === 'attending' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Number of Guests</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={guestCount}
                    onChange={e => setGuestCount(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Dietary Preference</label>
                  <select
                    value={mealPreference}
                    onChange={e => setMealPreference(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="Halal Gourmet">Halal Gourmet</option>
                    <option value="Vegetarian">Vegetarian Delight</option>
                    <option value="Seafood Special">Seafood Special</option>
                    <option value="Standard">Standard Menu</option>
                  </select>
                </div>
              </div>
            )}

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Personal Message / Wishes</label>
              <textarea
                rows={3}
                placeholder="Leave a sweet congratulatory note for the couple..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition"
            >
              <Send className="w-4 h-4" /> Submit RSVP Confirmation ❤️
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
