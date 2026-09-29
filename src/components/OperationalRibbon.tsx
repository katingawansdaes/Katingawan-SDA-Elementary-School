import React from 'react';
import { MapPin, Clock, ShieldCheck, HeartHandshake, PhoneCall } from 'lucide-react';
import { SCHOOL_INFO } from '../data/mockData';

export const OperationalRibbon: React.FC = () => {
  return (
    <div className="bg-stone-100 border-b border-stone-200 text-stone-700 text-xs py-2 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
        
        {/* Left items: Location and DepEd ID */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <div className="flex items-center gap-1.5 font-medium text-stone-800">
            <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span>Katingawan, Midsayap, Cotabato</span>
            <span className="text-stone-400">·</span>
            <span className="text-stone-600">DepEd ID #{SCHOOL_INFO.depedSchoolId}</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-stone-600">
            <Clock className="w-3.5 h-3.5 text-stone-500 shrink-0" />
            <span>Mon–Thu 7:30 AM–4:30 PM · Fri until 3:00 PM</span>
          </div>
        </div>

        {/* Right items: Sabbath Sanctuary & Emergency Contact */}
        <div className="flex items-center gap-x-4 text-stone-600">
          <div className="flex items-center gap-1.5 text-amber-900 font-medium">
            <HeartHandshake className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span>Sabbath Fellowship: Saturday 8:30 AM</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-stone-700">
            <PhoneCall className="w-3.5 h-3.5 text-stone-500 shrink-0" />
            <span className="tabular-nums font-medium">+63 (064) 229-8412</span>
          </div>

          <div className="hidden lg:flex items-center gap-1 text-emerald-800 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span>DepEd Matatag & SDA Board Accredited</span>
          </div>
        </div>

      </div>
    </div>
  );
};
