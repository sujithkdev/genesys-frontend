import type { Metadata, Viewport } from 'next';
import { SessionProvider } from '@/components/session';
import { Providers } from '@/components/Providers';
import { DemoBanner } from '@/components/demo-banner';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'Genesys Computer Academy', template: '%s | Genesys Academy' },
  description: 'Practical computer training in Perambalur — Python, Java, C, C++, Web Development, Tally and more.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#4f46e5',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-gray-900 antialiased overflow-x-hidden">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Providers>
          <SessionProvider>
            <DemoBanner />
            {children}
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
