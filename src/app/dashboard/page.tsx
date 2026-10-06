'use client';

import Link from 'next/link';
import {
  BookOpen, TrendingUp, CheckCircle, ArrowRight,
  PlayCircle, Trophy, Flame, BarChart3, Calendar,
  Clock, CreditCard, User as UserIcon,
} from 'lucide-react';
import { useSession, Guard } from '@/components/session';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Enrollment, Payment } from '@/types';
import {
  DEMO_ENROLLMENTS, DEMO_STUDENT_STATS, DEMO_PAYMENTS,
} from '@/lib/demo-data';
import { clsx } from 'clsx';

/* ── helpers ──────────────────────────────────────────── */
function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}
function fmtMoney(n: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

/* ── TABS ─────────────────────────────────────────────── */
const TABS = ['My Courses', 'Purchases', 'Profile'] as const;
type Tab = typeof TABS[number];

function StudentDashboardInner() {
  const { user } = useSession();
  const [tab, setTab] = useState<Tab>('My Courses');

  const courses = DEMO_ENROLLMENTS;
  const inProgress = courses.filter(c => c.completion_percent > 0 && c.completion_percent < 100);
  const notStarted  = courses.filter(c => c.completion_percent === 0);
  const completed   = courses.filter(c => c.completion_percent === 100);

  const avg = courses.length
    ? Math.round(courses.reduce((s, c) => s + c.completion_percent, 0) / courses.length)
    : 0;

  const statCards = [
    { icon: BookOpen,  label: 'Enrolled',     value: DEMO_STUDENT_STATS.total_enrolled,  color: 'bg-brand-100 text-brand-600' },
    { icon: Flame,     label: 'In Progress',  value: DEMO_STUDENT_STATS.in_progress,     color: 'bg-amber-100 text-amber-600' },
    { icon: Trophy,    label: 'Completed',    value: DEMO_STUDENT_STATS.completed,       color: 'bg-green-100 text-green-600' },
    { icon: BarChart3, label: 'Avg Progress', value: `${avg}%`,                          color: 'bg-purple-100 text-purple-600' },
  ];

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen bg-gray-50">

        {/* ── Header banner */}
        <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-brand-700 text-white">
          <div className="page-container py-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-brand-200 text-sm font-medium mb-1">Good day 👋</p>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Welcome back, {user?.first_name}!
                </h1>
                <p className="text-brand-200 text-sm mt-1">Continue your learning journey</p>
              </div>
              <Link href="/courses"
                className="hidden sm:flex btn-base bg-white text-brand-700 hover:bg-brand-50 border-white gap-2 shrink-0">
                Browse Courses <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="page-container py-8 space-y-8">
          {/* ── Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {statCards.map(s => (
              <div key={s.label} className="card p-5">
                <div className="flex items-center gap-3">
                  <div className={clsx('w-11 h-11 rounded-2xl flex items-center justify-center shrink-0', s.color)}>
                    <s.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-gray-900">{s.value}</p>
                    <p className="text-xs text-gray-500">{s.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Tabs */}
          <div className="tab-bar">
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={clsx('tab-btn', tab === t ? 'tab-btn-active' : 'tab-btn-inactive')}>
                {t}
              </button>
            ))}
          </div>

          {/* ────────── MY COURSES TAB ────────── */}
          {tab === 'My Courses' && (
            <div className="space-y-10">
              {inProgress.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <PlayCircle className="w-5 h-5 text-brand-600" /> Continue Learning
                    </h2>
                    <span className="badge-brand">{inProgress.length} in progress</span>
                  </div>
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {inProgress.map(c => <EnrollmentCard key={c.course_id} enrollment={c} />)}
                  </div>
                </section>
              )}

              {notStarted.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-amber-500" /> Not Started Yet
                    </h2>
                    <span className="badge-amber">{notStarted.length} waiting</span>
                  </div>
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {notStarted.map(c => <EnrollmentCard key={c.course_id} enrollment={c} />)}
                  </div>
                </section>
              )}

              {completed.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-green-600" /> Completed
                    </h2>
                    <span className="badge-green">{completed.length} done</span>
                  </div>
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {completed.map(c => <EnrollmentCard key={c.course_id} enrollment={c} done />)}
                  </div>
                </section>
              )}
            </div>
          )}

          {/* ────────── PURCHASES TAB ────────── */}
          {tab === 'Purchases' && (
            <div className="card overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-brand-600" />
                <h2 className="font-bold text-gray-900">Purchase History</h2>
              </div>
              <div className="divide-y divide-gray-50">
                {DEMO_PAYMENTS.map((p: Payment) => (
                  <div key={p.id} className="px-5 py-4 flex items-center gap-4 flex-wrap sm:flex-nowrap">
                    {/* Icon */}
                    <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">{p.course_title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {fmt(p.created_at)} · ID: <span className="font-mono">{p.razorpay_payment_id}</span>
                      </p>
                    </div>
                    {/* Amount */}
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="text-base font-extrabold text-gray-900">{fmtMoney(p.amount)}</span>
                      <span className="badge-green text-xs">Paid</span>
                    </div>
                  </div>
                ))}
              </div>
              {/* Summary */}
              <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <span className="text-sm text-gray-500 font-medium">Total spent</span>
                <span className="text-base font-extrabold text-gray-900">
                  {fmtMoney(DEMO_PAYMENTS.reduce((s, p) => s + p.amount, 0))}
                </span>
              </div>
            </div>
          )}

          {/* ────────── PROFILE TAB ────────── */}
          {tab === 'Profile' && (
            <div className="max-w-xl">
              <div className="card overflow-hidden">
                {/* Avatar header */}
                <div className="bg-gradient-to-r from-brand-700 to-brand-600 px-6 py-8 flex items-center gap-5">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white text-2xl font-extrabold shrink-0">
                    {user?.first_name[0]}{user?.last_name[0]}
                  </div>
                  <div>
                    <p className="text-lg font-extrabold text-white">{user?.first_name} {user?.last_name}</p>
                    <p className="text-brand-200 text-sm">{user?.email}</p>
                    <span className="badge bg-white/20 text-white border-white/20 mt-1.5 capitalize">{user?.role}</span>
                  </div>
                </div>
                {/* Fields */}
                <div className="divide-y divide-gray-50">
                  {[
                    { label: 'Full Name', value: `${user?.first_name} ${user?.last_name}` },
                    { label: 'Email',     value: user?.email },
                    { label: 'Phone',     value: user?.phone || '—' },
                    { label: 'Bio',       value: user?.bio   || '—' },
                    { label: 'Member Since', value: user?.created_at ? fmt(user.created_at) : '—' },
                  ].map(row => (
                    <div key={row.label} className="px-6 py-4 flex gap-4">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider w-28 shrink-0 pt-0.5">{row.label}</p>
                      <p className="text-sm text-gray-800 font-medium">{row.value}</p>
                    </div>
                  ))}
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <p className="text-xs text-gray-400 flex items-center gap-1.5">
                    <UserIcon className="w-3.5 h-3.5" />
                    Demo profile — editing is disabled in demo mode
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function EnrollmentCard({ enrollment: c, done = false }: { enrollment: Enrollment; done?: boolean }) {
  return (
    <Link href={`/learn/${c.slug}`}>
      <div className="group card overflow-hidden hover:shadow-xl hover:border-brand-200 transition-all duration-200 cursor-pointer flex flex-col">
        {/* Thumbnail placeholder */}
        <div className="relative overflow-hidden bg-gradient-to-br from-brand-100 to-brand-200" style={{ aspectRatio: '16/9' }}>
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-brand-400" />
          </div>
          {/* Play overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity scale-75 group-hover:scale-100">
              <PlayCircle className="w-6 h-6 text-brand-600" />
            </div>
          </div>
          {done && (
            <div className="absolute top-2 right-2">
              <span className="badge-green text-xs gap-1">
                <CheckCircle className="w-3 h-3" /> Done
              </span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 group-hover:text-brand-600 transition-colors mb-1">
            {c.title}
          </h3>
          <p className="text-xs text-gray-500 mb-3">by {c.instructor_name}</p>
          {c.last_activity && (
            <p className="text-xs text-gray-400 flex items-center gap-1 mb-3">
              <Clock className="w-3 h-3" /> Last activity {fmt(c.last_activity)}
            </p>
          )}
          {/* Progress */}
          <div className="mt-auto">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-gray-500">
                {c.completed_lessons} of {c.total_lessons} lessons
              </span>
              <span className={clsx('text-xs font-bold',
                c.completion_percent === 100 ? 'text-green-600' :
                c.completion_percent  >  0   ? 'text-brand-600' : 'text-gray-400',
              )}>
                {c.completion_percent}%
              </span>
            </div>
            <div className="progress-track">
              <div className={clsx('progress-fill', c.completion_percent === 100 ? 'bg-green-500' : 'bg-brand-500')}
                style={{ width: `${c.completion_percent}%` }} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// useState import needed inside this file
import { useState } from 'react';

export default function StudentDashboard() {
  return (
    <Guard>
      <StudentDashboardInner />
    </Guard>
  );
}
