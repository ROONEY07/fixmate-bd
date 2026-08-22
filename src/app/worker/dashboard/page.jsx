"use client";
import { useState, useEffect } from 'react';
import { services } from '@/data/services';
import { ShieldCheck, Clock, User, MapPin, Phone, ArrowRight, Briefcase, Layers } from 'lucide-react';
import { formatPrice } from '@/utils/formatPrice';

export default function WorkerDashboard() {
  const [availableJobs, setAvailableJobs] = useState([]);

  // পেজ লোড হওয়ার পর localStorage থেকে কাস্টমারদের বুকিং ফেচ করা
  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem('fixmate_bookings') || '[]');
    // শুধুমাত্র যেসব কাজ 'Pending' অবস্থায় আছে সেগুলো ফিল্টার করা
    setAvailableJobs(savedBookings.filter(job => job.status === 'Pending'));
  }, []);

  // ওয়ার্কার জব অ্যাক্সেপ্ট করার ফাংশন
  const handleAcceptJob = (jobId) => {
    const savedBookings = JSON.parse(localStorage.getItem('fixmate_bookings') || '[]');
    
    const updatedBookings = savedBookings.map(job => {
      if (job.id === jobId) {
        return { ...job, status: 'Accepted' };
      }
      return job;
    });

    localStorage.setItem('fixmate_bookings', JSON.stringify(updatedBookings));
    setAvailableJobs(updatedBookings.filter(job => job.status === 'Pending'));
    
    alert(`You have successfully accepted Job ID: ${jobId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Worker Header */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-md shadow-emerald-600/20">
              WK
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-extrabold text-slate-900">Worker Dashboard</h1>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Active Pro
                </span>
              </div>
              <p className="text-slate-500 text-sm">Manage live customer requests and view platform service categories.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Live Requests</span>
              <span className="text-xl font-extrabold text-emerald-600">{availableJobs.length}</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Status</span>
              <span className="text-sm font-extrabold text-emerald-600 mt-1 block">Online</span>
            </div>
          </div>
        </div>

        {/* Section 1: Live Customer Service Requests */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-emerald-600" /> Incoming Customer Service Requests
            </h2>
          </div>

          {availableJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {availableJobs.map((job) => (
                <div key={job.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-emerald-200 transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-xl">
                        {job.serviceName}
                      </span>
                      <span className="text-lg font-extrabold text-emerald-600">
                        {formatPrice(job.price)}
                      </span>
                    </div>

                    <div className="space-y-2.5 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm">
                      <div className="flex items-center gap-2 text-slate-700 font-medium">
                        <User className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Customer: <strong>{job.customerName}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700 font-medium">
                        <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Phone: <strong>{job.phone}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700 font-medium">
                        <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Location: <strong>{job.location}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700 font-medium">
                        <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Date & Time: <strong>{job.date} ({job.time})</strong></span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleAcceptJob(job.id)}
                    className="w-full py-3.5 bg-slate-900 hover:bg-emerald-600 text-white font-bold rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
                  >
                    Accept This Job <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
              <h3 className="text-base font-bold text-slate-800 mb-1">No Active Service Requests Right Now</h3>
              <p className="text-slate-500 text-sm">When a customer books a service, it will appear here instantly!</p>
            </div>
          )}
        </div>

        {/* Section 2: Platform Service Catalog (Expertise Areas) */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-600" /> Platform Service Catalog (Expertise Areas)
            </h2>
            <span className="text-xs font-bold text-slate-500">Total {services.length} Services Offered</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((srv) => {
              const Icon = srv.icon;
              return (
                <div key={srv.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-emerald-50 w-12 h-12 rounded-2xl flex items-center justify-center">
                        <Icon className="h-6 w-6 text-emerald-600" />
                      </div>
                      <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-xl">
                        {srv.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{srv.name}</h3>
                    <p className="text-slate-500 text-xs mb-4 line-clamp-2">{srv.desc}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-bold uppercase">Standard Pay</span>
                    <span className="font-extrabold text-emerald-600 text-sm">{formatPrice(srv.price)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}