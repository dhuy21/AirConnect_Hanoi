'use client';

interface PulseButtonProps {
  children: React.ReactNode;
  variant?: 'green' | 'teal';
  onClick?: () => void;
  className?: string;
}

export function PulseButton({ children, variant = 'green', onClick, className = '' }: PulseButtonProps) {
  const base = variant === 'green'
    ? 'bg-green-400 hover:bg-green-500 text-teal-900'
    : 'bg-teal-400 hover:bg-teal-500 text-white';
  return (
    <button onClick={onClick} className={`px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse hover:animate-none ${base} ${className}`}>
      {children}
    </button>
  );
}
