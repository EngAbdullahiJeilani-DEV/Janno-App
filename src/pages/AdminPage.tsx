import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Shield, Users, Heart, Gift, ShoppingBag, 
  TrendingUp, DollarSign, Activity, FileText, Check, Search 
} from 'lucide-react';
import { Ring } from '../components/RingIcon';

export const AdminPage: React.FC = () => {
  const { products, orders, rsvps, addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'analytics' | 'couples' | 'weddings' | 'orders' | 'products'>('analytics');
  const [searchTerm, setSearchTerm] = useState('');

  const stats = [
    { label: 'Total Users', value: '1,482', icon: Users, color: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/30' },
    { label: 'Active Couples', value: '741', icon: Heart, color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/30' },
    { label: 'Total Weddings', value: '238', icon: Ring, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' },
    { label: 'Total Surprises', value: '1,890', icon: Gift, color: 'text-pink-400', bg: 'bg-pink-500/10 border-pink-500/30' },
    { label: 'Total Orders', value: '620', icon: ShoppingBag, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' },
    { label: 'Total Revenue', value: '$142,850', icon: DollarSign, color: 'text-amber-300', bg: 'bg-amber-500/20 border-amber-500/40' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20">
      
      {/* Admin Header */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-amber-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" /> Platform Admin Portal
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Janno Platform Control Center 👑
          </h1>
          <p className="text-sm text-slate-300">
            Real-time couple metrics, wedding invitation logs, gift marketplace revenue, & system analytics.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          {['analytics', 'couples', 'weddings', 'orders', 'products'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition ${
                activeTab === tab 
                  ? 'bg-amber-500 text-slate-950 shadow-lg' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* KPI STATS CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((st, i) => {
          const Icon = st.icon;
          return (
            <div key={i} className={`p-4 rounded-3xl bg-slate-900/80 border ${st.bg} space-y-2 shadow-xl`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400">{st.label}</span>
                <Icon className={`w-4 h-4 ${st.color}`} />
              </div>
              <span className={`font-serif text-2xl font-bold ${st.color} block`}>{st.value}</span>
            </div>
          );
        })}
      </div>

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Revenue Chart Widget */}
          <div className="lg:col-span-8 p-8 rounded-3xl bg-slate-900/70 border border-rose-500/20 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-amber-400" /> Platform Revenue & Growth
                </h3>
                <p className="text-xs text-slate-400">Monthly breakdown of surprise gifts & premium wedding invitations</p>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                +28.4% MoM Growth
              </span>
            </div>

            {/* SVG Line Chart */}
            <div className="h-64 w-full pt-4">
              <svg className="w-full h-full text-rose-500" viewBox="0 0 500 150">
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#E11D48" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#E11D48" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path fill="url(#grad)" d="M0,130 Q70,90 140,110 T280,50 T420,30 L500,20 L500,150 L0,150 Z" />
                <path fill="none" stroke="#E11D48" strokeWidth="4" d="M0,130 Q70,90 140,110 T280,50 T420,30 L500,20" />
                <circle cx="140" cy="110" r="5" fill="#F59E0B" />
                <circle cx="280" cy="50" r="5" fill="#F59E0B" />
                <circle cx="500" cy="20" r="5" fill="#F59E0B" />
              </svg>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-xs text-slate-400 border-t border-slate-800 pt-4">
              <div>Q1: $28,400</div>
              <div>Q2: $34,900</div>
              <div>Q3: $41,200</div>
              <div className="font-bold text-amber-300">Q4: $38,350</div>
            </div>
          </div>

          {/* System Health */}
          <div className="lg:col-span-4 p-8 rounded-3xl bg-slate-900/70 border border-rose-500/20 space-y-6">
            <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400" /> System Metrics
            </h3>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Database Connection</span>
                <span className="text-emerald-400 font-bold">Optimal (4ms)</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Audio Synth Engine</span>
                <span className="text-emerald-400 font-bold">Active Web Audio</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Stripe Payment API</span>
                <span className="text-emerald-400 font-bold">Connected</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Public Love Links</span>
                <span className="text-emerald-400 font-bold">741 Active</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* DATA TABLES FOR COUPLES / ORDERS */}
      {(activeTab === 'couples' || activeTab === 'orders' || activeTab === 'weddings' || activeTab === 'products') && (
        <div className="p-8 rounded-3xl bg-slate-900/70 border border-rose-500/20 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold text-white capitalize">{activeTab} Management</h3>
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search database..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white pl-9"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Name / Title</th>
                  <th className="p-3">Details</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {activeTab === 'products' && products.map(p => (
                  <tr key={p.id}>
                    <td className="p-3 font-mono text-rose-300">{p.id}</td>
                    <td className="p-3 font-bold text-white">{p.name}</td>
                    <td className="p-3 text-slate-400">{p.category} — ${p.price}</td>
                    <td className="p-3"><span className="text-emerald-400 font-bold">In Stock</span></td>
                    <td className="p-3"><button onClick={() => addToast('Product updated', 'info')} className="text-amber-400 font-bold">Edit</button></td>
                  </tr>
                ))}
                {activeTab === 'orders' && orders.map(o => (
                  <tr key={o.id}>
                    <td className="p-3 font-mono text-rose-300">{o.id}</td>
                    <td className="p-3 font-bold text-white">{o.shippingName}</td>
                    <td className="p-3 text-slate-400">${o.totalAmount} — {o.paymentMethod}</td>
                    <td className="p-3"><span className="text-amber-400 font-bold">{o.status}</span></td>
                    <td className="p-3"><button onClick={() => addToast('Status updated to Shipped', 'success')} className="text-emerald-400 font-bold">Update Status</button></td>
                  </tr>
                ))}
                {activeTab === 'couples' && (
                  <tr>
                    <td className="p-3 font-mono text-rose-300">cpl_1</td>
                    <td className="p-3 font-bold text-white">Ahmed & Ayaan</td>
                    <td className="p-3 text-slate-400">Together 3 Years • Dubai & Istanbul</td>
                    <td className="p-3"><span className="text-emerald-400 font-bold">Verified Couple</span></td>
                    <td className="p-3"><button onClick={() => addToast('Couple profile inspected', 'info')} className="text-rose-400 font-bold">Inspect</button></td>
                  </tr>
                )}
                {activeTab === 'weddings' && (
                  <tr>
                    <td className="p-3 font-mono text-rose-300">inv_1</td>
                    <td className="p-3 font-bold text-white">Ayaan Khan & Ahmed Mansoor</td>
                    <td className="p-3 text-slate-400">June 12, 2027 • Luxury Gold Theme</td>
                    <td className="p-3"><span className="text-emerald-400 font-bold">Active (RSVP Open)</span></td>
                    <td className="p-3"><button onClick={() => addToast('RSVP list downloaded', 'success')} className="text-amber-400 font-bold">Export RSVPs</button></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
