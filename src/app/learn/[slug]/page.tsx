'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronLeft, ChevronDown, ChevronUp, CheckCircle,
  Circle, Menu, X, BookOpen, FileText, HelpCircle,
  PlayCircle, SkipBack, SkipForward, Clock,
} from 'lucide-react';
import { useSession, Guard } from '@/components/session';
import { Section, Lesson } from '@/types';
import {
  DEMO_COURSES, DEMO_SECTIONS_PYTHON, DEMO_SECTIONS_WEBDEV, DEMO_PROGRESS_MAP,
} from '@/lib/demo-data';
import { clsx } from 'clsx';

/* Map course slug → sections */
const SECTIONS_BY_SLUG: Record<string, Section[]> = {
  'python-programming': DEMO_SECTIONS_PYTHON,
  'web-development':    DEMO_SECTIONS_WEBDEV,
};

function fmtDur(secs: number) {
  if (!secs) return '';
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

const LESSON_TYPE_ICON: Record<string, React.ElementType> = {
  video: PlayCircle,
  pdf:   FileText,
  quiz:  HelpCircle,
  text:  BookOpen,
};

function LearnPageInner() {
  const { slug } = useParams<{ slug: string }>();
  const { user }  = useSession();

  const course = DEMO_COURSES.find(c => c.slug === slug)
    ?? DEMO_COURSES[0];

  const sections: Section[] = SECTIONS_BY_SLUG[course.slug] ?? course.sections ?? [];
  const allLessons: Lesson[] = sections.flatMap(s => s.lessons);

  const [activeLessonId, setActiveLessonId]     = useState(allLessons[0]?.id ?? null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(sections.map(s => s.id)),
  );
  const [sidebarOpen, setSidebarOpen]           = useState(false);
  const [completed, setCompleted]               = useState<Set<string>>(
    new Set(Object.keys(DEMO_PROGRESS_MAP).filter(k => DEMO_PROGRESS_MAP[k])),
  );

  const activeLesson  = allLessons.find(l => l.id === activeLessonId);
  const activeIndex   = allLessons.findIndex(l => l.id === activeLessonId);
  const prevLesson    = activeIndex > 0 ? allLessons[activeIndex - 1] : null;
  const nextLesson    = activeIndex < allLessons.length - 1 ? allLessons[activeIndex + 1] : null;

  const toggleSection = (id: string) => {
    setExpandedSections(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const markComplete = (id: string) => {
    setCompleted(prev => { const n = new Set(prev); n.add(id); return n; });
  };

  const completedCount = allLessons.filter(l => completed.has(l.id)).length;
  const progressPct    = allLessons.length ? Math.round((completedCount / allLessons.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">

      {/* ── Top bar */}
      <header className="h-14 bg-gray-900 border-b border-gray-800 flex items-center gap-3 px-4 shrink-0 z-50">
        <Link href="/dashboard"
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm font-medium">
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Dashboard</span>
        </Link>
        <div className="flex-1 min-w-0 px-3">
          <p className="text-white font-bold text-sm truncate">{course.title}</p>
          <p className="text-gray-400 text-xs">by {course.instructor_name}</p>
        </div>
        {/* Progress */}
        <div className="hidden sm:flex items-center gap-2.5 shrink-0">
          <div className="w-28 progress-track">
            <div className="progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
          <span className="text-xs font-bold text-gray-300">{progressPct}%</span>
        </div>
        {/* Sidebar toggle (mobile) */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-800 text-gray-300 transition-colors"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* ── Lesson sidebar (desktop always visible, mobile overlay) */}
        <aside className={clsx(
          'bg-gray-900 border-r border-gray-800 flex-shrink-0 overflow-y-auto',
          'transition-all duration-300',
          'lg:block lg:w-72 xl:w-80',
          sidebarOpen ? 'fixed inset-y-0 top-14 left-0 z-40 block w-80' : 'hidden',
        )}>
          {/* Progress header */}
          <div className="px-4 py-4 border-b border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Course content
              </span>
              <span className="text-xs text-gray-400">
                {completedCount}/{allLessons.length} done
              </span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progressPct}%` }} />
            </div>
          </div>

          {/* Sections */}
          {sections.map(section => (
            <div key={section.id}>
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center gap-2 px-4 py-3.5 hover:bg-gray-800 transition-colors text-left"
              >
                <span className="flex-1 text-sm font-bold text-gray-200">{section.title}</span>
                {expandedSections.has(section.id)
                  ? <ChevronUp className="w-4 h-4 text-gray-500 shrink-0" />
                  : <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
                }
              </button>

              {expandedSections.has(section.id) && (
                <div>
                  {section.lessons.map(lesson => {
                    const isActive    = lesson.id === activeLessonId;
                    const isDone      = completed.has(lesson.id);
                    const Icon        = LESSON_TYPE_ICON[lesson.type] ?? PlayCircle;
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => { setActiveLessonId(lesson.id); setSidebarOpen(false); }}
                        className={clsx(
                          'w-full flex items-start gap-3 px-4 py-3 text-left transition-colors border-l-2',
                          isActive
                            ? 'bg-brand-900/50 border-brand-500'
                            : 'border-transparent hover:bg-gray-800/60',
                        )}
                      >
                        <div className="mt-0.5 shrink-0">
                          {isDone
                            ? <CheckCircle className="w-4 h-4 text-green-500" />
                            : <Circle className={clsx('w-4 h-4', isActive ? 'text-brand-400' : 'text-gray-600')} />
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={clsx(
                            'text-xs font-medium leading-snug',
                            isActive ? 'text-brand-300' : isDone ? 'text-gray-400' : 'text-gray-300',
                          )}>
                            {lesson.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Icon className="w-3 h-3 text-gray-600" />
                            {lesson.duration_seconds
                              ? <span className="text-[10px] text-gray-500 flex items-center gap-1">
                                  <Clock className="w-2.5 h-2.5" />{fmtDur(lesson.duration_seconds)}
                                </span>
                              : null
                            }
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          {/* Empty state if no sections */}
          {sections.length === 0 && (
            <div className="px-4 py-8 text-center text-gray-500 text-sm">
              No lessons available in demo for this course.
            </div>
          )}
        </aside>

        {/* Overlay backdrop on mobile */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 top-14 z-30 bg-black/60"
            onClick={() => setSidebarOpen(false)} />
        )}

        {/* ── Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-950">
          {activeLesson ? (
            <div className="max-w-5xl mx-auto px-4 sm:px-6 xl:px-10 py-6 space-y-6">

              {/* Video/Content placeholder */}
              <div className="rounded-2xl overflow-hidden bg-gray-900 border border-gray-800">
                {activeLesson.type === 'video' && (
                  <div
                    className="aspect-video flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-gray-900 to-gray-800"
                  >
                    <div className="w-20 h-20 rounded-full bg-brand-600/20 border-2 border-brand-500/40 flex items-center justify-center">
                      <PlayCircle className="w-10 h-10 text-brand-400" />
                    </div>
                    <div className="text-center">
                      <p className="text-white font-bold text-lg">{activeLesson.title}</p>
                      <p className="text-gray-400 text-sm mt-1">
                        {activeLesson.duration_seconds
                          ? `${fmtDur(activeLesson.duration_seconds)} · Video lesson`
                          : 'Video lesson'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="px-4 py-2 rounded-xl bg-brand-600/20 border border-brand-500/30 text-brand-300 text-xs font-semibold">
                        📺 Video player — demo mode (no stream)
                      </div>
                    </div>
                  </div>
                )}
                {activeLesson.type === 'pdf' && (
                  <div className="aspect-video flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-gray-900 to-gray-800">
                    <div className="w-20 h-20 rounded-full bg-red-600/20 border-2 border-red-500/40 flex items-center justify-center">
                      <FileText className="w-10 h-10 text-red-400" />
                    </div>
                    <div className="text-center">
                      <p className="text-white font-bold text-lg">{activeLesson.title}</p>
                      <p className="text-gray-400 text-sm mt-1">PDF document</p>
                    </div>
                    <div className="px-4 py-2 rounded-xl bg-red-600/20 border border-red-500/30 text-red-300 text-xs font-semibold">
                      📄 PDF viewer — demo mode
                    </div>
                  </div>
                )}
                {activeLesson.type === 'quiz' && (
                  <div className="p-8 space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center">
                        <HelpCircle className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-white font-bold">{activeLesson.title}</p>
                        <p className="text-gray-400 text-xs">Knowledge check</p>
                      </div>
                    </div>
                    {/* Demo quiz questions */}
                    {[
                      { q: 'What is a variable in Python?', opts: ['A container to store data values', 'A function definition', 'A type of loop', 'A module'] },
                      { q: 'Which keyword creates a function in Python?', opts: ['func', 'function', 'def', 'create'] },
                    ].map((item, qi) => (
                      <div key={qi} className="bg-gray-800 rounded-xl p-5">
                        <p className="text-white font-semibold mb-3 text-sm">Q{qi + 1}. {item.q}</p>
                        <div className="space-y-2">
                          {item.opts.map((opt, oi) => (
                            <label key={oi} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors">
                              <input type="radio" name={`q${qi}`} className="w-4 h-4 accent-brand-500" />
                              <span className="text-gray-300 text-sm">{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                    <button className="btn-primary w-full py-3"
                      onClick={() => alert('Great job! Quiz submitted (demo mode).')}>
                      Submit Quiz
                    </button>
                  </div>
                )}
              </div>

              {/* Lesson info */}
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h1 className="text-xl font-extrabold text-white">{activeLesson.title}</h1>
                  <p className="text-gray-400 text-sm mt-1">{course.title}</p>
                </div>
                <button
                  onClick={() => markComplete(activeLesson.id)}
                  className={clsx(
                    'shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all',
                    completed.has(activeLesson.id)
                      ? 'bg-green-900/40 text-green-400 border border-green-700 cursor-default'
                      : 'btn-primary',
                  )}
                  disabled={completed.has(activeLesson.id)}
                >
                  <CheckCircle className="w-4 h-4" />
                  {completed.has(activeLesson.id) ? 'Completed' : 'Mark Complete'}
                </button>
              </div>

              {/* Lesson description */}
              <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
                <h3 className="text-sm font-bold text-gray-200 mb-2">About this lesson</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {activeLesson.type === 'video'
                    ? `In this lesson you will learn about "${activeLesson.title}". Watch the video carefully and take notes. The concepts covered here form the foundation for upcoming lessons.`
                    : activeLesson.type === 'pdf'
                    ? `Download and read the attached PDF for "${activeLesson.title}". It contains detailed notes, examples and exercises related to the topic.`
                    : `Test your understanding of the topics covered so far with this knowledge check. Answer all questions to proceed.`
                  }
                </p>
              </div>

              {/* Prev / Next navigation */}
              <div className="flex items-center gap-3">
                {prevLesson ? (
                  <button
                    onClick={() => setActiveLessonId(prevLesson.id)}
                    className="btn-secondary flex-1 py-3 gap-2"
                  >
                    <SkipBack className="w-4 h-4" />
                    <span className="truncate text-sm">{prevLesson.title}</span>
                  </button>
                ) : <div className="flex-1" />}
                {nextLesson ? (
                  <button
                    onClick={() => {
                      markComplete(activeLesson.id);
                      setActiveLessonId(nextLesson.id);
                    }}
                    className="btn-primary flex-1 py-3 gap-2"
                  >
                    <span className="truncate text-sm">{nextLesson.title}</span>
                    <SkipForward className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="flex-1 flex items-center justify-center py-3 rounded-xl bg-green-800/40 border border-green-700 text-green-400 font-semibold text-sm gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Course Complete!
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="flex items-center justify-center h-full min-h-96 text-gray-500">
              <div className="text-center">
                <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-700" />
                <p>Select a lesson to begin</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function LearnPage() {
  return (
    <Guard>
      <LearnPageInner />
    </Guard>
  );
}
