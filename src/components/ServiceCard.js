import Link from 'next/link';
import { formatPrice } from '@/utils/formatPrice';
import { ArrowRight } from 'lucide-react';

export default function ServiceCard({ service }) {
  const Icon = service.icon;
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1">
      <div>
        {/* Icon with background color transition on hover */}
        <div className="bg-emerald-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:scale-110 transition-all duration-300 shadow-sm">
          <Icon className="h-7 w-7 text-emerald-600 group-hover:text-white transition-colors duration-300" />
        </div>
        
        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
          {service.name}
        </h3>
        
        <p className="text-slate-500 text-sm mb-6 leading-relaxed">
          {service.desc}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Starts from</p>
          <p className="font-extrabold text-emerald-600 text-lg">{formatPrice(service.price)}</p>
        </div>
        
        <Link 
          href={`/booking?service=${service.id}`} 
          className="bg-slate-100 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-emerald-600 hover:text-white transition-all duration-300 flex items-center gap-1.5 shadow-sm group-hover:shadow-md"
        >
          Book <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}