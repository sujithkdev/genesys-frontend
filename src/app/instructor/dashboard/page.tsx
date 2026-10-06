'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen, Users, Star, Eye,
  BarChart2, GraduationCap, Send,
  ChevronRight, Award, Plus, TrendingUp,
  CheckCircle, Edit3,
} from 'lucide-react';
import { useSession, Guard } from '@/components/session';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  DEMO_INSTRUCTOR_STATS, DEMO_INSTRUCTOR_COURSES, DEMO_COURSE_STUDENTS,
} from '@/lib/demo-data';
import { clsx } from 'clsx';

const STATUS_STYLES: Record<string, string> = {
  published: 'badge-green',
  draft:     'badge-gray',
  submitted: 'badge-brand',
  rejected:  'badge-red',
};

const TABS = ['My Courses', 'Students'] as const;
type Tab = typeof TABS[number];

function InstructorDashboardInner() {
  const { user } = useSession();
  const [tab, setTab] = useState<Tab>('My Courses');

  const stats   = DEMO_INSTRUCTOR_STATS;
  const courses = DEMO_INSTRUCTOR_COURSES;

  const statCards = [
    { icon: BookOpen, label: 'My Courses',    value: stats.total_courses,  color: 'bg-brand-100 text-brand-600' },
    { icon: Users,    label: 'Total Students', value: stats.total_students, color: 'bg-blue-100 text-blue-600'  },
    { icon: Star,     label: 'Avg Rating',     value: stats.avg_rating.toFixed(1), color: 'bg-amber-100 text-amber-600' },
    { icon: Award,    label: 'Completed',
      value: DEMO_COURSE_STUDENTS.filter(s => s.pct === 100).length,
      color: 'bg-green-100 text-green-600' },
  ];

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen bg-gray-50">

        {/* Header */}
        <div className="bg-gradient-to-r from-brand-900 to-brand-700 text-white">
          <div className="page-container py-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-brand-200 text-sm font-medium mb-1 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4" /> Instructor Portal
                </p>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Welcome, {user?.first_name}!
                </h1>
                <p className="text-brand-200 text-sm mt-1">Create and manage your courses</p>
              </div>
              <Link href="/instructor/courses/new"
                className="btn-base bg-white text-brand-700 hover:bg-brand-50 border-white gap-2 shrink-0">
                <Plus className="w-4 h-4" /> Create Course
              </Link>
            </div>
          </div>
        </div>

        <div className="page-container py-8 space-y-8">

          {/* Stats row */}
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

          {/* Tabs */}
          <div className="tab-bar overflow-x-auto">
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={clsx('tab-btn', tab === t ? 'tab-btn-active' : 'tab-btn-inactive')}>
                {t}
              </button>
            ))}
          </div>

          {/* ---------- MY COURSES TAB ---------- */}
          {tab === 'My Courses' && (
            <div className="space-y-4">

              {/* Create course CTA */}
              <Link href="/instructor/courses/new">
                <div className="card p-5 border-2 border-dashed border-brand-200 hover:border-brand-400 hover:bg-brand-50/40 transition-all cursor-pointer flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 group-hover:bg-brand-100 flex items-center justify-center shrink-0 transition-colors">
                    <Plus className="w-6 h-6 text-brand-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 group-hover:text-brand-700 transition-colors">
                      Create a New Course
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Add title, sections, lessons, videos, descriptions and pricing
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-brand-500 ml-auto shrink-0 transition-colors" />
                </div>
              </Link>

              {/* Courses list */}
              <div className="space-y-3">
                {courses.map(course => (
                  <div key={course.id} className="card p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-md transition-shadow">
                    {/* Icon + title */}
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center shrink-0">
                        <BookOpen className="w-5 h-5 text-brand-600" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-bold text-gray-900 text-sm truncate max-w-xs">
                            {course.title}
                          </h3>
                          <span className={clsx('badge capitalize text-xs', STATUS_STYLES[course.status] || 'badge-gray')}>
                            {course.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5" /> {course.total_students} students
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            {course.avg_rating.toFixed(1)}
                          </span>
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5" /> {course.total_lessons} lessons
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0 flex-wrap">
                      {course.status === 'draft' && (
                        <button
                          onClick={() => alert('In the full version, this submits the course for admin review.')}
                          className="btn-secondary py-2 px-3 text-xs gap-1.5 text-brand-600 border-brand-200 hover:bg-brand-50">
                          <Send className="w-3.5 h-3.5" /> Submit for Review
                        </button>
                      )}
                      <Link href="/instructor/courses/new"
                        className="btn-secondary py-2 px-3 text-xs gap-1.5">
                        <Edit3 className="w-3.5 h-3.5" /> Edit
                      </Link>
                      <Link href={`/courses/${course.slug}`}
                        className="btn-ghost py-2 px-3 text-xs gap-1.5">
                        <Eye className="w-3.5 h-3.5" /> Preview
                      </Link>
                      <button
                        onClick={() => setTab('Students')}
                        className="btn-primary py-2 px-3 text-xs gap-1.5">
                        <BarChart2 className="w-3.5 h-3.5" /> Students
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---------- STUDENTS TAB ---------- */}
          {tab === 'Students' && (
            <div className="space-y-6">

              {/* Summary */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="card p-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <p className="text-xl font-extrabold text-gray-900">{DEMO_COURSE_STUDENTS.length}</p>
                    <p className="text-xs text-gray-500">Total students</p>
                  </div>
                </div>
                <div className="card p-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xl font-extrabold text-gray-900">
                      {DEMO_COURSE_STUDENTS.filter(s => s.pct === 100).length}
                    </p>
                    <p className="text-xs text-gray-500">Completed</p>
                  </div>
                </div>
                <div className="card p-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xl font-extrabold text-gray-900">
                      {Math.round(DEMO_COURSE_STUDENTS.reduce((s, c) => s + c.pct, 0) / DEMO_COURSE_STUDENTS.length)}%
                    </p>
                    <p className="text-xs text-gray-500">Avg progress</p>
                  </div>
                </div>
              </div>

              {/* Student table */}
              <div className="card overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h2 className="font-bold text-gray-900">Student Progress</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Python Programming — Zero to Hero</p>
                  </div>
                  <span className="badge-brand text-xs">{DEMO_COURSE_STUDENTS.length} students</span>
                </div>

                {/* Mobile cards */}
                <div className="sm:hidden divide-y divide-gray-100">
                  {DEMO_COURSE_STUDENTS.map(s => (
                    <div key={s.id} className="p-4 space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {s.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{s.name}</p>
                          <p className="text-xs text-gray-400 truncate">{s.email}</p>
                        </div>
                        <span className={clsx('badge text-xs ml-auto shrink-0',
                          s.pct === 100 ? 'badge-green' :
                          s.pct > 0    ? 'badge-brand' : 'badge-gray',
                        )}>
                          {s.pct === 100 ? 'Done' : s.pct > 0 ? 'Active' : 'Not started'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 pl-12">
                        <div className="flex-1 progress-track">
                          <div className={clsx('progress-fill', s.pct === 100 ? 'bg-green-500' : 'bg-brand-500')}
                            style={{ width: `${s.pct}%` }} />
                        </div>
                        <span className="text-xs font-bold text-gray-600 w-10 text-right">
                          {s.completed}/{s.total}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop table */}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="table-base">
                    <thead className="table-header">
                      <tr>
                        <th className="th">Student</th>
                        <th className="th">Email</th>
                        <th className="th">Enrolled</th>
                        <th className="th">Progress</th>
                        <th className="th">Lessons done</th>
                        <th className="th">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                      {DEMO_COURSE_STUDENTS.map(s => (
                        <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                          <td className="td">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                                {s.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="font-semibold text-gray-900 whitespace-nowrap">{s.name}</span>
                            </div>
                          </td>
                          <td className="td text-gray-500">{s.email}</td>
                          <td className="td text-gray-500 whitespace-nowrap">{s.enrolled}</td>
                          <td className="td">
                            <div className="flex items-center gap-2">
                              <div className="w-24 progress-track">
                                <div className={clsx('progress-fill', s.pct === 100 ? 'bg-green-500' : 'bg-brand-500')}
                                  style={{ width: `${s.pct}%` }} />
                              </div>
                              <span className="text-xs font-bold text-gray-700 w-8 tabular-nums">{s.pct}%</span>
                            </div>
                          </td>
                          <td className="td text-gray-700 tabular-nums">{s.completed}/{s.total}</td>
                          <td className="td">
                            {s.pct === 100
                              ? <span className="badge-green text-xs">Completed</span>
                              : s.pct > 0
                              ? <span className="badge-brand text-xs">In Progress</span>
                              : <span className="badge-gray text-xs">Not Started</span>
                            }
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

export default function InstructorDashboard() {
  return (
    <Guard roles={['instructor', 'admin']}>
      <InstructorDashboardInner />
    </Guard>
  );
}
