'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin, Phone, Mail, Clock, Award, Users, BookOpen,
  CheckCircle, ArrowRight, GraduationCap, Star, Monitor, Target, Heart, Lightbulb, Shield
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const STATS = [
  { value: '500+', label: 'Students Trained',  icon: Users,    color: 'text-brand-600' },
  { value: '9+',   label: 'Courses Offered',   icon: BookOpen, color: 'text-violet-600' },
  { value: '5+',   label: 'Years of Excellence',icon: Award,   color: 'text-amber-500' },
  { value: '95%',  label: 'Placement Rate',    icon: Target,   color: 'text-green-600' },
];

const VALUES = [
  { icon: Target,    title: 'Practical First',      desc: 'Every concept is taught with hands-on practice in our fully equipped computer lab.' },
  { icon: Heart,     title: 'Student Focused',      desc: 'Small batches, personal attention and a friendly environment for every student.' },
  { icon: Lightbulb, title: 'Industry Relevant',    desc: 'Curriculum updated to match current industry requirements and job market demands.' },
  { icon: Shield,    title: 'Certified Excellence', desc: 'Course completion certificates recognised by employers across Perambalur and beyond.' },
];

const COURSES_OFFERED = [
  'Basic Computers','C Programming','C++ Programming',
  'Python Programming','Java Programming','Full Stack Web Development',
  'Database & SQL','Tally & Accounting','Cybersecurity Fundamentals',
];

const TEAM = [
  { name: 'A. Rajesh Kumar',     role: 'Founder & Head Trainer',       field: 'Python, Java, C/C++',    initials: 'RK', color: 'bg-brand-600' },
  { name: 'S. Priya Dharshini',  role: 'Web Development Trainer',      field: 'HTML, CSS, JavaScript',  initials: 'PD', color: 'bg-violet-600' },
  { name: 'M. Karthikeyan',      role: 'Networking & Security Trainer', field: 'Cybersecurity, Networks',initials: 'MK', color: 'bg-emerald-600' },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-white overflow-x-hidden">

        {/* Hero */}
        <section className="bg-gradient-to-r from-brand-900 via-brand-800 to-blue-900 text-white py-12 sm:py-16">
          <div className="page-container">
            <div className="max-w-2xl">
              <p className="text-brand-300 text-xs font-bold uppercase tracking-widest mb-3">About Us</p>
              <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight mb-4 tracking-tight">
                Genesys Computer Academy
              </h1>
              <p className="text-brand-200 text-sm sm:text-base leading-relaxed mb-7">
                Perambalur's trusted computer training institute — empowering students with
                practical skills, certified courses, and career-ready knowledge since 2019.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/courses"
                  className="inline-flex items-center justify-center gap-2 bg-white text-brand-700 font-bold px-6 py-3.5 rounded-xl text-sm min-h-[48px] hover:bg-brand-50 transition-colors">
                  View Courses <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 hover:bg-white/20 text-white font-bold px-6 py-3.5 rounded-xl text-sm min-h-[48px] transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-gray-100 bg-white">
          <div className="page-container">
            <div className="grid grid-cols-2 sm:grid-cols-4">
              {STATS.map((s, i) => (
                <div key={s.label}
                  className={`py-6 sm:py-8 px-4 text-center ${i < 3 ? 'border-r border-gray-100' : ''}`}>
                  <s.icon className={`w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 ${s.color}`} />
                  <p className="text-2xl sm:text-3xl font-extrabold text-gray-900">{s.value}</p>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-1 leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who We Are */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="page-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-xs font-bold text-brand-600 uppercase tracking-widest mb-3">Who We Are</p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-5 leading-tight">
                  Practical Computer Training<br className="hidden sm:block" /> in the Heart of Perambalur
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Genesys Computer Academy is a premier computer training institute located near
                  Punjab National Bank, New Bus Stand Road, Perambalur — 621212, Tamil Nadu.
                  We have been shaping the digital future of students since 2019.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Our institute is equipped with modern computers, high-speed internet, and experienced
                  trainers who bring real industry knowledge into every session. We believe in learning
                  by doing — every theory is backed with hands-on lab practice.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  Whether you're a school student, college student, working professional, or homemaker
                  looking to upskill — we have a course designed for you, with flexible batch timings
                  for morning, afternoon, and evening.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['ISO Certified','Govt. Recognised','Job Oriented','Certificate Provided'].map(tag => (
                    <span key={tag}
                      className="inline-flex items-center gap-1.5 bg-brand-50 border border-brand-100 text-brand-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                      <CheckCircle className="w-3.5 h-3.5 shrink-0" /> {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Image */}
              <div className="relative">
                <div className="rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] relative">
                  <Image
                    src="/images/hero-students.png"
                    alt="Students at Genesys Computer Academy"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-3.5 shadow-xl border border-gray-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">500+ Graduates</p>
                    <div className="flex mt-0.5">
                      {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-12 sm:py-16 bg-[#f5f5fb]">
          <div className="page-container">
            <div className="text-center mb-8 sm:mb-12">
              <p className="text-xs font-bold text-brand-600 uppercase tracking-widest mb-3">Our Values</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">What Makes Us Different</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {VALUES.map((v) => (
                <div key={v.title} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-lg hover:border-brand-200 transition-all">
                  <div className="w-11 h-11 rounded-2xl bg-brand-50 flex items-center justify-center mb-4">
                    <v.icon className="w-5 h-5 text-brand-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-sm">{v.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Courses offered */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="page-container">
            <div className="text-center mb-8">
              <p className="text-xs font-bold text-brand-600 uppercase tracking-widest mb-3">Curriculum</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Courses We Offer</h2>
              <p className="text-sm text-gray-500 mt-2">All courses include hands-on practice and completion certificates.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
              {COURSES_OFFERED.map(c => (
                <span key={c}
                  className="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 text-brand-700 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-full">
                  <Monitor className="w-3.5 h-3.5 shrink-0" /> {c}
                </span>
              ))}
            </div>
            <div className="text-center">
              <Link href="/courses"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold px-7 py-3.5 rounded-xl text-sm min-h-[48px] transition-colors shadow-md">
                View All Courses <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-12 sm:py-16 bg-[#f5f5fb]">
          <div className="page-container">
            <div className="text-center mb-8 sm:mb-12">
              <p className="text-xs font-bold text-brand-600 uppercase tracking-widest mb-3">Our Team</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Meet Your Trainers</h2>
              <p className="text-sm text-gray-500 mt-2">Experienced professionals passionate about teaching.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
              {TEAM.map(t => (
                <div key={t.name} className="bg-white rounded-2xl p-6 border border-gray-100 text-center hover:shadow-lg hover:border-brand-200 transition-all">
                  <div className={`w-16 h-16 rounded-full ${t.color} flex items-center justify-center text-white text-lg font-extrabold mx-auto mb-4 shadow-lg`}>
                    {t.initials}
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-0.5">{t.name}</h3>
                  <p className="text-xs font-semibold text-brand-600 mb-1">{t.role}</p>
                  <p className="text-xs text-gray-400">{t.field}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="page-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div>
                <p className="text-xs font-bold text-brand-600 uppercase tracking-widest mb-3">Find Us</p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6">Visit Our Academy</h2>
                <div className="space-y-3">
                  {[
                    { icon: MapPin, label: 'Address', value: 'Near Punjab National Bank, New Bus Stand Road, Perambalur – 621212, Tamil Nadu', color: 'bg-red-50 text-red-600' },
                    { icon: Phone,  label: 'Phone',   value: '+91 99766 05040', color: 'bg-green-50 text-green-600', href: 'tel:+919976605040' },
                    { icon: Mail,   label: 'Email',   value: 'info@genesysacademy.in', color: 'bg-blue-50 text-blue-600', href: 'mailto:info@genesysacademy.in' },
                    { icon: Clock,  label: 'Timings', value: 'Mon–Sat: 8 AM – 8 PM  |  Sun: 9 AM – 1 PM', color: 'bg-amber-50 text-amber-600' },
                  ].map(item => (
                    <div key={item.label} className="flex items-start gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">{item.label}</p>
                        {'href' in item && item.href ? (
                          <a href={item.href}
                            className="text-sm font-semibold text-gray-900 hover:text-brand-600 transition-colors mt-0.5 block break-words">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm font-semibold text-gray-900 mt-0.5 leading-relaxed">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-200 bg-brand-50 flex flex-col items-center justify-center gap-3 p-8 min-h-[280px] sm:min-h-[360px]">
                <MapPin className="w-10 h-10 text-brand-400" />
                <div className="text-center">
                  <p className="text-sm font-bold text-gray-700 mb-1">Genesys Computer Academy</p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Near Punjab National Bank,<br />New Bus Stand Road,<br />Perambalur – 621212
                  </p>
                </div>
                <a href="https://maps.google.com/?q=Genesys+Computer+Academy+Perambalur"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors min-h-[44px]">
                  Open in Google Maps <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-6 sm:py-8 bg-[#f5f5fb]">
          <div className="page-container">
            <div className="bg-gradient-to-r from-brand-600 to-blue-700 rounded-2xl sm:rounded-3xl px-6 sm:px-10 py-8 sm:py-10 text-center text-white">
              <h2 className="text-xl sm:text-2xl font-extrabold mb-2">Ready to start your journey?</h2>
              <p className="text-brand-200 text-sm mb-6 max-w-md mx-auto">
                Join hundreds of students who built their careers with Genesys Academy.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/courses"
                  className="inline-flex items-center justify-center gap-2 bg-white text-brand-700 font-bold px-7 py-3.5 rounded-xl text-sm min-h-[48px] transition-colors">
                  Explore Courses <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white/15 border border-white/30 hover:bg-white/25 text-white font-bold px-7 py-3.5 rounded-xl text-sm min-h-[48px] transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
