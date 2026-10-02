import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Heart, Volume2, VolumeX, Music, ShoppingBag, 
  Bell, User as UserIcon, Menu, X, Sparkles, Shield, 
  Calendar, Gift, Mail, Image, Clock, Check
} from 'lucide-react';
import { Ring } from './RingIcon';

export const Navbar: React.FC = () => {
  const { 
    currentView, setCurrentView, user, isMuted, toggleMute, 
    isAmbientPlaying, toggleAmbientMusic, cart, notifications, 
    markNotificationRead, logout, loginAsDemoCouple, loginAsDemoAdmin 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const unreadNotifsCount = notifications.filter(n => !n.isRead).length;

  const navItems = [
    { id: 'landing', label: 'Home', icon: Heart },
    { id: 'dashboard', label: 'Dashboard', icon: Sparkles, authRequired: true },
    { id: 'couple', label: 'Couple', icon: Heart },
    { id: 'timeline', label: 'Love Story', icon: Calendar },
    { id: 'memories', label: 'Memories', icon: Image },
    { id: 'letters', label: 'Letters', icon: Mail },
    { id: 'surprises', label: 'Surprises 🎁', icon: Gift },
    { id: 'wedding', label: 'Wedding 💍', icon: Ring },
    { id: 'gifts', label: 'Shop 🛍️', icon: ShoppingBag },
    { id: 'countdowns', label: 'Countdowns ⏳', icon: Clock }
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/80 border-b border-rose-900/20 text-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <button
          onClick={() => setCurrentView('landing')}
          className="flex items-center gap-3 group focus:outline-none text-left"
        >
          <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-600 via-pink-500 to-amber-400 p-0.5 shadow-lg shadow-rose-950/50 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center relative overflow-hidden">
              <Heart className="w-6 h-6 text-rose-500 fill-rose-500/30 group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/20 via-transparent to-rose-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-2xl font-bold tracking-tight bg-gradient-to-r from-rose-200 via-pink-100 to-amber-200 bg-clip-text text-transparent">
                Janno
              </span>
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 font-sans uppercase tracking-widest text-[10px]">
                ❤️
              </span>
            </div>
            <p className="text-[11px] text-rose-300/70 font-sans tracking-wide hidden sm:block">
              Your Love Story, Beautifully Remembered
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-rose-500/10">
          {navItems.map(item => {
            const isActive = currentView === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md shadow-rose-900/40 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-rose-400/80'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Utilities */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Ambient Music Toggle */}
          <button
            onClick={toggleAmbientMusic}
            title="Toggle Ambient Love Melody"
            className={`hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
              isAmbientPlaying
                ? 'bg-rose-500/20 border-rose-500/50 text-rose-200 animate-pulse'
                : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Music className={`w-3.5 h-3.5 ${isAmbientPlaying ? 'text-rose-400 animate-spin' : ''}`} />
            <span>{isAmbientPlaying ? 'Melody On' : 'Ambient Music'}</span>
          </button>

          {/* Sound Mute Button */}
          <button
            onClick={toggleMute}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-rose-400" />}
          </button>

          {/* Cart Icon Button */}
          <button
            onClick={() => setCurrentView('cart')}
            className="relative p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition"
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[10px] font-bold flex items-center justify-center shadow-lg border border-slate-950">
                {cartItemsCount}
              </span>
            )}
          </button>

          {/* Notification Bell Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition"
            >
              <Bell className="w-4 h-4 text-rose-400" />
              {unreadNotifsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl bg-slate-900/95 border border-rose-900/30 backdrop-blur-xl shadow-2xl p-4 z-50 text-slate-100 animate-fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-rose-400" />
                    <h4 className="font-medium text-sm">Notifications</h4>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    {unreadNotifsCount} New
                  </span>
                </div>
                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {notifications.map(notif => (
                    <div
                      key={notif.id}
                      onClick={() => markNotificationRead(notif.id)}
                      className={`p-3 rounded-xl border transition cursor-pointer ${
                        notif.isRead 
                          ? 'bg-slate-950/40 border-slate-800/60 opacity-60' 
                          : 'bg-rose-950/30 border-rose-500/30 hover:border-rose-500/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-semibold text-rose-200">{notif.title}</p>
                        <span className="text-[10px] text-slate-400">{notif.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">{notif.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Account / Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-gradient-to-r from-rose-950/50 to-slate-900/90 border border-rose-500/30 hover:border-rose-500/60 transition"
            >
              <div className="w-7 h-7 rounded-lg overflow-hidden bg-rose-900/50 border border-rose-400/30 flex items-center justify-center text-xs font-bold text-rose-200">
                {user ? user.name.charAt(0) : <UserIcon className="w-4 h-4 text-rose-300" />}
              </div>
              <span className="text-xs font-medium hidden sm:inline text-slate-200">
                {user ? user.name : 'Account'}
              </span>
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-slate-900/95 border border-rose-900/30 backdrop-blur-xl shadow-2xl p-2 z-50 text-slate-100 animate-fade-in space-y-1">
                {user ? (
                  <>
                    <div className="p-3 border-b border-slate-800 mb-1">
                      <p className="text-xs font-bold text-white">{user.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                      <span className="inline-block mt-1.5 text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase tracking-wider">
                        Role: {user.role}
                      </span>
                    </div>
                    <button
                      onClick={() => { setCurrentView('dashboard'); setUserMenuOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-white/5 flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                      Couple Dashboard
                    </button>
                    <button
                      onClick={() => { setCurrentView('admin'); setUserMenuOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-white/5 flex items-center gap-2 text-amber-300"
                    >
                      <Shield className="w-3.5 h-3.5 text-amber-400" />
                      Admin Control Panel
                    </button>
                    <button
                      onClick={() => { logout(); setUserMenuOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-rose-500/10 text-rose-400 flex items-center gap-2"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <div className="p-2 text-xs font-medium text-slate-400">Quick Switch Demo Account</div>
                    <button
                      onClick={() => { loginAsDemoCouple(); setUserMenuOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs bg-rose-950/40 hover:bg-rose-900/50 border border-rose-500/30 text-rose-200 flex items-center gap-2"
                    >
                      <Heart className="w-3.5 h-3.5 text-rose-400" />
                      Demo Couple (Ahmed)
                    </button>
                    <button
                      onClick={() => { loginAsDemoAdmin(); setUserMenuOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs bg-amber-950/40 hover:bg-amber-900/50 border border-amber-500/30 text-amber-200 flex items-center gap-2"
                    >
                      <Shield className="w-3.5 h-3.5 text-amber-400" />
                      Demo Admin Panel
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-rose-400" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 p-4 space-y-2">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-3 ${
                  currentView === item.id 
                    ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white' 
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4 text-rose-400" />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
