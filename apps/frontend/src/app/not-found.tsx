import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-6xl font-bold text-gray-300">404</h1>
      <h2 className="text-2xl font-bold text-gray-900">Page not found</h2>
      <p className="text-gray-500">The page you are looking for does not exist.</p>
      <Link href="/" className="mt-4 px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors">
        Go Home
      </Link>
    </div>
  );
}
