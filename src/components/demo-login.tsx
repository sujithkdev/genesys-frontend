'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  GraduationCap, BookOpen, Users, Award, CheckCircle,
  ArrowRight, Loader2, Eye, EyeOff, Lock, Mail,
} from 'lucide-react';
import { clsx } from 'clsx';
import { useSession } from './session';
import { DEMO_CREDENTIALS } from '@/lib/demo-data';

const FEATURES = [
  { icon: BookOpen,     text: '4 hands-on courses' },
  { icon: Users,        text: 'Student & Mentor views' },
  { icon: Award,        text: 'Progress tracking' },
  { icon: CheckCircle,  text: 'Full UI — no backend needed' },
];

export function DemoLoginPage() {
  const router = useRouter();
  const { login } = useSession();

  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]   = useState(false);
  const [busy, setBusy]       = useState(false);
  const [error, setError]     = useState('');

  /** Fill credentials from a demo card click */
  const fillCreds = (e: string, p: string) => {
    setEmail(e);
    setPassword(p);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const user = await login(email.trim(), password);
      router.push(
        user.role === 'admin'      ? '/admin' :
        user.role === 'instructor' ? '/instructor/dashboard' :
        '/dashboard',
      );
    } catch (err: any) {
      setError(err.message || 'Invalid credentials.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* ── LEFT — branding panel ──────────────────────── */}
      <div className="hidden lg:flex lg:w-[42%] xl:w-[38%] bg-gradient-to-br from-[#0f0c29] via-[#1a1560] to-[#312e81] flex-col justify-between p-10 xl:p-14 relative overflow-hidden">
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        {/* Glow blob */}
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-brand-600/20 blur-[90px]" />

        {/* Logo */}
        <Link href="/" className="relative flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center group-hover:bg-brand-400 transition-colors">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-extrabold text-white tracking-tight">Genesys Academy</span>
            <span className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
              Learn · Build · Grow
            </span>
          </div>
        </Link>

        {/* Middle */}
        <div className="relative space-y-6">
          <div>
            <h2 className="text-3xl font-extrabold text-white leading-tight mb-3">
              See the platform<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-400">
                in action
              </span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Log in as a Student or Mentor to explore the full UI — dashboards, course catalog, classroom and more.
            </p>
          </div>

          <div className="space-y-3">
            {FEATURES.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-brand-300" />
                </div>
                <span className="text-sm text-gray-300">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Demo credentials preview */}
        <div className="relative space-y-3">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Demo accounts</p>
          {DEMO_CREDENTIALS.map(c => (
            <div key={c.role} className="bg-white/8 border border-white/10 rounded-xl p-3 flex items-center gap-3">
              <div className={clsx('w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0', c.color)}>
                {c.role === 'student' ? 'S' : c.role === 'instructor' ? 'M' : 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white">{c.label}</p>
                <p className="text-[11px] text-gray-400 truncate">{c.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT — form panel ─────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-10 xl:p-16 bg-white">
        <div className="w-full max-w-lg xl:max-w-xl">

          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-6 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-extrabold text-gray-900">Genesys Academy</span>
          </div>

          <div className="mb-7">
            <p className="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-2">Genesys Academy</p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1.5 tracking-tight">
              Welcome back!
            </h1>
            <p className="text-sm text-gray-500">Sign in to continue your learning journey.</p>
          </div>

          {/* ── Quick-fill demo cards ── */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Click a demo account to auto-fill:
            </p>
            <div className="grid grid-cols-2 gap-3">
              {DEMO_CREDENTIALS.map(c => (
                <button
                  key={c.role}
                  type="button"
                  onClick={() => fillCreds(c.email, c.password)}
                  className={clsx(
                    'group relative flex flex-col items-start gap-1.5 p-3.5 rounded-2xl border-2 text-left transition-all duration-150',
                    email === c.email
                      ? 'border-brand-500 bg-brand-50 shadow-sm shadow-brand-100'
                      : 'border-gray-100 hover:border-brand-200 hover:bg-gray-50',
                  )}
                >
                  <div className={clsx('w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-extrabold shrink-0', c.color)}>
                    {c.role === 'student' ? 'S' : c.role === 'instructor' ? 'M' : 'A'}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{c.label}</p>
                    <p className="text-[11px] text-gray-400 leading-snug mt-0.5">{c.description}</p>
                  </div>
                  {email === c.email && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-brand-600 flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400 font-medium">or enter manually</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Error */}
          {error && (
            <div className="notice-error mb-5">
              <p>{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(''); }}
                  placeholder="student@demo.com"
                  className="input pl-10"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="label mb-0">Password</label>
                <span className="text-xs text-gray-400">demo1234</span>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  placeholder="••••••••"
                  className="input pl-10 pr-11"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={busy}
              className="btn-primary w-full py-3.5 text-base mt-1"
            >
              {busy
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in…</>
                : <>Sign In <ArrowRight className="w-4 h-4" /></>
              }
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-500">
            Back to{' '}
            <Link href="/" className="text-brand-600 font-semibold hover:underline">
              home page
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
