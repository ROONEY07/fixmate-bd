"use client";
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { services } from '@/data/services';
import { formatPrice } from '@/utils/formatPrice';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Star } from 'lucide-react';

export default function BookingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const serviceIdFromUrl = searchParams.get('service');

  // যদি URL-এ সার্ভিস আইডি না থাকে, তবে ডিফল্টভাবে প্রথম সার্ভিসটি সিলেক্ট থাকবে
  const [selectedServiceId, setSelectedServiceId] = useState(
    serviceIdFromUrl || (services[0] ? services[0].id : '')
  );

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    timeSlot: 'Morning (9 AM - 12 PM)',
    address: ''
  });

  useEffect(() => {
    if (serviceIdFromUrl) {
      setSelectedServiceId(serviceIdFromUrl);
    }
  }, [serviceIdFromUrl]);

  // নির্বাচিত সার্ভিস খুঁজে বের করা
  const selectedService = services.find(s => s.id === selectedServiceId);

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    if (!selectedService) {
      alert('Please select a service to book.');
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
      status: 'Pending'
    };

    // ২. localStorage-এ সেভ করা
    const existingBookings = JSON.parse(localStorage.getItem('fixmate_bookings') || '[]');
    existingBookings.push(newBooking);
    localStorage.setItem('fixmate_bookings', JSON.stringify(existingBookings));

    alert('Booking Confirmed Successfully!');
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
          <p className="text-slate-500 text-sm mb-8">Select your required service and provide your details to confirm the appointment.</p>

          {/* Service Selector & Selected Details Box */}
          <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-5 mb-8">
            <label className="block text-xs font-bold uppercase text-emerald-800 mb-2">Select Service to Book</label>
            <select 
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-emerald-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-emerald-500 mb-4 shadow-sm"
            >
              {services.map((srv) => (
                <option key={srv.id} value={srv.id}>
                  {srv.name} — ({formatPrice(srv.price)})
                </option>
              ))}
            </select>

            {selectedService && (
              <div className="flex items-center justify-between pt-3 border-t border-emerald-100/80">
                <div>
                  <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-md inline-block mb-1">
                    {selectedService.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">{selectedService.name}</h3>
                </div>
                <span className="text-lg font-extrabold text-emerald-600">{formatPrice(selectedService.price)}</span>
              </div>
            )}
          </div>

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