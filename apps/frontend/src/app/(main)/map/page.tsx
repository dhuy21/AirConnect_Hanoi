import type { Metadata } from 'next';
import MapPage from '@/components/pages/MapPage';

export const metadata: Metadata = {
  title: 'School Map — AirConnect Hanoi',
  description: 'View schools on the map and their air quality compliance status.',
};

export default function Map() {
  return <MapPage />;
}
