import React, { useState, useMemo } from 'react';
import { MOCK_TEACHERS } from '../data/mockData';
import { Teacher } from '../types';
import {
  Search,
  Mail,
  Phone,
  Clock,
  MapPin,
  GraduationCap,
  BookOpen,
  Send,
  CheckCircle,
  X,
  MessageSquare,
  Award,
  CalendarCheck,
} from 'lucide-react';

interface TeacherDirectoryProps {
  onOpenPortalWithMessage?: (teacherId: string) => void;
}

export const TeacherDirectory: React.FC<TeacherDirectoryProps> = ({ onOpenPortalWithMessage }) => {
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [contactTeacher, setContactTeacher] = useState<Teacher | null>(null);

  // Contact Form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formStudent, setFormStudent] = useState('');
  const [formSubject, setFormSubject] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formPreferredTime, setFormPreferredTime] = useState('');
  const [submittedStatus, setSubmittedStatus] = useState<string | null>(null);

  const departments = [
    { id: 'all', label: 'All Faculty & Staff' },
    { id: 'Early Childhood', label: 'Early Childhood' },
    { id: 'Primary (1-3)', label: 'Primary (1–3)' },
    { id: 'Intermediate (4-6)', label: 'Intermediate (4–6)' },
    { id: 'Special Subjects', label: 'Specialists' },
    { id: 'Administration', label: 'Admin & Chaplaincy' },
  ];

  const filteredTeachers = useMemo(() => {
    return MOCK_TEACHERS.filter((t) => {
      const matchesDept = selectedDept === 'all' || t.department === selectedDept;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        t.name.toLowerCase().includes(q) ||
        t.title.toLowerCase().includes(q) ||
        t.gradeLevel.toLowerCase().includes(q) ||
        t.subjects.some((s) => s.toLowerCase().includes(q)) ||
        (t.advisoryClass && t.advisoryClass.toLowerCase().includes(q));
      return matchesDept && matchesSearch;
    });
  }, [selectedDept, searchQuery]);

  const handleOpenContact = (teacher: Teacher, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setContactTeacher(teacher);
    setFormSubject(`Inquiry regarding ${teacher.advisoryClass || teacher.subjects[0] || 'Pupil Progress'}`);
    setSubmittedStatus(null);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;

    // Simulate sending message to teacher
    setSubmittedStatus('Message transmitted successfully! A notification has been routed to the teacher.');
    setTimeout(() => {
      setSubmittedStatus(null);
      setContactTeacher(null);
      setFormName('');
      setFormEmail('');
      setFormStudent('');
      setFormMessage('');
      setFormPreferredTime('');
    }, 2400);
  };

  // Helper avatar generator using clean typography / colors
  const getAvatarBg = (dept: string) => {
    switch (dept) {
      case 'Early Childhood':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Primary (1-3)':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'Intermediate (4-6)':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'Special Subjects':
        return 'bg-purple-100 text-purple-900 border-purple-300';
      default:
        return 'bg-stone-200 text-stone-900 border-stone-300';
    }
  };

  return (
    <section id="teachers" className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-700 mb-2">
              <span>Our Dedicated Educators</span>
              <span aria-hidden="true">·</span>
              <span>Licensed Christian Mentors</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
              Teacher Faculty Directory
            </h2>
            <p className="mt-2 text-stone-600 text-sm max-w-xl">
              Meet our licensed Christian teachers, master guides, and subject mentors who nurture every child with warmth, academic rigor, and gospel love.
            </p>
          </div>

          <div className="text-xs text-stone-500 self-start md:self-auto">
            <span>Direct consultation hours available via parent portal</span>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 shadow-xs mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Department buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              {departments.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDept(d.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedDept === d.id
                      ? 'bg-stone-900 text-white font-semibold'
                      : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 border border-stone-200'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>

            {/* Keyword Search */}
            <div className="relative w-full lg:w-72">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search teacher, subject, grade..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Directory Results */}
        <div className="text-xs text-stone-500 mb-6 px-1">
          Showing <span className="font-semibold text-stone-800 tabular-nums">{filteredTeachers.length}</span> educators & mentors
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher) => {
            const initials = teacher.name
              .replace(/^(Mrs\.|Teacher|Sir|Pastor|Mr\.)\s*/, '')
              .split(' ')
              .slice(0, 2)
              .map((n) => n[0])
              .join('');

            return (
              <div
                key={teacher.id}
                onClick={() => setSelectedTeacher(teacher)}
                className="group bg-white p-6 rounded-2xl border border-stone-200 hover:border-amber-500/50 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Top profile lockup */}
                  <div className="flex items-start gap-3.5 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl border flex items-center justify-center font-serif text-base font-bold shrink-0 ${getAvatarBg(
                        teacher.department
                      )}`}
                    >
                      {initials}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 text-xs text-amber-800 font-semibold tracking-wide uppercase">
                        <span>{teacher.department}</span>
                        {teacher.advisoryClass && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-stone-500 font-normal truncate">
                              {teacher.advisoryClass}
                            </span>
                          </>
                        )}
                      </div>

                      <h3 className="font-serif text-base font-bold text-stone-900 group-hover:text-amber-900 transition-colors truncate">
                        {teacher.name}
                      </h3>

                      <p className="text-xs text-stone-600 truncate">{teacher.title}</p>
                    </div>
                  </div>

                  {/* Bio snippet */}
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
                    {teacher.bio}
                  </p>

                  {/* Subjects unboxed list */}
                  <div className="mb-4">
                    <span className="text-[10px] uppercase font-semibold text-stone-400 block mb-1">
                      Teaching Focus:
                    </span>
                    <p className="text-xs text-stone-700 line-clamp-1">
                      {teacher.subjects.join(' · ')}
                    </p>
                  </div>

                  {/* Office Hours & Location */}
                  <div className="space-y-1.5 pt-3 border-t border-stone-100 text-xs text-stone-600">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span className="truncate">{teacher.officeHours}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span className="truncate">{teacher.room}</span>
                    </div>
                  </div>
                </div>

                {/* Footer action buttons */}
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-stone-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTeacher(teacher);
                    }}
                    className="text-xs text-stone-600 hover:text-stone-900 font-medium"
                  >
                    View Credentials →
                  </button>

                  <button
                    onClick={(e) => handleOpenContact(teacher, e)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    <Mail className="w-3 h-3 text-stone-900" />
                    <span>Contact Teacher</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* TEACHER PROFILE DETAIL MODAL */}
        {selectedTeacher && (
          <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-xl w-full border border-stone-200 shadow-2xl overflow-hidden animate-in fade-in duration-200">
              
              <div className="bg-stone-900 text-white p-6 flex items-start justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold block mb-1">
                    {selectedTeacher.department} · {selectedTeacher.role}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    {selectedTeacher.name}
                  </h3>
                  <p className="text-xs text-stone-300 mt-0.5">{selectedTeacher.title}</p>
                </div>
                <button
                  onClick={() => setSelectedTeacher(null)}
                  className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-5 text-stone-700 max-h-[75vh] overflow-y-auto">
                {/* Advisory & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                  <div>
                    <span className="text-stone-400 uppercase font-semibold block text-[10px]">Room / Office</span>
                    <span className="font-medium text-stone-900">{selectedTeacher.room}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 uppercase font-semibold block text-[10px]">Advisory Class</span>
                    <span className="font-medium text-stone-900">{selectedTeacher.advisoryClass || 'Subject Specialist'}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-stone-400 uppercase font-semibold block text-[10px]">Office & Consultation Hours</span>
                    <span className="font-medium text-stone-900">{selectedTeacher.officeHours}</span>
                  </div>
                </div>

                {/* Biography */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-500 mb-1.5">
                    Educator Biography & Ministry
                  </h4>
                  <p className="text-sm text-stone-800 leading-relaxed">
                    {selectedTeacher.bio}
                  </p>
                </div>

                {/* Education and Credentials */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-500 mb-2">
                    Degrees & Certifications
                  </h4>
                  <ul className="space-y-1.5 text-xs text-stone-700">
                    {selectedTeacher.education.map((deg, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <GraduationCap className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                        <span>{deg}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Subjects Handled */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-500 mb-1.5">
                    Subjects Taught
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedTeacher.subjects.map((sub, i) => (
                      <span
                        key={i}
                        className="text-xs bg-stone-100 text-stone-800 px-2.5 py-1 rounded-md border border-stone-200"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-3">
                  <div className="text-xs text-stone-500">
                    <span>Email: </span>
                    <span className="font-mono text-stone-800">{selectedTeacher.email}</span>
                  </div>

                  <button
                    onClick={() => {
                      const t = selectedTeacher;
                      setSelectedTeacher(null);
                      handleOpenContact(t);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shadow-sm"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send Direct Message</span>
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* CONTACT / MESSAGE TEACHER MODAL */}
        {contactTeacher && (
          <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full border border-stone-200 shadow-2xl overflow-hidden animate-in fade-in duration-200">
              
              <div className="bg-stone-900 text-white p-5 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
                    <span>Direct Teacher Contact</span>
                    <span>·</span>
                    <span>Parent Consultation</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white">
                    Message {contactTeacher.name}
                  </h3>
                  <p className="text-xs text-stone-300">{contactTeacher.title}</p>
                </div>
                <button
                  onClick={() => setContactTeacher(null)}
                  className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {submittedStatus ? (
                <div className="p-8 text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-stone-900">Message Delivered</h4>
                  <p className="text-xs text-stone-600 max-w-sm mx-auto">{submittedStatus}</p>
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="p-6 space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mrs. Elena Santos"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Contact Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. parent@email.com"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Pupil Name & Grade</label>
                      <input
                        type="text"
                        placeholder="e.g. Joshua Santos (Grade 5)"
                        value={formStudent}
                        onChange={(e) => setFormStudent(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Preferred Consultation Time</label>
                      <input
                        type="text"
                        placeholder="e.g. Tuesday 2:00 PM"
                        value={formPreferredTime}
                        onChange={(e) => setFormPreferredTime(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Subject / Reason *</label>
                    <input
                      type="text"
                      required
                      value={formSubject}
                      onChange={(e) => setFormSubject(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Message / Consultation Note *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Please write your inquiry or request for teacher consultation..."
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setContactTeacher(null)}
                      className="px-4 py-2 text-xs text-stone-600 hover:text-stone-900"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit Message</span>
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
