'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  Menu, X, GraduationCap, User, ChevronDown,
  LogOut, LayoutDashboard, BookOpen, Shield,
} from 'lucide-react';
import { useSession } from '@/components/session';
import { clsx } from 'clsx';

const NAV_LINKS = [
  { label: 'Courses',  href: '/courses' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact',  href: '/contact' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled]         = useState(false);
  const { user, loading, logout }       = useSession();
  const router   = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setUserMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const dashboardHref =
    user?.role === 'admin'      ? '/admin' :
    user?.role === 'instructor' ? '/instructor/dashboard' :
    '/dashboard';

  const handleLogout = async () => {
    setUserMenuOpen(false);
    try { await logout(); } catch {}
    router.push('/');
  };

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={clsx(
          'sticky top-0 z-50 w-full bg-white',
          scrolled ? 'shadow-md' : 'border-b border-gray-100',
        )}
      >
        {/* Full-width inner — matches page-container padding but lets bg bleed */}
        <div className="page-container">
          <div className="flex h-16 items-center gap-6">

            {/* ── Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center shadow-sm shrink-0">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div className="leading-tight hidden xs:block">
                <span className="text-[15px] font-extrabold text-gray-900 tracking-tight block">Genesys</span>
                <span className="text-[10px] text-gray-400 font-medium block -mt-0.5">Educational Academy</span>
              </div>
            </Link>

            {/* ── Desktop nav links — centred in remaining space */}
            <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
              {NAV_LINKS.map(({ label, href }) => (
                <Link key={href} href={href}
                  className={clsx(
                    'px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap',
                    isActive(href)
                      ? 'text-brand-600 bg-brand-50'
                      : 'text-gray-600 hover:text-brand-600 hover:bg-gray-50',
                  )}>
                  {label}
                </Link>
              ))}
            </div>

            {/* ── Right side actions */}
            <div className="flex items-center gap-2 shrink-0 ml-auto md:ml-0">
              {!loading && (
                user ? (
                  /* ── User avatar dropdown */
                  <div className="relative">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      aria-expanded={userMenuOpen}
                      aria-haspopup="true"
                      className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-gray-100 active:bg-gray-200 transition-colors min-h-[44px]"
                    >
                      <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs font-bold shrink-0 overflow-hidden">
                        {user.avatar_url
                          ? <img src={user.avatar_url} alt="" className="w-full h-full object-cover" />
                          : `${user.first_name[0]}${user.last_name[0]}`
                        }
                      </div>
                      <span className="hidden sm:block text-sm font-semibold text-gray-800 max-w-[100px] truncate">
                        {user.first_name}
                      </span>
                      <ChevronDown className={clsx(
                        'w-4 h-4 text-gray-400 hidden sm:block transition-transform duration-200',
                        userMenuOpen && 'rotate-180',
                      )} />
                    </button>

                    {userMenuOpen && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                        <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-gray-100 bg-white shadow-2xl z-20 py-2 animate-fade-in overflow-hidden">
                          <div className="px-4 py-3 border-b border-gray-100">
                            <p className="text-sm font-bold text-gray-900 truncate">{user.first_name} {user.last_name}</p>
                            <p className="text-xs text-gray-400 truncate mt-0.5">{user.email}</p>
                            <span className="mt-1.5 inline-flex badge badge-brand capitalize text-[10px]">{user.role}</span>
                          </div>
                          <div className="py-1">
                            {[
                              { icon: LayoutDashboard, label: 'Dashboard',   href: dashboardHref },
                              { icon: BookOpen,        label: 'My Learning', href: '/dashboard' },
                              ...(user.role === 'admin' ? [{ icon: Shield, label: 'Admin Panel', href: '/admin' }] : []),
                            ].map(item => (
                              <Link key={item.label} href={item.href}
                                onClick={() => setUserMenuOpen(false)}
                                className="flex items-center gap-2.5 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors">
                                <item.icon className="w-4 h-4 text-gray-400 shrink-0" />
                                {item.label}
                              </Link>
                            ))}
                          </div>
                          <div className="border-t border-gray-100 pt-1">
                            <button onClick={handleLogout}
                              className="flex w-full items-center gap-2.5 px-4 py-3 text-sm text-red-600 hover:bg-red-50 active:bg-red-100 transition-colors">
                              <LogOut className="w-4 h-4 shrink-0" /> Sign out
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  /* ── Guest buttons */
                  <div className="flex items-center gap-2">
                    <Link href="/login"
                      className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-brand-600 px-3 py-2 min-h-[44px] rounded-lg hover:bg-gray-50 transition-colors">
                      <User className="w-4 h-4" />
                      Sign In
                    </Link>
                    <Link href="/register"
                      className="flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors min-h-[44px] shadow-sm whitespace-nowrap">
                      Enquire Now →
                    </Link>
                  </div>
                )
              )}

              {/* ── Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-expanded={mobileOpen}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                className="flex md:hidden items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-colors shrink-0"
              >
                {mobileOpen
                  ? <X className="w-5 h-5 text-gray-700" />
                  : <Menu className="w-5 h-5 text-gray-700" />
                }
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile fullscreen overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex flex-col bg-white safe-top">
          <div className="flex items-center justify-between px-4 h-16 border-b border-gray-100 shrink-0">
            <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-gray-900">Genesys</span>
            </Link>
            <button onClick={() => setMobileOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100">
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <Link key={href} href={href}
                onClick={() => setMobileOpen(false)}
                className={clsx(
                  'flex items-center px-4 py-3.5 rounded-2xl text-base font-semibold transition-colors',
                  isActive(href)
                    ? 'bg-brand-50 text-brand-600'
                    : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100',
                )}>
                {label}
              </Link>
            ))}

            {!loading && (
              user ? (
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-1">
                  <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">My Account</p>
                  <Link href={dashboardHref} onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-base font-semibold text-gray-700 hover:bg-gray-50">
                    <LayoutDashboard className="w-5 h-5 text-gray-400" /> Dashboard
                  </Link>
                  <Link href="/dashboard" onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-base font-semibold text-gray-700 hover:bg-gray-50">
                    <BookOpen className="w-5 h-5 text-gray-400" /> My Learning
                  </Link>
                  <button onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-base font-semibold text-red-600 hover:bg-red-50">
                    <LogOut className="w-5 h-5" /> Sign out
                  </button>
                </div>
              ) : (
                <div className="mt-6 flex flex-col gap-3">
                  <Link href="/login" onClick={() => setMobileOpen(false)}
                    className="w-full flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 font-bold px-6 py-3.5 rounded-2xl text-base hover:border-brand-300">
                    <User className="w-5 h-5" /> Sign In
                  </Link>
                  <Link href="/register" onClick={() => setMobileOpen(false)}
                    className="w-full flex items-center justify-center bg-brand-600 hover:bg-brand-700 text-white font-bold px-6 py-3.5 rounded-2xl text-base shadow-md">
                    Enquire Now →
                  </Link>
                </div>
              )
            )}
          </nav>

          <div className="shrink-0 border-t border-gray-100 px-4 py-4 safe-bottom">
            <a href="tel:+919976605040"
              className="flex items-center justify-center gap-2 w-full bg-green-50 border border-green-200 text-green-700 font-bold py-3.5 rounded-2xl text-sm">
              📞 Call Us: +91 99766 05040
            </a>
          </div>
        </div>
      )}
    </>
  );
}
