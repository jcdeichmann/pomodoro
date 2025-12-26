import { useState, useEffect, useCallback, useRef } from 'react';
import { WORK_DURATION, BREAK_DURATION } from '@/lib/constants';
import type { TimerMode, PomodoroHookReturn } from '@/types';

export function usePomodoro(): PomodoroHookReturn {
  const [mode, setMode] = useState<TimerMode>('work');
  const [timeLeft, setTimeLeft] = useState(WORK_DURATION);
  const [isActive, setIsActive] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  const startTimeRef = useRef<number | null>(null);
  const totalTimeRef = useRef(WORK_DURATION);

  // Calculate progress percentage
  const progress = (timeLeft / totalTimeRef.current) * 100;

  // Switch between work and break modes
  const switchMode = useCallback(() => {
    const newMode: TimerMode = mode === 'work' ? 'break' : 'work';
    const newDuration = newMode === 'work' ? WORK_DURATION : BREAK_DURATION;

    if (mode === 'work') {
      setCompletedPomodoros(prev => prev + 1);
    }

    setMode(newMode);
    setTimeLeft(newDuration);
    totalTimeRef.current = newDuration;
    startTimeRef.current = Date.now();
  }, [mode]);

  // Start timer
  const startTimer = useCallback(() => {
    setIsActive(true);
    startTimeRef.current = Date.now() - (totalTimeRef.current - timeLeft) * 1000;
  }, [timeLeft]);

  // Pause timer
  const pauseTimer = useCallback(() => {
    setIsActive(false);
    startTimeRef.current = null;
  }, []);

  // Reset timer to initial state
  const resetTimer = useCallback(() => {
    setIsActive(false);
    setMode('work');
    setTimeLeft(WORK_DURATION);
    setCompletedPomodoros(0);
    totalTimeRef.current = WORK_DURATION;
    startTimeRef.current = null;
  }, []);

  // Skip to next session
  const skipSession = useCallback(() => {
    switchMode();
    setIsActive(true);
    startTimeRef.current = Date.now();
  }, [switchMode]);

  // Timer countdown effect
  useEffect(() => {
    if (!isActive || startTimeRef.current === null) return;

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current!) / 1000);
      const remaining = totalTimeRef.current - elapsed;

      if (remaining <= 0) {
        // Session complete - switch modes and continue
        switchMode();
      } else {
        setTimeLeft(remaining);
      }
    }, 100); // Check every 100ms for accuracy

    return () => clearInterval(interval);
  }, [isActive, switchMode]);

  // Update document title with countdown
  useEffect(() => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    const timeString = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    document.title = `${timeString} - ${mode === 'work' ? 'Work' : 'Break'}`;

    return () => {
      document.title = 'Pomodoro Timer';
    };
  }, [timeLeft, mode]);

  return {
    timeLeft,
    isActive,
    mode,
    totalTime: totalTimeRef.current,
    completedPomodoros,
    progress,
    startTimer,
    pauseTimer,
    resetTimer,
    skipSession,
  };
}
