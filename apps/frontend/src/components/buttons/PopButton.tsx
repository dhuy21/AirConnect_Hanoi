'use client';

interface PopButtonProps {
  children: React.ReactNode;
  variant?: 'green' | 'teal';
  onClick?: () => void;
  className?: string;
}

export function PopButton({ children, variant = 'green', onClick, className = '' }: PopButtonProps) {
  const base = variant === 'green'
    ? 'bg-green-500 hover:bg-green-600 text-white'
    : 'bg-teal-600 hover:bg-teal-700 text-white';
  return (
    <button onClick={onClick} className={`px-6 py-3 rounded-full font-bold shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 ${base} ${className}`}>
      {children}
    </button>
  );
}
