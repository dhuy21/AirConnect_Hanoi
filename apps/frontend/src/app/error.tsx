'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h2 className="text-2xl font-bold text-gray-900">Something went wrong</h2>
      <p className="text-gray-500">{error.message}</p>
      <button onClick={reset} className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
        Try again
      </button>
    </div>
  );
}
