'use client';

import Link from 'next/link';
import { GraduationCap, Twitter, Linkedin, Github, Youtube, Mail, MapPin, Phone } from 'lucide-react';

const LINKS = {
  'Quick Links': [
    { label: 'Home',            href: '/' },
    { label: 'Courses',         href: '/courses' },
    { label: 'Instructors',     href: '/instructors' },
    { label: 'Roadmaps',        href: '/roadmaps' },
    { label: 'About Us',        href: '/about' },
  ],
  Support: [
    { label: 'Help Center',     href: '/help' },
    { label: 'Contact Us',      href: '/contact' },
    { label: 'FAQs',            href: '/faqs' },
    { label: 'Privacy Policy',  href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
  ],
};

const SOCIALS = [
  { icon: Youtube,  href: 'https://youtube.com/@genesys',          label: 'YouTube',  color: 'hover:bg-red-600' },
  { icon: Twitter,  href: 'https://twitter.com/genesys',           label: 'Twitter',  color: 'hover:bg-sky-500' },
  { icon: Linkedin, href: 'https://linkedin.com/company/genesys',  label: 'LinkedIn', color: 'hover:bg-blue-600' },
  { icon: Github,   href: 'https://github.com/genesys',            label: 'GitHub',   color: 'hover:bg-gray-700' },
];

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 border-t border-gray-800/60">
      <div className="page-container py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">

          {/* ── Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5 group">
              <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center group-hover:bg-brand-500 transition-colors">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-extrabold text-white tracking-tight">Genesys Academy</span>
                <span className="block text-[9px] font-semibold text-gray-500 uppercase tracking-widest -mt-0.5">
                  Learn · Build · Grow
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 max-w-sm mb-6">
              Access expert-led courses in Programming, Cybersecurity, Cloud, Data Science and more.
              Learn at your own pace, anytime, anywhere.
            </p>

            {/* Contact info */}
            <div className="space-y-2 mb-6">
              <a href="tel:+919976605040"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-gray-500 shrink-0" />
                +91 99766 05040
              </a>
              <a href="mailto:info@genesysacademy.in"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-gray-500 shrink-0" />
                info@genesysacademy.in
              </a>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                <span className="text-gray-400">Near Punjab National Bank, New Bus Stand Road, Perambalur – 621212, TN 🇮🇳</span>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {SOCIALS.map(({ icon: Icon, href, label, color }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  aria-label={label}
                  className={clsx(
                    'w-9 h-9 rounded-xl bg-gray-800 flex items-center justify-center transition-all duration-200 hover:scale-110',
                    color
                  )}>
                  <Icon className="w-4 h-4 text-gray-300" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Link columns */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-5 tracking-wide">{title}</h4>
              <ul className="space-y-3">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors hover:translate-x-0.5 inline-block">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Newsletter strip */}
        <div className="border border-gray-800 rounded-2xl p-6 mt-12 bg-gradient-to-r from-gray-900 to-gray-950">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h5 className="text-white font-semibold mb-1">Subscribe to our newsletter</h5>
              <p className="text-sm text-gray-400">Get the latest updates, new courses and offers.</p>
            </div>
            <form
              onSubmit={e => e.preventDefault()}
              className="flex gap-2 w-full sm:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="input bg-gray-800 border-gray-700 text-white placeholder-gray-500 flex-1 sm:w-56"
              />
              <button type="submit" className="btn-primary shrink-0 px-4">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* ── Bottom bar */}
        <div className="border-t border-gray-800/60 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Genesys EdTech Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Payments secured by Razorpay</span>
            <span className="text-gray-700">·</span>
            <span>Learn Today · Build Tomorrow ❤️</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// inline clsx to avoid import issue in server component
function clsx(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
