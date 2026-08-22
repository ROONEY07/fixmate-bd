"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Wrench, LogOut, User, Briefcase, ShoppingBag } from 'lucide-react';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = localStorage.getItem('fixmate_logged_in');
      const role = localStorage.getItem('fixmate_role');
      setIsLoggedIn(!!loggedIn);
      setUserRole(role);
    };

    checkAuth();

    // ইনস্ট্যান্ট আপডেট পাওয়ার জন্য ইভেন্ট লিসেনার
    window.addEventListener('auth-change', checkAuth);
    return () => window.removeEventListener('auth-change', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('fixmate_logged_in');
    localStorage.removeItem('fixmate_role');
    window.dispatchEvent(new Event('auth-change'));
    setIsLoggedIn(false);
    setUserRole(null);
    router.push('/login');
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-emerald-600 p-2.5 rounded-xl text-white shadow-md shadow-emerald-600/20">
            <Wrench className="h-6 w-6" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-slate-900">
            FixMate<span className="text-emerald-600">BD</span>
          </span>
        </Link>

        {/* Navigation Links (Both Customer, Worker & Guests can access Marketplace & Services) */}
        <div className="hidden md:flex items-center gap-8 font-semibold text-sm text-slate-600">
          <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
          <Link href="/services" className="hover:text-emerald-600 transition-colors">Services</Link>
          <Link href="/marketplace" className="hover:text-emerald-600 transition-colors">Marketplace</Link>

          {/* যদি কাস্টমার লগইন থাকে */}
          {isLoggedIn && userRole === 'customer' && (
            <Link href="/customer/dashboard" className="hover:text-emerald-600 transition-colors">My Bookings</Link>
          )}

          {/* যদি ওয়ার্কার লগইন থাকে */}
          {isLoggedIn && userRole === 'worker' && (
            <Link href="/worker/dashboard" className="hover:text-emerald-600 transition-colors">Live Job Feed</Link>
          )}

          {/* যদি কেউ লগইন করা না থাকে */}
          {!isLoggedIn && (
            <Link href="/tracking" className="hover:text-emerald-600 transition-colors">Track Service</Link>
          )}
        </div>

        {/* Right side Actions */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl uppercase flex items-center gap-1.5">
                {userRole === 'customer' ? <User className="w-3.5 h-3.5 text-emerald-600" /> : <Briefcase className="w-3.5 h-3.5 text-emerald-600" />}
                {userRole}
              </span>
              <button 
                onClick={handleLogout}
                className="bg-rose-50 hover:bg-rose-100 text-rose-600 p-2.5 rounded-xl transition-all font-bold text-sm flex items-center gap-1.5"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-slate-700 font-bold text-sm hover:text-emerald-600 px-3 py-2">
                Login
              </Link>
              <Link href="/services" className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-2xl font-bold text-sm shadow-md shadow-emerald-600/20 transition-all">
                Book a Service
              </Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}