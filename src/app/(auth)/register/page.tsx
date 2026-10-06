import { AuthPage } from '@/components/auth-pages';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Create Account' };

export default function RegisterPage() {
  return <AuthPage mode="register" />;
}
