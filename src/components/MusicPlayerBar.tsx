import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music, Heart, Disc } from 'lucide-react';

const songs = [
  { id: '1', title: 'Perfect (Acoustic)', artist: 'Ed Sheeran', duration: '3:45' },
  { id: '2', title: 'A Thousand Years', artist: 'Christina Perri', duration: '4:12' },
  { id: '3', title: 'Can’t Help Falling in Love', artist: 'Kina Grannis', duration: '3:20' },
  { id: '4', title: 'All of Me', artist: 'John Legend', duration: '4:30' }
];

export const MusicPlayerBar: React.FC = () => {
  const { isAmbientPlaying, toggleAmbientMusic, isMuted, toggleMute } = useApp();
  const [currentSongIdx, setCurrentSongIdx] = useState(0);

  const song = songs[currentSongIdx];

  const handleNext = () => {
    setCurrentSongIdx((prev) => (prev + 1) % songs.length);
  };

  const handlePrev = () => {
    setCurrentSongIdx((prev) => (prev - 1 + songs.length) % songs.length);
  };

  return (
    <div className="fixed bottom-14 lg:bottom-4 right-4 z-30 max-w-sm w-full hidden sm:block">
      <div className="p-3 rounded-2xl bg-slate-900/90 border border-rose-500/30 backdrop-blur-xl shadow-2xl text-slate-100 flex items-center justify-between gap-3">
        
        {/* Track Info */}
        <div className="flex items-center gap-3 overflow-hidden">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center shrink-0 ${isAmbientPlaying ? 'animate-spin' : ''}`}>
            <Disc className="w-5 h-5 text-white" />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-rose-200 truncate flex items-center gap-1">
              <span>{song.title}</span>
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
            </p>
            <p className="text-[10px] text-slate-400 truncate">{song.artist}</p>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={toggleAmbientMusic}
            className="p-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md shadow-rose-900/50 hover:scale-105 transition"
          >
            {isAmbientPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
          </button>

          <button
            onClick={handleNext}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={toggleMute}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white transition ml-1"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-500" /> : <Volume2 className="w-3.5 h-3.5 text-rose-400" />}
          </button>
        </div>
      </div>
    </div>
  );
};
