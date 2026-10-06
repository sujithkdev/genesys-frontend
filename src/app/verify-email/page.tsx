import { AuthPage } from '@/components/auth-pages';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Verify Email' };

export default function VerifyEmailPage() {
  return <AuthPage mode="verify-email" />;
}
