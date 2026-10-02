import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TimelineEvent } from '../types';
import { 
  Heart, Calendar, MapPin, Plus, MessageCircle, 
  Home, Rose, Star, X, Save, Image as ImageIcon
} from 'lucide-react';
import { Ring } from '../components/RingIcon';

export const TimelinePage: React.FC = () => {
  const { timelineEvents, setTimelineEvents, coupleProfile, addToast } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newEvent, setNewEvent] = useState<Omit<TimelineEvent, 'id' | 'coupleId'>>({
    date: '',
    title: '',
    description: '',
    photoUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
    location: '',
    iconType: 'heart'
  });

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const event: TimelineEvent = {
      ...newEvent,
      id: `tl_${Date.now()}`,
      coupleId: coupleProfile.id
    };
    setTimelineEvents(prev => [...prev, event]);
    setIsAddModalOpen(false);
    addToast('New Love Story chapter added to timeline ❤️', 'love');
    setNewEvent({
      date: '',
      title: '',
      description: '',
      photoUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
      location: '',
      iconType: 'heart'
    });
  };

  const getIcon = (type?: string) => {
    switch (type) {
      case 'ring': return <Ring className="w-5 h-5 text-amber-300" />;
      case 'rose': return <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />;
      case 'home': return <Home className="w-5 h-5 text-pink-400" />;
      case 'chat': return <MessageCircle className="w-5 h-5 text-sky-400" />;
      default: return <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-rose-900/30 pb-8 text-center sm:text-left">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            Interactive Love Chronicle
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            {coupleProfile.partner1Name} ❤️ {coupleProfile.partner2Name}’s Timeline
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Every chapter of our journey, captured with love.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 text-white font-bold text-xs shadow-xl shadow-rose-950/80 hover:scale-105 transition flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" /> Add Memory Event
        </button>
      </div>

      {/* Timeline Vertical Track */}
      <div className="relative border-l-2 border-rose-500/30 ml-4 sm:ml-32 space-y-12 py-4">
        {timelineEvents.map((ev, idx) => (
          <div key={ev.id} className="relative group pl-8 sm:pl-12">
            
            {/* Timeline Node Point */}
            <div className="absolute -left-[23px] top-1.5 w-11 h-11 rounded-2xl bg-slate-950 border-2 border-rose-500 flex items-center justify-center shadow-xl shadow-rose-950/50 group-hover:scale-110 transition duration-300">
              {getIcon(ev.iconType)}
            </div>

            {/* Date Tag on Left (for desktop) */}
            <div className="hidden sm:block absolute -left-36 top-3 text-right w-28 text-xs font-bold text-rose-300 tracking-wider">
              {ev.date}
            </div>

            {/* Event Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-rose-500/20 backdrop-blur-md shadow-2xl space-y-4 hover:border-rose-500/50 transition">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="sm:hidden text-xs font-bold text-rose-300 block mb-1">
                    {ev.date}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
                    {ev.title}
                  </h3>
                </div>

                {ev.location && (
                  <span className="text-xs text-rose-200/80 flex items-center gap-1 font-medium bg-rose-950/50 px-3 py-1 rounded-full border border-rose-500/20 self-start sm:self-auto">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" /> {ev.location}
                  </span>
                )}
              </div>

              <p className="text-sm text-slate-300 leading-relaxed font-light">
                {ev.description}
              </p>

              {/* Event Photo */}
              {ev.photoUrl && (
                <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-rose-500/20">
                  <img
                    src={ev.photoUrl}
                    alt={ev.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                </div>
              )}

            </div>

          </div>
        ))}
      </div>

      {/* ADD EVENT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative max-w-lg w-full p-6 sm:p-8 rounded-3xl bg-slate-900 border border-rose-500/30 text-white space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="font-serif text-xl font-bold flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500" /> Add Timeline Milestone
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEvent} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Event Title</label>
                <input
                  type="text"
                  placeholder="e.g. First Date 🌹"
                  value={newEvent.title}
                  onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Date</label>
                  <input
                    type="text"
                    placeholder="e.g. June 20, 2024"
                    value={newEvent.date}
                    onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Dubai Marina"
                    value={newEvent.location}
                    onChange={e => setNewEvent({ ...newEvent, location: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Write a sweet memory of this day..."
                  value={newEvent.description}
                  onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Photo Image URL</label>
                <input
                  type="text"
                  value={newEvent.photoUrl}
                  onChange={e => setNewEvent({ ...newEvent, photoUrl: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold shadow-lg flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save Memory Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
