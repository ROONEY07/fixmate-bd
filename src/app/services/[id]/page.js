"use client";
import { useState } from 'react';
import { services } from '@/data/services';
import { formatPrice } from '@/utils/formatPrice';
import { Search, ShieldCheck, ArrowRight, CheckCircle2, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Electrical', 'Plumbing', 'Cooling', 'Cleaning', 'Woodwork', 'Painting', 'Security', 'Appliances'];

  const filteredServices = services.filter(srv => {
    const matchesCategory = selectedCategory === 'All' || srv.category === selectedCategory;
    const matchesSearch = srv.name.toLowerCase().includes(searchTerm.toLowerCase()) || srv.desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Transparent & Reliable Home Solutions
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Professional Home Services in Dhaka
          </h1>
          <p className="text-slate-500 text-sm sm:text-base">
            Choose from our wide range of NID-verified expert services with a 7-day warranty guarantee.
          </p>
        </div>

        {/* Search Bar Full Width Top */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200 mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search services (e.g. AC, plumber, fan, cleaning)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 text-slate-800 text-sm font-medium transition-all"
            />
          </div>
        </div>

        {/* Main Layout: Sidebar & Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Left Sidebar: Categories */}
          <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm sticky top-24">
            <div className="flex items-center gap-2 font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 text-sm">
              <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
              <span>Service Categories</span>
            </div>

            <div className="space-y-1.5">
              {categories.map((cat, idx) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-between ${
                      isActive 
                        ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <span>{cat}</span>
                    {isActive && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Section: Services Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredServices.map(service => {
                const Icon = service.icon;
                return (
                  <div 
                    key={service.id} 
                    className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                  >
                    {/* Clickable Card Body for Details */}
                    <Link href={`/services/${service.id}`} className="block">
                      <div className="flex items-center justify-between mb-5">
                        <div className="bg-emerald-50 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 transition-colors duration-300 shadow-sm">
                          <Icon className="h-7 w-7 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-xl">
                          {service.category}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                        {service.name}
                      </h3>
                      
                      <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                        {service.desc}
                      </p>

                      {/* Feature Bullets */}
                      <div className="space-y-2 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        {service.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </Link>

                    {/* Bottom Action Footer */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Starting From</span>
                        <span className="font-extrabold text-emerald-600 text-xl">{formatPrice(service.price)}</span>
                      </div>

                      <Link 
                        href={`/booking?service=${service.id}`}
                        className="bg-slate-900 text-white px-5 py-3 rounded-xl text-sm font-bold hover:bg-emerald-600 transition-all duration-300 flex items-center gap-2 shadow-md shadow-slate-900/10 group-hover:shadow-emerald-600/20"
                      >
                        Book Now <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredServices.length === 0 && (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-2">No matching services found</h3>
                <p className="text-slate-500 text-sm mb-6">Try searching with a different keyword or category.</p>
                <button 
                  onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                  className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-emerald-600/20"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}