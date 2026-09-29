import React, { useState } from 'react';
import { Header } from './components/Header';
import { OperationalRibbon } from './components/OperationalRibbon';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { AcademicsSection } from './components/AcademicsSection';
import { EventsCalendar } from './components/EventsCalendar';
import { TeacherDirectory } from './components/TeacherDirectory';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ParentPortalModal } from './components/ParentPortal/ParentPortalModal';
import { AdmissionsModal } from './components/AdmissionsModal';
import { MOCK_PARENTS } from './data/mockData';
import { ParentUser } from './types';
import { Bell, Check, ShieldCheck, HeartHandshake, UserCheck } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);

  // Authenticated parent state (starts as null or can be quick-logged in)
  const [currentUser, setCurrentUser] = useState<ParentUser | null>(null);

  const handleLogin = (user: ParentUser) => {
    setCurrentUser(user);
    setIsPortalOpen(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      
      {/* 1. Operational Utility Ribbon (Hours, Sabbath notice, Hotline) */}
      <OperationalRibbon />

      {/* 2. Top Bar Navigation (Strict 3-zone contract) */}
      <Header
        activeSection={activeSection}
        setActiveSection={handleNavigate}
        onOpenPortal={() => setIsPortalOpen(true)}
        onOpenEnrollment={() => setIsEnrollmentOpen(true)}
        isLoggedIn={Boolean(currentUser)}
        parentName={currentUser?.name}
        onLogout={handleLogout}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* Hero Banner with Generated Campus Image & Key Proof Metrics */}
        <section id="home">
          <Hero
            onNavigate={handleNavigate}
            onOpenPortal={() => setIsPortalOpen(true)}
            onOpenEnrollment={() => setIsEnrollmentOpen(true)}
          />
        </section>

        {/* Philosophy of Adventist Education & 4-Fold Framework */}
        <AboutSection />

        {/* Academics: Kindergarten, Primary, Intermediate, Adventurer Club */}
        <AcademicsSection onOpenEnrollment={() => setIsEnrollmentOpen(true)} />

        {/* Interactive Calendar of Events (Filtering, Search, Add to Calendar) */}
        <EventsCalendar />

        {/* Teacher Faculty Directory (Bio credentials, direct contact form) */}
        <TeacherDirectory
          onOpenPortalWithMessage={(teacherId) => {
            if (!currentUser) {
              setCurrentUser(MOCK_PARENTS[0]);
            }
            setIsPortalOpen(true);
          }}
        />

        {/* Campus Location & Inquiry Form */}
        <ContactSection />

      </main>

      {/* Quiet Institutional Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenPortal={() => setIsPortalOpen(true)}
        onOpenEnrollment={() => setIsEnrollmentOpen(true)}
      />

      {/* SECURE PARENT PORTAL MODAL */}
      <ParentPortalModal
        isOpen={isPortalOpen}
        onClose={() => setIsPortalOpen(false)}
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      {/* ONLINE ADMISSIONS & ENROLLMENT MODAL */}
      <AdmissionsModal
        isOpen={isEnrollmentOpen}
        onClose={() => setIsEnrollmentOpen(false)}
      />

      {/* Quick floating helper button for instant Parent Portal access on mobile */}
      <div className="fixed bottom-5 right-5 z-30 sm:hidden">
        <button
          onClick={() => setIsPortalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-stone-900 text-amber-400 font-semibold text-xs rounded-full shadow-xl border border-stone-700 cursor-pointer"
        >
          <UserCheck className="w-4 h-4 text-amber-400" />
          <span>Parent Portal</span>
        </button>
      </div>

    </div>
  );
}
