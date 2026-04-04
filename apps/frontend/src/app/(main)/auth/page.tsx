import type { Metadata } from 'next';
import { Suspense } from 'react';
import AuthPage from '@/components/pages/AuthPage';

export const metadata: Metadata = {
  title: 'Sign In — AirConnect Hanoi',
  description: 'Login or register to access AirConnect Hanoi dashboard.',
};

export default function Auth() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <AuthPage />
    </Suspense>
  );
}
