import Image from 'next/image';
import Link from 'next/link';
import { LEGAL_PAGES } from '@/lib/site';
import { ROUTES } from '@/lib/routes';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-12 pb-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <Image src="/images/Logo.png" alt="AirConnect Hanoi" width={48} height={48} style={{ width: 'auto', height: 'auto' }} />
          <span className="text-lg font-bold text-teal-900">AirConnect Hanoi</span>
        </div>
        <nav aria-label="Legal" className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-600 font-medium">
          {LEGAL_PAGES.map(page => (
            <Link key={page.href} href={page.href} className="hover:text-teal-900 transition-colors">{page.label}</Link>
          ))}
          <Link href={ROUTES.FEEDBACK} className="hover:text-teal-900 transition-colors">Contact</Link>
        </nav>
      </div>
      <div className="max-w-7xl mx-auto mt-8 border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-gray-500">
        <p>© {new Date().getFullYear()} AirConnect Hanoi team · Independent platform — not an official portal</p>
        <p>
          Map data © <a href="https://www.openstreetmap.org/copyright" className="underline hover:text-teal-900">OpenStreetMap</a> contributors
        </p>
      </div>
    </footer>
  );
}
