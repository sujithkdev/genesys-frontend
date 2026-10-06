import { DemoLoginPage } from '@/components/demo-login';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Sign In — Demo' };

export default function LoginPage() {
  return <DemoLoginPage />;
}
