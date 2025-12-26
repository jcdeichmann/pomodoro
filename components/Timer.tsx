'use client';

import { usePomodoro } from '@/hooks/usePomodoro';
import { formatTime } from '@/lib/utils';
import { ModeIndicator } from './ModeIndicator';
import { ProgressRing } from './ProgressRing';
import { Controls } from './Controls';

export function Timer() {
  const {
    timeLeft,
    isActive,
    mode,
    completedPomodoros,
    progress,
    startTimer,
    pauseTimer,
    resetTimer,
    skipSession,
  } = usePomodoro();

  return (
    <div className="max-w-2xl mx-auto p-8">
      <ModeIndicator mode={mode} />

      <div className="relative flex items-center justify-center">
        <ProgressRing progress={progress} mode={mode} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-8xl md:text-9xl font-bold tabular-nums text-white">
            {formatTime(timeLeft)}
          </div>
          <div className="text-gray-400 text-lg mt-4">
            Completed: {completedPomodoros}
          </div>
        </div>
      </div>

      <Controls
        isActive={isActive}
        onStart={startTimer}
        onPause={pauseTimer}
        onReset={resetTimer}
        onSkip={skipSession}
      />
    </div>
  );
}
