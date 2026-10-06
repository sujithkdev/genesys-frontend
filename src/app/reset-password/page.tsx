import { AuthPage } from '@/components/auth-pages';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Reset Password' };

export default function ResetPasswordPage() {
  return <AuthPage mode="reset-password" />;
}
