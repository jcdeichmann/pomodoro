interface ControlsProps {
  isActive: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkip: () => void;
}

export function Controls({ isActive, onStart, onPause, onReset, onSkip }: ControlsProps) {
  return (
    <div className="flex gap-4 justify-center mt-8">
      <button
        onClick={isActive ? onPause : onStart}
        className="px-8 py-4 rounded-full text-lg font-medium bg-white text-gray-900 hover:bg-gray-200 transition-colors shadow-lg"
      >
        {isActive ? 'Pause' : 'Start'}
      </button>
      <button
        onClick={onReset}
        className="px-8 py-4 rounded-full text-lg font-medium bg-gray-700 text-white hover:bg-gray-600 transition-colors shadow-lg"
      >
        Reset
      </button>
      <button
        onClick={onSkip}
        className="px-8 py-4 rounded-full text-lg font-medium bg-gray-700 text-white hover:bg-gray-600 transition-colors shadow-lg"
      >
        Skip
      </button>
    </div>
  );
}
