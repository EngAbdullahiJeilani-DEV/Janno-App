import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MemoryItem } from '../types';
import { 
  Heart, Image as ImageIcon, Plus, Filter, MapPin, 
  Calendar, X, ChevronLeft, ChevronRight, Save, Maximize2 
} from 'lucide-react';

export const MemoriesPage: React.FC = () => {
  const { memories, setMemories, coupleProfile, addToast } = useApp();
  const [selectedAlbum, setSelectedAlbum] = useState<string>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newMemory, setNewMemory] = useState<Omit<MemoryItem, 'id' | 'coupleId'>>({
    title: '',
    date: new Date().toLocaleDateString(),
    photoUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
    album: 'Favorite Memories',
    caption: '',
    location: ''
  });

  const albums = ['All', 'First Date', 'Favorite Memories', 'Engagement', 'Wedding', 'Travels', 'Anniversary'];

  const filteredMemories = selectedAlbum === 'All'
    ? memories
    : memories.filter(m => m.album === selectedAlbum);

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    const item: MemoryItem = {
      ...newMemory,
      id: `mem_${Date.now()}`,
      coupleId: coupleProfile.id
    };
    setMemories(prev => [item, ...prev]);
    setIsAddModalOpen(false);
    addToast('New photo added to Memory Gallery 📸', 'success');
  };

  const handlePrevPhoto = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((activeLightboxIndex - 1 + filteredMemories.length) % filteredMemories.length);
  };

  const handleNextPhoto = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((activeLightboxIndex + 1) % filteredMemories.length);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-rose-900/30 pb-6 text-center sm:text-left">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <ImageIcon className="w-3.5 h-3.5 text-rose-400" />
            Couple Photo Vault
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Memory Gallery
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Capture every smile, kiss, trip, and sunset together.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-xs shadow-xl shadow-rose-950/80 hover:scale-105 transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add New Photo
        </button>
      </div>

      {/* Album Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {albums.map(alb => (
          <button
            key={alb}
            onClick={() => setSelectedAlbum(alb)}
            className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition ${
              selectedAlbum === alb
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-950/50 font-bold'
                : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {alb === 'All' ? '✨ All Photos' : alb}
          </button>
        ))}
      </div>

      {/* Masonry Image Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {filteredMemories.map((mem, idx) => (
          <div
            key={mem.id}
            onClick={() => setActiveLightboxIndex(idx)}
            className="break-inside-avoid relative rounded-3xl overflow-hidden bg-slate-900 border border-rose-500/20 shadow-xl group cursor-pointer"
          >
            <img
              src={mem.photoUrl}
              alt={mem.title}
              className="w-full object-cover group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

            <div className="absolute bottom-0 inset-x-0 p-5 space-y-2 text-white">
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-rose-500/30 border border-rose-400/30 text-rose-200 font-semibold backdrop-blur-md uppercase tracking-wider">
                {mem.album}
              </span>
              <h3 className="font-serif text-lg font-bold group-hover:text-rose-300 transition">
                {mem.title}
              </h3>
              <p className="text-xs text-slate-300 line-clamp-2 font-light">{mem.caption}</p>

              <div className="flex items-center justify-between text-[11px] text-rose-200/80 pt-2 border-t border-white/10">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-rose-400" /> {mem.date}</span>
                {mem.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-amber-400" /> {mem.location}</span>}
              </div>
            </div>

            <div className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950/60 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition">
              <Maximize2 className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {activeLightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-2xl text-white">
          <button
            onClick={() => setActiveLightboxIndex(null)}
            className="absolute top-6 right-6 p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrevPhoto}
            className="absolute left-4 sm:left-10 p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-white hover:bg-slate-800 transition"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full text-center space-y-4">
            <div className="max-h-[70vh] rounded-3xl overflow-hidden border border-rose-500/30 mx-auto shadow-2xl">
              <img
                src={filteredMemories[activeLightboxIndex].photoUrl}
                alt="Lightbox"
                className="w-full h-full object-contain max-h-[70vh] bg-black"
              />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-2xl font-bold text-white">
                {filteredMemories[activeLightboxIndex].title}
              </h3>
              <p className="text-sm text-slate-300 max-w-xl mx-auto">
                {filteredMemories[activeLightboxIndex].caption}
              </p>
              <p className="text-xs text-rose-300">
                {filteredMemories[activeLightboxIndex].date} • {filteredMemories[activeLightboxIndex].location || 'Love Location'}
              </p>
            </div>
          </div>

          <button
            onClick={handleNextPhoto}
            className="absolute right-4 sm:right-10 p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-white hover:bg-slate-800 transition"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* ADD MEMORY MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="max-w-md w-full p-6 rounded-3xl bg-slate-900 border border-rose-500/30 text-white space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-serif text-lg font-bold flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-rose-400" /> Add Photo to Gallery
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMemory} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Title</label>
                <input
                  type="text"
                  placeholder="e.g. Sunset Promenade"
                  value={newMemory.title}
                  onChange={e => setNewMemory({ ...newMemory, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Album</label>
                <select
                  value={newMemory.album}
                  onChange={e => setNewMemory({ ...newMemory, album: e.target.value as MemoryItem['album'] })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                >
                  {albums.filter(a => a !== 'All').map(a => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Photo Image URL</label>
                <input
                  type="text"
                  value={newMemory.photoUrl}
                  onChange={e => setNewMemory({ ...newMemory, photoUrl: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Caption</label>
                <textarea
                  rows={2}
                  value={newMemory.caption}
                  onChange={e => setNewMemory({ ...newMemory, caption: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold"
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
