import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { triggerLoveConfetti } from '../utils/confetti';
import { soundManager } from '../utils/sound';
import { 
  Heart, Gift, Mail, Sparkles, Image, Clock, 
  ArrowRight, ShieldCheck, Star, Users, Music, Play, 
  ChevronRight, Calendar, MapPin, Check
} from 'lucide-react';
import { Ring } from '../components/RingIcon';

export const LandingPage: React.FC = () => {
  const { setCurrentView, coupleProfile, setActiveSurpriseToUnbox, surprises } = useApp();

  // Real-time counter for Landing Page Hero
  const [timeTogether, setTimeTogether] = useState({
    years: 3,
    months: 4,
    days: 12,
    hours: 5,
    minutes: 18,
    seconds: 42
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const start = new Date(coupleProfile.relationshipStartDate);
      const diffTime = Math.abs(now.getTime() - start.getTime());
      
      const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const years = Math.floor(days / 365);
      const remainingDays = days % 365;
      const months = Math.floor(remainingDays / 30);
      const leftDays = remainingDays % 30;

      setTimeTogether({
        years: years || 3,
        months: months || 4,
        days: leftDays || 12,
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds()
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [coupleProfile]);

  const handleLaunchDemoSurprise = () => {
    soundManager.playUnboxCelebrationSound();
    triggerLoveConfetti();
    if (surprises.length > 0) {
      setActiveSurpriseToUnbox(surprises[0]);
    } else {
      setCurrentView('surprises');
    }
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-rose-600/20 via-pink-500/10 to-amber-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Text */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                The Luxury Romantic Platform
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                Every Love Story Deserves a{' '}
                <span className="bg-gradient-to-r from-rose-400 via-pink-300 to-amber-300 bg-clip-text text-transparent italic">
                  Beautiful Home.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-light">
                Create unforgettable memories, romantic surprise gifts, digital luxury wedding experiences, wax-sealed love letters, and eternal countdowns with Janno.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => setCurrentView('couple')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 text-white font-bold text-sm shadow-xl shadow-rose-950/80 hover:scale-105 transition-all flex items-center justify-center gap-3 border border-rose-400/30"
                >
                  <Heart className="w-5 h-5 text-amber-300 fill-amber-300" />
                  <span>Create Your Love Story</span>
                </button>

                <button
                  onClick={() => setCurrentView('surprises')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/90 border border-rose-500/30 text-rose-200 hover:text-white font-bold text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                >
                  <Gift className="w-4 h-4 text-rose-400" />
                  <span>Explore Romantic Surprises 🎁</span>
                </button>
              </div>

              {/* Trust Badge */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-white font-medium">4.9/5 Rating</span> (12,000+ Couples)
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% Private & Secure</span>
                </div>
              </div>
            </div>

            {/* Right Hero Card Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-rose-500/30 p-6 shadow-2xl backdrop-blur-xl overflow-hidden space-y-6">
                
                {/* Couple Card Header */}
                <div className="relative h-64 rounded-2xl overflow-hidden border border-rose-500/20 group">
                  <img
                    src={coupleProfile.coverPhoto}
                    alt="Couple"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
                        {coupleProfile.partner1Name} <Heart className="w-5 h-5 text-rose-500 fill-rose-500" /> {coupleProfile.partner2Name}
                      </h3>
                      <p className="text-xs text-rose-200/80 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-amber-400" /> {coupleProfile.location}
                      </p>
                    </div>
                    <span className="text-[10px] px-3 py-1 rounded-full bg-rose-500/30 text-rose-200 border border-rose-400/40 font-semibold backdrop-blur-md">
                      Together Forever
                    </span>
                  </div>
                </div>

                {/* Live Relationship Counter Box */}
                <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/20 space-y-2 text-center">
                  <p className="text-[11px] uppercase tracking-wider text-rose-300 font-semibold flex items-center justify-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" /> Live Relationship Counter
                  </p>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="p-2 rounded-xl bg-slate-950/60 border border-rose-900/30">
                      <span className="font-serif text-lg font-bold text-white block">{timeTogether.years}</span>
                      <span className="text-[10px] text-slate-400 uppercase">Years</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-950/60 border border-rose-900/30">
                      <span className="font-serif text-lg font-bold text-white block">{timeTogether.months}</span>
                      <span className="text-[10px] text-slate-400 uppercase">Months</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-950/60 border border-rose-900/30">
                      <span className="font-serif text-lg font-bold text-white block">{timeTogether.days}</span>
                      <span className="text-[10px] text-slate-400 uppercase">Days</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-950/60 border border-rose-900/30">
                      <span className="font-serif text-lg font-bold text-rose-400 block animate-pulse">{timeTogether.seconds}</span>
                      <span className="text-[10px] text-slate-400 uppercase">Secs</span>
                    </div>
                  </div>
                </div>

                {/* Quick Surprise Interactive Launcher */}
                <button
                  onClick={handleLaunchDemoSurprise}
                  className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-rose-900/50 via-pink-900/30 to-amber-900/50 border border-rose-500/40 hover:border-rose-400 text-rose-200 text-xs font-semibold flex items-center justify-between transition group"
                >
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-amber-300 animate-bounce" />
                    <span>Test Interactive Surprise Unboxing</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-rose-400 group-hover:translate-x-1 transition" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CORE FEATURES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs uppercase tracking-wider font-semibold">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            Designed for Unforgettable Romance
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Everything You Need for Your Love Journey
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            From the first coffee date to your golden wedding anniversary, Janno preserves every meaningful moment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Feature 1: Surprise Unboxing */}
          <div 
            onClick={() => setCurrentView('surprises')}
            className="p-6 rounded-3xl bg-slate-900/60 border border-rose-500/20 hover:border-rose-500/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 cursor-pointer group space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-pink-500 flex items-center justify-center shadow-lg text-white group-hover:scale-110 transition">
              <Gift className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white group-hover:text-rose-300 transition">
              Surprise Gift Unboxing 🎁
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Create cinematic gift surprises for your partner with falling roses, confetti, romantic love songs, photo slideshows, and hidden messages.
            </p>
            <div className="text-xs text-rose-400 font-semibold flex items-center gap-1">
              <span>Try Surprise Creator</span> <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Feature 2: Digital Wedding Invitations */}
          <div 
            onClick={() => setCurrentView('wedding')}
            className="p-6 rounded-3xl bg-slate-900/60 border border-rose-500/20 hover:border-rose-500/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 cursor-pointer group space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center shadow-lg text-white group-hover:scale-110 transition">
              <Ring className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white group-hover:text-rose-300 transition">
              Wedding Invitation Generator 💍
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Design digital luxury wedding invitations with 8 designer themes (Luxury Gold, Islamic Wedding, Royal Burgundy, Floral, Minimal White) and RSVP tracking.
            </p>
            <div className="text-xs text-amber-400 font-semibold flex items-center gap-1">
              <span>View 8 Themes</span> <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Feature 3: Love Letters */}
          <div 
            onClick={() => setCurrentView('letters')}
            className="p-6 rounded-3xl bg-slate-900/60 border border-rose-500/20 hover:border-rose-500/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 cursor-pointer group space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-600 to-rose-600 flex items-center justify-center shadow-lg text-white group-hover:scale-110 transition">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white group-hover:text-rose-300 transition">
              Wax-Sealed Love Letters 💌
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Write digital handwritten letters with authentic wax seals, ambient background melodies, and animated envelope opening effects for recipients.
            </p>
            <div className="text-xs text-rose-400 font-semibold flex items-center gap-1">
              <span>Write a Letter</span> <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Feature 4: Timeline */}
          <div 
            onClick={() => setCurrentView('timeline')}
            className="p-6 rounded-3xl bg-slate-900/60 border border-rose-500/20 hover:border-rose-500/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 cursor-pointer group space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-purple-600 flex items-center justify-center shadow-lg text-white group-hover:scale-110 transition">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white group-hover:text-rose-300 transition">
              Interactive Love Story Timeline ❤️
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Document your first meeting, first date, proposal, wedding day, and travel milestones with scroll animations, photos, and location maps.
            </p>
            <div className="text-xs text-rose-400 font-semibold flex items-center gap-1">
              <span>Explore Timeline</span> <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Feature 5: Memory Gallery */}
          <div 
            onClick={() => setCurrentView('memories')}
            className="p-6 rounded-3xl bg-slate-900/60 border border-rose-500/20 hover:border-rose-500/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 cursor-pointer group space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-500 flex items-center justify-center shadow-lg text-white group-hover:scale-110 transition">
              <Image className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white group-hover:text-rose-300 transition">
              Masonry Memory Gallery 📸
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Organize photos and videos into categorized albums (First Date, Engagement, Wedding, Travels) with high-res lightbox slideshow.
            </p>
            <div className="text-xs text-amber-400 font-semibold flex items-center gap-1">
              <span>View Memories</span> <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Feature 6: Public Love Page */}
          <div 
            onClick={() => setCurrentView('public-love')}
            className="p-6 rounded-3xl bg-slate-900/60 border border-rose-500/20 hover:border-rose-500/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 cursor-pointer group space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-amber-500 flex items-center justify-center shadow-lg text-white group-hover:scale-110 transition">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white group-hover:text-rose-300 transition">
              Shareable Love Page 🌐
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Get your custom URL e.g. <code className="text-rose-300">janno.com/love/ahmed-and-ayaan</code> to share your love story and guestbook with friends & family.
            </p>
            <div className="text-xs text-rose-400 font-semibold flex items-center gap-1">
              <span>Preview Public Page</span> <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>
      </section>

      {/* 3. WEDDING INVITATION TEMPLATES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-rose-950/60 via-slate-900 to-amber-950/60 border border-rose-500/30 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-rose-900/30 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center gap-2">
                <Ring className="w-4 h-4" /> 8 Custom Designer Themes
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
                Luxury Digital Wedding Invitations
              </h2>
            </div>
            <button
              onClick={() => setCurrentView('wedding')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-xs shadow-lg hover:scale-105 transition"
            >
              Create Invitation Now
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { title: 'Luxury Gold', color: 'from-amber-600 to-yellow-800' },
              { title: 'Elegant Rose', color: 'from-rose-600 to-pink-700' },
              { title: 'Royal Burgundy', color: 'from-rose-900 to-red-950' },
              { title: 'Islamic Wedding', color: 'from-emerald-700 to-teal-900' },
              { title: 'Minimal White', color: 'from-slate-700 to-slate-900' },
              { title: 'Black & Gold', color: 'from-slate-950 to-amber-950' },
              { title: 'Floral Wedding', color: 'from-pink-500 to-rose-700' },
              { title: 'Classic Traditional', color: 'from-amber-800 to-rose-900' }
            ].map((tmpl, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentView('wedding')}
                className={`p-4 rounded-2xl bg-gradient-to-br ${tmpl.color} border border-white/20 hover:scale-105 transition cursor-pointer text-center space-y-2 shadow-xl`}
              >
                <div className="w-8 h-8 rounded-full bg-white/20 mx-auto flex items-center justify-center">
                  <Ring className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-serif text-xs font-bold text-white">{tmpl.title}</h4>
                <p className="text-[10px] text-white/80">Click to Preview</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center mx-auto text-rose-400">
          <Heart className="w-8 h-8 fill-rose-500" />
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
          Ready to Begin Your Love Story?
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
          Join thousands of couples creating unforgettable romantic surprises, memories, and wedding celebrations with Janno.
        </p>
        <button
          onClick={() => setCurrentView('couple')}
          className="px-10 py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 text-white font-bold text-base shadow-2xl shadow-rose-950/80 hover:scale-105 transition"
        >
          Create Couple Profile Now ✨
        </button>
      </section>

    </div>
  );
};
