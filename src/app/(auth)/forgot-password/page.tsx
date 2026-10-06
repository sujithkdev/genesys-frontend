import { AuthPage } from '@/components/auth-pages';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Forgot Password' };

export default function ForgotPasswordPage() {
  return <AuthPage mode="forgot-password" />;
}
