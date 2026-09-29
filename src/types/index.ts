export type EventCategory = 'academic' | 'spiritual' | 'sports' | 'parent' | 'holiday';

export interface SchoolEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  endDate?: string;
  time: string;
  location: string;
  category: EventCategory;
  description: string;
  organizer: string;
  targetAudience: string;
}

export interface Teacher {
  id: string;
  name: string;
  title: string;
  role: string;
  gradeLevel: string; // 'Kindergarten' | 'Grade 1' | 'Grade 2' | 'Grade 3' | 'Grade 4' | 'Grade 5' | 'Grade 6' | 'Specialist' | 'Administration'
  department: 'Early Childhood' | 'Primary (1-3)' | 'Intermediate (4-6)' | 'Special Subjects' | 'Administration';
  subjects: string[];
  email: string;
  phone: string;
  officeHours: string;
  room: string;
  bio: string;
  education: string[];
  advisoryClass?: string;
  avatarSeed: string;
}

export interface SubjectGrade {
  subject: string;
  teacher: string;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  finalRating: number;
  remarks: 'Passed' | 'Failed';
}

export interface AttendanceRecord {
  date: string;
  status: 'present' | 'tardy' | 'absent' | 'excused';
  remarks?: string;
}

export interface Student {
  id: string;
  lrn: string; // Learner Reference Number (DepEd standard)
  firstName: string;
  lastName: string;
  fullName: string;
  gradeLevel: string;
  section: string;
  adviser: string;
  gender: 'Male' | 'Female';
  birthdate: string;
  generalAverage: number;
  academicStanding: string;
  attendanceRate: number; // percentage
  avatarSeed: string;
  grades: SubjectGrade[];
  attendance: AttendanceRecord[];
}

export interface ParentUser {
  id: string;
  name: string;
  relationship: string;
  email: string;
  phone: string;
  address: string;
  pin: string;
  children: Student[];
}

export interface TuitionFeeItem {
  id: string;
  studentId: string;
  description: string;
  term: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  paidDate?: string;
  receiptNo?: string;
  paymentMethod?: string;
}

export interface PortalMessage {
  id: string;
  studentId: string;
  teacherId: string;
  teacherName: string;
  teacherRole: string;
  parentName: string;
  sender: 'teacher' | 'parent';
  timestamp: string;
  subject: string;
  content: string;
  read: boolean;
}

export interface ExcuseLetter {
  id: string;
  studentId: string;
  studentName: string;
  dates: string;
  reason: string;
  submittedAt: string;
  status: 'Approved' | 'Under Review' | 'Declined';
  adviserRemarks?: string;
}

export interface PermissionSlip {
  id: string;
  studentId: string;
  title: string;
  eventDate: string;
  location: string;
  cost: number;
  description: string;
  deadline: string;
  signed: boolean;
  signedAt?: string;
}
