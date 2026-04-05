import type { Metadata } from 'next';
import FeedbackPage from '@/components/pages/FeedbackPage';

export const metadata: Metadata = {
  title: 'Feedback — AirConnect Hanoi',
  description: 'Share your feedback and suggestions for improving air quality management in Hanoi.',
};

export default function Feedback() {
  return <FeedbackPage />;
}
