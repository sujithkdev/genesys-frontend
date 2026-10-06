'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search, BookOpen, Users, Star, Clock,
  ArrowRight, Filter,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DEMO_COURSES } from '@/lib/demo-data';
import { Course } from '@/types';
import { clsx } from 'clsx';

const LEVEL_STYLES: Record<string, string> = {
  beginner:     'badge-green',
  intermediate: 'badge-amber',
  advanced:     'badge-red',
};

const COURSE_GRADIENTS: Record<string, string> = {
  'python-programming': 'from-yellow-400 to-blue-600',
  'web-development':    'from-orange-400 to-blue-600',
  'database-sql':       'from-purple-500 to-indigo-600',
  'cybersecurity':      'from-green-500 to-teal-600',
};

const COURSE_EMOJI: Record<string, string> = {
  'python-programming': '🐍',
  'web-development':    '🌐',
  'database-sql':       '🗄️',
  'cybersecurity':      '🛡️',
};

const COURSE_TAGS: Record<string, string> = {
  'python-programming': 'Popular',
  'web-development':    'Trending',
  'cybersecurity':      'New',
};

function fmtMoney(n: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

export default function CoursesPage() {
  const [search, setSearch]     = useState('');
  const [level, setLevel]       = useState<string>('all');

  const filtered = DEMO_COURSES.filter(c => {
    const matchSearch = !search ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      (c.category_name ?? '').toLowerCase().includes(search.toLowerCase());
    const matchLevel = level === 'all' || c.level === level;
    return matchSearch && matchLevel;
  });

  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-white min-h-screen">

        {/* ── Hero */}
        <div className="bg-gradient-to-br from-brand-900 to-brand-700 text-white">
          <div className="page-container py-14 sm:py-18 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
              Explore Our Courses
            </h1>
            <p className="text-brand-200 text-base lg:text-lg max-w-xl mx-auto mb-8">
              Hands-on computer training for students, job seekers and working professionals.
            </p>
            {/* Search */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search courses…"
                className="input pl-12 shadow-xl text-base"
              />
            </div>
          </div>
        </div>

        <div className="page-container py-10">
          {/* ── Filters */}
          <div className="flex items-center gap-3 mb-8 flex-wrap">
            <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-500">
              <Filter className="w-4 h-4" /> Level:
            </span>
            {['all', 'beginner', 'intermediate', 'advanced'].map(l => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={clsx(
                  'px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all capitalize',
                  level === l
                    ? 'bg-brand-600 text-white border-brand-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-brand-300',
                )}
              >
                {l === 'all' ? 'All Levels' : l}
              </button>
            ))}
            <span className="ml-auto text-sm text-gray-400">
              {filtered.length} course{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* ── Course grid */}
          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {filtered.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-2">No courses match your filter.</p>
              <button onClick={() => { setSearch(''); setLevel('all'); }}
                className="btn-secondary text-sm">
                Clear filters
              </button>
            </div>
          )}

          {/* ── CTA banner */}
          <div className="mt-16 bg-gradient-to-r from-brand-50 to-purple-50 border border-brand-100 rounded-3xl p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">
              Not sure where to start?
            </h2>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              Our counsellors help you pick the right course based on your goals and background.
            </p>
            <Link href="/contact" className="btn-primary px-8 py-3">
              Talk to a counsellor <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function CourseCard({ course }: { course: Course }) {
  const gradient = COURSE_GRADIENTS[course.slug] ?? 'from-brand-500 to-brand-700';
  const emoji    = COURSE_EMOJI[course.slug]    ?? '📚';
  const tag      = COURSE_TAGS[course.slug];

  return (
    <Link href={`/courses/${course.slug}`}>
      <div className="group card overflow-hidden hover:shadow-xl hover:border-brand-200 transition-all duration-200 cursor-pointer flex flex-col h-full">
        {/* Thumbnail */}
        <div className={clsx('relative flex items-center justify-center h-36 bg-gradient-to-br text-5xl', gradient)}>
          <span>{emoji}</span>
          {tag && (
            <div className="absolute top-2 left-2">
              <span className="badge bg-white/20 text-white border-white/30 text-[10px] font-bold">
                {tag}
              </span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-4 flex flex-col flex-1">
          {/* Category + level */}
          <div className="flex items-center gap-2 mb-2">
            {course.category_name && (
              <span className="badge-gray text-[10px]">{course.category_name}</span>
            )}
            <span className={clsx('badge text-[10px] capitalize', LEVEL_STYLES[course.level] ?? 'badge-gray')}>
              {course.level}
            </span>
          </div>

          <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 group-hover:text-brand-600 transition-colors mb-1">
            {course.title}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-2 flex-1 mb-3">
            {course.short_description}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-gray-700">{course.avg_rating}</span>
              <span>({course.total_reviews})</span>
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" /> {course.total_students}
            </span>
            {course.duration_hours && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {course.duration_hours}h
              </span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
            <span className="text-base font-extrabold text-gray-900">
              {fmtMoney(course.price)}
            </span>
            <span className="text-xs font-semibold text-brand-600 group-hover:underline">
              View course →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
