import React from 'react';
import { Calendar, Users, Lock, Award, BookOpen, Compass, HeartHandshake } from 'lucide-react';
import heroCampusImg from '../assets/images/hero_school_campus_1790650374908.jpg';

interface HeroProps {
  onNavigate: (section: string) => void;
  onOpenPortal: () => void;
  onOpenEnrollment: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onNavigate,
  onOpenPortal,
  onOpenEnrollment,
}) => {
  return (
    <section className="relative bg-stone-900 text-stone-100 overflow-hidden">
      {/* Background Hero Image with measured contrast scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroCampusImg}
          alt="Lush green campus grounds of Katingawan SDA Elementary School in Midsayap"
          className="w-full h-full object-cover object-center opacity-35"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/80 to-stone-900/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        
        {/* Unboxed editorial category kicker (Anti-slop zero pill rule) */}
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4">
          <span>Seventh-day Adventist Education</span>
          <span aria-hidden="true">·</span>
          <span>Central Mindanao Mission</span>
          <span aria-hidden="true">·</span>
          <span>DepEd Region XII</span>
        </div>

        {/* Main Display Headline */}
        <div className="max-w-3xl">
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-6">
            Educating for Eternity, Excelling for Life.
          </h1>

          <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-2xl mb-8">
            At Katingawan SDA Elementary School, we integrate academic diligence with Biblical wisdom—nurturing young minds, healthy bodies, and compassionate hearts from Kindergarten through Grade 6.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-14">
            <button
              onClick={() => onNavigate('events')}
              className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-stone-900 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors shadow-lg cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-stone-900" />
              <span>Calendar of Events</span>
            </button>

            <button
              onClick={() => onNavigate('teachers')}
              className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-stone-100 bg-stone-800/90 border border-stone-700 rounded-lg hover:bg-stone-700 transition-colors cursor-pointer"
            >
              <Users className="w-4 h-4 text-stone-300" />
              <span>Faculty Directory</span>
            </button>

            <button
              onClick={onOpenPortal}
              className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-amber-300 bg-amber-950/70 border border-amber-500/40 rounded-lg hover:bg-amber-900/80 transition-colors cursor-pointer"
            >
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Parent Portal</span>
            </button>

            <button
              onClick={onOpenEnrollment}
              className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-stone-300 hover:text-white underline underline-offset-4 transition-colors cursor-pointer"
            >
              <span>Enrollment Guide →</span>
            </button>
          </div>
        </div>

        {/* Claim-to-Proof Quantitative Adjacency Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-stone-800/80">
          
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-400">
              <Award className="w-4 h-4" />
              <span className="font-serif text-2xl lg:text-3xl font-bold text-white tabular-nums">100%</span>
            </div>
            <p className="text-xs text-stone-400">
              DepEd Matatag compliant curriculum & Adventist character certification
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-400">
              <BookOpen className="w-4 h-4" />
              <span className="font-serif text-2xl lg:text-3xl font-bold text-white tabular-nums">1 : 20</span>
            </div>
            <p className="text-xs text-stone-400">
              Low teacher-student ratio for focused personal care & reading coaching
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-400">
              <Compass className="w-4 h-4" />
              <span className="font-serif text-2xl lg:text-3xl font-bold text-white tabular-nums">4-Fold</span>
            </div>
            <p className="text-xs text-stone-400">
              Holistic growth: Mental, Physical, Spiritual, and Social faculties
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-400">
              <HeartHandshake className="w-4 h-4" />
              <span className="font-serif text-2xl lg:text-3xl font-bold text-white tabular-nums">45+ Yrs</span>
            </div>
            <p className="text-xs text-stone-400">
              Heritage of faith-based elementary education in Midsayap, Cotabato
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
