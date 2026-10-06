'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api, post } from '@/lib/api';
import { useSession } from './session';
import {
  GraduationCap, Eye, EyeOff, ArrowRight, BookOpen,
  Users, Award, CheckCircle, Loader2, Mail, Lock,
  User, ArrowLeft
} from 'lucide-react';
import { clsx } from 'clsx';

type AuthMode =
  | 'login' | 'register' | 'forgot-password'
  | 'reset-password' | 'verify-email' | 'resend-verification';

const FEATURES = [
  { icon: BookOpen, text: '100+ expert-led courses' },
  { icon: Users,    text: '10,000+ active learners' },
  { icon: Award,    text: 'Industry-recognised certificates' },
  { icon: CheckCircle, text: 'Lifetime course access' },
];

const META: Record<AuthMode, { title: string; subtitle: string; cta: string }> = {
  'login': {
    title: 'Welcome back!',
    subtitle: 'Sign in to continue your learning journey.',
    cta: 'Sign In',
  },
  'register': {
    title: 'Start learning today',
    subtitle: 'Create your free account and join thousands of learners.',
    cta: 'Create Account',
  },
  'forgot-password': {
    title: 'Forgot password?',
    subtitle: "Enter your email and we'll send you a reset link.",
    cta: 'Send Reset Link',
  },
  'reset-password': {
    title: 'Set new password',
    subtitle: 'Choose a strong password to secure your account.',
    cta: 'Reset Password',
  },
  'verify-email': {
    title: 'Verify your email',
    subtitle: 'Click the button below to activate your account.',
    cta: 'Verify Email',
  },
  'resend-verification': {
    title: 'Resend verification',
    subtitle: "Enter your email and we'll send a new verification link.",
    cta: 'Resend Email',
  },
};

export function AuthPage({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const { login } = useSession();
  const [busy, setBusy]       = useState(false);
  const [error, setError]     = useState('');
  const [message, setMessage] = useState('');
  const [showPw, setShowPw]   = useState(false);

  const meta = META[mode] || META['login'];

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setError(''); setMessage('');
    const fields = Object.fromEntries(new FormData(event.currentTarget));

    try {
      if (mode === 'login') {
        const user = await login(String(fields.email), String(fields.password));
        router.push(
          user.role === 'admin'       ? '/admin' :
          user.role === 'instructor'  ? '/instructor/dashboard' :
          '/dashboard'
        );
      } else if (mode === 'verify-email') {
        const token = new URLSearchParams(window.location.search).get('token');
        if (!token) throw new Error('Open the verification link from your email.');
        const data = await api(`/auth/verify-email?token=${encodeURIComponent(token)}`);
        setMessage(data.message);
      } else {
        if (mode === 'reset-password') {
          fields.token = new URLSearchParams(window.location.search).get('token') || '';
        }
        const data = await post(`/auth/${mode}`, fields);
        setMessage(data.message);
      }
    } catch (e: any) {
      setError(e.message || 'Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* ── Left panel — branding (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[40%] bg-gradient-to-br from-[#0f0c29] via-[#1a1560] to-[#312e81] flex-col justify-between p-12 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        {/* Glow */}
        <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-brand-600/25 blur-[80px]" />

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

        {/* Middle content */}
        <div className="relative">
          <h2 className="text-3xl font-extrabold text-white mb-3 leading-tight">
            Build skills that<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-400">
              move careers forward
            </span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
            Join thousands of learners mastering in-demand skills in tech, business, and design.
          </p>
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

        {/* Testimonial */}
        <div className="relative bg-white/8 border border-white/10 rounded-2xl p-5">
          <p className="text-sm text-gray-300 italic leading-relaxed mb-3">
            &ldquo;Genesys helped me land my first developer job in 6 months. The courses are incredibly practical.&rdquo;
          </p>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs font-bold">RS</div>
            <div>
              <p className="text-xs font-semibold text-white">Rahul Singh</p>
              <p className="text-xs text-gray-500">Full-Stack Developer, Bangalore</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right panel — form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-10 bg-white dark:bg-gray-950">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-extrabold text-gray-900 dark:text-white">Genesys Academy</span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <p className="text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-2">
              Genesys Academy
            </p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
              {meta.title}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{meta.subtitle}</p>
          </div>

          {/* Alerts */}
          {message && (
            <div className="notice-success mb-6">
              <CheckCircle className="w-5 h-5 shrink-0 text-green-600" />
              <p>{message}</p>
            </div>
          )}
          {error && (
            <div className="notice-error mb-6">
              <p>{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={submit} className="space-y-4">

            {/* Name fields — register only */}
            {mode === 'register' && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">First name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input name="first_name" autoComplete="given-name" minLength={2} maxLength={50} required
                      placeholder="Arjun"
                      className="input pl-10" />
                  </div>
                </div>
                <div>
                  <label className="label">Last name</label>
                  <input name="last_name" autoComplete="family-name" minLength={2} maxLength={50} required
                    placeholder="Mehta"
                    className="input" />
                </div>
              </div>
            )}

            {/* Email */}
            {!['verify-email', 'reset-password'].includes(mode) && (
              <div>
                <label className="label">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input name="email" type="email" autoComplete="email" required
                    placeholder="you@example.com"
                    className="input pl-10" />
                </div>
              </div>
            )}

            {/* Password */}
            {['login', 'register', 'reset-password'].includes(mode) && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="label mb-0">Password</label>
                  {mode === 'login' && (
                    <Link href="/forgot-password" className="text-xs text-brand-600 dark:text-brand-400 hover:underline">
                      Forgot password?
                    </Link>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    name="password"
                    type={showPw ? 'text' : 'password'}
                    minLength={mode === 'login' ? 1 : 8}
                    maxLength={72}
                    autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                    required
                    placeholder={mode === 'login' ? '••••••••' : 'Min 8 characters'}
                    className="input pl-10 pr-11"
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {mode !== 'login' && (
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5">
                    8–72 characters, including uppercase, lowercase and a number.
                  </p>
                )}
              </div>
            )}

            {/* Terms checkbox — register */}
            {mode === 'register' && (
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" required className="mt-0.5 w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
                <span className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  I agree to the{' '}
                  <Link href="/terms" className="text-brand-600 dark:text-brand-400 hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-brand-600 dark:text-brand-400 hover:underline">Privacy Policy</Link>
                </span>
              </label>
            )}

            {/* Submit */}
            <button type="submit" disabled={busy}
              className={clsx('btn-primary w-full py-3.5 text-base mt-2', busy && 'opacity-70')}>
              {busy
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Please wait…</>
                : <>{meta.cta} <ArrowRight className="w-4 h-4" /></>
              }
            </button>
          </form>

          {/* Footer links */}
          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 space-y-3 text-center text-sm">
            {mode === 'login' && (
              <>
                <p className="text-gray-500 dark:text-gray-400">
                  Don&apos;t have an account?{' '}
                  <Link href="/register" className="text-brand-600 dark:text-brand-400 font-semibold hover:underline">
                    Sign up free
                  </Link>
                </p>
                <p>
                  <Link href="/resend-verification" className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    Didn&apos;t receive verification email?
                  </Link>
                </p>
              </>
            )}
            {mode === 'register' && (
              <p className="text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
                <Link href="/login" className="text-brand-600 dark:text-brand-400 font-semibold hover:underline">
                  Sign in
                </Link>
              </p>
            )}
            {['forgot-password', 'reset-password', 'verify-email', 'resend-verification'].includes(mode) && (
              <Link href="/login" className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
