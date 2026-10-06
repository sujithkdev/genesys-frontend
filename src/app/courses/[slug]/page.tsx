'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Clock, Users, BookOpen, Star, CheckCircle, Play,
  Lock, ChevronDown, ChevronUp, Globe, Award, Heart,
  BarChart3, ArrowLeft, PlayCircle, FileText, HelpCircle,
  Share2, Smartphone, Infinity as InfinityIcon, Download,
  MessageSquare, ThumbsUp, Zap,
} from 'lucide-react';
import { useSession } from '@/components/session';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DEMO_COURSES, DEMO_ENROLLMENTS, DEMO_REVIEWS_PYTHON } from '@/lib/demo-data';
import { Section, Lesson } from '@/types';
import { clsx } from 'clsx';

// ── helpers ──────────────────────────────────────────────
const LEVEL_LABEL: Record<string, string> = {
  beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced',
};
const LEVEL_COLOR: Record<string, string> = {
  beginner: 'bg-green-500/20 text-green-300 border-green-500/30',
  intermediate: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  advanced: 'bg-red-500/20 text-red-300 border-red-500/30',
};

function fmtMoney(n: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}
function fmtDur(secs: number) {
  if (!secs) return '';
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return s > 0 ? `${m}:${String(s).padStart(2, '0')}` : `${m} min`;
}
function totalSectionMins(lessons: Lesson[]) {
  const s = lessons.reduce((t, l) => t + (l.duration_seconds ?? 0), 0);
  return Math.round(s / 60);
}

const TYPE_ICON: Record<string, React.ElementType> = {
  video: PlayCircle, pdf: FileText, quiz: HelpCircle, text: BookOpen,
};

function StarRow({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'lg' }) {
  const w = size === 'lg' ? 'w-5 h-5' : 'w-3.5 h-3.5';
  return (
    <span className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} className={clsx(w, i <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300')} />
      ))}
    </span>
  );
}

// ── Main page ────────────────────────────────────────────
export default function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useSession();
  const router   = useRouter();

  const course = DEMO_COURSES.find(c => c.slug === slug);

  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(course?.sections?.slice(0, 2).map(s => s.id) ?? []),
  );
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled]   = useState(() => DEMO_ENROLLMENTS.some(e => e.slug === slug));
  const [wishlisted, setWishlisted] = useState(false);
  const [activeTab, setActiveTab]   = useState<'overview' | 'curriculum' | 'instructor' | 'reviews'>('overview');

  if (!course) {
    return (
      <>
        <Navbar />
        <div className="page-container py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h1>
          <Link href="/courses" className="btn-primary">Browse all courses</Link>
        </div>
        <Footer />
      </>
    );
  }

  const allLessons: Lesson[] = (course.sections ?? []).flatMap((s: Section) => s.lessons);
  const totalDuration = allLessons.reduce((s, l) => s + (l.duration_seconds ?? 0), 0);
  const totalHours    = (totalDuration / 3600).toFixed(1);
  const previewCount  = allLessons.filter(l => l.is_preview).length;
  const discountPrice = Math.round(course.price * 0.6); // 40% off for UI demo

  const toggleSection = (id: string) =>
    setExpanded(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const handleEnroll = async () => {
    if (!user) { router.push('/login'); return; }
    setEnrolling(true);
    await new Promise(r => setTimeout(r, 1000));
    setEnrolled(true);
    setEnrolling(false);
  };

  const reviews = slug === 'python-programming' ? DEMO_REVIEWS_PYTHON : [];

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen bg-white">

        {/* ══ HERO BANNER — full width, text only ═════════════ */}
        <div className="bg-gradient-to-br from-gray-950 via-[#1a1035] to-brand-950 text-white">
          <div className="page-container py-10 sm:py-14">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/courses" className="hover:text-white transition-colors">Courses</Link>
              <span>/</span>
              <span className="text-gray-300 truncate max-w-[200px]">{course.title}</span>
            </nav>

            {/* Hero text — full width, no sidebar here */}
            <div className="max-w-4xl">
              {/* Badges */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                {course.category_name && (
                  <span className="badge bg-brand-500/20 text-brand-300 border-brand-500/30 text-xs">
                    {course.category_name}
                  </span>
                )}
                <span className={clsx('badge text-xs', LEVEL_COLOR[course.level] ?? 'bg-white/10 text-white border-white/20')}>
                  {LEVEL_LABEL[course.level]}
                </span>
                <span className="badge bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Bestseller
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
                {course.title}
              </h1>
              <p className="text-gray-300 text-base lg:text-lg leading-relaxed mb-6 max-w-3xl">
                {course.short_description}
              </p>

              {/* Rating + meta row */}
              <div className="flex flex-wrap items-center gap-4 mb-5">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-extrabold text-lg">{course.avg_rating}</span>
                  <StarRow rating={course.avg_rating} />
                  <span className="text-gray-400 text-sm">({course.total_reviews} ratings)</span>
                </div>
                <span className="flex items-center gap-1.5 text-sm text-gray-300">
                  <Users className="w-4 h-4 text-gray-400" />
                  <strong className="text-white">{course.total_students.toLocaleString()}</strong> students enrolled
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-400 mb-6">
                <span className="flex items-center gap-1.5"><Globe className="w-4 h-4" /> {course.language}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {totalHours} hours of content</span>
                <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> {allLessons.length} lessons</span>
                {previewCount > 0 && (
                  <span className="flex items-center gap-1.5 text-brand-300">
                    <Play className="w-4 h-4" /> {previewCount} free previews
                  </span>
                )}
              </div>

              {/* Instructor line */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-600 flex items-center justify-center text-white text-sm font-extrabold shrink-0">
                  {course.instructor_name.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <p className="text-sm text-gray-400">
                  Created by{' '}
                  <button onClick={() => setActiveTab('instructor')}
                    className="text-brand-300 font-semibold hover:text-white underline transition-colors">
                    {course.instructor_name}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ══ STICKY TAB BAR ══════════════════════════════ */}
        <div className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="page-container">
            <div className="tab-bar gap-0 overflow-x-auto">
              {(['overview', 'curriculum', 'instructor', 'reviews'] as const).map(t => (
                <button key={t} onClick={() => setActiveTab(t)}
                  className={clsx('tab-btn capitalize', activeTab === t ? 'tab-btn-active' : 'tab-btn-inactive')}>
                  {t === 'reviews' ? `Reviews (${course.total_reviews})` : t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ══ BODY ════════════════════════════════════════ */}
        <div className="page-container py-10 lg:py-14">
          <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-10 xl:gap-14 items-start">

            {/* ── Main column */}
            <div className="lg:col-span-2 xl:col-span-3 space-y-12">

              {/* ── OVERVIEW TAB ─────────────────────── */}
              {activeTab === 'overview' && (
                <>
                  {/* What you'll learn */}
                  {course.what_you_learn && course.what_you_learn.length > 0 && (
                    <section id="learn">
                      <h2 className="text-xl lg:text-2xl font-extrabold text-gray-900 mb-5">What you&apos;ll learn</h2>
                      <div className="border border-brand-100 bg-brand-50/50 rounded-2xl p-6 lg:p-8
                                      grid sm:grid-cols-2 gap-x-8 gap-y-3">
                        {course.what_you_learn.map((item, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <CheckCircle className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-700 leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Course description */}
                  <section>
                    <h2 className="text-xl lg:text-2xl font-extrabold text-gray-900 mb-5">About this course</h2>
                    <div className="prose prose-sm prose-gray max-w-none text-gray-700 leading-relaxed space-y-4">
                      <p>{course.description}</p>
                      <p>
                        By the end of this course you will have three complete projects in your portfolio — a
                        web scraper, a REST API and a data dashboard — and the confidence to tackle any
                        real-world Python challenge.
                      </p>
                      <p>
                        All sessions are recorded in Tamil and English so you get the best of both languages.
                        You can revisit any lesson at any time.
                      </p>
                    </div>
                  </section>

                  {/* Requirements */}
                  {course.requirements && course.requirements.length > 0 && (
                    <section>
                      <h2 className="text-xl lg:text-2xl font-extrabold text-gray-900 mb-5">Requirements</h2>
                      <ul className="space-y-3">
                        {course.requirements.map((r, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                            <span className="w-2 h-2 rounded-full bg-brand-400 mt-1.5 shrink-0" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {/* Stats strip */}
                  <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { icon: Clock,    value: `${totalHours} hrs`,                label: 'Video content' },
                      { icon: BookOpen, value: `${allLessons.length} lessons`,     label: 'Total lessons' },
                      { icon: BarChart3,value: LEVEL_LABEL[course.level],          label: 'Skill level' },
                      { icon: Globe,    value: course.language,                    label: 'Language' },
                    ].map(item => (
                      <div key={item.label} className="card p-4 flex flex-col items-center text-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center">
                          <item.icon className="w-4.5 h-4.5 text-brand-600" />
                        </div>
                        <p className="text-sm font-extrabold text-gray-900">{item.value}</p>
                        <p className="text-xs text-gray-400">{item.label}</p>
                      </div>
                    ))}
                  </section>
                </>
              )}

              {/* ── CURRICULUM TAB ────────────────────── */}
              {activeTab === 'curriculum' && (
                <section>
                  <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
                    <div>
                      <h2 className="text-xl lg:text-2xl font-extrabold text-gray-900 mb-1">Course Curriculum</h2>
                      <p className="text-sm text-gray-500">
                        {(course.sections ?? []).length} sections &middot; {allLessons.length} lessons &middot; {totalHours} hours total
                        {previewCount > 0 && <span className="text-brand-600"> &middot; {previewCount} free previews</span>}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        const allIds = new Set((course.sections ?? []).map(s => s.id));
                        setExpanded(prev => prev.size === allIds.size ? new Set() : allIds);
                      }}
                      className="text-sm text-brand-600 font-semibold hover:underline shrink-0"
                    >
                      {expanded.size === (course.sections ?? []).length ? 'Collapse all' : 'Expand all'}
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-2xl overflow-hidden divide-y divide-gray-100">
                    {(course.sections ?? []).map((section: Section, si) => {
                      const mins = totalSectionMins(section.lessons);
                      return (
                        <div key={section.id}>
                          <button
                            onClick={() => toggleSection(section.id)}
                            className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors text-left gap-3 group"
                          >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <span className="w-6 h-6 rounded-full bg-brand-50 text-brand-600 text-xs font-extrabold flex items-center justify-center shrink-0">
                                {si + 1}
                              </span>
                              <div className="min-w-0">
                                <p className="font-bold text-gray-900 text-sm group-hover:text-brand-600 transition-colors truncate">
                                  {section.title}
                                </p>
                                <p className="text-xs text-gray-400 mt-0.5">
                                  {section.lessons.length} lesson{section.lessons.length !== 1 ? 's' : ''}
                                  {mins > 0 && <> &middot; {mins} min</>}
                                </p>
                              </div>
                            </div>
                            {expanded.has(section.id)
                              ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
                              : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                            }
                          </button>

                          {expanded.has(section.id) && (
                            <div className="bg-gray-50/70 divide-y divide-gray-100">
                              {section.lessons.map((lesson: Lesson) => {
                                const Icon = TYPE_ICON[lesson.type] ?? PlayCircle;
                                return (
                                  <div key={lesson.id}
                                    className={clsx(
                                      'flex items-center gap-3 px-5 py-3 group/lesson',
                                      lesson.is_preview && 'cursor-pointer hover:bg-brand-50/50 transition-colors',
                                    )}
                                  >
                                    {/* Lock / Play */}
                                    <div className="shrink-0 w-5 flex items-center justify-center">
                                      {lesson.is_preview
                                        ? <Play className="w-4 h-4 text-brand-600" />
                                        : <Lock className="w-3.5 h-3.5 text-gray-300" />
                                      }
                                    </div>
                                    {/* Type icon */}
                                    <Icon className={clsx('w-4 h-4 shrink-0', lesson.type === 'quiz' ? 'text-purple-400' : lesson.type === 'pdf' ? 'text-red-400' : 'text-gray-400')} />
                                    {/* Title */}
                                    <span className={clsx(
                                      'flex-1 text-sm leading-snug',
                                      lesson.is_preview ? 'text-brand-700 font-medium group-hover/lesson:text-brand-800' : 'text-gray-700',
                                    )}>
                                      {lesson.title}
                                      {lesson.is_preview && (
                                        <span className="ml-2 inline-flex items-center text-[10px] font-bold text-brand-600 bg-brand-50 border border-brand-100 px-1.5 py-0.5 rounded-full">
                                          Preview
                                        </span>
                                      )}
                                    </span>
                                    {/* Duration */}
                                    {lesson.duration_seconds
                                      ? <span className="text-xs text-gray-400 shrink-0 tabular-nums">{fmtDur(lesson.duration_seconds)}</span>
                                      : lesson.type === 'quiz'
                                      ? <span className="text-xs text-purple-400 shrink-0">Quiz</span>
                                      : lesson.type === 'pdf'
                                      ? <span className="text-xs text-red-400 shrink-0">PDF</span>
                                      : null
                                    }
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* ── INSTRUCTOR TAB ────────────────────── */}
              {activeTab === 'instructor' && (
                <section className="space-y-6">
                  <h2 className="text-xl lg:text-2xl font-extrabold text-gray-900">Your Instructor</h2>
                  <div className="card p-6 lg:p-8">
                    <div className="flex items-start gap-5 mb-6">
                      <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-2xl font-extrabold shrink-0">
                        {course.instructor_name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-lg font-extrabold text-gray-900">{course.instructor_name}</h3>
                        <p className="text-sm text-brand-600 font-semibold mt-0.5">Senior Software Engineer & Trainer</p>
                        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
                          <span className="flex items-center gap-1.5"><Star className="w-4 h-4 fill-amber-400 text-amber-400" /> 4.8 Instructor Rating</span>
                          <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> 625 Students</span>
                          <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> 4 Courses</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed mb-4">
                      {course.instructor_bio ?? 'Experienced trainer at Genesys Academy.'}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Priya has trained over 600 students across Tamil Nadu in Python, Web Development and Data Science.
                      She holds a B.E. in Computer Science and has worked at two product startups before
                      joining Genesys Academy full-time. Her teaching philosophy is simple: every concept
                      must be paired with a real example.
                    </p>
                  </div>
                </section>
              )}

              {/* ── REVIEWS TAB ──────────────────────── */}
              {activeTab === 'reviews' && (
                <section className="space-y-8">
                  <h2 className="text-xl lg:text-2xl font-extrabold text-gray-900">Student Reviews</h2>

                  {/* Rating summary */}
                  <div className="card p-6 flex flex-col sm:flex-row items-center gap-6">
                    <div className="text-center shrink-0">
                      <p className="text-6xl font-extrabold text-gray-900 leading-none">{course.avg_rating}</p>
                      <StarRow rating={course.avg_rating} size="lg" />
                      <p className="text-xs text-gray-400 mt-1">Course Rating</p>
                    </div>
                    {/* Bar chart */}
                    <div className="flex-1 w-full space-y-2">
                      {[
                        { stars: 5, pct: 78 },
                        { stars: 4, pct: 14 },
                        { stars: 3, pct: 5 },
                        { stars: 2, pct: 2 },
                        { stars: 1, pct: 1 },
                      ].map(row => (
                        <div key={row.stars} className="flex items-center gap-3 text-xs text-gray-500">
                          <div className="flex items-center gap-1 shrink-0 w-14">
                            <div className="progress-track flex-1">
                              <div className="progress-fill bg-amber-400" style={{ width: `${row.pct}%` }} />
                            </div>
                          </div>
                          <span className="shrink-0">{row.stars} ★</span>
                          <span className="text-gray-400">{row.pct}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Individual reviews */}
                  {reviews.length > 0 ? (
                    <div className="space-y-5">
                      {reviews.map(r => (
                        <div key={r.id} className="card p-5 lg:p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs font-extrabold shrink-0">
                              {r.initials}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                                <p className="font-bold text-gray-900 text-sm">{r.name}</p>
                                <span className="text-xs text-gray-400">{r.date}</span>
                              </div>
                              <StarRow rating={r.rating} />
                              <p className="text-sm text-gray-600 leading-relaxed mt-2">{r.comment}</p>
                              <button className="mt-3 flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors">
                                <ThumbsUp className="w-3.5 h-3.5" /> Helpful
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state py-10">
                      <MessageSquare className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 text-sm">No reviews yet for this course.</p>
                    </div>
                  )}
                </section>
              )}
            </div>

            {/* ── Sidebar card — desktop right column + mobile below */}
            <div className="lg:col-span-1">
              <SidebarCard
                course={course}
                discountPrice={discountPrice}
                enrolled={enrolled}
                enrolling={enrolling}
                wishlisted={wishlisted}
                user={user}
                onEnroll={handleEnroll}
                onWishlist={() => setWishlisted(w => !w)}
                totalHours={totalHours}
                allLessons={allLessons}
                previewCount={previewCount}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// ── Sticky sidebar enrol card ────────────────────────────
function SidebarCard({
  course, discountPrice, enrolled, enrolling, wishlisted,
  user, onEnroll, onWishlist, totalHours, allLessons, previewCount,
}: {
  course: any; discountPrice: number;
  enrolled: boolean; enrolling: boolean; wishlisted: boolean;
  user: any; onEnroll: () => void; onWishlist: () => void;
  totalHours: string; allLessons: Lesson[]; previewCount: number;
}) {
  const savings = course.price - discountPrice;

  return (
    <div className="card overflow-hidden sticky top-[140px]">
      {/* Thumbnail / preview area */}
      <div className="relative bg-gradient-to-br from-yellow-400 to-blue-600 aspect-video flex items-center justify-center group">
        <div className="text-6xl">🐍</div>
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-xl">
            <Play className="w-6 h-6 text-brand-600 ml-1" />
          </div>
        </div>
        <div className="absolute bottom-2 left-2 right-2">
          <div className="bg-black/60 rounded-lg px-2.5 py-1.5 text-xs text-white font-semibold text-center">
            Preview available — click to watch
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Price */}
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-extrabold text-gray-900">{fmtMoney(discountPrice)}</span>
          <span className="text-base text-gray-400 line-through">{fmtMoney(course.price)}</span>
          <span className="badge bg-red-50 text-red-600 border-red-100 text-xs font-bold ml-auto">
            {Math.round((savings / course.price) * 100)}% off
          </span>
        </div>

        {/* Countdown */}
        <p className="text-xs text-red-600 font-semibold flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          <span className="font-bold">2 days</span> left at this price!
        </p>

        {/* CTA */}
        {enrolled ? (
          <Link href={`/learn/${course.slug}`}
            className="btn-primary w-full py-3.5 text-base gap-2 justify-center">
            <PlayCircle className="w-5 h-5" /> Continue Learning
          </Link>
        ) : (
          <button onClick={onEnroll} disabled={enrolling}
            className="btn-primary w-full py-3.5 text-base">
            {enrolling
              ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block mr-2" />Processing…</>
              : user ? 'Enrol Now' : 'Sign In to Enrol'
            }
          </button>
        )}

        {enrolled && (
          <div className="notice-success py-2 text-xs">
            <CheckCircle className="w-4 h-4 shrink-0" />
            You&apos;re enrolled! Keep learning.
          </div>
        )}

        {/* Wishlist + Share */}
        <div className="grid grid-cols-2 gap-2">
          <button onClick={onWishlist}
            className={clsx(
              'btn-secondary py-2.5 text-sm gap-1.5',
              wishlisted && 'text-red-600 border-red-200 bg-red-50',
            )}>
            <Heart className={clsx('w-4 h-4', wishlisted && 'fill-red-500 text-red-500')} />
            {wishlisted ? 'Wishlisted' : 'Wishlist'}
          </button>
          <button
            onClick={() => { navigator.clipboard?.writeText(window.location.href); }}
            className="btn-secondary py-2.5 text-sm gap-1.5">
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>

        {/* Course includes */}
        <div className="pt-3 border-t border-gray-100">
          <p className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">This course includes</p>
          <ul className="space-y-2.5">
            {[
              { icon: PlayCircle,   text: `${totalHours} hours of on-demand video` },
              { icon: FileText,     text: 'Downloadable notes & exercises' },
              { icon: HelpCircle,   text: `${allLessons.filter(l => l.type === 'quiz').length} knowledge-check quizzes` },
              { icon: Smartphone,   text: 'Access on mobile and desktop' },
              { icon: InfinityIcon, text: 'Full lifetime access' },
              { icon: Award,        text: 'Certificate of completion' },
            ].map(item => (
              <li key={item.text} className="flex items-center gap-2.5 text-sm text-gray-700">
                <item.icon className="w-4 h-4 text-gray-400 shrink-0" />
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Money-back */}
        <p className="text-xs text-gray-400 text-center pt-1">
          30-day money-back guarantee. No questions asked.
        </p>
      </div>
    </div>
  );
}
