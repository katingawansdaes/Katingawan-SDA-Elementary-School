import React, { useState } from 'react';
import {
  MOCK_PARENTS,
  MOCK_TUITION_FEES,
  MOCK_MESSAGES,
  MOCK_EXCUSE_LETTERS,
  MOCK_PERMISSION_SLIPS,
  SCHOOL_INFO,
} from '../../data/mockData';
import { ParentUser, Student, TuitionFeeItem, PortalMessage, ExcuseLetter, PermissionSlip } from '../../types';
import {
  Lock,
  UserCheck,
  LogOut,
  GraduationCap,
  Calendar,
  CreditCard,
  MessageSquare,
  FileCheck2,
  Clock,
  CheckCircle2,
  AlertCircle,
  Download,
  Printer,
  X,
  Send,
  Upload,
  ChevronRight,
  Shield,
  Phone,
  Mail,
  User,
  Check,
} from 'lucide-react';

interface ParentPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: ParentUser | null;
  onLogin: (user: ParentUser) => void;
  onLogout: () => void;
}

export const ParentPortalModal: React.FC<ParentPortalModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
}) => {
  // Login form state
  const [emailInput, setEmailInput] = useState('');
  const [pinInput, setPinInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Portal view state
  const [activeTab, setActiveTab] = useState<'overview' | 'grades' | 'attendance' | 'tuition' | 'messages' | 'excuse' | 'slips'>('overview');
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');

  // Interactive portal data states (persisted in session)
  const [messages, setMessages] = useState<PortalMessage[]>(MOCK_MESSAGES);
  const [replyText, setReplyText] = useState('');
  const [tuitionList, setTuitionList] = useState<TuitionFeeItem[]>(MOCK_TUITION_FEES);
  const [excuseLetters, setExcuseLetters] = useState<ExcuseLetter[]>(MOCK_EXCUSE_LETTERS);
  const [permissionSlips, setPermissionSlips] = useState<PermissionSlip[]>(MOCK_PERMISSION_SLIPS);

  // Modals inside portal
  const [showPrintReportCard, setShowPrintReportCard] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('5200');
  const [paymentRef, setPaymentRef] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('GCash');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Excuse letter form
  const [excuseDate, setExcuseDate] = useState('');
  const [excuseReason, setExcuseReason] = useState('Fever / Medical Illness');
  const [excuseNotes, setExcuseNotes] = useState('');
  const [excuseSuccess, setExcuseSuccess] = useState(false);

  // When currentUser changes or on mount, select their first child
  React.useEffect(() => {
    if (currentUser && currentUser.children.length > 0) {
      if (!selectedStudentId || !currentUser.children.some((c) => c.id === selectedStudentId)) {
        setSelectedStudentId(currentUser.children[0].id);
      }
    }
  }, [currentUser]);

  if (!isOpen) return null;

  const currentStudent = currentUser?.children.find((c) => c.id === selectedStudentId) || currentUser?.children[0];

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const found = MOCK_PARENTS.find(
      (p) => (p.email.toLowerCase() === emailInput.trim().toLowerCase() || p.phone.includes(emailInput.trim())) && p.pin === pinInput.trim()
    );

    if (found) {
      onLogin(found);
      setSelectedStudentId(found.children[0].id);
    } else {
      setLoginError('Invalid credentials. Please use one of the demo parent accounts below or check your PIN.');
    }
  };

  const handleQuickDemoLogin = (parent: ParentUser) => {
    setEmailInput(parent.email);
    setPinInput(parent.pin);
    onLogin(parent);
    setSelectedStudentId(parent.children[0].id);
    setLoginError('');
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !currentUser || !currentStudent) return;

    const newMessage: PortalMessage = {
      id: `msg-${Date.now()}`,
      studentId: currentStudent.id,
      teacherId: 't-grade5',
      teacherName: currentStudent.adviser,
      teacherRole: 'Class Adviser',
      parentName: currentUser.name,
      sender: 'parent',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      subject: `Regarding ${currentStudent.firstName}'s Progress`,
      content: replyText.trim(),
      read: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setReplyText('');
  };

  const handleSignPermissionSlip = (slipId: string) => {
    setPermissionSlips((prev) =>
      prev.map((slip) =>
        slip.id === slipId
          ? {
              ...slip,
              signed: true,
              signedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
            }
          : slip
      )
    );
  };

  const handleSubmitExcuseLetter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentStudent || !excuseDate || !excuseNotes) return;

    const newLetter: ExcuseLetter = {
      id: `exc-${Date.now()}`,
      studentId: currentStudent.id,
      studentName: currentStudent.fullName,
      dates: excuseDate,
      reason: `${excuseReason}: ${excuseNotes}`,
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Approved',
      adviserRemarks: `Noted and approved by ${currentStudent.adviser}. Take-home learning modules prepared.`,
    };

    setExcuseLetters((prev) => [newLetter, ...prev]);
    setExcuseSuccess(true);
    setTimeout(() => {
      setExcuseSuccess(false);
      setExcuseDate('');
      setExcuseNotes('');
    }, 2500);
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentStudent || !paymentRef) return;

    const targetPending = tuitionList.find((t) => t.studentId === currentStudent.id && t.status === 'pending');
    if (targetPending) {
      setTuitionList((prev) =>
        prev.map((item) =>
          item.id === targetPending.id
            ? {
                ...item,
                status: 'paid',
                paidDate: new Date().toISOString().substring(0, 10),
                receiptNo: `OR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
                paymentMethod: `${paymentMethod} (Ref: ${paymentRef})`,
              }
            : item
        )
      );
    }
    setPaymentSuccess(true);
    setTimeout(() => {
      setPaymentSuccess(false);
      setShowPaymentModal(false);
      setPaymentRef('');
    }, 2000);
  };

  // Student specific data
  const studentTuition = tuitionList.filter((t) => t.studentId === currentStudent?.id);
  const studentMessages = messages.filter((m) => m.studentId === currentStudent?.id);
  const studentSlips = permissionSlips.filter((p) => p.studentId === currentStudent?.id);
  const studentExcuses = excuseLetters.filter((e) => e.studentId === currentStudent?.id);

  const totalOutstanding = studentTuition
    .filter((t) => t.status !== 'paid')
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl max-w-5xl w-full h-[94vh] max-h-[860px] border border-stone-200 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Top Header of Portal */}
        <div className="bg-stone-900 text-white px-6 py-4 flex items-center justify-between border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold text-white block">
                Secure Parent Portal
              </span>
              <span className="text-xs text-stone-400 block">
                Katingawan SDA Elementary School · DepEd School ID #{SCHOOL_INFO.depedSchoolId}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {currentUser && (
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* BODY: IF NOT LOGGED IN -> SHOW AUTH VIEW */}
        {!currentUser ? (
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 flex flex-col justify-center max-w-2xl mx-auto w-full">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-amber-100 text-amber-900 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Sign In to Parent Portal
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-md mx-auto">
                Access your child’s quarterly grades, attendance records, school fees ledger, and direct teacher communications.
              </p>
            </div>

            {loginError && (
              <div className="mb-6 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4 mb-8">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Registered Parent Email or Contact Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. elena.santos@gmail.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Security PIN / Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="4-digit PIN (e.g. 2026)"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shadow-sm uppercase tracking-wider"
              >
                Sign In To Portal
              </button>
            </form>

            {/* Quick Demo Parent Accounts Box */}
            <div className="pt-6 border-t border-stone-200 space-y-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-stone-500 block text-center">
                Instant Demo Access (Click to test portal):
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MOCK_PARENTS.map((parent) => (
                  <button
                    key={parent.id}
                    onClick={() => handleQuickDemoLogin(parent)}
                    className="p-3 text-left bg-stone-50 hover:bg-amber-50/60 border border-stone-200 hover:border-amber-400/50 rounded-xl transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <UserCheck className="w-3.5 h-3.5 text-amber-700" />
                      <span className="text-xs font-bold text-stone-900 group-hover:text-amber-900">
                        {parent.name}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500">
                      Children: {parent.children.map((c) => `${c.firstName} (${c.gradeLevel})`).join(', ')}
                    </p>
                    <span className="text-[10px] text-amber-800 font-mono mt-1 block">
                      PIN: {parent.pin} · Click to Sign In
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* AUTHENTICATED PARENT VIEW */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-stone-50">
            
            {/* Sidebar with Child Switcher & Navigation Tabs */}
            <div className="w-full md:w-64 bg-white border-r border-stone-200 p-4 flex flex-col justify-between shrink-0">
              
              <div className="space-y-5">
                {/* Parent Profile Card */}
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0">
                      {currentUser.name[0]}
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-stone-900 block truncate">
                        {currentUser.name}
                      </span>
                      <span className="text-[10px] text-stone-500 block truncate">
                        {currentUser.relationship} · {currentUser.email}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Child Switcher (If multiple children) */}
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block mb-1.5">
                    Select Pupil / Child
                  </label>
                  <div className="space-y-1.5">
                    {currentUser.children.map((child) => (
                      <button
                        key={child.id}
                        onClick={() => setSelectedStudentId(child.id)}
                        className={`w-full text-left p-2.5 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                          currentStudent?.id === child.id
                            ? 'bg-amber-400/20 text-amber-950 font-bold border border-amber-400/40'
                            : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200'
                        }`}
                      >
                        <div>
                          <span className="block truncate">{child.fullName}</span>
                          <span className="text-[10px] text-stone-500 font-normal">
                            {child.gradeLevel} - {child.section}
                          </span>
                        </div>
                        {currentStudent?.id === child.id && (
                          <Check className="w-3.5 h-3.5 text-amber-800" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Navigation Tabs */}
                <nav className="space-y-1 pt-2">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2.5 transition-colors cursor-pointer ${
                      activeTab === 'overview'
                        ? 'bg-stone-900 text-white font-semibold'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span>Overview & Snapshot</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('grades')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2.5 transition-colors cursor-pointer ${
                      activeTab === 'grades'
                        ? 'bg-stone-900 text-white font-semibold'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>Report Card (SF9)</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('attendance')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2.5 transition-colors cursor-pointer ${
                      activeTab === 'attendance'
                        ? 'bg-stone-900 text-white font-semibold'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    <span>Attendance Records</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('tuition')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                      activeTab === 'tuition'
                        ? 'bg-stone-900 text-white font-semibold'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <CreditCard className="w-4 h-4" />
                      <span>Tuition & Ledger</span>
                    </div>
                    {totalOutstanding > 0 && (
                      <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-mono font-bold">
                        Due
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => setActiveTab('messages')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                      activeTab === 'messages'
                        ? 'bg-stone-900 text-white font-semibold'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <MessageSquare className="w-4 h-4" />
                      <span>Teacher Messages</span>
                    </div>
                    {studentMessages.some((m) => !m.read && m.sender === 'teacher') && (
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                    )}
                  </button>

                  <button
                    onClick={() => setActiveTab('excuse')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2.5 transition-colors cursor-pointer ${
                      activeTab === 'excuse'
                        ? 'bg-stone-900 text-white font-semibold'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <FileCheck2 className="w-4 h-4" />
                    <span>Excuse Letters</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('slips')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                      activeTab === 'slips'
                        ? 'bg-stone-900 text-white font-semibold'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4" />
                      <span>Permission Slips</span>
                    </div>
                    {studentSlips.some((s) => !s.signed) && (
                      <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-bold">
                        1
                      </span>
                    )}
                  </button>
                </nav>
              </div>

              {/* Security info */}
              <div className="pt-4 border-t border-stone-200 text-[11px] text-stone-500">
                <div className="flex items-center gap-1.5 text-stone-700 font-semibold mb-1">
                  <Shield className="w-3.5 h-3.5 text-amber-700" />
                  <span>DepEd Data Protected</span>
                </div>
                <span>Session encrypted · Official DepEd SF9 Learner Portal</span>
              </div>

            </div>

            {/* Main Content Pane */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
              
              {/* STUDENT HEADER STRIP */}
              {currentStudent && (
                <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                      <span>LRN: <strong className="font-mono text-stone-800">{currentStudent.lrn}</strong></span>
                      <span>·</span>
                      <span>{currentStudent.gradeLevel} – Section {currentStudent.section}</span>
                    </div>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                      {currentStudent.fullName}
                    </h2>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Class Adviser: <span className="font-medium text-stone-900">{currentStudent.adviser}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-stone-400 block">General Average</span>
                      <span className="font-serif text-xl sm:text-2xl font-bold text-amber-900 tabular-nums">
                        {currentStudent.generalAverage.toFixed(1)}%
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-700 block">
                        {currentStudent.academicStanding}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && currentStudent && (
                <div className="space-y-6">
                  {/* Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-stone-200">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block mb-1">
                        Attendance Rate
                      </span>
                      <div className="font-serif text-2xl font-bold text-stone-900 tabular-nums">
                        {currentStudent.attendanceRate.toFixed(1)}%
                      </div>
                      <p className="text-xs text-emerald-700 font-medium mt-1">Excellent regular attendance</p>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-stone-200">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block mb-1">
                        Outstanding School Fees
                      </span>
                      <div className="font-serif text-2xl font-bold text-stone-900 tabular-nums">
                        ₱{totalOutstanding.toLocaleString()}
                      </div>
                      <p className="text-xs text-stone-500 mt-1">
                        {totalOutstanding === 0 ? 'All fees settled' : 'Trimester 2 due Nov 15'}
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-stone-200">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block mb-1">
                        Christian Living Standing
                      </span>
                      <div className="font-serif text-2xl font-bold text-stone-900 tabular-nums">
                        97.0%
                      </div>
                      <p className="text-xs text-amber-800 font-medium mt-1">Exemplary Bible memorization</p>
                    </div>
                  </div>

                  {/* Adviser Notice & Today's Schedule */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-stone-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif text-base font-bold text-stone-900">
                          Homeroom Adviser’s Note
                        </h4>
                        <span className="text-[10px] text-stone-400">Current Term</span>
                      </div>
                      <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                        “{currentStudent.firstName} continues to show inspiring enthusiasm in both classroom recitations and morning chapel devotionals. He shows great respect toward teachers and peers, consistently completes homework on time, and participates actively in Adventurer club projects.”
                      </p>
                      <div className="pt-2 flex items-center justify-between text-xs text-stone-500 border-t border-stone-100">
                        <span>Signed: {currentStudent.adviser}</span>
                        <button
                          onClick={() => setActiveTab('messages')}
                          className="text-amber-800 font-semibold hover:underline"
                        >
                          Send note to adviser →
                        </button>
                      </div>
                    </div>

                    <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-stone-200 space-y-3">
                      <h4 className="font-serif text-base font-bold text-stone-900">
                        Upcoming Milestone
                      </h4>
                      <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs space-y-1">
                        <span className="font-bold text-stone-900 block">Q1 Periodical Examinations</span>
                        <p className="text-stone-600">October 15 – 16, 2026</p>
                        <span className="text-amber-800 block text-[11px] font-medium pt-1">
                          Review pointers uploaded in Google Classroom
                        </span>
                      </div>

                      <button
                        onClick={() => setActiveTab('grades')}
                        className="w-full py-2 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
                      >
                        View Subject Quarterly Breakdown
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: REPORT CARD & GRADES */}
              {activeTab === 'grades' && currentStudent && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-stone-200">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-stone-900">
                        Progress Report Card (DepEd Form 138 / SF9)
                      </h3>
                      <p className="text-xs text-stone-500">
                        Grading Scale: 90–100 Outstanding · 85–89 Very Satisfactory · 80–84 Satisfactory · 75–79 Fair · Below 75 Did Not Meet
                      </p>
                    </div>

                    <button
                      onClick={() => setShowPrintReportCard(true)}
                      className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer self-start sm:self-auto"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print / Download Slip</span>
                    </button>
                  </div>

                  {/* Grades Table */}
                  <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-stone-100 text-stone-700 font-semibold border-b border-stone-200">
                            <th className="py-3 px-4">Learning Area / Subject</th>
                            <th className="py-3 px-3 text-stone-500">Teacher</th>
                            <th className="py-3 px-2 text-center tabular-nums">Q1</th>
                            <th className="py-3 px-2 text-center tabular-nums">Q2</th>
                            <th className="py-3 px-2 text-center tabular-nums">Q3</th>
                            <th className="py-3 px-2 text-center tabular-nums">Q4</th>
                            <th className="py-3 px-3 text-center tabular-nums font-bold text-stone-900">Final</th>
                            <th className="py-3 px-4 text-center">Remarks</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                          {currentStudent.grades.map((g, idx) => (
                            <tr key={idx} className="hover:bg-stone-50/70 transition-colors">
                              <td className="py-3 px-4 font-medium text-stone-900">
                                {g.subject}
                              </td>
                              <td className="py-3 px-3 text-stone-500 truncate max-w-[140px]">
                                {g.teacher}
                              </td>
                              <td className="py-3 px-2 text-center tabular-nums font-medium text-stone-800">
                                {g.q1 || '—'}
                              </td>
                              <td className="py-3 px-2 text-center tabular-nums font-medium text-stone-800">
                                {g.q2 || '—'}
                              </td>
                              <td className="py-3 px-2 text-center tabular-nums text-stone-400">
                                {g.q3 || '—'}
                              </td>
                              <td className="py-3 px-2 text-center tabular-nums text-stone-400">
                                {g.q4 || '—'}
                              </td>
                              <td className="py-3 px-3 text-center tabular-nums font-bold text-amber-900">
                                {g.finalRating.toFixed(1)}
                              </td>
                              <td className="py-3 px-4 text-center">
                                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                  {g.remarks}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="bg-stone-50 font-bold border-t-2 border-stone-300">
                            <td colSpan={6} className="py-3 px-4 text-right text-stone-800 uppercase tracking-wider text-[11px]">
                              General Average (Running):
                            </td>
                            <td className="py-3 px-3 text-center font-serif text-base text-amber-900 tabular-nums">
                              {currentStudent.generalAverage.toFixed(1)}%
                            </td>
                            <td className="py-3 px-4 text-center text-emerald-800 font-semibold">
                              {currentStudent.academicStanding}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: ATTENDANCE TRACKER */}
              {activeTab === 'attendance' && currentStudent && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-stone-200 text-center">
                      <span className="text-[10px] uppercase font-bold text-stone-400 block">Days Present</span>
                      <span className="font-serif text-2xl font-bold text-emerald-700 tabular-nums">
                        {currentStudent.attendance.filter((a) => a.status === 'present').length}
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-stone-200 text-center">
                      <span className="text-[10px] uppercase font-bold text-stone-400 block">Days Tardy</span>
                      <span className="font-serif text-2xl font-bold text-amber-700 tabular-nums">
                        {currentStudent.attendance.filter((a) => a.status === 'tardy').length}
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-stone-200 text-center">
                      <span className="text-[10px] uppercase font-bold text-stone-400 block">Excused Absences</span>
                      <span className="font-serif text-2xl font-bold text-blue-700 tabular-nums">
                        {currentStudent.attendance.filter((a) => a.status === 'excused').length}
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-stone-200 text-center">
                      <span className="text-[10px] uppercase font-bold text-stone-400 block">Unexcused</span>
                      <span className="font-serif text-2xl font-bold text-stone-700 tabular-nums">0</span>
                    </div>
                  </div>

                  {/* Attendance Log Table */}
                  <div className="bg-white rounded-xl border border-stone-200 p-5">
                    <h4 className="font-serif text-base font-bold text-stone-900 mb-4">
                      September 2026 Daily Attendance Registry
                    </h4>
                    <div className="space-y-2">
                      {currentStudent.attendance.map((rec, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-xs"
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-medium text-stone-800 tabular-nums">{rec.date}</span>
                            {rec.remarks && (
                              <span className="text-stone-500 italic text-[11px]">— {rec.remarks}</span>
                            )}
                          </div>
                          <div>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                                rec.status === 'present'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : rec.status === 'tardy'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {rec.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: TUITION & LEDGER */}
              {activeTab === 'tuition' && currentStudent && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-stone-200">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-stone-900">
                        Statement of Account & Fee Dues
                      </h3>
                      <p className="text-xs text-stone-500">
                        Official Tuition, Educational Levy, Laboratory, and Adventurer Club Dues
                      </p>
                    </div>

                    {totalOutstanding > 0 && (
                      <button
                        onClick={() => setShowPaymentModal(true)}
                        className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer self-start sm:self-auto shadow-xs"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>Submit Payment Proof</span>
                      </button>
                    )}
                  </div>

                  {/* Ledger Itemization */}
                  <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="bg-stone-100 text-stone-700 font-semibold border-b border-stone-200">
                            <th className="py-3 px-4">Item Description</th>
                            <th className="py-3 px-3">Term</th>
                            <th className="py-3 px-3 tabular-nums">Due Date</th>
                            <th className="py-3 px-3 text-right tabular-nums">Amount</th>
                            <th className="py-3 px-4 text-center">Status</th>
                            <th className="py-3 px-4">Payment Reference</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                          {studentTuition.map((fee) => (
                            <tr key={fee.id} className="hover:bg-stone-50/70">
                              <td className="py-3 px-4 font-medium text-stone-900">{fee.description}</td>
                              <td className="py-3 px-3 text-stone-600">{fee.term}</td>
                              <td className="py-3 px-3 tabular-nums text-stone-600">{fee.dueDate}</td>
                              <td className="py-3 px-3 text-right tabular-nums font-bold text-stone-900">
                                ₱{fee.amount.toLocaleString()}
                              </td>
                              <td className="py-3 px-4 text-center">
                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                                    fee.status === 'paid'
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : 'bg-amber-100 text-amber-900'
                                  }`}
                                >
                                  {fee.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-stone-600 text-[11px]">
                                {fee.receiptNo ? (
                                  <div>
                                    <span className="font-mono font-medium text-stone-800 block">
                                      {fee.receiptNo}
                                    </span>
                                    <span className="text-[10px] text-stone-500 block truncate">
                                      {fee.paymentMethod}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-stone-400 italic">Pending Cashier Clearing</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Payment Instructions Notice */}
                  <div className="p-4 bg-stone-100 rounded-xl border border-stone-200 text-xs text-stone-700 space-y-1">
                    <span className="font-bold text-stone-900 block">Payment Channels:</span>
                    <p>• GCash / Maya: Katingawan SDA School Official (0917-582-3901)</p>
                    <p>• BPI Bank: Acct # 2049-1192-34 (Katingawan SDA Elementary School)</p>
                    <p>• On-Campus Cashier: Monday to Thursday 8:00 AM – 3:30 PM, Friday until 2:00 PM</p>
                  </div>
                </div>
              )}

              {/* TAB 5: TEACHER MESSAGES */}
              {activeTab === 'messages' && currentStudent && (
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl border border-stone-200">
                    <h3 className="font-serif text-lg font-bold text-stone-900">
                      Direct Parent-Teacher Communication Thread
                    </h3>
                    <p className="text-xs text-stone-500">
                      Private conversation between you and {currentStudent.firstName}’s educators.
                    </p>
                  </div>

                  {/* Message Stream */}
                  <div className="space-y-3 bg-white p-4 sm:p-6 rounded-xl border border-stone-200 max-h-[420px] overflow-y-auto">
                    {studentMessages.length === 0 ? (
                      <p className="text-center text-xs text-stone-400 py-8">
                        No previous messages in this conversation. Send a message below.
                      </p>
                    ) : (
                      studentMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`p-3.5 rounded-xl text-xs max-w-lg ${
                            msg.sender === 'parent'
                              ? 'ml-auto bg-amber-50 border border-amber-200 text-stone-800'
                              : 'mr-auto bg-stone-100 border border-stone-200 text-stone-800'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="font-bold text-stone-900">
                              {msg.sender === 'parent' ? 'You (Parent)' : msg.teacherName}
                            </span>
                            <span className="text-[10px] text-stone-400 tabular-nums">
                              {msg.timestamp}
                            </span>
                          </div>
                          <div className="font-semibold text-stone-900 mb-1">{msg.subject}</div>
                          <p className="leading-relaxed">{msg.content}</p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Send Input */}
                  <form onSubmit={handleSendReply} className="flex gap-2">
                    <input
                      type="text"
                      placeholder={`Write a message to ${currentStudent.adviser}...`}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="flex-1 px-4 py-2.5 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600"
                    />
                    <button
                      type="submit"
                      disabled={!replyText.trim()}
                      className="px-4 py-2.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send</span>
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 6: EXCUSE LETTERS */}
              {activeTab === 'excuse' && currentStudent && (
                <div className="space-y-6">
                  <div className="bg-white p-5 rounded-xl border border-stone-200">
                    <h3 className="font-serif text-lg font-bold text-stone-900 mb-1">
                      Online Excuse Note Submission
                    </h3>
                    <p className="text-xs text-stone-500 mb-4">
                      Submit formal excuse letters for student absences. Notes are instantly routed to the homeroom adviser.
                    </p>

                    {excuseSuccess && (
                      <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Excuse letter successfully submitted and endorsed to adviser!</span>
                      </div>
                    )}

                    <form onSubmit={handleSubmitExcuseLetter} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            Date(s) of Absence *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. October 12, 2026"
                            value={excuseDate}
                            onChange={(e) => setExcuseDate(e.target.value)}
                            className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            Primary Reason *
                          </label>
                          <select
                            value={excuseReason}
                            onChange={(e) => setExcuseReason(e.target.value)}
                            className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg"
                          >
                            <option>Fever / Medical Illness</option>
                            <option>Dental Consultation</option>
                            <option>Urgent Family Emergency</option>
                            <option>Bereavement / Funeral</option>
                            <option>Severe Weather / Flooded Road</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Explanation & Doctor’s Note Details *
                        </label>
                        <textarea
                          required
                          rows={3}
                          placeholder="Please describe symptoms, medical consultation, or circumstance..."
                          value={excuseNotes}
                          onChange={(e) => setExcuseNotes(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg"
                        />
                      </div>

                      <button
                        type="submit"
                        className="px-4 py-2 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
                      >
                        Submit Official Excuse Letter
                      </button>
                    </form>
                  </div>

                  {/* Submission History */}
                  <div className="bg-white p-5 rounded-xl border border-stone-200">
                    <h4 className="font-serif text-base font-bold text-stone-900 mb-3">
                      Previous Submissions
                    </h4>
                    <div className="space-y-3">
                      {studentExcuses.map((exc) => (
                        <div key={exc.id} className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-stone-900">Absence Date: {exc.dates}</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                              {exc.status}
                            </span>
                          </div>
                          <p className="text-stone-700 mb-2">{exc.reason}</p>
                          {exc.adviserRemarks && (
                            <div className="p-2 bg-white rounded border border-stone-200 text-[11px] text-stone-600">
                              <strong className="text-stone-800">Adviser Remarks: </strong>
                              {exc.adviserRemarks}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 7: PERMISSION SLIPS */}
              {activeTab === 'slips' && currentStudent && (
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl border border-stone-200">
                    <h3 className="font-serif text-lg font-bold text-stone-900">
                      Co-Curricular Activity & Field Trip Consent
                    </h3>
                    <p className="text-xs text-stone-500">
                      Digital endorsement required for off-campus events and Adventurer campouts.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {studentSlips.map((slip) => (
                      <div
                        key={slip.id}
                        className="bg-white p-5 rounded-xl border border-stone-200 space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                          <div>
                            <h4 className="font-serif text-base font-bold text-stone-900">
                              {slip.title}
                            </h4>
                            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mt-1">
                              <span>Event Date: <strong className="text-stone-800">{slip.eventDate}</strong></span>
                              <span>·</span>
                              <span>Location: {slip.location}</span>
                              <span>·</span>
                              <span>Cost: ₱{slip.cost}</span>
                            </div>
                          </div>

                          <div>
                            {slip.signed ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-emerald-800 bg-emerald-100 rounded-md">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Consent Granted</span>
                              </span>
                            ) : (
                              <button
                                onClick={() => handleSignPermissionSlip(slip.id)}
                                className="px-3.5 py-1.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shadow-xs"
                              >
                                Sign & Grant Consent
                              </button>
                            )}
                          </div>
                        </div>

                        <p className="text-xs text-stone-600 leading-relaxed">
                          {slip.description}
                        </p>

                        <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                          <span>Submission Deadline: {slip.deadline}</span>
                          {slip.signedAt && (
                            <span className="font-medium text-emerald-800">
                              Signed electronically on {slip.signedAt} by {currentUser.name}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>

      {/* MODAL: SUBMIT PAYMENT PROOF */}
      {showPaymentModal && currentStudent && (
        <div className="fixed inset-0 z-60 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-stone-200 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Submit Fee Payment Proof
              </h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="p-1 text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {paymentSuccess ? (
              <div className="text-center py-6 space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-stone-900">Payment Submitted!</h4>
                <p className="text-xs text-stone-600">
                  The cashier office has verified the reference number and updated your ledger.
                </p>
              </div>
            ) : (
              <form onSubmit={handleProcessPayment} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Pupil Name</label>
                  <input
                    type="text"
                    disabled
                    value={currentStudent.fullName}
                    className="w-full px-3 py-1.5 bg-stone-100 border border-stone-200 rounded-lg text-stone-700"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Payment Method</label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg"
                    >
                      <option>GCash</option>
                      <option>BPI Bank Transfer</option>
                      <option>Landbank</option>
                      <option>Maya</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Amount (PHP) *</label>
                    <input
                      type="number"
                      required
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Bank / E-Wallet Reference Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 9028192841"
                    value={paymentRef}
                    onChange={(e) => setPaymentRef(e.target.value)}
                    className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg font-mono"
                  />
                </div>

                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <span className="font-semibold text-stone-700 block mb-0.5">Attach Screenshot (Optional)</span>
                  <div className="flex items-center gap-2 text-stone-500">
                    <Upload className="w-4 h-4 text-stone-400" />
                    <span>Receipt_Proof_Transfer.png (Simulated)</span>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowPaymentModal(false)}
                    className="px-3 py-1.5 text-stone-600 hover:text-stone-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg"
                  >
                    Submit Proof
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL: PRINTABLE REPORT CARD (SF9) */}
      {showPrintReportCard && currentStudent && (
        <div className="fixed inset-0 z-60 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 border border-stone-200 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-200 print:hidden">
              <span className="text-xs uppercase tracking-wider font-semibold text-stone-500">
                Printable DepEd Form 138-E
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1 text-xs font-semibold text-stone-900 bg-amber-400 rounded-lg flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Document</span>
                </button>
                <button
                  onClick={() => setShowPrintReportCard(false)}
                  className="p-1 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* School Header on SF9 */}
            <div className="text-center space-y-1 mb-6">
              <span className="text-[11px] uppercase tracking-wider text-stone-500 block">
                Republic of the Philippines · Department of Education
              </span>
              <span className="text-xs text-stone-600 block">
                Region XII – SOCCSKSARGEN · Division of Cotabato
              </span>
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Katingawan SDA Elementary School
              </h3>
              <p className="text-xs text-stone-600">
                Barangay Katingawan, Midsayap, Cotabato · DepEd School ID #{SCHOOL_INFO.depedSchoolId}
              </p>
              <div className="w-20 h-0.5 bg-amber-500 mx-auto mt-2" />
            </div>

            {/* Learner Data Lockup */}
            <div className="grid grid-cols-2 gap-2 text-xs bg-stone-50 p-3 rounded-lg border border-stone-200 mb-6">
              <div>
                <span className="text-stone-400 block text-[10px]">Learner’s Full Name</span>
                <strong className="text-stone-900">{currentStudent.fullName}</strong>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">LRN</span>
                <strong className="text-stone-900 font-mono">{currentStudent.lrn}</strong>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">Grade & Section</span>
                <span className="text-stone-800">{currentStudent.gradeLevel} – {currentStudent.section}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">School Year</span>
                <span className="text-stone-800">2026 – 2027</span>
              </div>
            </div>

            {/* Grades Table */}
            <table className="w-full text-xs text-left border-collapse mb-6">
              <thead>
                <tr className="border-b border-stone-300 bg-stone-100 font-semibold text-stone-700">
                  <th className="py-2 px-3">Learning Areas</th>
                  <th className="py-2 px-2 text-center">Q1</th>
                  <th className="py-2 px-2 text-center">Q2</th>
                  <th className="py-2 px-2 text-center">Q3</th>
                  <th className="py-2 px-2 text-center">Q4</th>
                  <th className="py-2 px-2 text-center">Final</th>
                  <th className="py-2 px-2 text-center">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {currentStudent.grades.map((g, idx) => (
                  <tr key={idx}>
                    <td className="py-1.5 px-3 font-medium text-stone-800">{g.subject}</td>
                    <td className="py-1.5 px-2 text-center tabular-nums">{g.q1 || '—'}</td>
                    <td className="py-1.5 px-2 text-center tabular-nums">{g.q2 || '—'}</td>
                    <td className="py-1.5 px-2 text-center tabular-nums">{g.q3 || '—'}</td>
                    <td className="py-1.5 px-2 text-center tabular-nums">{g.q4 || '—'}</td>
                    <td className="py-1.5 px-2 text-center font-bold text-amber-900 tabular-nums">
                      {g.finalRating.toFixed(1)}
                    </td>
                    <td className="py-1.5 px-2 text-center text-emerald-800 font-medium">
                      {g.remarks}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-stone-800 font-bold bg-stone-50">
                  <td colSpan={5} className="py-2 px-3 text-right">General Average:</td>
                  <td className="py-2 px-2 text-center text-amber-900 tabular-nums">
                    {currentStudent.generalAverage.toFixed(1)}%
                  </td>
                  <td className="py-2 px-2 text-center text-emerald-800">
                    {currentStudent.academicStanding}
                  </td>
                </tr>
              </tfoot>
            </table>

            {/* Signature Block */}
            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-stone-300 text-center text-xs">
              <div>
                <div className="border-b border-stone-800 pb-1 font-bold text-stone-900">
                  {currentStudent.adviser}
                </div>
                <span className="text-[10px] text-stone-500 uppercase tracking-wider block mt-1">
                  Class Homeroom Adviser
                </span>
              </div>

              <div>
                <div className="border-b border-stone-800 pb-1 font-bold text-stone-900">
                  Mrs. Miriam Galang-Alvarez, MAEd
                </div>
                <span className="text-[10px] text-stone-500 uppercase tracking-wider block mt-1">
                  Elementary School Principal
                </span>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
