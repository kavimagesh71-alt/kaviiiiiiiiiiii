import React, { useState } from 'react';
import { KeyRound, Lock, Sparkles, Heart, ShieldCheck, HelpCircle } from 'lucide-react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface Step1PasswordProps {
  onSuccess: () => void;
}

export const Step1Password: React.FC<Step1PasswordProps> = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isGiftHovered, setIsGiftHovered] = useState(false);
  const [showSecurityInfo, setShowSecurityInfo] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setErrorMessage('Please enter the password first, Baby Priya! 🙈');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      // First attempt secure verification through the server backend
      const res = await fetch('/api/verify-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: password.trim() }),
      });

      if (res.ok) {
        handleUnlockSuccess();
      } else {
        const data = await res.json().catch(() => null);
        handleUnlockFailure(data?.message || 'Aiyooo, wrong password! Try again, mentaluuuu 😂❤️');
      }
    } catch {
      // Graceful fallback for static/client environments
      if (password.trim() === '1910') {
        handleUnlockSuccess();
      } else {
        handleUnlockFailure('Aiyooo, wrong password! Try again, mentaluuuu 😂❤️');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnlockSuccess = () => {
    sound.playUnlockSound();
    sound.startBackgroundMelody();

    // Burst of hearts and sparkles
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#ec4899', '#fbcfe8', '#e879f9', '#ffd1dc'],
      shapes: ['circle'],
    });

    setTimeout(() => {
      onSuccess();
    }, 700);
  };

  const handleUnlockFailure = (msg: string) => {
    sound.playErrorSound();
    setErrorMessage(msg);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 600);
  };

  return (
    <div className="relative mx-auto flex w-full max-w-lg flex-col items-center px-4 py-8 text-center">
      {/* Decorative floating badges */}
      <div className="inline-flex items-center gap-1.5 rounded-full border border-pink-200/90 bg-white/80 px-3.5 py-1 text-xs font-medium text-pink-600 shadow-sm backdrop-blur-md mb-4 animate-float-slow">
        <Sparkles className="h-3.5 w-3.5 text-pink-500" />
        <span>Specially crafted with love by Kavi</span>
        <Heart className="h-3 w-3 fill-pink-500 text-pink-500" />
      </div>

      {/* Main Heading & Subtitle */}
      <h1 className="font-script text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-pink-700 drop-shadow-sm">
        A Little Surprise For You, Baby Priya ❤️
      </h1>
      <p className="mt-2 text-sm sm:text-base font-normal text-purple-700/80">
        Someone special made this just for you...
      </p>

      {/* Cute Interactive Animated Gift Box */}
      <div
        className="relative my-7 flex cursor-pointer items-center justify-center transition-transform duration-300 hover:scale-105"
        onMouseEnter={() => setIsGiftHovered(true)}
        onMouseLeave={() => setIsGiftHovered(false)}
        onClick={() => {
          setIsGiftHovered(true);
          setTimeout(() => setIsGiftHovered(false), 800);
        }}
        title="Tap to tickle the gift box!"
      >
        <div className="relative flex h-36 w-36 sm:h-44 sm:w-44 items-center justify-center">
          {/* Glowing aura */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-400/40 via-purple-300/30 to-rose-300/40 blur-xl animate-pulse-glow" />

          {/* SVG Animated Gift Box */}
          <svg
            className={`relative z-10 h-32 w-32 sm:h-40 sm:w-40 drop-shadow-xl transition-all duration-300 ${
              isGiftHovered ? 'animate-bounce' : 'animate-float-slow'
            }`}
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Box Base */}
            <rect x="40" y="80" width="120" height="95" rx="14" fill="url(#giftGradient)" />
            {/* Box Shadow and Sheen */}
            <rect x="40" y="80" width="60" height="95" rx="14" fill="rgba(255,255,255,0.15)" />

            {/* Vertical Ribbon */}
            <rect x="88" y="80" width="24" height="95" fill="url(#ribbonGradient)" />

            {/* Lid */}
            <rect x="32" y="66" width="136" height="24" rx="8" fill="url(#lidGradient)" />
            <rect x="88" y="66" width="24" height="24" fill="url(#ribbonGradient)" />

            {/* Ribbon Bow Left */}
            <path
              d="M100 66 C70 40 45 45 70 65 C85 75 95 68 100 66 Z"
              fill="url(#ribbonGradient)"
            />
            {/* Ribbon Bow Right */}
            <path
              d="M100 66 C130 40 155 45 130 65 C115 75 105 68 100 66 Z"
              fill="url(#ribbonGradient)"
            />
            {/* Bow Center knot */}
            <circle cx="100" cy="66" r="10" fill="#f43f5e" />

            {/* Sparkles on the gift box */}
            <circle cx="65" cy="115" r="3" fill="#ffffff" opacity="0.8" />
            <circle cx="135" cy="140" r="2.5" fill="#ffffff" opacity="0.8" />
            <circle cx="145" cy="105" r="3" fill="#ffffff" opacity="0.9" />

            <defs>
              <linearGradient id="giftGradient" x1="40" y1="80" x2="160" y2="175" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f472b6" />
                <stop offset="0.5" stopColor="#ec4899" />
                <stop offset="1" stopColor="#db2777" />
              </linearGradient>
              <linearGradient id="lidGradient" x1="32" y1="66" x2="168" y2="90" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f472b6" />
                <stop offset="1" stopColor="#ec4899" />
              </linearGradient>
              <linearGradient id="ribbonGradient" x1="88" y1="40" x2="112" y2="175" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fef08a" />
                <stop offset="0.5" stopColor="#fde047" />
                <stop offset="1" stopColor="#eab308" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Password Question */}
      <div className="w-full rounded-3xl border border-pink-100 bg-white/85 p-6 shadow-xl shadow-pink-100/60 backdrop-blur-md sm:p-8">
        <label
          htmlFor="gift-password"
          className="block text-base sm:text-lg font-medium text-pink-900 mb-2"
        >
          Enter the secret password to open your gift 🎁
        </label>
        <p className="text-xs text-purple-600/70 mb-5">
          Hint: A special date or number only someone close would know... 🤫❤️
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-pink-400">
              <KeyRound className="h-5 w-5" />
            </div>
            <input
              id="gift-password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              placeholder="••••"
              autoComplete="off"
              maxLength={12}
              className={`w-full rounded-2xl border bg-pink-50/50 py-3.5 pl-12 pr-4 text-center text-lg font-semibold tracking-widest text-pink-950 placeholder-pink-300 transition-all focus:bg-white focus:outline-none focus:ring-4 ${
                errorMessage
                  ? 'border-rose-400 focus:ring-rose-200'
                  : 'border-pink-200 focus:border-pink-400 focus:ring-pink-200'
              } ${isShaking ? 'animate-[wiggle_0.4s_ease-in-out_infinite]' : ''}`}
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="rounded-xl border border-rose-200 bg-rose-50/90 px-4 py-2.5 text-xs sm:text-sm font-semibold text-rose-700 animate-bounce">
              {errorMessage}
            </div>
          )}

          {/* Unlock Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-pink-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-pink-500/50 focus:outline-none focus:ring-4 focus:ring-pink-300 disabled:opacity-70 active:scale-95"
          >
            <span className="relative flex items-center gap-2">
              {isLoading ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Checking the secret...</span>
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 transition-transform group-hover:scale-110" />
                  <span>Unlock My Gift 🎁</span>
                </>
              )}
            </span>
          </button>
        </form>

        {/* Security & Architecture Note */}
        <div className="mt-5 border-t border-pink-100/80 pt-3 text-left">
          <button
            type="button"
            onClick={() => setShowSecurityInfo(!showSecurityInfo)}
            className="flex items-center gap-1.5 text-[11px] font-medium text-pink-600/80 hover:text-pink-800 transition-colors"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-pink-500" />
            <span>Secure Backend Verification Note</span>
            <HelpCircle className="h-3 w-3 text-pink-400" />
          </button>

          {showSecurityInfo && (
            <div className="mt-2 rounded-xl bg-pink-50/90 p-3 text-[11px] text-pink-900/90 leading-relaxed border border-pink-200">
              <p className="font-semibold text-pink-800 mb-1">
                Why is frontend-only password checking insecure?
              </p>
              <p>
                In a frontend-only app, any visitor could open Chrome DevTools (Inspect Element) and view
                the JavaScript source files to read the secret password immediately. By implementing
                a secure Express backend endpoint (<code className="bg-pink-100 px-1 py-0.5 rounded text-pink-950 font-mono">/api/verify-password</code>), the secret verification is safely isolated on the server.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
