"use client";
import { useState } from 'react';
import { MapPin, Phone, ShieldCheck, CheckCircle2, Clock, Navigation, AlertCircle, MessageSquare } from 'lucide-react';

export default function TrackingPage() {
  // Interactive tracking states simulation
  const [currentStep, setCurrentStep] = useState(2); // 0: Confirmed, 1: Assigned, 2: On The Way, 3: Arrived, 4: In Progress, 5: Completed
  const [isCalling, setIsCalling] = useState(false);

  const steps = [
    { title: 'Booking Confirmed', desc: 'Your request has been successfully registered.' },
    { title: 'Worker Assigned', desc: 'Rahim Uddin has accepted your request.' },
    { title: 'Worker On The Way', desc: 'Technician is travelling to your location.' },
    { title: 'Arrived', desc: 'Technician reached your doorstep.' },
    { title: 'Service In Progress', desc: 'Repair/Maintenance work is underway.' },
    { title: 'Completed', desc: 'Service successfully finished & verified.' },
  ];

  const handleSimulateNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(0); // Reset for loop simulation
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Top Banner with Interactive Simulation Control */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-6 md:p-8 text-white mb-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 border border-slate-700">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-emerald-500 w-3 h-3 rounded-full animate-ping"></span>
            <h1 className="text-xl md:text-2xl font-extrabold tracking-tight">Live Service Tracking</h1>
            <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">Active Order</span>
          </div>
          <p className="text-slate-400 text-sm">Booking ID: <span className="text-white font-mono font-bold">#FXM-8924</span> • AC Repair & Servicing</p>
        </div>

        {/* Interactive simulation button for testing */}
        <div className="flex items-center gap-3">
          <button 
            onClick={handleSimulateNext}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-emerald-600/30 flex items-center gap-2 active:scale-95"
          >
            <Navigation className="w-4 h-4 animate-spin" /> Simulate Next Status
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Timeline & Status Details (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center justify-between">
            <span>Real-time Progress</span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">
              Step {currentStep + 1} of {steps.length}
            </span>
          </h3>

          {/* Vertical Timeline */}
          <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-slate-100">
            {steps.map((step, idx) => {
              const isCompleted = idx < currentStep;
              const isCurrent = idx === currentStep;

              return (
                <div key={idx} className="relative flex items-start gap-4 group">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 z-10 transition-all duration-300 shadow-sm ${
                    isCompleted ? 'bg-emerald-600 text-white shadow-emerald-600/30' :
                    isCurrent ? 'bg-emerald-500 text-white ring-4 ring-emerald-100 animate-pulse' :
                    'bg-slate-100 text-slate-400'
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <span className="font-bold text-sm">{idx + 1}</span>}
                  </div>
                  
                  <div className={`flex-1 p-4 rounded-2xl border transition-all ${
                    isCurrent ? 'bg-emerald-50/50 border-emerald-200 shadow-sm' :
                    isCompleted ? 'bg-slate-50/40 border-slate-100 opacity-80' :
                    'bg-white border-slate-100 opacity-40'
                  }`}>
                    <h4 className={`font-bold text-sm mb-1 ${isCurrent ? 'text-emerald-900 font-extrabold' : 'text-slate-800'}`}>
                      {step.title}
                    </h4>
                    <p className="text-xs text-slate-500">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Technician Card & Simulated Map (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Technician Profile Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Assigned Expert</h4>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" alt="Technician" className="w-full h-full object-cover" />
                </div>
                <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-lg shadow">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </span>
              </div>
              
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Rahim Uddin</h3>
                <p className="text-slate-500 text-xs font-medium mb-1">Expert AC & Electrical Technician</p>
                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                  <span>★ 4.9</span>
                  <span className="text-slate-400 font-normal">(124 jobs done)</span>
                </div>
              </div>
            </div>

            {/* OTP Verification Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-6 flex items-center justify-between">
              <div>
                <span className="block text-[10px] uppercase font-bold text-slate-400">Secure Start OTP</span>
                <span className="text-xs text-slate-600">Share upon arrival</span>
              </div>
              <span className="font-mono text-xl font-black text-emerald-600 bg-white px-4 py-1.5 rounded-xl border border-slate-200 shadow-sm tracking-widest">
                4921
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button 
                onClick={() => alert("Calling technician Rahim Uddin (+880 18XXXXXXXX)...")}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-sm transition shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" /> Call Worker
              </button>
              <button 
                onClick={() => alert("Opening secure chat with technician...")}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2 border border-slate-200"
              >
                <MessageSquare className="w-4 h-4" /> Message
              </button>
            </div>
          </div>

          {/* Simulated Live Map Container */}
          <div className="bg-slate-900 rounded-3xl h-64 border border-slate-800 relative overflow-hidden shadow-inner flex flex-col items-center justify-center p-6 text-center group">
            {/* Background grid simulation */}
            <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />
            
            {/* Animated Pin Marker */}
            <div className="relative z-10 bg-emerald-500 text-slate-900 p-4 rounded-2xl shadow-xl shadow-emerald-500/20 animate-bounce mb-3">
              <MapPin className="h-8 w-8" />
            </div>

            <div className="relative z-10">
              <h4 className="text-white font-bold text-sm mb-1">Gulshan-2, Road 107, Dhaka</h4>
              <p className="text-emerald-400 text-xs font-medium animate-pulse">Technician is ~1.2 km away (Approx. 6 mins)</p>
            </div>

            <span className="absolute bottom-3 right-3 bg-slate-800/80 backdrop-blur text-slate-400 text-[10px] font-bold px-3 py-1 rounded-full border border-slate-700">
              Live GPS Simulation
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}