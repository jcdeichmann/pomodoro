export type TimerMode = 'work' | 'break';

export interface PomodoroHookReturn {
  timeLeft: number;
  isActive: boolean;
  mode: TimerMode;
  totalTime: number;
  completedPomodoros: number;
  progress: number;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  skipSession: () => void;
}
