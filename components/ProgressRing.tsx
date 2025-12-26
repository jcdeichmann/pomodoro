import type { TimerMode } from '@/types';

interface ProgressRingProps {
  progress: number;
  mode: TimerMode;
}

export function ProgressRing({ progress, mode }: ProgressRingProps) {
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-80 h-80 flex items-center justify-center">
      <svg className="absolute w-full h-full -rotate-90">
        {/* Background circle */}
        <circle
          cx="160"
          cy="160"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-gray-700"
        />
        {/* Progress circle */}
        <circle
          cx="160"
          cy="160"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={`transition-all duration-1000 ease-linear ${
            mode === 'work' ? 'text-red-500' : 'text-green-500'
          }`}
        />
      </svg>
    </div>
  );
}
