"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, PlusCircle, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { formatPrice } from '@/utils/formatPrice';

export default function CustomerDashboard() {
  const [myBookings, setMyBookings] = useState([]);

  // পেজ লোড হওয়ার পর localStorage থেকে বুকিংগুলো লোড করা
  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem('fixmate_bookings') || '[]');
    setMyBookings(savedBookings);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Customer Profile Header */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-md shadow-emerald-600/20">
              CS
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-extrabold text-slate-900">Customer Dashboard</h1>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Seeker
                </span>
              </div>
              <p className="text-slate-500 text-sm">Track your service bookings and appointment statuses in real-time.</p>
            </div>
          </div>

          <Link 
            href="/services" 
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-5 h-5" /> Book New Service
          </Link>
        </div>

        {/* My Bookings Section */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-600" /> My Service Bookings History
          </h2>

          {myBookings.length > 0 ? (
            <div className="space-y-4">
              {myBookings.map((booking) => (
                <div key={booking.id} className="p-6 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full ${
                        booking.status === 'Accepted' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {booking.status === 'Accepted' ? 'Worker Assigned' : 'Pending Request'}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">ID: {booking.id}</span>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-lg mb-1">{booking.serviceName}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-medium">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-emerald-600" /> {booking.date} ({booking.time})</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-emerald-600" /> {booking.location}</span>
                    </div>
                  </div>

                  <div className="text-left md:text-right border-t md:border-t-0 pt-3 md:pt-0 border-slate-200">
                    <span className="text-xs text-slate-400 font-bold block uppercase">Cost</span>
                    <span className="font-extrabold text-emerald-600 text-xl">{formatPrice(booking.price)}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border border-dashed border-slate-200 rounded-2xl">
              <h3 className="text-base font-bold text-slate-700 mb-1">No Bookings Found</h3>
              <p className="text-slate-500 text-sm mb-6">You haven't booked any home services yet.</p>
              <Link 
                href="/services" 
                className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-emerald-600 transition-all"
              >
                Explore Services Now
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}