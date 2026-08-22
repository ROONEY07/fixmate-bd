"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { services } from '@/data/services';
import { formatPrice } from '@/utils/formatPrice';
import { Search, ArrowRight, ShieldCheck, Star, Briefcase } from 'lucide-react';

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkRole = () => {
      const role = localStorage.getItem('fixmate_role');
      setUserRole(role ? role.toLowerCase() : null);
    };

    checkRole();

    // লগইন বা রোল পরিবর্তনের সাথে সাথে ইনস্ট্যান্ট আপডেট পাওয়ার জন্য ইভেন্ট লিসেনার
    window.addEventListener('auth-change', checkRole);
    return () => window.removeEventListener('auth-change', checkRole);
  }, []);

  const categories = ['All', 'Electrical', 'Plumbing', 'Cooling', 'Cleaning', 'Woodwork', 'Painting', 'Security', 'Appliances'];

  const filteredServices = services.filter((service) => {
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
            {userRole === 'worker' ? 'WORKER EXPERTISE CATALOG' : 'TRANSPARENT & RELIABLE HOME SOLUTIONS'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            {userRole === 'worker' ? 'Platform Service Catalog & Rates' : 'Professional Home Services in Dhaka'}
          </h1>
          <p className="text-slate-500 text-sm sm:text-base">
            {userRole === 'worker' 
              ? 'Review all standard home services available on FixMate-BD that you can accept and execute.' 
              : 'Choose from our wide range of NID-verified expert services with a 7-day warranty guarantee.'}
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search services (e.g. AC, plumber, fan, cleaning)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-medium outline-none focus:border-emerald-500 shadow-sm text-slate-800 transition-all"
            />
          </div>
        </div>

        {/* Layout: Sidebar Categories & Service Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm sticky top-28">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                Service Categories
              </h3>
              <div className="space-y-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      selectedCategory === cat
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Service Cards Grid */}
          <div className="lg:col-span-3">
            {filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredServices.map((service) => {
                  const Icon = service.icon;
                  return (
                    <div key={service.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-emerald-200 transition-all">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="bg-emerald-50 w-12 h-12 rounded-2xl flex items-center justify-center">
                            <Icon className="h-6 w-6 text-emerald-600" />
                          </div>
                          <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-xl">
                            {service.category}
                          </span>
                        </div>

                        <h3 className="text-lg font-extrabold text-slate-900 mb-2">{service.name}</h3>
                        <p className="text-slate-500 text-xs mb-4 leading-relaxed line-clamp-2">{service.desc}</p>

                        <div className="bg-slate-50 rounded-2xl p-3.5 mb-6 space-y-2 border border-slate-100">
                          <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>NID Verified Professional Standard</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                            <Star className="w-4 h-4 text-amber-500 shrink-0" />
                            <span>7-Day Service Warranty</span>
                          </div>
                        </div>
                      </div>

                      {/* Price & Conditional Button */}
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">
                            {userRole === 'worker' ? 'Standard Earning' : 'Starting From'}
                          </span>
                          <span className="text-lg font-extrabold text-emerald-600">{formatPrice(service.price)}</span>
                        </div>

                        {userRole === 'worker' ? (
                          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5">
                            <Briefcase className="w-3.5 h-3.5 text-emerald-600" /> Offered Service
                          </span>
                        ) : (
                          <Link
                            href={`/booking?service=${service.id}`}
                            className="bg-slate-900 hover:bg-emerald-600 text-white px-5 py-3 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 shadow-md"
                          >
                            Book Now <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
                <h3 className="text-base font-bold text-slate-800 mb-1">No Services Found</h3>
                <p className="text-slate-500 text-sm">Try searching with a different keyword or category.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}