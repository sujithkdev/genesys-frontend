'use client';
/**
 * DEMO MODE — session.tsx
 * All auth is handled locally with hardcoded credentials.
 * No backend calls are made. User state is persisted in sessionStorage
 * so a page refresh keeps the user logged in during the demo.
 */
import {
  createContext, useContext, useEffect, useState, ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { DEMO_USERS } from '@/lib/demo-data';
import { User } from '@/types';

export type Role = 'student' | 'instructor' | 'admin';

// ── Context shape (same public API as the real session.tsx) ─
interface SessionCtx {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  reload: () => Promise<void>;
}

const Context = createContext<SessionCtx | null>(null);

const STORAGE_KEY = 'genesys_demo_user';

export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser]       = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore session from sessionStorage on mount
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setLoading(false);
  }, []);

  const login = async (email: string, _password: string): Promise<User> => {
    const found = DEMO_USERS[email.toLowerCase().trim()];
    if (!found) {
      throw new Error('Invalid credentials. Use student@demo.com or mentor@demo.com with password demo1234');
    }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
    setUser(found);
    return found;
  };

  const logout = async () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  // No-op reload in demo mode (user data never changes)
  const reload = async () => {};

  return (
    <Context.Provider value={{ user, loading, login, logout, reload }}>
      {children}
    </Context.Provider>
  );
}

export function useSession() {
  const ctx = useContext(Context);
  if (!ctx) throw new Error('useSession must be used inside SessionProvider');
  return ctx;
}

/** Route guard — redirects to /login if no user, checks roles if provided */
export function Guard({
  children,
  roles,
}: {
  children: ReactNode;
  roles?: Role[];
}) {
  const { user, loading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-gray-500">
          <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm">Loading workspace…</p>
        </div>
      </div>
    );
  }

  if (roles && !roles.includes(user.role as Role)) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="notice-error max-w-md text-center">
          <p className="font-semibold">Access Denied</p>
          <p className="text-sm mt-1">You don&apos;t have permission to view this page.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
