import type { Metadata } from 'next';
import ResourcesPage from '@/components/pages/ResourcesPage';

export const metadata: Metadata = {
  title: 'Resources — AirConnect Hanoi',
  description: 'Explore case studies, best practices, and news about air quality in Hanoi schools.',
};

export default function Resources() {
  return <ResourcesPage />;
}
