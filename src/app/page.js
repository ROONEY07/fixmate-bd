import { ShieldCheck, MapPin, Clock, Tag, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import { services } from '@/data/services';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden">
      
      {/* Hero Section with Modern Glow */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/80 via-white to-slate-50 py-20 lg:py-32 border-b border-slate-100">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-emerald-400/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-emerald-100/80 border border-emerald-200 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 shadow-sm animate-pulse">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> NID Verified Expert Technicians in Dhaka
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
              Trusted Home Services, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                Right at Your Doorstep
              </span>
            </h1>
            
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              Book expert technicians instantly. Enjoy transparent pricing, live tracking, and warranty-backed repairs for total peace of mind.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/booking" 
                className="group bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all duration-300 shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/40 hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Book a Service 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                href="/services" 
                className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 shadow-sm hover:-translate-y-0.5 flex items-center justify-center"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Features Bar with Interactive Hover Cards */}
      <section className="py-12 bg-white border-b border-slate-200 shadow-sm relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, title: 'Verified Workers', desc: 'Strict NID & Skill checks' },
              { icon: Tag, title: 'Fixed Pricing', desc: 'No hidden or extra costs' },
              { icon: MapPin, title: 'Live Tracking', desc: 'Real-time arrival updates' },
              { icon: Clock, title: 'Service Warranty', desc: '7-day post-service guarantee' }
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={i} 
                  className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 group cursor-pointer"
                >
                  <div className="bg-emerald-100/70 p-3 rounded-xl shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                    <Icon className="h-6 w-6 text-emerald-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-emerald-700 transition-colors">{feature.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Our Professional Services</h2>
          <p className="text-slate-500">Reliable home repair and maintenance solutions delivered across Dhaka city.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* How It Works Section with Interactive Steps */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl font-extrabold mb-4">How FixMate Works</h2>
          <p className="text-slate-400 mb-16 max-w-xl mx-auto">Seamless booking experience in 4 simple steps</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: 'Book Service', desc: 'Select your required service and preferred time slot.' },
              { title: 'Worker Assigned', desc: 'A vetted professional is assigned to your location.' },
              { title: 'OTP Confirmation', desc: 'Verify your technician safely via secure OTP code.' },
              { title: 'Job Done & Paid', desc: 'Inspect work, pay securely, and rate your experience.' }
            ].map((step, idx) => (
              <div 
                key={idx} 
                className="bg-slate-800/80 border border-slate-700/60 p-6 rounded-2xl text-left relative hover:border-emerald-500/50 hover:bg-slate-800 transition-all duration-300 group hover:-translate-y-1 shadow-xl"
              >
                <div className="w-12 h-12 bg-emerald-500 text-slate-900 rounded-xl flex items-center justify-center font-black text-xl mb-4 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                  0{idx + 1}
                </div>
                <h4 className="font-bold text-lg text-white mb-2 group-hover:text-emerald-400 transition-colors">{step.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
}