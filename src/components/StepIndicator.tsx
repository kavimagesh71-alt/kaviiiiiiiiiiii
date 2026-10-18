import React from 'react';
import { Heart, Sparkles, Cake, Mail } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
  onSelectStep?: (step: number) => void;
  unlockedStep: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps = 4,
  onSelectStep,
  unlockedStep,
}) => {
  const steps = [
    { num: 1, title: 'Secret Gift', icon: Sparkles },
    { num: 2, title: 'Sweet Wish', icon: Heart },
    { num: 3, title: 'Cake Time', icon: Cake },
    { num: 4, title: 'Dear Letter', icon: Mail },
  ];

  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full max-w-md mx-auto px-4 py-3 select-none">
      <div className="relative flex items-center justify-between">
        {/* Background track line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 rounded-full bg-pink-100 z-0" />
        {/* Active progress fill */}
        <div
          className="absolute top-1/2 left-0 h-1 -translate-y-1/2 rounded-full bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 transition-all duration-500 z-0 shadow-sm"
          style={{ width: `${progressPercentage}%` }}
        />

        {steps.map((s) => {
          const Icon = s.icon;
          const isActive = currentStep === s.num;
          const isCompleted = currentStep > s.num;
          const isUnlocked = s.num <= unlockedStep;

          return (
            <button
              key={s.num}
              onClick={() => isUnlocked && onSelectStep && onSelectStep(s.num)}
              disabled={!isUnlocked}
              title={isUnlocked ? `Go to Step ${s.num}: ${s.title}` : `Step ${s.num} Locked`}
              aria-label={`Step ${s.num}: ${s.title}`}
              className={`relative z-10 flex flex-col items-center group transition-all duration-300 ${
                isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
              }`}
            >
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-tr from-pink-500 to-rose-400 text-white shadow-lg shadow-pink-300/60 ring-4 ring-pink-100 scale-110'
                    : isCompleted
                    ? 'bg-pink-400 text-white shadow-sm'
                    : 'bg-white text-pink-300 border border-pink-200'
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${
                    isActive ? 'animate-pulse' : ''
                  }`}
                />
              </div>
              <span
                className={`mt-1 text-[11px] font-medium tracking-tight whitespace-nowrap transition-colors duration-200 ${
                  isActive
                    ? 'text-pink-600 font-semibold'
                    : isCompleted
                    ? 'text-pink-400'
                    : 'text-gray-400'
                }`}
              >
                {s.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
