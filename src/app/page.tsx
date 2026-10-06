'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, Monitor, Users, BarChart3,
  MessageCircle, CheckCircle, Code2, Shield,
  Cloud, Database, Globe, Calculator,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const FEATURES = [
  { icon: Monitor,   title: 'Practical learning',    desc: 'Hands-on practice in a real computer lab.' },
  { icon: Users,     title: 'Guided instruction',    desc: 'Experienced and friendly trainers.' },
  { icon: BarChart3, title: 'Build your foundation', desc: 'Skills for studies, career and beyond.' },
];

const COURSES = [
  { title: 'Basic Computers',      desc: 'Learn essential computer skills, Windows, MS Office and internet usage.',       level: 'Beginner',     slug: 'basic-computers',    icon: Monitor,    gradient: 'from-blue-500 to-blue-700',     emoji: '💻' },
  { title: 'C Programming',        desc: 'Build a strong foundation in programming with C and problem-solving skills.',   level: 'Beginner',     slug: 'c-programming',      icon: Code2,      gradient: 'from-slate-600 to-blue-800',    emoji: 'C' },
  { title: 'C++ Programming',      desc: 'Learn OOP with C++ and build real-world applications.',                         level: 'Intermediate', slug: 'cpp-programming',    icon: Code2,      gradient: 'from-blue-600 to-indigo-700',   emoji: 'C++' },
  { title: 'Python Programming',   desc: 'Learn Python from basics to advanced and build exciting projects.',             level: 'Beginner',     slug: 'python-programming', icon: Code2,      gradient: 'from-yellow-400 to-blue-600',   emoji: '🐍' },
  { title: 'Full Stack Web Dev',   desc: 'Learn frontend and backend development and build complete web apps.',           level: 'Intermediate', slug: 'web-development',    icon: Globe,      gradient: 'from-orange-400 to-blue-600',   emoji: '🌐' },
  { title: 'Tally & Accounting',   desc: 'Master Tally with practical accounting skills for business and career.',        level: 'Beginner',     slug: 'tally-accounting',   icon: Calculator, gradient: 'from-teal-400 to-cyan-600',     emoji: '📊' },
  { title: 'Java Programming',     desc: 'Master Java fundamentals, OOP and build real-world applications.',             level: 'Intermediate', slug: 'java-programming',   icon: Code2,      gradient: 'from-red-500 to-orange-500',    emoji: '☕' },
  { title: 'Cybersecurity',        desc: 'Understand security threats and learn to protect systems and networks.',        level: 'Intermediate', slug: 'cybersecurity',      icon: Shield,     gradient: 'from-green-500 to-teal-600',    emoji: '🛡️' },
  { title: 'Database & SQL',       desc: 'Learn MySQL and database design for real-world applications.',                  level: 'Beginner',     slug: 'database-sql',       icon: Database,   gradient: 'from-purple-500 to-indigo-600', emoji: '🗄️' },
];

const WHY_US = [
  'Certified trainers with industry experience',
  'Fully equipped computer lab with latest systems',
  'Flexible batch timings — morning & evening',
  'Course completion certificates provided',
  'Job-oriented practical curriculum',
  'Affordable fees with EMI options',
];

const LEVEL_BADGE: Record<string, string> = {
  Beginner:     'bg-blue-50 text-blue-600 border-blue-100',
  Intermediate: 'bg-amber-50 text-amber-600 border-amber-100',
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-white overflow-x-hidden">

        {/* ══ HERO ═══════════════════════════════════════════ */}
        <section className="bg-[#f0f0fb] overflow-hidden">
          <div className="page-container py-10 sm:py-12 lg:py-0">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20 items-center">

              {/* ── Text col */}
              <div className="py-0 lg:py-16 xl:py-20 order-2 lg:order-1 text-center lg:text-left">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white border border-brand-100 rounded-full px-3 py-1.5 mb-5 shadow-sm">
                  <div className="w-5 h-5 rounded-full bg-brand-600 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-brand-700">Practical computer training in Perambalur</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 leading-[1.08] tracking-tight mb-1">
                  Build skills.
                </h1>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-brand-600 leading-[1.12] tracking-tight mb-5">
                  Create your future.
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-500 leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
                  Explore computer fundamentals and programming with practical, hands-on learning.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <Link href="/courses"
                    className="inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-bold px-7 py-4 rounded-xl transition-colors text-sm lg:text-base shadow-md shadow-brand-200 min-h-[52px]">
                    Explore Courses <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link href="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-white border-2 border-gray-200 hover:border-brand-300 text-gray-700 font-bold px-7 py-4 rounded-xl transition-colors text-sm lg:text-base min-h-[52px]">
                    Contact Academy
                  </Link>
                </div>

                {/* Quick trust strip */}
                <div className="mt-8 flex items-center gap-6 justify-center lg:justify-start text-xs text-gray-400 flex-wrap">
                  <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-500" /> 500+ Students</span>
                  <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-500" /> 9+ Courses</span>
                  <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-500" /> 4.8★ Rating</span>
                </div>
              </div>

              {/* ── Image col */}
              <div className="relative order-1 lg:order-2">
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden
                                aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-[500px] xl:h-[560px] w-full">
                  <Image
                    src="/images/hero-students.png"
                    alt="Students learning at Genesys Academy"
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                {/* Practice·Learn·Build·Grow chip */}
                <div className="absolute top-3 right-3 sm:top-5 sm:right-5 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2.5 shadow-lg">
                  <div className="flex flex-col gap-0.5 text-right">
                    {['PRACTICE','LEARN','BUILD','GROW'].map((w, i) => (
                      <span key={w}
                        className={`font-extrabold text-[11px] sm:text-xs tracking-widest leading-tight ${i % 2 === 0 ? 'text-brand-600' : 'text-gray-800'}`}>
                        {w}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Learn by doing card */}
                <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-5 bg-white rounded-xl sm:rounded-2xl px-3 py-2.5 shadow-xl border border-gray-100 flex items-center gap-2.5 max-w-[180px] sm:max-w-[220px]">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
                    <Monitor className="w-4 h-4 sm:w-5 sm:h-5 text-brand-600" />
                  </div>
                  <div>
                    <p className="text-[11px] sm:text-xs font-bold text-gray-900">Learn by doing</p>
                    <p className="text-[10px] sm:text-[11px] text-gray-400 leading-snug">Hands-on with real examples</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 3-FEATURE STRIP ════════════════════════════════ */}
        <section className="border-y border-gray-100 bg-white">
          <div className="page-container">
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
              {FEATURES.map((f) => (
                <div key={f.title} className="flex items-center gap-4 py-5 sm:py-7 sm:px-8 lg:px-10">
                  <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
                    <f.icon className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{f.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-snug">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ OUR COURSES ════════════════════════════════════ */}
        <section className="py-12 sm:py-16 lg:py-20 bg-[#f5f5fb]">
          <div className="page-container">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
              <div>
                <p className="text-xs font-bold text-brand-600 uppercase tracking-widest mb-2">OUR COURSES</p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
                  Find your <span className="text-brand-600">next course</span>
                </h2>
                <p className="text-sm lg:text-base text-gray-500 mt-2">
                  Practical, step-by-step computer training for every level.
                </p>
              </div>
              <Link href="/courses"
                className="self-start sm:self-auto inline-flex items-center gap-1.5 border-2 border-gray-200 hover:border-brand-400 text-gray-700 hover:text-brand-600 font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors whitespace-nowrap min-h-[44px]">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Grid: 1 col → 2 → 3 → 4 at xl */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {COURSES.map((course) => (
                <Link key={course.slug} href={`/courses/${course.slug}`}>
                  <div className="group bg-white rounded-2xl border-2 border-transparent hover:border-brand-200 hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col h-full">
                    {/* Thumbnail */}
                    <div className={`relative h-28 sm:h-32 bg-gradient-to-br ${course.gradient} flex items-center justify-center overflow-hidden`}>
                      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
                      <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white/10" />
                      <div className="relative z-10 w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                        <span className={`font-black drop-shadow ${course.emoji.length <= 2 ? 'text-2xl text-white' : 'text-xl'}`}>
                          {course.emoji}
                        </span>
                      </div>
                    </div>
                    {/* Body */}
                    <div className="p-4 flex flex-col flex-1">
                      <div className="flex items-center gap-1.5 mb-2">
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${LEVEL_BADGE[course.level] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                          {course.level}
                        </span>
                      </div>
                      <h3 className="text-sm font-extrabold text-gray-900 mb-1.5 leading-snug group-hover:text-brand-600 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed flex-1 mb-4 line-clamp-2">
                        {course.desc}
                      </p>
                      <div className="flex items-center gap-1 text-xs font-bold text-brand-600 group-hover:gap-2 transition-all">
                        View Course <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══ WHY GENESYS ════════════════════════════════════ */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="page-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-center">
              {/* Left text */}
              <div>
                <p className="text-xs font-bold text-brand-600 uppercase tracking-widest mb-3">WHY CHOOSE US</p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                  Why Genesys Academy?
                </h2>
                <p className="text-sm lg:text-base text-gray-500 leading-relaxed mb-6 max-w-lg">
                  A dedicated computer training institute focused on giving every student
                  the practical skills and confidence to succeed in today's digital world.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {WHY_US.map(item => (
                    <div key={item} className="flex items-start gap-2.5">
                      <CheckCircle className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/courses"
                    className="inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold px-7 py-4 rounded-xl text-sm lg:text-base min-h-[52px] transition-colors shadow-md">
                    Explore Courses →
                  </Link>
                  <Link href="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-white border-2 border-gray-200 hover:border-brand-300 text-gray-700 font-bold px-7 py-4 rounded-xl text-sm lg:text-base min-h-[52px] transition-colors">
                    Contact Us
                  </Link>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4 sm:gap-5">
                {[
                  { value: '500+', label: 'Students Trained', sub: 'Since 2019',          dark: true  },
                  { value: '9+',   label: 'Courses Offered',  sub: 'All skill levels',     dark: false },
                  { value: '95%',  label: 'Completion Rate',  sub: 'Students who finish',  dark: false },
                  { value: '4.8★', label: 'Average Rating',   sub: 'From student reviews', dark: false, accent: true },
                ].map((s) => (
                  <div key={s.label}
                    className={`rounded-2xl p-5 sm:p-7 ${s.dark ? 'bg-brand-600 text-white' : s.accent ? 'bg-brand-50' : 'bg-gray-50 border border-gray-100'}`}>
                    <p className={`text-3xl sm:text-4xl font-extrabold mb-1 ${s.dark ? 'text-white' : 'text-gray-900'}`}>{s.value}</p>
                    <p className={`text-xs sm:text-sm font-bold ${s.dark ? 'text-white/90' : 'text-gray-800'}`}>{s.label}</p>
                    <p className={`text-[11px] sm:text-xs mt-0.5 ${s.dark ? 'text-white/60' : 'text-gray-400'}`}>{s.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ CTA STRIP ══════════════════════════════════════ */}
        <section className="py-6 sm:py-8 bg-[#f0f0fb]">
          <div className="page-container">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-5
                            bg-white rounded-2xl px-6 sm:px-10 py-6 shadow-sm border border-brand-100">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6 text-brand-600" />
                </div>
                <div>
                  <p className="text-base lg:text-lg font-extrabold text-gray-900">Not sure where to start?</p>
                  <p className="text-sm text-gray-500 mt-0.5">Our team helps you choose the right course.</p>
                </div>
              </div>
              <Link href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold px-7 py-4 rounded-xl text-sm lg:text-base min-h-[52px] transition-colors shadow-md whitespace-nowrap">
                Talk to Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
