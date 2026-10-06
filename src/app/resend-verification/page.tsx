import { AuthPage } from '@/components/auth-pages';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Resend Verification' };

export default function ResendVerificationPage() {
  return <AuthPage mode="resend-verification" />;
}
