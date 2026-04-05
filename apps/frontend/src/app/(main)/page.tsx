import type { Metadata } from 'next';
import HomePage from '@/components/pages/HomePage';

export const metadata: Metadata = {
  title: 'AirConnect Hanoi — Collaborative Air Quality Platform',
  description: 'Platform for Hanoi schools to share air pollution mitigation strategies and track air quality.',
};

export default function Home() {
  return <HomePage />;
}
