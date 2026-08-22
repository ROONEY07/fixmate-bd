"use client";
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { services } from '@/data/services';
import { formatPrice } from '@/utils/formatPrice';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Star } from 'lucide-react';

export default function BookingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const serviceId = searchParams.get('service');
  const selectedService = services.find(s => s.id === serviceId);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    timeSlot: 'Morning (9 AM - 12 PM)',
    address: ''
  });

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    if (!selectedService) {
      alert('Please select a service first from the services page.');
      router.push('/services');
      return;
    }

    // ১. নতুন বুকিং অবজেক্ট তৈরি
    const newBooking = {
      id: 'job-' + Date.now(),
      serviceName: selectedService.name,
      price: selectedService.price,
      category: selectedService.category,
      customerName: formData.name,
      phone: formData.phone,
      date: formData.date,
      time: formData.timeSlot,
      location: formData.address,
      status: 'Pending' // প্রাথমিক স্ট্যাটাস পেন্ডিং থাকবে
    };

    // ২. localStorage থেকে আগের বুকিংগুলো আনা
    const existingBookings = JSON.parse(localStorage.getItem('fixmate_bookings') || '[]');

    // ৩. নতুন বুকিং লিস্টে যোগ করা
    existingBookings.push(newBooking);

    // ৪. localStorage-এ আবার সেভ করা
    localStorage.setItem('fixmate_bookings', JSON.stringify(existingBookings));

    alert('Booking Confirmed Successfully!');
    
    // ৫. কাস্টমার ড্যাশবোর্ডে রিডাইরেক্ট করা
    router.push('/customer/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        <Link href="/services" className="inline-flex items-center gap-2 text-slate-600 hover:text-emerald-600 font-bold text-sm mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Services
        </Link>

        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">Complete Your Booking</h1>
          <p className="text-slate-500 text-sm mb-8">Please provide your details to confirm the service appointment.</p>

          {/* নির্বাচিত সার্ভিসের বিবরণ */}
          {selectedService && (
            <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-5 mb-8 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-md inline-block mb-1">
                  {selectedService.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{selectedService.name}</h3>
              </div>
              <span className="text-xl font-extrabold text-emerald-600">{formatPrice(selectedService.price)}</span>
            </div>
          )}

          <form onSubmit={handleBookingSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-2">Full Name</label>
                <input 
                  type="text" required 
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-emerald-500 text-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-2">Phone Number</label>
                <input 
                  type="tel" required 
                  placeholder="017XXXXXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-emerald-500 text-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-2">Service Date</label>
                <input 
                  type="date" required 
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-emerald-500 text-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-2">Time Slot</label>
                <select 
                  value={formData.timeSlot}
                  onChange={(e) => setFormData({...formData, timeSlot: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-emerald-500 text-slate-800"
                >
                  <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                  <option value="Afternoon (2 PM - 5 PM)">Afternoon (2 PM - 5 PM)</option>
                  <option value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-2">Service Address</label>
              <textarea 
                rows="3" required 
                placeholder="House no, Road no, Area, Dhaka"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-emerald-500 text-slate-800 resize-none"
              ></textarea>
            </div>

            <button type="submit" className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-base shadow-lg shadow-emerald-600/20 transition-all mt-4">
              Confirm & Book Service
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}