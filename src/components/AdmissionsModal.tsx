import React, { useState } from 'react';
import { X, CheckCircle2, FileText, Download, Printer, ShieldCheck } from 'lucide-react';
import { SCHOOL_INFO } from '../data/mockData';

interface AdmissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdmissionsModal: React.FC<AdmissionsModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  // Form states
  const [studentType, setStudentType] = useState<'New' | 'Transferee' | 'Returning'>('New');
  const [gradeLevel, setGradeLevel] = useState('Kindergarten');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('Male');
  const [previousSchool, setPreviousSchool] = useState('');
  
  const [parentName, setParentName] = useState('');
  const [relationship, setRelationship] = useState('Mother');
  const [parentPhone, setParentPhone] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [homeAddress, setHomeAddress] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedRef = `KSD-ENR-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedRef(generatedRef);
    setStep(3);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-stone-900 text-white p-5 flex items-center justify-between border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase font-semibold text-amber-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Official Admissions Portal</span>
              <span>·</span>
              <span>SY 2026–2027</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-white">
              Enrollment Application for Katingawan SDA
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper indicator */}
        <div className="bg-stone-100 px-6 py-2.5 border-b border-stone-200 flex items-center justify-between text-xs font-semibold text-stone-600">
          <span className={step >= 1 ? 'text-amber-900 font-bold' : ''}>1. Pupil Information</span>
          <span className="text-stone-300">→</span>
          <span className={step >= 2 ? 'text-amber-900 font-bold' : ''}>2. Guardian & Address</span>
          <span className="text-stone-300">→</span>
          <span className={step >= 3 ? 'text-amber-900 font-bold' : ''}>3. Confirmation</span>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 text-xs">
          
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Enrollment Type</label>
                  <select
                    value={studentType}
                    onChange={(e) => setStudentType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                  >
                    <option>New Pupil</option>
                    <option>Transferee</option>
                    <option>Returning Student</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Grade Level Applying For *</label>
                  <select
                    value={gradeLevel}
                    onChange={(e) => setGradeLevel(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                  >
                    <option>Kindergarten (Ages 4-5)</option>
                    <option>Grade 1</option>
                    <option>Grade 2</option>
                    <option>Grade 3</option>
                    <option>Grade 4</option>
                    <option>Grade 5</option>
                    <option>Grade 6</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samuel"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Middle Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Ramos"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Santos"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Birthdate *</label>
                  <input
                    type="date"
                    required
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                  >
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Previous School Attended (If transferee)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Midsayap Central Pilot Elementary School"
                  value={previousSchool}
                  onChange={(e) => setPreviousSchool(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
                >
                  Proceed to Step 2 →
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Parent / Legal Guardian Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maria Elena Santos"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Relationship</label>
                  <select
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                  >
                    <option>Mother</option>
                    <option>Father</option>
                    <option>Grandparent</option>
                    <option>Legal Guardian</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Contact Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0917-XXX-XXXX"
                    value={parentPhone}
                    onChange={(e) => setParentPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="parent@email.com"
                    value={parentEmail}
                    onChange={(e) => setParentEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Complete Residential Address in Midsayap / Cotabato *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Purok, Barangay, Municipality, Province (e.g. Purok 2, Barangay Katingawan, Midsayap, Cotabato)"
                  value={homeAddress}
                  onChange={(e) => setHomeAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              {/* Requirements Checklist */}
              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 space-y-1.5">
                <span className="font-bold text-amber-950 block">Required DepEd Credentials to Submit:</span>
                <ul className="space-y-1 text-stone-700 list-disc list-inside">
                  <li>Original PSA Birth Certificate (photocopy)</li>
                  <li>DepEd Form 138 / SF9 Report Card (for transferees)</li>
                  <li>Certificate of Good Moral Conduct</li>
                  <li>Two (2) copies 2x2 recent colored ID photos</li>
                </ul>
              </div>

              <div className="pt-3 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-stone-600 hover:text-stone-900"
                >
                  ← Back to Step 1
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm"
                >
                  Submit Official Application
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h4 className="font-serif text-2xl font-bold text-stone-900">
                Application Received!
              </h4>

              <p className="text-stone-600 max-w-md mx-auto">
                Thank you for applying to Katingawan SDA Elementary School. Your application has been logged into the Registrar’s Admissions Registry.
              </p>

              <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl max-w-sm mx-auto space-y-1">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">
                  Application Tracking Number
                </span>
                <span className="font-mono text-lg font-bold text-amber-900 block">
                  {submittedRef}
                </span>
                <span className="text-[11px] text-stone-500 block">
                  Grade Level: {gradeLevel} · Applicant: {firstName || 'Student'} {lastName}
                </span>
              </div>

              <p className="text-[11px] text-stone-500 max-w-md mx-auto">
                Please visit the Registrar’s Office during school hours (Mon–Thu 7:30 AM–4:00 PM) to submit hard copies of your requirements.
              </p>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Slip</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-5 py-2 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg"
                >
                  Close & Return to Website
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
