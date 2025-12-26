import type { TimerMode } from '@/types';

interface ModeIndicatorProps {
  mode: TimerMode;
}

export function ModeIndicator({ mode }: ModeIndicatorProps) {
  return (
    <div className="text-center mb-8">
      <h2
        className={`text-2xl font-medium transition-colors duration-500 ${
          mode === 'work' ? 'text-red-400' : 'text-green-400'
        }`}
      >
        {mode === 'work' ? 'Work Time' : 'Break Time'}
      </h2>
    </div>
  );
}
