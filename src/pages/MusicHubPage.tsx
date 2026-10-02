import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Play, Pause, Disc, Heart, Music, Volume2, VolumeX, Sparkles } from 'lucide-react';

export const MusicHubPage: React.FC = () => {
  const { isAmbientPlaying, toggleAmbientMusic, coupleProfile, addToast } = useApp();
  const [activeSongIdx, setActiveSongIdx] = useState(0);

  const playlist = [
    { title: 'Perfect (Acoustic)', artist: 'Ed Sheeran', album: 'Our Song ❤️', duration: '3:45' },
    { title: 'A Thousand Years', artist: 'Christina Perri', album: 'Twilight Romance', duration: '4:12' },
    { title: 'Can’t Help Falling in Love', artist: 'Kina Grannis', album: 'Crazy Rich Asians', duration: '3:20' },
    { title: 'All of Me', artist: 'John Legend', album: 'Love in the Future', duration: '4:30' },
    { title: 'Bosphorus Sunset (Acoustic)', artist: 'Istanbul Strings', album: 'Janno Originals', duration: '5:10' }
  ];

  const currentSong = playlist[activeSongIdx];

  const handleSelectSong = (idx: number) => {
    setActiveSongIdx(idx);
    if (!isAmbientPlaying) {
      toggleAmbientMusic();
    }
    addToast(`Now playing "${playlist[idx].title}" 🎵`, 'love');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold uppercase tracking-wider">
          <Music className="w-3.5 h-3.5 text-rose-400" />
          Couple Playlist & Audio Hub
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
          Our Soundtrack ❤️
        </h1>
        <p className="text-sm text-slate-300">
          The melodies that define your love story.
        </p>
      </div>

      {/* Main Music Player Card */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-rose-950/80 via-slate-900 to-amber-950/80 border border-rose-500/30 shadow-2xl space-y-8 text-center relative overflow-hidden">
        
        {/* Animated Spinning Record */}
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto rounded-full bg-gradient-to-tr from-rose-600 to-amber-400 p-1 shadow-2xl">
          <div className={`w-full h-full bg-slate-950 rounded-full flex items-center justify-center relative overflow-hidden ${isAmbientPlaying ? 'animate-spin' : ''}`}>
            <Disc className="w-20 h-20 text-rose-500" />
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/20 via-transparent to-rose-500/20" />
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center justify-center gap-1">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> Official Couple Song
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            {currentSong.title}
          </h2>
          <p className="text-sm text-rose-200/90">{currentSong.artist} • {currentSong.album}</p>
        </div>

        {/* Big Play Button */}
        <button
          onClick={toggleAmbientMusic}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 text-white shadow-2xl flex items-center justify-center mx-auto hover:scale-110 transition"
        >
          {isAmbientPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 fill-white ml-1" />}
        </button>

      </div>

      {/* Playlist List */}
      <div className="p-8 rounded-3xl bg-slate-900/70 border border-rose-500/20 space-y-4">
        <h3 className="font-serif text-2xl font-bold text-white">Love Playlist</h3>

        <div className="space-y-2">
          {playlist.map((song, idx) => (
            <div
              key={idx}
              onClick={() => handleSelectSong(idx)}
              className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between gap-4 ${
                activeSongIdx === idx
                  ? 'bg-rose-950/50 border-rose-500 text-rose-100 font-bold'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <Disc className={`w-5 h-5 ${activeSongIdx === idx ? 'text-rose-400 animate-spin' : 'text-slate-500'}`} />
                <div>
                  <p className="text-sm leading-snug">{song.title}</p>
                  <p className="text-xs text-slate-400 font-normal">{song.artist}</p>
                </div>
              </div>
              <span className="text-xs text-slate-400">{song.duration}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
