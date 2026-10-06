'use client';

/**
 * Instructor — Create / Edit Course
 * Fully frontend-only, no backend calls.
 * State lives in React — demonstrates the full UI/UX.
 */

import { useState, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Plus, Trash2, ChevronDown, ChevronUp,
  GraduationCap, BookOpen, DollarSign, Globe, BarChart3,
  Info, CheckCircle, PlayCircle, FileText, HelpCircle,
  Upload, X, GripVertical, Save, Eye, Send,
  Video, AlignLeft, Tag, Image as ImageIcon, Clock,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Guard } from '@/components/session';
import { clsx } from 'clsx';

// ── Types ────────────────────────────────────────────────
type LessonType = 'video' | 'pdf' | 'quiz' | 'text';

interface LessonDraft {
  id: string;
  title: string;
  type: LessonType;
  description: string;
  videoUrl: string;       // YouTube / Vimeo / direct URL
  duration: string;       // e.g. "12:30"
  isPreview: boolean;
}

interface SectionDraft {
  id: string;
  title: string;
  lessons: LessonDraft[];
}

interface CourseDraft {
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  language: string;
  price: string;
  discountPrice: string;
  requirements: string[];
  whatYouLearn: string[];
  tags: string;
}

// ── Helpers ──────────────────────────────────────────────
let idCounter = 1;
const uid = () => `draft-${Date.now()}-${idCounter++}`;

const emptyLesson = (): LessonDraft => ({
  id: uid(), title: '', type: 'video',
  description: '', videoUrl: '', duration: '', isPreview: false,
});

const emptySection = (): SectionDraft => ({
  id: uid(), title: '', lessons: [emptyLesson()],
});

const LESSON_TYPE_OPTS: { value: LessonType; label: string; icon: React.ElementType; color: string }[] = [
  { value: 'video', label: 'Video',    icon: PlayCircle, color: 'text-brand-600' },
  { value: 'pdf',   label: 'PDF',      icon: FileText,   color: 'text-red-500'   },
  { value: 'quiz',  label: 'Quiz',     icon: HelpCircle, color: 'text-purple-500'},
  { value: 'text',  label: 'Article',  icon: AlignLeft,  color: 'text-gray-600'  },
];

const LEVELS = [
  { value: 'beginner',     label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced',     label: 'Advanced' },
];

const CATEGORIES = [
  'Programming', 'Web Development', 'Database', 'Security',
  'Data Science', 'Mobile Development', 'Design', 'Business & Finance',
];

const LANGUAGES = ['English', 'Tamil', 'English / Tamil', 'Hindi', 'Telugu'];

// ── Step definitions ─────────────────────────────────────
const STEPS = [
  { id: 1, label: 'Basic Info',   icon: Info },
  { id: 2, label: 'Description',  icon: AlignLeft },
  { id: 3, label: 'Curriculum',   icon: BookOpen },
  { id: 4, label: 'Pricing',      icon: DollarSign },
  { id: 5, label: 'Review',       icon: Eye },
] as const;

// ── Main component ───────────────────────────────────────
function CourseEditorInner() {
  const [step, setStep]       = useState(1);
  const [saved, setSaved]     = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ── Course meta
  const [course, setCourse] = useState<CourseDraft>({
    title: '', shortDescription: '', description: '',
    category: '', level: 'beginner', language: 'English / Tamil',
    price: '', discountPrice: '',
    requirements: ['', ''],
    whatYouLearn: ['', '', '', ''],
    tags: '',
  });

  // ── Sections + lessons
  const [sections, setSections] = useState<SectionDraft[]>([emptySection()]);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    () => new Set([sections[0].id]),
  );
  const [expandedLessons, setExpandedLessons] = useState<Set<string>>(
    () => new Set([sections[0].lessons[0].id]),
  );

  // ── thumbnail preview
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // ── helpers
  const updateCourse = (patch: Partial<CourseDraft>) =>
    setCourse(c => ({ ...c, ...patch }));

  const toggleSection = (id: string) =>
    setExpandedSections(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const toggleLesson = (id: string) =>
    setExpandedLessons(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });

  // sections
  const addSection = () => {
    const s = emptySection();
    setSections(p => [...p, s]);
    setExpandedSections(p => new Set([...p, s.id]));
  };
  const removeSection = (id: string) =>
    setSections(p => p.filter(s => s.id !== id));
  const updateSection = (id: string, title: string) =>
    setSections(p => p.map(s => s.id === id ? { ...s, title } : s));

  // lessons
  const addLesson = (sectionId: string) => {
    const l = emptyLesson();
    setSections(p => p.map(s => s.id === sectionId ? { ...s, lessons: [...s.lessons, l] } : s));
    setExpandedLessons(p => new Set([...p, l.id]));
  };
  const removeLesson = (sectionId: string, lessonId: string) =>
    setSections(p => p.map(s => s.id === sectionId
      ? { ...s, lessons: s.lessons.filter(l => l.id !== lessonId) }
      : s));
  const updateLesson = (sectionId: string, lessonId: string, patch: Partial<LessonDraft>) =>
    setSections(p => p.map(s => s.id === sectionId
      ? { ...s, lessons: s.lessons.map(l => l.id === lessonId ? { ...l, ...patch } : l) }
      : s));

  // requirements / whatYouLearn
  const updateListItem = (key: 'requirements' | 'whatYouLearn', i: number, val: string) => {
    const arr = [...course[key]];
    arr[i] = val;
    updateCourse({ [key]: arr });
  };
  const addListItem    = (key: 'requirements' | 'whatYouLearn') =>
    updateCourse({ [key]: [...course[key], ''] });
  const removeListItem = (key: 'requirements' | 'whatYouLearn', i: number) =>
    updateCourse({ [key]: course[key].filter((_, idx) => idx !== i) });

  // thumbnail
  const handleThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setThumbnailPreview(url);
    }
  };

  const totalLessons = sections.reduce((s, sec) => s + sec.lessons.length, 0);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleSubmit = () => setSubmitted(true);

  // ── Step validation (basic)
  const canProceed = () => {
    if (step === 1) return course.title.trim().length >= 5 && course.category && course.level;
    if (step === 2) return course.description.trim().length >= 20;
    if (step === 3) return sections.every(s => s.title.trim().length > 0 && s.lessons.every(l => l.title.trim().length > 0));
    if (step === 4) return course.price.trim().length > 0;
    return true;
  };

  if (submitted) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
          <div className="card p-10 max-w-md w-full text-center space-y-5">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900">Course Submitted!</h2>
            <p className="text-gray-500 text-sm">
              <span className="font-semibold text-gray-700">&ldquo;{course.title || 'Your course'}&rdquo;</span> has been submitted for review.
              You&apos;ll be notified once it&apos;s approved.
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/instructor/dashboard" className="btn-primary w-full py-3">
                Back to Dashboard
              </Link>
              <button onClick={() => { setSubmitted(false); setStep(1); }} className="btn-secondary w-full py-3">
                Create Another Course
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">

        {/* ── Top header bar */}
        <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
          <div className="page-container">
            <div className="flex items-center justify-between h-14 gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <Link href="/instructor/dashboard"
                  className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors shrink-0">
                  <ArrowLeft className="w-4 h-4" /> Dashboard
                </Link>
                <span className="text-gray-300">/</span>
                <span className="text-sm font-bold text-gray-900 truncate">
                  {course.title || 'New Course'}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {saved && (
                  <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Saved
                  </span>
                )}
                <button onClick={handleSave} className="btn-secondary py-2 px-4 text-xs gap-1.5">
                  <Save className="w-3.5 h-3.5" /> Save Draft
                </button>
                {step === 5 && (
                  <button onClick={handleSubmit} className="btn-primary py-2 px-4 text-xs gap-1.5">
                    <Send className="w-3.5 h-3.5" /> Submit for Review
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="page-container py-8">
          <div className="grid lg:grid-cols-4 gap-8 items-start">

            {/* ── Sidebar steps */}
            <aside className="lg:col-span-1">
              <div className="card overflow-hidden sticky top-[120px]">
                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Course Setup</p>
                </div>
                <nav className="divide-y divide-gray-50">
                  {STEPS.map(s => (
                    <button key={s.id} onClick={() => setStep(s.id)}
                      className={clsx(
                        'w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors',
                        step === s.id
                          ? 'bg-brand-50 border-l-2 border-brand-600'
                          : 'hover:bg-gray-50 border-l-2 border-transparent',
                      )}>
                      <div className={clsx(
                        'w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-extrabold',
                        step === s.id ? 'bg-brand-600 text-white' :
                        step > s.id  ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-500',
                      )}>
                        {step > s.id ? <CheckCircle className="w-4 h-4" /> : s.id}
                      </div>
                      <span className={clsx(
                        'text-sm font-semibold',
                        step === s.id ? 'text-brand-700' : 'text-gray-600',
                      )}>
                        {s.label}
                      </span>
                    </button>
                  ))}
                </nav>
                {/* Progress */}
                <div className="px-4 py-4 border-t border-gray-100 bg-gray-50">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                    <span>Progress</span>
                    <span>{Math.round(((step - 1) / (STEPS.length - 1)) * 100)}%</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill"
                      style={{ width: `${Math.round(((step - 1) / (STEPS.length - 1)) * 100)}%` }} />
                  </div>
                </div>
              </div>
            </aside>

            {/* ── Main editor */}
            <main className="lg:col-span-3 space-y-6">

              {/* ══ STEP 1 — Basic Info ═══════════════════════ */}
              {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <StepHeader
                    step={1} title="Basic Information"
                    desc="Give your course a great title and category. This is what students see first."
                  />

                  <div className="card p-6 space-y-5">
                    {/* Title */}
                    <Field label="Course Title *" hint="Be specific. 'Python for Beginners' beats 'Python Course'">
                      <input
                        value={course.title}
                        onChange={e => updateCourse({ title: e.target.value })}
                        placeholder="e.g. Python Programming — Zero to Hero"
                        className="input"
                        maxLength={80}
                      />
                      <p className="text-xs text-gray-400 mt-1">{course.title.length}/80</p>
                    </Field>

                    {/* Short description */}
                    <Field label="Short Description" hint="Shown in course cards. Max 160 characters.">
                      <textarea
                        value={course.shortDescription}
                        onChange={e => updateCourse({ shortDescription: e.target.value })}
                        placeholder="One-line pitch — what will students achieve?"
                        className="input resize-none"
                        rows={2}
                        maxLength={160}
                      />
                      <p className="text-xs text-gray-400 mt-1">{course.shortDescription.length}/160</p>
                    </Field>

                    {/* Category + Level + Language */}
                    <div className="grid sm:grid-cols-3 gap-4">
                      <Field label="Category *">
                        <select value={course.category}
                          onChange={e => updateCourse({ category: e.target.value })}
                          className="input">
                          <option value="">Select…</option>
                          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </Field>
                      <Field label="Level *">
                        <select value={course.level}
                          onChange={e => updateCourse({ level: e.target.value as CourseDraft['level'] })}
                          className="input">
                          {LEVELS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
                        </select>
                      </Field>
                      <Field label="Language">
                        <select value={course.language}
                          onChange={e => updateCourse({ language: e.target.value })}
                          className="input">
                          {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                        </select>
                      </Field>
                    </div>

                    {/* Tags */}
                    <Field label="Tags" hint="Comma-separated. Helps students find your course.">
                      <div className="relative">
                        <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        <input
                          value={course.tags}
                          onChange={e => updateCourse({ tags: e.target.value })}
                          placeholder="python, programming, beginner"
                          className="input pl-10"
                        />
                      </div>
                    </Field>

                    {/* Thumbnail */}
                    <Field label="Course Thumbnail" hint="Recommended: 1280×720px, JPG or PNG">
                      <div className="flex items-start gap-4">
                        {thumbnailPreview ? (
                          <div className="relative w-40 h-24 rounded-xl overflow-hidden border border-gray-200 shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={thumbnailPreview} alt="Thumbnail" className="w-full h-full object-cover" />
                            <button onClick={() => setThumbnailPreview(null)}
                              className="absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center text-white">
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="w-40 h-24 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center shrink-0 bg-gray-50 text-gray-400">
                            <ImageIcon className="w-6 h-6 mb-1" />
                            <span className="text-xs">No image</span>
                          </div>
                        )}
                        <div>
                          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleThumbnail} />
                          <button onClick={() => fileRef.current?.click()} className="btn-secondary gap-2 py-2.5">
                            <Upload className="w-4 h-4" /> Upload Image
                          </button>
                          <p className="text-xs text-gray-400 mt-2">Max 2MB · JPG, PNG, WebP</p>
                        </div>
                      </div>
                    </Field>
                  </div>

                  {/* What you'll learn */}
                  <div className="card p-6">
                    <h3 className="font-bold text-gray-900 mb-1">What Students Will Learn *</h3>
                    <p className="text-xs text-gray-500 mb-4">Add at least 4 learning outcomes shown on the course page.</p>
                    <div className="space-y-2">
                      {course.whatYouLearn.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-brand-400 shrink-0" />
                          <input
                            value={item}
                            onChange={e => updateListItem('whatYouLearn', i, e.target.value)}
                            placeholder={`Learning outcome ${i + 1}`}
                            className="input flex-1"
                          />
                          {course.whatYouLearn.length > 2 && (
                            <button onClick={() => removeListItem('whatYouLearn', i)}
                              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50">
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <button onClick={() => addListItem('whatYouLearn')}
                      className="mt-3 flex items-center gap-1.5 text-sm text-brand-600 font-semibold hover:text-brand-700 transition-colors">
                      <Plus className="w-4 h-4" /> Add outcome
                    </button>
                  </div>

                  {/* Requirements */}
                  <div className="card p-6">
                    <h3 className="font-bold text-gray-900 mb-1">Requirements / Prerequisites</h3>
                    <p className="text-xs text-gray-500 mb-4">What should students know before taking this course?</p>
                    <div className="space-y-2">
                      {course.requirements.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full border-2 border-gray-300 shrink-0 mt-0.5" />
                          <input
                            value={item}
                            onChange={e => updateListItem('requirements', i, e.target.value)}
                            placeholder={`Requirement ${i + 1}`}
                            className="input flex-1"
                          />
                          {course.requirements.length > 1 && (
                            <button onClick={() => removeListItem('requirements', i)}
                              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50">
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <button onClick={() => addListItem('requirements')}
                      className="mt-3 flex items-center gap-1.5 text-sm text-brand-600 font-semibold hover:text-brand-700 transition-colors">
                      <Plus className="w-4 h-4" /> Add requirement
                    </button>
                  </div>
                </div>
              )}

              {/* ══ STEP 2 — Description ═════════════════════ */}
              {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <StepHeader
                    step={2} title="Course Description"
                    desc="A detailed description helps students decide if this course is right for them."
                  />
                  <div className="card p-6 space-y-5">
                    <Field label="Full Description *" hint="Min 200 characters. Markdown supported.">
                      <textarea
                        value={course.description}
                        onChange={e => updateCourse({ description: e.target.value })}
                        placeholder={`Describe what this course covers, who it's for, and what students will build.\n\nExample:\nThis course takes you from absolute beginner to confident Python developer. You'll learn the fundamentals, build three real projects, and gain skills you can use immediately in your career or studies.`}
                        className="input resize-y font-mono text-sm leading-relaxed"
                        rows={14}
                      />
                      <p className="text-xs text-gray-400 mt-1">{course.description.length} characters</p>
                    </Field>

                    {/* Tips box */}
                    <div className="bg-brand-50 border border-brand-100 rounded-xl p-4">
                      <p className="text-xs font-bold text-brand-700 mb-2 flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5" /> Tips for a great description
                      </p>
                      <ul className="space-y-1 text-xs text-brand-700">
                        <li>• Start with who this course is for</li>
                        <li>• Explain what they will be able to do after</li>
                        <li>• Mention the projects they will build</li>
                        <li>• Keep it conversational — write for students, not search engines</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* ══ STEP 3 — Curriculum ══════════════════════ */}
              {step === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <StepHeader
                    step={3} title="Course Curriculum"
                    desc={`Add sections and lessons. ${totalLessons} lesson${totalLessons !== 1 ? 's' : ''} across ${sections.length} section${sections.length !== 1 ? 's' : ''} so far.`}
                  />

                  {/* Sections */}
                  <div className="space-y-4">
                    {sections.map((section, si) => (
                      <div key={section.id} className="card overflow-hidden">
                        {/* Section header */}
                        <div className="flex items-center gap-3 px-5 py-4 bg-gray-50 border-b border-gray-100">
                          <GripVertical className="w-4 h-4 text-gray-300 shrink-0 cursor-grab" />
                          <div className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs font-extrabold flex items-center justify-center shrink-0">
                            {si + 1}
                          </div>
                          <input
                            value={section.title}
                            onChange={e => updateSection(section.id, e.target.value)}
                            placeholder={`Section ${si + 1} title, e.g. "Getting Started"`}
                            className="flex-1 bg-transparent border-none outline-none text-sm font-bold text-gray-900 placeholder-gray-400 min-w-0"
                          />
                          <div className="flex items-center gap-1 shrink-0">
                            <button onClick={() => toggleSection(section.id)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 text-gray-500 transition-colors">
                              {expandedSections.has(section.id)
                                ? <ChevronUp className="w-4 h-4" />
                                : <ChevronDown className="w-4 h-4" />}
                            </button>
                            {sections.length > 1 && (
                              <button onClick={() => removeSection(section.id)}
                                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Lessons */}
                        {expandedSections.has(section.id) && (
                          <div className="divide-y divide-gray-50">
                            {section.lessons.map((lesson, li) => (
                              <LessonEditor
                                key={lesson.id}
                                lesson={lesson}
                                index={li}
                                isExpanded={expandedLessons.has(lesson.id)}
                                onToggle={() => toggleLesson(lesson.id)}
                                onChange={patch => updateLesson(section.id, lesson.id, patch)}
                                onRemove={() => removeLesson(section.id, lesson.id)}
                                canRemove={section.lessons.length > 1}
                              />
                            ))}

                            {/* Add lesson */}
                            <div className="px-5 py-3">
                              <button onClick={() => addLesson(section.id)}
                                className="flex items-center gap-2 text-sm text-brand-600 font-semibold hover:text-brand-700 transition-colors">
                                <Plus className="w-4 h-4" /> Add Lesson
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Add section */}
                  <button onClick={addSection}
                    className="btn-secondary w-full py-3.5 gap-2 border-dashed">
                    <Plus className="w-4 h-4" /> Add New Section
                  </button>

                  {/* Summary */}
                  <div className="card p-4 bg-brand-50 border-brand-100">
                    <div className="flex items-center gap-6 text-sm text-brand-800 flex-wrap">
                      <span className="flex items-center gap-1.5 font-semibold">
                        <BookOpen className="w-4 h-4" /> {sections.length} sections
                      </span>
                      <span className="flex items-center gap-1.5 font-semibold">
                        <PlayCircle className="w-4 h-4" /> {totalLessons} lessons
                      </span>
                      <span className="flex items-center gap-1.5 font-semibold">
                        <Eye className="w-4 h-4" />
                        {sections.reduce((s, sec) => s + sec.lessons.filter(l => l.isPreview).length, 0)} free previews
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ══ STEP 4 — Pricing ═════════════════════════ */}
              {step === 4 && (
                <div className="space-y-6 animate-fade-in">
                  <StepHeader
                    step={4} title="Pricing"
                    desc="Set your course price. You can always change this later."
                  />
                  <div className="card p-6 space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field label="Price (₹) *" hint="Enter 0 for a free course">
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">₹</span>
                          <input
                            type="number" min="0"
                            value={course.price}
                            onChange={e => updateCourse({ price: e.target.value })}
                            placeholder="2999"
                            className="input pl-8"
                          />
                        </div>
                      </Field>
                      <Field label="Discount Price (₹)" hint="Optional — shown as sale price">
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">₹</span>
                          <input
                            type="number" min="0"
                            value={course.discountPrice}
                            onChange={e => updateCourse({ discountPrice: e.target.value })}
                            placeholder="1999"
                            className="input pl-8"
                          />
                        </div>
                      </Field>
                    </div>

                    {/* Price preview */}
                    {course.price && (
                      <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Price Preview</p>
                        <div className="flex items-baseline gap-3">
                          <span className="text-3xl font-extrabold text-gray-900">
                            ₹{course.discountPrice || course.price}
                          </span>
                          {course.discountPrice && Number(course.discountPrice) < Number(course.price) && (
                            <>
                              <span className="text-lg text-gray-400 line-through">₹{course.price}</span>
                              <span className="badge bg-red-50 text-red-600 border-red-100 text-xs font-bold">
                                {Math.round(((Number(course.price) - Number(course.discountPrice)) / Number(course.price)) * 100)}% off
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="notice-info text-xs">
                      <Info className="w-4 h-4 shrink-0 text-brand-600" />
                      <p>Genesys Academy takes a <strong>20% platform fee</strong>. Your earnings = 80% of the selling price per enrolment.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ══ STEP 5 — Review ══════════════════════════ */}
              {step === 5 && (
                <div className="space-y-6 animate-fade-in">
                  <StepHeader
                    step={5} title="Review & Submit"
                    desc="Check everything looks good before submitting for review."
                  />

                  {/* Summary card */}
                  <div className="card overflow-hidden">
                    <div className="bg-gradient-to-r from-brand-700 to-brand-600 px-6 py-6 text-white">
                      <div className="flex items-start gap-4">
                        {thumbnailPreview
                          ? <img src={thumbnailPreview} alt="" className="w-20 h-14 rounded-xl object-cover shrink-0 border-2 border-white/30" />
                          : <div className="w-20 h-14 rounded-xl bg-white/20 flex items-center justify-center shrink-0 text-2xl">📚</div>
                        }
                        <div className="min-w-0">
                          <h2 className="text-xl font-extrabold leading-tight mb-1">
                            {course.title || <span className="opacity-50">Untitled Course</span>}
                          </h2>
                          <p className="text-brand-200 text-sm line-clamp-2">{course.shortDescription}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-5 grid sm:grid-cols-2 gap-4">
                      {[
                        { label: 'Category',  value: course.category   || '—' },
                        { label: 'Level',     value: LEVELS.find(l => l.value === course.level)?.label || '—' },
                        { label: 'Language',  value: course.language   || '—' },
                        { label: 'Price',     value: course.price ? `₹${course.price}` : '—' },
                        { label: 'Sections',  value: `${sections.length}` },
                        { label: 'Lessons',   value: `${totalLessons}` },
                        { label: 'Outcomes',  value: `${course.whatYouLearn.filter(Boolean).length}` },
                        { label: 'Requirements', value: `${course.requirements.filter(Boolean).length}` },
                      ].map(row => (
                        <div key={row.label} className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-gray-500 w-24 shrink-0">{row.label}</span>
                          <span className="text-sm font-bold text-gray-900">{row.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Checklist */}
                  <div className="card p-5">
                    <p className="text-sm font-bold text-gray-900 mb-4">Submission Checklist</p>
                    <div className="space-y-2.5">
                      {[
                        { label: 'Course title (min 5 chars)',       ok: course.title.trim().length >= 5 },
                        { label: 'Category selected',                ok: !!course.category },
                        { label: 'Full description (min 20 chars)',  ok: course.description.trim().length >= 20 },
                        { label: 'At least 2 learning outcomes',     ok: course.whatYouLearn.filter(Boolean).length >= 2 },
                        { label: 'At least 1 section with 1 lesson', ok: sections.some(s => s.title && s.lessons.some(l => l.title)) },
                        { label: 'Price set',                        ok: !!course.price },
                      ].map(item => (
                        <div key={item.label} className="flex items-center gap-2.5">
                          <div className={clsx(
                            'w-5 h-5 rounded-full flex items-center justify-center shrink-0',
                            item.ok ? 'bg-green-100' : 'bg-gray-100',
                          )}>
                            <CheckCircle className={clsx('w-3.5 h-3.5', item.ok ? 'text-green-600' : 'text-gray-300')} />
                          </div>
                          <span className={clsx('text-sm', item.ok ? 'text-gray-700' : 'text-gray-400')}>
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button onClick={handleSubmit}
                    className="btn-primary w-full py-4 text-base gap-2">
                    <Send className="w-5 h-5" /> Submit Course for Review
                  </button>
                </div>
              )}

              {/* ── Prev / Next navigation */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setStep(s => Math.max(1, s - 1))}
                  disabled={step === 1}
                  className="btn-secondary gap-2 disabled:opacity-40">
                  <ArrowLeft className="w-4 h-4" /> Previous
                </button>
                {step < 5 && (
                  <button
                    onClick={() => setStep(s => Math.min(5, s + 1))}
                    className={clsx('btn-primary gap-2', !canProceed() && 'opacity-60 cursor-not-allowed')}
                  >
                    Next Step <ArrowLeft className="w-4 h-4 rotate-180" />
                  </button>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// ── LessonEditor component ────────────────────────────────
function LessonEditor({
  lesson, index, isExpanded, onToggle, onChange, onRemove, canRemove,
}: {
  lesson: LessonDraft; index: number;
  isExpanded: boolean; onToggle: () => void;
  onChange: (p: Partial<LessonDraft>) => void;
  onRemove: () => void; canRemove: boolean;
}) {
  const TypeIcon = LESSON_TYPE_OPTS.find(t => t.value === lesson.type)?.icon ?? PlayCircle;
  const typeColor = LESSON_TYPE_OPTS.find(t => t.value === lesson.type)?.color ?? 'text-gray-500';

  return (
    <div className="border-l-2 border-transparent hover:border-brand-200 transition-colors">
      {/* Lesson row header */}
      <div className="flex items-center gap-3 px-5 py-3">
        <GripVertical className="w-3.5 h-3.5 text-gray-300 shrink-0 cursor-grab" />
        <TypeIcon className={clsx('w-4 h-4 shrink-0', typeColor)} />
        <span className="text-xs text-gray-400 shrink-0 w-5">{index + 1}.</span>
        <span className="flex-1 text-sm text-gray-700 truncate min-w-0 font-medium">
          {lesson.title || <span className="text-gray-400 italic">Untitled lesson</span>}
        </span>
        {lesson.isPreview && (
          <span className="badge-brand text-[10px] shrink-0">Preview</span>
        )}
        {lesson.duration && (
          <span className="text-xs text-gray-400 shrink-0 tabular-nums flex items-center gap-1">
            <Clock className="w-3 h-3" />{lesson.duration}
          </span>
        )}
        <div className="flex items-center gap-1 shrink-0">
          <button onClick={onToggle}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          {canRemove && (
            <button onClick={onRemove}
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-500 transition-colors">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Expanded lesson form */}
      {isExpanded && (
        <div className="mx-5 mb-4 bg-gray-50 rounded-2xl border border-gray-100 p-5 space-y-4 animate-fade-in">
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Title */}
            <div className="sm:col-span-2">
              <label className="label">Lesson Title *</label>
              <input
                value={lesson.title}
                onChange={e => onChange({ title: e.target.value })}
                placeholder="e.g. Introduction & Installation"
                className="input"
              />
            </div>

            {/* Type */}
            <div>
              <label className="label">Lesson Type</label>
              <div className="grid grid-cols-2 gap-2">
                {LESSON_TYPE_OPTS.map(opt => (
                  <button key={opt.value} type="button"
                    onClick={() => onChange({ type: opt.value })}
                    className={clsx(
                      'flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-semibold transition-all',
                      lesson.type === opt.value
                        ? 'bg-white border-brand-400 text-brand-700 shadow-sm'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300',
                    )}>
                    <opt.icon className={clsx('w-4 h-4 shrink-0', lesson.type === opt.value ? opt.color : 'text-gray-400')} />
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="label">Duration</label>
              <div className="relative">
                <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  value={lesson.duration}
                  onChange={e => onChange({ duration: e.target.value })}
                  placeholder="12:30"
                  className="input pl-10"
                />
              </div>
            </div>
          </div>

          {/* Video URL — only for video lessons */}
          {lesson.type === 'video' && (
            <div>
              <label className="label">Video URL</label>
              <div className="relative">
                <Video className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  value={lesson.videoUrl}
                  onChange={e => onChange({ videoUrl: e.target.value })}
                  placeholder="https://youtube.com/watch?v=... or S3 URL"
                  className="input pl-10"
                  type="url"
                />
              </div>
              {lesson.videoUrl && (
                <div className="mt-2 p-2.5 bg-white rounded-xl border border-gray-200 flex items-center gap-2 text-xs text-gray-500">
                  <PlayCircle className="w-4 h-4 text-brand-500 shrink-0" />
                  <span className="truncate font-mono">{lesson.videoUrl}</span>
                  <button onClick={() => onChange({ videoUrl: '' })}
                    className="shrink-0 hover:text-red-500 transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Description */}
          <div>
            <label className="label">Lesson Description</label>
            <textarea
              value={lesson.description}
              onChange={e => onChange({ description: e.target.value })}
              placeholder="What will students learn in this lesson? Any key concepts or tips to mention?"
              className="input resize-none text-sm"
              rows={3}
            />
          </div>

          {/* Free preview toggle */}
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <div onClick={() => onChange({ isPreview: !lesson.isPreview })}
              className={clsx(
                'w-10 h-6 rounded-full flex items-center transition-colors duration-200 px-0.5',
                lesson.isPreview ? 'bg-brand-600' : 'bg-gray-200',
              )}>
              <div className={clsx(
                'w-5 h-5 rounded-full bg-white shadow transition-transform duration-200',
                lesson.isPreview ? 'translate-x-4' : 'translate-x-0',
              )} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Free Preview</p>
              <p className="text-xs text-gray-400">Students can watch this without enrolling</p>
            </div>
          </label>
        </div>
      )}
    </div>
  );
}

// ── Small reusable components ─────────────────────────────
function StepHeader({ step, title, desc }: { step: number; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-2xl bg-brand-600 flex items-center justify-center text-white font-extrabold text-lg shrink-0">
        {step}
      </div>
      <div>
        <h2 className="text-xl font-extrabold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500 mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="label">{label}</label>
      {hint && <p className="text-xs text-gray-400 mb-1.5">{hint}</p>}
      {children}
    </div>
  );
}

// ── Export with guard ─────────────────────────────────────
export default function NewCoursePage() {
  return (
    <Guard roles={['instructor', 'admin']}>
      <CourseEditorInner />
    </Guard>
  );
}
