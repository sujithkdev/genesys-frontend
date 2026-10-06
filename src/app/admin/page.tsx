'use client';

import { useState } from 'react';
import {
  Users, BookOpen, DollarSign, TrendingUp, Shield,
  Ban, CheckCircle, XCircle, Eye, UserCheck, BarChart3,
  GraduationCap, AlertTriangle,
} from 'lucide-react';
import Link from 'next/link';
import { useSession, Guard } from '@/components/session';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { clsx } from 'clsx';

// ── Hardcoded demo data ───────────────────────────────────
const DEMO_USERS = [
  { id: 'u1', first_name: 'Arjun',     last_name: 'Mehta',    email: 'arjun@demo.com',   role: 'student',    status: 'active',    created_at: '2024-07-15' },
  { id: 'u2', first_name: 'Divya',     last_name: 'Rajan',    email: 'divya@demo.com',   role: 'student',    status: 'active',    created_at: '2024-06-20' },
  { id: 'u3', first_name: 'Priya',     last_name: 'Sharma',   email: 'mentor@demo.com',  role: 'instructor', status: 'active',    created_at: '2024-01-15' },
  { id: 'u4', first_name: 'Karthik',   last_name: 'Selvam',   email: 'karthik@demo.com', role: 'student',    status: 'active',    created_at: '2024-08-01' },
  { id: 'u5', first_name: 'Sneha',     last_name: 'Pillai',   email: 'sneha@demo.com',   role: 'student',    status: 'active',    created_at: '2024-08-12' },
  { id: 'u6', first_name: 'Rohit',     last_name: 'Kumar',    email: 'rohit@demo.com',   role: 'student',    status: 'suspended', created_at: '2024-09-01' },
  { id: 'u7', first_name: 'Aishwarya', last_name: 'Nair',     email: 'aish@demo.com',    role: 'student',    status: 'active',    created_at: '2024-09-10' },
  { id: 'u8', first_name: 'Admin',     last_name: 'User',     email: 'admin@demo.com',   role: 'admin',      status: 'active',    created_at: '2024-01-01' },
];

const DEMO_COURSES = [
  { id: 'c1', title: 'Python Programming — Zero to Hero', slug: 'python-programming',  instructor: 'Priya Sharma', status: 'published', students: 218, revenue: 62782 },
  { id: 'c2', title: 'Full Stack Web Development',        slug: 'web-development',     instructor: 'Priya Sharma', status: 'published', students: 175, revenue: 54925 },
  { id: 'c3', title: 'Database Design & SQL Mastery',     slug: 'database-sql',        instructor: 'Priya Sharma', status: 'published', students: 134, revenue: 26766 },
  { id: 'c4', title: 'Cybersecurity Fundamentals',        slug: 'cybersecurity',       instructor: 'Priya Sharma', status: 'submitted', students: 0,   revenue: 0     },
];

const DEMO_APPLICATIONS = [
  { id: 'a1', name: 'Vikram Anand',   email: 'vikram@demo.com',  subject: 'Data Science & ML', experience: '5 years as Data Analyst at TCS. Taught Python to juniors. Want to create a beginner ML course.', status: 'pending'  },
  { id: 'a2', name: 'Meena Subramanian', email: 'meena@demo.com', subject: 'Digital Marketing', experience: '3 years running performance marketing campaigns. MBA from Anna University.', status: 'pending'  },
  { id: 'a3', name: 'Suresh Iyer',    email: 'suresh@demo.com',  subject: 'Java & Spring Boot', experience: '8 years as Java developer. Previously trained 200+ students at private institute.', status: 'approved' },
];

const DEMO_PAYMENTS = [
  { id: 'p1', student: 'Arjun Mehta',    email: 'arjun@demo.com',   course: 'Python Programming — Zero to Hero', amount: 2999, status: 'completed', date: '15 Jul 2024' },
  { id: 'p2', student: 'Arjun Mehta',    email: 'arjun@demo.com',   course: 'Full Stack Web Development',        amount: 3999, status: 'completed', date: '01 May 2024' },
  { id: 'p3', student: 'Divya Rajan',    email: 'divya@demo.com',   course: 'Python Programming — Zero to Hero', amount: 2999, status: 'completed', date: '20 Jun 2024' },
  { id: 'p4', student: 'Karthik Selvam', email: 'karthik@demo.com', course: 'Full Stack Web Development',        amount: 3999, status: 'completed', date: '01 Aug 2024' },
  { id: 'p5', student: 'Sneha Pillai',   email: 'sneha@demo.com',   course: 'Database Design & SQL Mastery',     amount: 1999, status: 'completed', date: '12 Aug 2024' },
  { id: 'p6', student: 'Rohit Kumar',    email: 'rohit@demo.com',   course: 'Python Programming — Zero to Hero', amount: 2999, status: 'failed',    date: '01 Sep 2024' },
  { id: 'p7', student: 'Aishwarya Nair', email: 'aish@demo.com',    course: 'Cybersecurity Fundamentals',        amount: 2499, status: 'completed', date: '10 Sep 2024' },
];

const TABS = ['Overview', 'Users', 'Applications', 'Courses', 'Payments'] as const;
type Tab = typeof TABS[number];

function AdminPanelInner() {
  const { user } = useSession();
  const [tab, setTab]               = useState<Tab>('Overview');
  const [userStatuses, setUserStatuses] = useState<Record<string, string>>(
    () => Object.fromEntries(DEMO_USERS.map(u => [u.id, u.status])),
  );
  const [appStatuses, setAppStatuses]   = useState<Record<string, string>>(
    () => Object.fromEntries(DEMO_APPLICATIONS.map(a => [a.id, a.status])),
  );
  const [courseStatuses, setCourseStatuses] = useState<Record<string, string>>(
    () => Object.fromEntries(DEMO_COURSES.map(c => [c.id, c.status])),
  );

  const totalRevenue = DEMO_PAYMENTS.filter(p => p.status === 'completed')
    .reduce((s, p) => s + p.amount, 0);
  const totalEnrolments = DEMO_PAYMENTS.filter(p => p.status === 'completed').length;

  const overviewStats = [
    { icon: Users,      label: 'Total Users',    value: DEMO_USERS.length,                    color: 'bg-blue-100 text-blue-600' },
    { icon: BookOpen,   label: 'Total Courses',  value: DEMO_COURSES.length,                  color: 'bg-brand-100 text-brand-600' },
    { icon: DollarSign, label: 'Total Revenue',  value: `₹${totalRevenue.toLocaleString('en-IN')}`, color: 'bg-green-100 text-green-600' },
    { icon: TrendingUp, label: 'Enrolments',     value: totalEnrolments,                      color: 'bg-amber-100 text-amber-600' },
  ];

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen bg-gray-50">

        {/* Dark header */}
        <div className="bg-gradient-to-r from-gray-950 to-gray-900 text-white border-b border-gray-800">
          <div className="page-container py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-600 flex items-center justify-center shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Admin Panel</h1>
                  <p className="text-gray-400 text-sm mt-0.5">Manage the Genesys Academy platform</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-3 text-sm text-gray-400">
                <span>Logged in as</span>
                <span className="font-semibold text-white">{user?.first_name} {user?.last_name}</span>
                <span className="badge bg-brand-600/30 text-brand-300 border-brand-600/40">Admin</span>
              </div>
            </div>
          </div>
        </div>

        <div className="page-container py-8 space-y-8">

          {/* Tabs */}
          <div className="tab-bar overflow-x-auto">
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={clsx('tab-btn', tab === t ? 'tab-btn-active' : 'tab-btn-inactive')}>
                {t === 'Applications'
                  ? `Applications ${appStatuses && Object.values(appStatuses).filter(s => s === 'pending').length > 0 ? `(${Object.values(appStatuses).filter(s => s === 'pending').length})` : ''}`
                  : t}
              </button>
            ))}
          </div>

          {/* ---------- OVERVIEW ---------- */}
          {tab === 'Overview' && (
            <div className="space-y-8">
              {/* Stat cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {overviewStats.map(s => (
                  <div key={s.label} className="card p-5">
                    <div className={clsx('w-11 h-11 rounded-2xl flex items-center justify-center mb-3', s.color)}>
                      <s.icon className="w-5 h-5" />
                    </div>
                    <p className="text-2xl font-extrabold text-gray-900">{s.value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Quick stats row */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="card p-5 border-l-4 border-l-amber-500">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Pending Applications</p>
                  <p className="text-3xl font-extrabold text-gray-900">
                    {Object.values(appStatuses).filter(s => s === 'pending').length}
                  </p>
                  <button onClick={() => setTab('Applications')} className="text-xs text-brand-600 hover:underline mt-1">Review now</button>
                </div>
                <div className="card p-5 border-l-4 border-l-brand-500">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Courses in Review</p>
                  <p className="text-3xl font-extrabold text-gray-900">
                    {Object.values(courseStatuses).filter(s => s === 'submitted').length}
                  </p>
                  <button onClick={() => setTab('Courses')} className="text-xs text-brand-600 hover:underline mt-1">Review now</button>
                </div>
                <div className="card p-5 border-l-4 border-l-red-400">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Suspended Users</p>
                  <p className="text-3xl font-extrabold text-gray-900">
                    {Object.values(userStatuses).filter(s => s === 'suspended').length}
                  </p>
                  <button onClick={() => setTab('Users')} className="text-xs text-brand-600 hover:underline mt-1">View users</button>
                </div>
              </div>

              {/* Recent users */}
              <div className="card overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-bold text-gray-900">Recent Users</h3>
                  <button onClick={() => setTab('Users')} className="text-xs text-brand-600 hover:underline">View all</button>
                </div>
                <div className="divide-y divide-gray-50">
                  {DEMO_USERS.slice(0, 5).map(u => (
                    <div key={u.id} className="px-5 py-3.5 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {u.first_name[0]}{u.last_name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{u.first_name} {u.last_name}</p>
                        <p className="text-xs text-gray-400 truncate">{u.email}</p>
                      </div>
                      <span className={clsx('badge capitalize text-xs',
                        u.role === 'admin' ? 'badge-purple' :
                        u.role === 'instructor' ? 'badge-brand' : 'badge-gray',
                      )}>{u.role}</span>
                      <span className={clsx('badge capitalize text-xs',
                        userStatuses[u.id] === 'active' ? 'badge-green' : 'badge-red',
                      )}>{userStatuses[u.id]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent payments */}
              <div className="card overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-bold text-gray-900">Recent Payments</h3>
                  <button onClick={() => setTab('Payments')} className="text-xs text-brand-600 hover:underline">View all</button>
                </div>
                <div className="divide-y divide-gray-50">
                  {DEMO_PAYMENTS.slice(0, 4).map(p => (
                    <div key={p.id} className="px-5 py-3.5 flex items-center gap-3">
                      <div className={clsx(
                        'w-9 h-9 rounded-xl flex items-center justify-center shrink-0',
                        p.status === 'completed' ? 'bg-green-100' : 'bg-red-100',
                      )}>
                        {p.status === 'completed'
                          ? <CheckCircle className="w-4 h-4 text-green-600" />
                          : <AlertTriangle className="w-4 h-4 text-red-500" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{p.student}</p>
                        <p className="text-xs text-gray-400 truncate">{p.course}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-extrabold text-gray-900">₹{p.amount.toLocaleString('en-IN')}</p>
                        <p className="text-xs text-gray-400">{p.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ---------- USERS ---------- */}
          {tab === 'Users' && (
            <div className="card overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-bold text-gray-900">All Users</h3>
                <span className="badge-gray text-xs">{DEMO_USERS.length} total</span>
              </div>
              <div className="overflow-x-auto">
                <table className="table-base">
                  <thead className="table-header">
                    <tr>
                      <th className="th">User</th>
                      <th className="th">Email</th>
                      <th className="th">Role</th>
                      <th className="th">Status</th>
                      <th className="th">Joined</th>
                      <th className="th">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {DEMO_USERS.map(u => (
                      <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                        <td className="td">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                              {u.first_name[0]}{u.last_name[0]}
                            </div>
                            <span className="font-semibold text-gray-900 whitespace-nowrap">
                              {u.first_name} {u.last_name}
                            </span>
                          </div>
                        </td>
                        <td className="td text-gray-500 max-w-[180px] truncate">{u.email}</td>
                        <td className="td">
                          <span className={clsx('badge capitalize text-xs',
                            u.role === 'admin' ? 'badge-purple' :
                            u.role === 'instructor' ? 'badge-brand' : 'badge-gray',
                          )}>{u.role}</span>
                        </td>
                        <td className="td">
                          <span className={clsx('badge capitalize text-xs',
                            userStatuses[u.id] === 'active' ? 'badge-green' :
                            userStatuses[u.id] === 'suspended' ? 'badge-red' : 'badge-amber',
                          )}>{userStatuses[u.id]}</span>
                        </td>
                        <td className="td text-gray-500 whitespace-nowrap text-xs">{u.created_at}</td>
                        <td className="td">
                          <div className="flex items-center gap-1">
                            {userStatuses[u.id] !== 'active' && u.role !== 'admin' && (
                              <button
                                onClick={() => setUserStatuses(p => ({ ...p, [u.id]: 'active' }))}
                                className="p-1.5 rounded-lg hover:bg-green-50 text-green-600 transition-colors"
                                title="Activate">
                                <CheckCircle className="w-4 h-4" />
                              </button>
                            )}
                            {userStatuses[u.id] !== 'suspended' && u.role !== 'admin' && (
                              <button
                                onClick={() => setUserStatuses(p => ({ ...p, [u.id]: 'suspended' }))}
                                className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors"
                                title="Suspend">
                                <Ban className="w-4 h-4" />
                              </button>
                            )}
                            {u.role === 'admin' && (
                              <span className="text-xs text-gray-400 italic">Protected</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ---------- APPLICATIONS ---------- */}
          {tab === 'Applications' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <h2 className="font-bold text-gray-900">Teacher Applications</h2>
                <span className="badge-amber text-xs">
                  {Object.values(appStatuses).filter(s => s === 'pending').length} pending
                </span>
              </div>
              <div className="card divide-y divide-gray-100 overflow-hidden">
                {DEMO_APPLICATIONS.map(app => (
                  <div key={app.id} className="p-5 flex flex-col sm:flex-row gap-4">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-extrabold text-sm shrink-0">
                      {app.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <p className="font-bold text-gray-900 text-sm">{app.name}</p>
                        <span className={clsx('badge text-xs capitalize',
                          appStatuses[app.id] === 'pending' ? 'badge-amber' :
                          appStatuses[app.id] === 'approved' ? 'badge-green' : 'badge-red',
                        )}>{appStatuses[app.id]}</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-1">{app.email} &middot; Subject: <span className="font-semibold text-gray-700">{app.subject}</span></p>
                      <p className="text-sm text-gray-600 leading-relaxed">{app.experience}</p>
                    </div>
                    {appStatuses[app.id] === 'pending' && (
                      <div className="flex gap-2 shrink-0 items-start">
                        <button
                          onClick={() => setAppStatuses(p => ({ ...p, [app.id]: 'approved' }))}
                          className="btn-primary py-2 px-4 text-xs gap-1.5 bg-green-600 hover:bg-green-700 border-green-600">
                          <CheckCircle className="w-3.5 h-3.5" /> Approve
                        </button>
                        <button
                          onClick={() => setAppStatuses(p => ({ ...p, [app.id]: 'rejected' }))}
                          className="btn-secondary py-2 px-4 text-xs gap-1.5 text-red-600 border-red-200 hover:bg-red-50">
                          <XCircle className="w-3.5 h-3.5" /> Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---------- COURSES ---------- */}
          {tab === 'Courses' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <h2 className="font-bold text-gray-900">Course Management</h2>
                <span className="badge-brand text-xs">
                  {Object.values(courseStatuses).filter(s => s === 'submitted').length} in review
                </span>
              </div>
              <div className="card divide-y divide-gray-100 overflow-hidden">
                {DEMO_COURSES.map(course => (
                  <div key={course.id} className="px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h4 className="font-semibold text-gray-900 text-sm truncate max-w-sm">{course.title}</h4>
                        <span className={clsx('badge text-xs capitalize',
                          courseStatuses[course.id] === 'submitted' ? 'badge-brand' :
                          courseStatuses[course.id] === 'published'  ? 'badge-green' :
                          courseStatuses[course.id] === 'rejected'   ? 'badge-red' : 'badge-gray',
                        )}>{courseStatuses[course.id]}</span>
                      </div>
                      <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                        <span>by <span className="font-semibold text-gray-700">{course.instructor}</span></span>
                        {course.students > 0 && <span>{course.students} students</span>}
                        {course.revenue > 0 && <span className="text-green-600 font-medium">₹{course.revenue.toLocaleString('en-IN')} revenue</span>}
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Link href={`/courses/${course.slug}`} target="_blank"
                        className="btn-ghost py-1.5 px-3 text-xs gap-1">
                        <Eye className="w-3.5 h-3.5" /> Preview
                      </Link>
                      {courseStatuses[course.id] === 'submitted' && (
                        <>
                          <button
                            onClick={() => setCourseStatuses(p => ({ ...p, [course.id]: 'published' }))}
                            className="btn-primary py-1.5 px-3 text-xs gap-1 bg-green-600 hover:bg-green-700 border-green-600">
                            <CheckCircle className="w-3.5 h-3.5" /> Publish
                          </button>
                          <button
                            onClick={() => setCourseStatuses(p => ({ ...p, [course.id]: 'rejected' }))}
                            className="btn-secondary py-1.5 px-3 text-xs gap-1 text-red-600 border-red-200 hover:bg-red-50">
                            <XCircle className="w-3.5 h-3.5" /> Reject
                          </button>
                        </>
                      )}
                      {courseStatuses[course.id] === 'published' && (
                        <button
                          onClick={() => setCourseStatuses(p => ({ ...p, [course.id]: 'draft' }))}
                          className="btn-secondary py-1.5 px-3 text-xs gap-1 text-amber-600 border-amber-200 hover:bg-amber-50">
                          Unpublish
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---------- PAYMENTS ---------- */}
          {tab === 'Payments' && (
            <div className="space-y-6">
              {/* Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Total Orders',      value: DEMO_PAYMENTS.length },
                  { label: 'Completed',         value: DEMO_PAYMENTS.filter(p => p.status === 'completed').length },
                  { label: 'Failed',            value: DEMO_PAYMENTS.filter(p => p.status === 'failed').length },
                  { label: 'Revenue',           value: `₹${totalRevenue.toLocaleString('en-IN')}` },
                ].map(s => (
                  <div key={s.label} className="card p-5">
                    <p className="text-2xl font-extrabold text-gray-900">{s.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Table */}
              <div className="card overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                  <h3 className="font-bold text-gray-900">All Transactions</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="table-base">
                    <thead className="table-header">
                      <tr>
                        <th className="th">Student</th>
                        <th className="th">Course</th>
                        <th className="th">Amount</th>
                        <th className="th">Status</th>
                        <th className="th">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                      {DEMO_PAYMENTS.map(p => (
                        <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                          <td className="td">
                            <p className="font-semibold text-gray-900 whitespace-nowrap">{p.student}</p>
                            <p className="text-xs text-gray-400 truncate max-w-[140px]">{p.email}</p>
                          </td>
                          <td className="td max-w-[200px] truncate text-gray-700">{p.course}</td>
                          <td className="td font-bold text-gray-900 whitespace-nowrap">
                            ₹{p.amount.toLocaleString('en-IN')}
                          </td>
                          <td className="td">
                            <span className={clsx('badge text-xs capitalize',
                              p.status === 'completed' ? 'badge-green' : 'badge-red',
                            )}>{p.status}</span>
                          </td>
                          <td className="td text-gray-500 whitespace-nowrap text-xs">{p.date}</td>
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

export default function AdminPanel() {
  return (
    <Guard roles={['admin']}>
      <AdminPanelInner />
    </Guard>
  );
}
