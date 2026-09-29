import React, { useState } from 'react';
import adventurerImg from '../assets/images/adventurer_club_kids_1790650412208.jpg';
import classroomImg from '../assets/images/classroom_learning_1790650401358.jpg';
import { BookOpen, Compass, Music, Sprout, CheckCircle2, ChevronRight, FileText } from 'lucide-react';

interface AcademicsSectionProps {
  onOpenEnrollment: () => void;
}

export const AcademicsSection: React.FC<AcademicsSectionProps> = ({ onOpenEnrollment }) => {
  const [activeTab, setActiveTab] = useState<'early' | 'primary' | 'intermediate' | 'enrichment'>('primary');

  const gradeLevels = [
    {
      id: 'early',
      title: 'Kindergarten & Early Childhood',
      age: 'Ages 4 to 5',
      summary: 'A gentle, wonder-filled introduction to learning focused on social empathy, phonics, number sense, and nature awareness.',
      highlights: [
        'Interactive phonemic awareness & early reading',
        'Fine motor development through play, art, and music',
        'Daily Bible stories, prayers, and song ministry',
        'Sensory discovery gardens and physical coordination',
      ],
      curriculum: 'DepEd Early Childhood Framework integrated with SPUC Adventist Kindergarten Guide',
    },
    {
      id: 'primary',
      title: 'Primary Elementary (Grades 1 to 3)',
      age: 'Ages 6 to 8',
      summary: 'Building solid mastery in foundational literacy, conceptual arithmetic, mother-tongue communication, and moral discernment.',
      highlights: [
        'DepEd Matatag Curriculum: English, Filipino, Sinugbuanong Binisaya, and Math',
        'Daily Christian Living & character instruction with memory verse recitation',
        'Introduction to hands-on science inquiry and local ecology',
        'Adventurer Club membership (Little Lambs, Eager Beaver, Busy Bee, Sunbeam)',
      ],
      curriculum: 'DepEd K-12 Matatag Curriculum + Central Mindanao Mission Religious Studies',
    },
    {
      id: 'intermediate',
      title: 'Intermediate Elementary (Grades 4 to 6)',
      age: 'Ages 9 to 12',
      summary: 'Fostering analytical reasoning, Christian ethics, scientific experimentation, and leadership readiness for junior high school.',
      highlights: [
        'Advanced Mathematics Olympiad training and algebraic concepts',
        'Laboratory-based Science, environmental ecology, and health principles',
        'Edukasyong Pantahanan at Pangkabuhayan (EPP): Agriculture, basic cooking, and carpentry',
        'Computer literacy, basic algorithmic logic, and typing skills',
        'Graduation readiness and servant leadership in Church and Community',
      ],
      curriculum: 'National Elementary Achievement Test (NEAT) & DepEd Matatag Standards',
    },
    {
      id: 'enrichment',
      title: 'Special Programs & Clubs',
      age: 'All Levels',
      summary: 'Co-curricular pathways that broaden talents, foster self-confidence, and kindle a heart of Christian mission.',
      highlights: [
        'Katingawan SDA Elementary Bell Ringers & Junior Choir',
        'Katingawan Adventurer Scouting Club (Master Guide supervised)',
        'Campus Agriculture & Organic Vegetable Garden Project',
        'Speech, Storytelling & Bible Bowl Competition Guild',
      ],
      curriculum: 'General Conference of SDA Youth Department & NAMCYA guidelines',
    },
  ];

  const currentProgram = gradeLevels.find((g) => g.id === activeTab) || gradeLevels[1];

  return (
    <section id="academics" className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-700 mb-2">
              <span>Curriculum & Student Life</span>
              <span aria-hidden="true">·</span>
              <span>DepEd Matatag Compliant</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
              Academic Excellence Rooted in Scripture
            </h2>
          </div>
          <button
            onClick={onOpenEnrollment}
            className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-lg transition-colors cursor-pointer"
          >
            <FileText className="w-4 h-4 text-amber-800" />
            <span>Apply For Admission 2026</span>
          </button>
        </div>

        {/* Program Segmented Controls (Interactive filter buttons) */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-stone-100 rounded-xl mb-10 border border-stone-200">
          {gradeLevels.map((lvl) => (
            <button
              key={lvl.id}
              onClick={() => setActiveTab(lvl.id as any)}
              className={`flex-1 min-w-[140px] px-4 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-all text-center cursor-pointer ${
                activeTab === lvl.id
                  ? 'bg-stone-900 text-white shadow-sm font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              {lvl.title.split('(')[0].trim()}
            </button>
          ))}
        </div>

        {/* Selected Program Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-stone-50 p-6 sm:p-8 rounded-2xl border border-stone-200 mb-16">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-700">
                {currentProgram.age}
              </span>
              <span className="text-stone-300">|</span>
              <span className="text-xs text-stone-500 font-medium">Official DepEd Curriculum</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {currentProgram.title}
            </h3>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              {currentProgram.summary}
            </p>

            <div className="space-y-2.5 pt-2">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-700">
                Key Learning Outcomes & Focus:
              </h4>
              <ul className="space-y-2">
                {currentProgram.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-stone-200 text-xs text-stone-500">
              <span className="font-semibold text-stone-700">Framework: </span>
              {currentProgram.curriculum}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-xl overflow-hidden border border-stone-200 shadow-sm relative group">
              <img
                src={classroomImg}
                alt="Active elementary classroom learning at Katingawan SDA"
                className="w-full h-72 sm:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent flex items-end p-4">
                <p className="text-xs text-stone-200 font-medium">
                  Inspiring, collaborative classroom environment with dedicated Christian teachers
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Bento Grid: Adventurer Club & Co-Curriculars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Adventurer Club with generated photo */}
          <div className="md:col-span-2 bg-stone-900 text-white rounded-2xl overflow-hidden border border-stone-800 flex flex-col md:flex-row">
            <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  <Compass className="w-4 h-4" />
                  <span>Character & Leadership</span>
                </div>
                <h4 className="font-serif text-xl sm:text-2xl font-bold mb-3 text-white">
                  Katingawan Adventurer Club
                </h4>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-4">
                  A Christ-centered scouting organization open to Grades 1–4. Children earn awards in nature crafts, first aid, knot tying, Bible truths, and community kindness.
                </p>
              </div>
              <div className="text-xs text-amber-300 font-medium pt-3 border-t border-stone-800">
                Pledge: “Because Jesus loves me, I will always do my best.”
              </div>
            </div>
            <div className="md:w-1/2 relative min-h-[220px]">
              <img
                src={adventurerImg}
                alt="Adventurer Club pupils outdoors on the campus lawn"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Card 2: Music & Handbell Ministry */}
          <div className="bg-stone-50 p-6 sm:p-8 rounded-2xl border border-stone-200 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                <Music className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-xl font-bold text-stone-900 mb-2">
                Handbells & Children’s Choir
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                Under the baton of Sir Jonathan Perez, our pupils learn sight-reading, bell ringing, and sacred choral anthems, ministering across churches in Cotabato.
              </p>
            </div>
            <div className="text-xs font-semibold text-stone-700 pt-3 border-t border-stone-200">
              Weekly rehearsals · District festival performers
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
