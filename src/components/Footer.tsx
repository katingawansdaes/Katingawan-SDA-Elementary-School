import React from 'react';
import { SCHOOL_INFO } from '../data/mockData';
import { Shield, Heart, GraduationCap } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: string) => void;
  onOpenPortal: () => void;
  onOpenEnrollment: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenPortal,
  onOpenEnrollment,
}) => {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: School Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-serif text-base font-bold text-white block">
                {SCHOOL_INFO.name}
              </span>
            </div>

            <p className="text-stone-400 text-xs leading-relaxed">
              {SCHOOL_INFO.tagline}. Operated under the Central Mindanao Mission of Seventh-day Adventists and accredited by the Department of Education.
            </p>

            <div className="text-[11px] text-stone-500 font-mono">
              DepEd ID: {SCHOOL_INFO.depedSchoolId} · Region XII
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Campus Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Philosophy of Adventist Education
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('academics')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Matatag Curriculum & Adventurer Club
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('events')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Calendar of School Events
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('teachers')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Teacher Faculty Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Contact & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Portal & Admissions */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Parent & Student Access
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={onOpenPortal}
                  className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
                >
                  Secure Parent Portal Sign In
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenEnrollment}
                  className="hover:text-amber-400 transition-colors"
                >
                  Online Enrollment SY 2026–2027
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPortal}
                  className="hover:text-amber-400 transition-colors"
                >
                  Report Card (SF9) Inquiries
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPortal}
                  className="hover:text-amber-400 transition-colors"
                >
                  Tuition Statement & GCash Clearing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('events')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Examination Schedules
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Church Affiliation */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Ecclesiastical Affiliation
            </h4>
            <p className="text-stone-400 text-xs leading-relaxed">
              Member school of the worldwide Adventist Educational System — the second largest Christian educational network in the world.
            </p>
            <div className="pt-2 text-stone-500 text-[11px] space-y-1">
              <p>• Central Mindanao Mission (CMM)</p>
              <p>• South Philippine Union Conference (SPUC)</p>
              <p>• General Conference Department of Education</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <div>
            © {new Date().getFullYear()} Katingawan Seventh-day Adventist Elementary School. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>DepEd Region XII</span>
            <span aria-hidden="true">·</span>
            <span>Midsayap West District</span>
            <span aria-hidden="true">·</span>
            <span>SDA Church System</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
