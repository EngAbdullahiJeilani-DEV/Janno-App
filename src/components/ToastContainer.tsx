import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart, CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map(toast => {
        let icon = <Info className="w-5 h-5 text-sky-400" />;
        let borderColor = 'border-sky-500/30';
        let bgGlow = 'from-sky-900/40 to-slate-900/90';

        if (toast.type === 'love') {
          icon = <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />;
          borderColor = 'border-rose-500/40';
          bgGlow = 'from-rose-950/70 to-slate-900/90';
        } else if (toast.type === 'success') {
          icon = <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
          borderColor = 'border-emerald-500/30';
          bgGlow = 'from-emerald-950/60 to-slate-900/90';
        } else if (toast.type === 'error') {
          icon = <AlertCircle className="w-5 h-5 text-amber-400" />;
          borderColor = 'border-amber-500/30';
          bgGlow = 'from-amber-950/60 to-slate-900/90';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-2xl border ${borderColor} bg-gradient-to-r ${bgGlow} backdrop-blur-md shadow-2xl text-white shadow-rose-950/20 transform transition-all duration-300 animate-slide-in-right`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/10">{icon}</div>
              <p className="text-sm font-medium leading-snug">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
