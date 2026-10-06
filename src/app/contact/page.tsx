'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  MapPin, Phone, Mail, Clock, ArrowRight,
  MessageCircle, Send, CheckCircle, User, BookOpen
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const CONTACT_CARDS = [
  { icon: MapPin, label: 'Our Location', value: 'Near Punjab National Bank, New Bus Stand Road', sub: 'Perambalur – 621212, Tamil Nadu', color: 'bg-red-50 text-red-600',   href: 'https://maps.google.com/?q=Genesys+Computer+Academy+Perambalur' },
  { icon: Phone,  label: 'Call Us',      value: '+91 99766 05040',         sub: 'Mon–Sat, 8 AM – 8 PM',           color: 'bg-green-50 text-green-600', href: 'tel:+919976605040' },
  { icon: Mail,   label: 'Email Us',     value: 'info@genesysacademy.in',  sub: "Reply within 24 hours",          color: 'bg-blue-50 text-blue-600',   href: 'mailto:info@genesysacademy.in' },
  { icon: Clock,  label: 'Working Hours',value: 'Mon–Sat: 8 AM – 8 PM',   sub: 'Sunday: 9 AM – 1 PM',           color: 'bg-amber-50 text-amber-600', href: null },
];

const COURSES_LIST = [
  'Basic Computers','C Programming','C++ Programming','Python Programming',
  'Java Programming','Full Stack Web Development','Database & SQL',
  'Tally & Accounting','Cybersecurity Fundamentals','Other',
];

const FAQS = [
  { q: 'What is the batch size?',                   a: 'We keep batches small — maximum 15 students — so every student gets personal attention from the trainer.' },
  { q: 'Do you provide certificates?',              a: 'Yes. Every student receives a Genesys Computer Academy course completion certificate upon finishing.' },
  { q: 'What batch timings are available?',         a: 'Morning (8–10 AM), afternoon (12–2 PM), and evening (6–8 PM) batches on weekdays. Weekend batches also available.' },
  { q: 'Is prior knowledge required?',              a: 'No prior knowledge needed for beginner courses. We start from the very basics at a comfortable pace.' },
  { q: 'Do you help with job placement?',           a: 'Yes. We provide placement assistance, resume help, and mock interview preparation for all students.' },
  { q: 'Can I join in the middle of the month?',   a: 'Yes, new batches start frequently. Contact us and we will match you with the next suitable batch.' },
];

export default function ContactPage() {
  const [form, setForm]         = useState({ name: '', phone: '', email: '', course: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq]   = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-white overflow-x-hidden">

        {/* Hero */}
        <section className="bg-gradient-to-r from-brand-900 via-brand-800 to-blue-900 text-white py-10 sm:py-14">
          <div className="page-container">
            <div className="max-w-xl">
              <p className="text-brand-300 text-xs font-bold uppercase tracking-widest mb-3">Get In Touch</p>
              <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight mb-3 tracking-tight">Contact Us</h1>
              <p className="text-brand-200 text-sm leading-relaxed">
                Questions about our courses? Want to enroll or visit the academy?
                We're here to help — reach out and we'll get back to you quickly.
              </p>
            </div>
          </div>
        </section>

        {/* Contact cards */}
        <section className="py-8 sm:py-12 bg-[#f5f5fb]">
          <div className="page-container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CONTACT_CARDS.map(item => (
                <div key={item.label} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-lg hover:border-brand-200 transition-all">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${item.color}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1">{item.label}</p>
                  {item.href ? (
                    <a href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-gray-900 hover:text-brand-600 transition-colors block break-words leading-snug">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-bold text-gray-900 leading-snug">{item.value}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form + Map */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="page-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">

              {/* Form */}
              <div>
                <p className="text-xs font-bold text-brand-600 uppercase tracking-widest mb-2">Send a Message</p>
                <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Enquire About a Course</h2>
                <p className="text-sm text-gray-500 mb-7">Fill in the form and our team will contact you within 24 hours.</p>

                {submitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-7 text-center">
                    <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-7 h-7 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Thank you!</h3>
                    <p className="text-sm text-gray-600 mb-5">
                      We've received your enquiry. Our team will contact you at{' '}
                      <span className="font-semibold text-gray-900">{form.phone || form.email}</span> shortly.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', course: '', message: '' }); }}
                      className="inline-flex items-center gap-2 border-2 border-gray-200 text-gray-700 font-bold px-5 py-3 rounded-xl text-sm min-h-[44px] hover:border-brand-300 transition-colors">
                      Send another enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="label">Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        <input type="text" required placeholder="Your full name"
                          value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-400 transition bg-white"
                          style={{ fontSize: '16px' }}
                        />
                      </div>
                    </div>

                    {/* Phone + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="label">Phone Number *</label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                          <input type="tel" required placeholder="+91 99999 99999"
                            value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-400 transition bg-white"
                            style={{ fontSize: '16px' }}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="label">Email <span className="text-gray-400 font-normal">(optional)</span></label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                          <input type="email" placeholder="your@email.com"
                            value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-400 transition bg-white"
                            style={{ fontSize: '16px' }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Course */}
                    <div>
                      <label className="label">Course Interested In *</label>
                      <div className="relative">
                        <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        <select required value={form.course} onChange={e => setForm({ ...form, course: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-400 transition bg-white"
                          style={{ fontSize: '16px' }}>
                          <option value="">Select a course</option>
                          {COURSES_LIST.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="label">Message <span className="text-gray-400 font-normal">(optional)</span></label>
                      <textarea rows={4} placeholder="Any specific questions..."
                        value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-400 transition resize-none bg-white"
                        style={{ fontSize: '16px' }}
                      />
                    </div>

                    <button type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-bold py-4 rounded-xl text-sm transition-colors shadow-md min-h-[52px]">
                      <Send className="w-4 h-4" /> Send Enquiry
                    </button>

                    <p className="text-xs text-gray-400 text-center">
                      By submitting you agree to be contacted by Genesys Computer Academy.
                    </p>
                  </form>
                )}
              </div>

              {/* Right column */}
              <div className="flex flex-col gap-5">
                {/* Map card */}
                <div className="rounded-2xl sm:rounded-3xl border border-gray-100 bg-brand-50 flex flex-col items-center justify-center gap-3 p-8 min-h-[220px]">
                  <MapPin className="w-10 h-10 text-brand-400" />
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-800 mb-1">Genesys Computer Academy</p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Near Punjab National Bank,<br />New Bus Stand Road,<br />Perambalur – 621212, Tamil Nadu
                    </p>
                  </div>
                  <a href="https://maps.google.com/?q=Genesys+Computer+Academy+Perambalur"
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors min-h-[44px]">
                    Open in Google Maps <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Call & Email cards */}
                <div className="grid grid-cols-2 gap-4">
                  <a href="tel:+919976605040"
                    className="flex flex-col items-center gap-2 bg-green-50 border border-green-100 rounded-2xl p-4 text-center hover:bg-green-100 active:scale-95 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-xs font-bold text-gray-900">Call Now</p>
                    <p className="text-[11px] text-gray-500">+91 99766 05040</p>
                  </a>
                  <a href="mailto:info@genesysacademy.in"
                    className="flex flex-col items-center gap-2 bg-blue-50 border border-blue-100 rounded-2xl p-4 text-center hover:bg-blue-100 active:scale-95 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-xs font-bold text-gray-900">Email Us</p>
                    <p className="text-[11px] text-gray-500 break-all">info@genesysacademy.in</p>
                  </a>
                </div>

                {/* Timings */}
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-amber-600 shrink-0" />
                    <p className="text-sm font-bold text-gray-900">Academy Timings</p>
                  </div>
                  {[
                    { day: 'Monday – Saturday', time: '8:00 AM – 8:00 PM' },
                    { day: 'Sunday',            time: '9:00 AM – 1:00 PM' },
                    { day: 'Batches',           time: 'Morning · Afternoon · Evening' },
                  ].map(r => (
                    <div key={r.day} className="flex justify-between items-center py-2 border-b border-amber-100 last:border-0">
                      <span className="text-xs text-gray-600">{r.day}</span>
                      <span className="text-xs font-semibold text-gray-900">{r.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 sm:py-16 bg-[#f5f5fb]">
          <div className="page-container">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <p className="text-xs font-bold text-brand-600 uppercase tracking-widest mb-3">FAQ</p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-3">
                {FAQS.map((faq, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 active:bg-gray-100 transition-colors min-h-[56px]"
                    >
                      <span className="text-sm font-bold text-gray-900 pr-4 leading-snug">{faq.q}</span>
                      <span className={`text-brand-600 text-xl font-bold shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-45' : ''}`}>
                        +
                      </span>
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-5 animate-fade-in">
                        <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA strip */}
        <section className="py-5 bg-white border-t border-gray-100 safe-bottom">
          <div className="page-container">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-brand-600" />
                </div>
                <p className="text-sm font-bold text-gray-900">Still have questions? We're here to help.</p>
              </div>
              <a href="tel:+919976605040"
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl text-sm min-h-[48px] whitespace-nowrap transition-colors w-full sm:w-auto">
                📞 Call +91 99766 05040
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
