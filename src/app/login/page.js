"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Wrench, Phone, Lock, Eye, EyeOff, ArrowRight, UserCheck, Briefcase } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState('customer'); // 'customer' | 'worker'
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!phone || !password) {
      alert('Please enter your phone number and password.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      
      // ডেটা সেভ করা
      localStorage.setItem('fixmate_role', role); 
      localStorage.setItem('fixmate_logged_in', 'true');

      // ইনস্ট্যান্ট নেভিবার আপডেটের জন্য ইভেন্ট ডিসপ্যাচ করা
      window.dispatchEvent(new Event('auth-change'));

      alert(`Successfully logged in as ${role.toUpperCase()}`);

      if (role === 'customer') {
        router.push('/customer/dashboard');
      } else if (role === 'worker') {
        router.push('/worker/dashboard');
      }
    }, 1000);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
        
        {/* Header Logo & Title */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-3 group">
            <div className="bg-emerald-600 p-2.5 rounded-xl text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <Wrench className="h-6 w-6" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-slate-900">
              FixMate<span className="text-emerald-600">BD</span>
            </span>
          </Link>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h2>
          <p className="text-slate-500 text-sm mt-1">Sign in to manage your bookings or service tasks</p>
        </div>

        {/* Role Selection Tabs (Customer & Worker Only) */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-2xl">
          {[
            { id: 'customer', label: 'Customer', icon: UserCheck },
            { id: 'worker', label: 'Worker', icon: Briefcase },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = role === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setRole(tab.id)}
                className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl text-xs font-bold transition-all ${
                  isActive 
                    ? 'bg-white text-emerald-700 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 mb-1 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Login Form */}
        <form className="space-y-5 mt-6" onSubmit={handleLogin}>
          
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-slate-400 font-bold text-sm">+880</span>
              <input 
                type="tel" 
                placeholder="1712345678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-16 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 text-slate-800 font-medium text-sm transition-all"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                Password
              </label>
              <a href="#" className="text-xs font-semibold text-emerald-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 text-slate-800 font-medium text-sm transition-all"
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span className="animate-pulse">Signing in...</span>
            ) : (
              <>Sign In as {role.charAt(0).toUpperCase() + role.slice(1)} <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </form>

        {/* Register Redirection Footer */}
        <div className="text-center pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            Don't have an account?{' '}
            <Link href="/register" className="text-emerald-600 font-bold hover:underline">
              Register now
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}