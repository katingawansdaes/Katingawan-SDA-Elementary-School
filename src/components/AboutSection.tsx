import React from 'react';
import { SCHOOL_INFO } from '../data/mockData';
import chapelImg from '../assets/images/school_chapel_worship_1790650389350.jpg';
import { Sparkles, Heart, Brain, Dumbbell, Users2, Quote } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-700 mb-2">
            <span>About Our Institution</span>
            <span aria-hidden="true">·</span>
            <span>Midsayap, Cotabato</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
            A Sanctuary of Faith and Learning
          </h2>
          <p className="mt-3 text-stone-600 leading-relaxed text-sm sm:text-base">
            Nestled in the lush agricultural community of Barangay Katingawan, our elementary school operates under the auspices of the Central Mindanao Mission of Seventh-day Adventists, committed to shaping children after the divine pattern.
          </p>
        </div>

        {/* Philosophy Feature Box with Asymmetric Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16 bg-white p-6 sm:p-8 lg:p-10 rounded-2xl border border-stone-200 shadow-sm">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-800 bg-amber-50 px-3 py-1 rounded-md border border-amber-200/60">
              <Quote className="w-3.5 h-3.5" />
              <span>Philosophy of Adventist Education</span>
            </div>

            <blockquote className="font-serif text-xl sm:text-2xl text-stone-900 leading-snug italic text-balance">
              “True education means more than the pursual of a certain course of study. It means more than a preparation for the life that now is. It has to do with the whole being, and with the whole period of existence possible to man.”
            </blockquote>

            <p className="text-sm font-sans font-medium text-stone-600">
              — Ellen G. White, <span className="italic">Education</span>, p. 13
            </p>

            <p className="text-sm text-stone-600 leading-relaxed">
              We believe that every child is endowed with the power to think and to do. Our curriculum harmonizes academic rigor with Bible study, practical work, and loving service, training students to become thinkers rather than mere reflectors of other men’s thoughts.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs text-stone-500">
              <span>DepEd Matatag Aligned</span>
              <span>·</span>
              <span>Adventist Accreditation Commission</span>
              <span>·</span>
              <span>Values-Driven Campus</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-xl overflow-hidden border border-stone-200 shadow-inner group">
              <img
                src={chapelImg}
                alt="Pupils and teachers singing in the peaceful Katingawan SDA elementary chapel"
                className="w-full h-72 sm:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent flex items-end p-4">
                <p className="text-xs text-stone-200 font-medium">
                  Morning praise & character devotionals in the campus chapel
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Pillars of Development */}
        <div className="mb-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="font-serif text-2xl font-bold text-stone-900">The 4-Fold Educational Framework</h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-2">
              Developing balanced individuals ready for earthly citizenship and heavenly fellowship.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white p-6 rounded-xl border border-stone-200">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                <Heart className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-bold text-stone-900 mb-2">Spiritual Depth</h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Daily classroom devotionals, Week of Prayer, memory verse mastery, and personal prayer circles establishing a living relationship with Jesus Christ.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-200">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center mb-4">
                <Brain className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-bold text-stone-900 mb-2">Mental Excellence</h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Strong fundamentals in English and Sinugbuanong Binisaya literacy, Singapore Math problem-solving, foundational science inquiry, and computer literacy.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-200">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                <Dumbbell className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-bold text-stone-900 mb-2">Physical Vitality</h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Outdoor play, campus gardening, Adventurer nature hiking, and whole-food plant-based nutrition principles in our pure vegetarian cafeteria.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-200">
              <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center mb-4">
                <Users2 className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-bold text-stone-900 mb-2">Social Service</h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Kindness outreach to local Puroks, nursing home visits, disaster relief parcel packing, choir ministry, and harmonious conflict resolution.
              </p>
            </div>

          </div>
        </div>

        {/* Mission, Vision, and Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-stone-900 text-stone-100 p-8 rounded-2xl border border-stone-800 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block mb-1">Our Mission</span>
              <p className="text-sm sm:text-base text-stone-200 leading-relaxed">
                {SCHOOL_INFO.mission}
              </p>
            </div>
            
            <div className="pt-4 border-t border-stone-800">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block mb-1">Our Vision</span>
              <p className="text-sm sm:text-base text-stone-200 leading-relaxed">
                {SCHOOL_INFO.vision}
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-stone-200 space-y-4">
            <span className="text-xs uppercase tracking-widest text-amber-700 font-semibold block">Institutional Core Values</span>
            <div className="space-y-3">
              {SCHOOL_INFO.coreValues.map((val, idx) => (
                <div key={idx} className="flex items-start gap-3 pb-2 border-b border-stone-100 last:border-0">
                  <div className="w-6 h-6 rounded bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-stone-900">{val.title}</h5>
                    <p className="text-xs text-stone-600">{val.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
