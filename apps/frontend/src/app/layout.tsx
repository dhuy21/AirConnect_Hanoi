import type { Metadata } from 'next';
import './globals.css';
import { DEMONSTRATOR_NOTICE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'AirConnect Hanoi',
  description: 'Collaborative platform for Hanoi facility managers to combat air pollution',
  // The online demonstrator asks search engines not to index it (NFR-002, DEC-118).
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div role="note" className="bg-amber-100 text-amber-900 text-center text-xs font-medium py-1 px-4">
          {DEMONSTRATOR_NOTICE}
        </div>
        {children}
      </body>
    </html>
  );
}
