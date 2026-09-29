import React, { useState } from 'react';
import { SCHOOL_INFO } from '../data/mockData';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Shield, HeartHandshake } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('Enrollment Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 3000);
  };

  return (
    <section id="contact" className="py-20 bg-stone-100 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-700 mb-2">
            <span>Connect & Visit</span>
            <span aria-hidden="true">·</span>
            <span>Midsayap, Cotabato</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
            Get in Touch With Our School
          </h2>
          <p className="mt-2 text-stone-600 text-sm leading-relaxed">
            We welcome parents, prospective families, alumni, and community visitors to our campus grounds in Barangay Katingawan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Campus Info & Map Guide */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-5 text-xs text-stone-700">
              
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm mb-1">Campus Location</h4>
                  <p className="leading-relaxed text-stone-600">
                    {SCHOOL_INFO.address}
                  </p>
                  <p className="text-stone-400 mt-1">
                    Conveniently located 4.2 km from Midsayap Poblacion town center along Katingawan Highway.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm mb-1">Office Hours & Sabbath Rest</h4>
                  <p className="text-stone-600">
                    {SCHOOL_INFO.officeHours}
                  </p>
                  <p className="text-amber-800 font-medium mt-1">
                    Closed on God’s Holy Sabbath from Friday sunset through Saturday sunset for sacred worship and rest.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm mb-1">Telephones & Electronic Mail</h4>
                  <p className="text-stone-600 font-mono">
                    Landline: +63 (064) 229-8412
                  </p>
                  <p className="text-stone-600 font-mono">
                    Registrar Mobile: +63 917 582 3901
                  </p>
                  <p className="text-stone-600 font-mono">
                    Email: {SCHOOL_INFO.email}
                  </p>
                </div>
              </div>

            </div>

            {/* Department Extensions */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-xl border border-stone-200 text-xs">
                <span className="font-bold text-stone-900 block mb-1">Principal’s Office</span>
                <p className="text-stone-500">Mrs. Miriam Galang-Alvarez</p>
                <span className="text-[11px] text-amber-800 font-mono">Local Ext. 101</span>
              </div>

              <div className="p-4 bg-white rounded-xl border border-stone-200 text-xs">
                <span className="font-bold text-stone-900 block mb-1">Chaplaincy & Counseling</span>
                <p className="text-stone-500">Pastor Joel Mendoza</p>
                <span className="text-[11px] text-amber-800 font-mono">Local Ext. 105</span>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-1">
                Send an Inquiry to the School Administration
              </h3>
              <p className="text-xs text-stone-500 mb-6">
                Our registrar and admissions officers typically respond within 24 to 48 business hours.
              </p>

              {submitted ? (
                <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
                  <h4 className="font-serif text-lg font-bold text-stone-900">Inquiry Transmitted</h4>
                  <p className="text-xs text-stone-600 max-w-sm mx-auto">
                    Thank you, {name}! Your message has been routed to the appropriate department. We will contact you at {email}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Elena Santos"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Your Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. parent@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Nature of Inquiry</label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    >
                      <option>Enrollment & Admission Inquiries</option>
                      <option>Tuition & Payment Inquiries</option>
                      <option>DepEd Credentials / Form 137 Request</option>
                      <option>Chaplaincy & Spiritual Guidance</option>
                      <option>Alumni Affairs & Donations</option>
                      <option>General Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Message Content *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Please write your questions or details..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Inquiry</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
