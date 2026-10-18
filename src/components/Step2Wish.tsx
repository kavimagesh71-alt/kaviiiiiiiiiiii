import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, ArrowRight, Stars } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Step2WishProps {
  onNext: () => void;
}

export const Step2Wish: React.FC<Step2WishProps> = ({ onNext }) => {
  const fullText = `Wish you a many more happy returns of the day, mentaluuuu 🥹❤️

Yadho enna nalla mudincha oru chinna gift maari pannna.

— Kavi ❤️`;

  const [displayedLength, setDisplayedLength] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    // Launch a gentle opening shower of confetti
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.4 },
      colors: ['#f472b6', '#c084fc', '#fda4af', '#fef08a'],
    });

    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setDisplayedLength(index);
      if (index >= fullText.length) {
        clearInterval(interval);
        setIsTypingComplete(true);
      }
    }, 45); // pleasant readable typing pace

    return () => clearInterval(interval);
  }, [fullText.length]);

  const handleSkipTyping = () => {
    setDisplayedLength(fullText.length);
    setIsTypingComplete(true);
  };

  const currentDisplay = fullText.slice(0, displayedLength);

  return (
    <div className="relative mx-auto flex w-full max-w-lg flex-col items-center px-4 py-8 text-center">
      {/* Decorative floating cute sticker */}
      <div className="relative mb-5 flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-pink-200/50 blur-lg animate-pulse" />
        <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-pink-400 via-rose-300 to-purple-400 shadow-md">
          <Heart className="h-8 w-8 text-white fill-white animate-bounce" />
        </div>
        <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-amber-400 animate-spin" />
        <Stars className="absolute -bottom-1 -left-1 h-5 w-5 text-pink-400" />
      </div>

      {/* Title */}
      <h2 className="font-script text-3xl sm:text-4xl font-bold text-pink-800 drop-shadow-sm">
        Happy Birthday, Baby Priya! 🎂✨
      </h2>
      <p className="mt-1 text-xs sm:text-sm text-purple-600/80">
        A special wish just for you from Kavi
      </p>

      {/* Message Box with Typing Animation */}
      <div
        onClick={!isTypingComplete ? handleSkipTyping : undefined}
        className="relative my-6 w-full cursor-pointer rounded-3xl border border-pink-200 bg-white/90 p-6 sm:p-8 shadow-xl shadow-pink-100/70 backdrop-blur-md transition-all hover:border-pink-300 text-left"
        title={!isTypingComplete ? 'Click anywhere on card to show all text' : undefined}
      >
        {/* Soft glowing heart watermark */}
        <div className="pointer-events-none absolute right-4 bottom-4 text-pink-100 select-none">
          <Heart className="h-28 w-28 fill-pink-50" />
        </div>

        {/* Typing message text */}
        <div className="relative z-10 whitespace-pre-line font-handwriting text-2xl sm:text-3xl leading-relaxed text-pink-950 font-semibold tracking-wide">
          {currentDisplay}
          {!isTypingComplete && (
            <span className="inline-block h-6 w-1 translate-y-1 bg-pink-500 animate-pulse ml-0.5" />
          )}
        </div>

        {!isTypingComplete && (
          <p className="mt-4 text-right text-[11px] font-sans font-medium text-pink-400">
            (Tap to reveal immediately)
          </p>
        )}
      </div>

      {/* Next Surprise Button */}
      <button
        onClick={onNext}
        className={`group relative inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-pink-500/30 transition-all duration-300 hover:scale-105 hover:shadow-pink-500/50 focus:outline-none focus:ring-4 focus:ring-pink-300 active:scale-95 ${
          !isTypingComplete ? 'opacity-90' : 'animate-bounce'
        }`}
      >
        <span>Open Your Next Surprise 💗</span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
};
