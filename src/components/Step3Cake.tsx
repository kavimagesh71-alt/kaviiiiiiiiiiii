import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Mic, MicOff, ArrowRight, Heart } from 'lucide-react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface Step3CakeProps {
  onNext: () => void;
}

export const Step3Cake: React.FC<Step3CakeProps> = ({ onNext }) => {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const specialMessage = `Today is your special day! Eppo ma happy, jolly, santhoshama irukkanum nu aasapadura, sariya? 😊❤️

Innaiku full ah sirichite iru, Baby Priya! Un smile eppovume ippadiye irukkanum. 🥹💗`;

  // Extinguish candles handler
  const handleBlowCandles = () => {
    if (candlesBlown) return;

    sound.playCandleBlowSound();

    setCandlesBlown(true);

    // Stop microphone if running
    stopMic();

    // Trigger grand celebration sound after short candle puff
    setTimeout(() => {
      sound.playCelebrationSound();

      // Grand confetti explosion
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.55 },
        colors: ['#ec4899', '#f43f5e', '#a855f7', '#fbbf24', '#ffffff'],
      });

      // Side fireworks burst
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 60,
          origin: { x: 0, y: 0.6 },
          colors: ['#f472b6', '#fb7185', '#c084fc'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 60,
          origin: { x: 1, y: 0.6 },
          colors: ['#f472b6', '#fb7185', '#c084fc'],
        });
      }, 250);
    }, 400);
  };

  // Start microphone listener to detect blow sound
  const startMicListener = async () => {
    try {
      setMicError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;

      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      setMicActive(true);

      const checkVolume = () => {
        if (!analyser || candlesBlown) return;
        analyser.getByteFrequencyData(dataArray);

        // Calculate average volume energy
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const avg = sum / bufferLength;

        // Threshold for blowing air into microphone
        if (avg > 58) {
          handleBlowCandles();
          return;
        }

        animFrameRef.current = requestAnimationFrame(checkVolume);
      };

      animFrameRef.current = requestAnimationFrame(checkVolume);
    } catch {
      setMicError('Microphone permission was not granted. No problem! Just tap the button below 😊');
      setMicActive(false);
    }
  };

  const stopMic = () => {
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((track) => track.stop());
      micStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    setMicActive(false);
  };

  useEffect(() => {
    return () => {
      stopMic();
    };
  }, []);

  return (
    <div className="relative mx-auto flex w-full max-w-lg flex-col items-center px-4 py-6 text-center">
      {/* Special Message Card */}
      <div className="w-full rounded-3xl border border-pink-200/90 bg-white/90 p-5 sm:p-6 shadow-lg shadow-pink-100/60 backdrop-blur-md mb-6">
        <div className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-pink-600 mb-2">
          <Sparkles className="h-4 w-4 text-pink-500" />
          <span>A Warm Reminder For Today</span>
          <Sparkles className="h-4 w-4 text-pink-500" />
        </div>
        <div className="whitespace-pre-line font-handwriting text-2xl sm:text-3xl leading-relaxed text-pink-950 font-semibold">
          {specialMessage}
        </div>
      </div>

      {/* Interactive Birthday Cake Scene */}
      <div className="relative my-2 flex w-full flex-col items-center justify-center">
        {/* Floating Balloons behind the cake */}
        <div className="pointer-events-none absolute -top-10 left-4 animate-float-slow opacity-80">
          <span className="text-3xl sm:text-4xl">🎈</span>
        </div>
        <div className="pointer-events-none absolute -top-14 right-4 animate-float-reverse opacity-80">
          <span className="text-4xl sm:text-5xl">🎈</span>
        </div>
        <div className="pointer-events-none absolute -top-8 right-16 animate-float-slow opacity-75">
          <span className="text-2xl sm:text-3xl">🎉</span>
        </div>

        {/* Cake Container */}
        <div className="relative flex flex-col items-center justify-center py-4">
          {/* Candles Container */}
          <div className="relative z-20 flex justify-center gap-5 sm:gap-7 mb-0">
            {[0, 1, 2].map((idx) => (
              <div key={idx} className="relative flex flex-col items-center">
                {/* Flame or Smoke */}
                {!candlesBlown ? (
                  <div className="relative flex flex-col items-center mb-1">
                    {/* Glowing outer flame halo */}
                    <div className="absolute -inset-1.5 rounded-full bg-amber-300/60 blur-sm animate-pulse" />
                    {/* Candle Flame SVG */}
                    <svg
                      className="relative h-7 w-5 animate-flame drop-shadow-md"
                      viewBox="0 0 20 32"
                      fill="none"
                    >
                      <path
                        d="M10 0 C4 10 0 16 0 22 C0 28 4 32 10 32 C16 32 20 28 20 22 C20 16 16 10 10 0 Z"
                        fill="url(#flameGrad)"
                      />
                      <ellipse cx="10" cy="22" rx="4" ry="7" fill="#ffffff" opacity="0.9" />
                      <defs>
                        <linearGradient id="flameGrad" x1="10" y1="0" x2="10" y2="32" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#fef08a" />
                          <stop offset="0.4" stopColor="#f59e0b" />
                          <stop offset="1" stopColor="#ef4444" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                ) : (
                  /* Soft smoke plume */
                  <div className="mb-2 flex flex-col items-center animate-fade-out">
                    <span className="text-xs text-gray-400 animate-pulse">💨</span>
                  </div>
                )}

                {/* Candle Wick */}
                <div className="h-2 w-0.5 bg-gray-700" />
                {/* Candle Stick */}
                <div
                  className={`h-12 w-3 sm:h-14 sm:w-3.5 rounded-t-sm shadow-sm ${
                    idx === 0
                      ? 'bg-gradient-to-b from-pink-300 to-pink-400'
                      : idx === 1
                      ? 'bg-gradient-to-b from-purple-300 to-purple-400'
                      : 'bg-gradient-to-b from-rose-300 to-rose-400'
                  }`}
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.4) 4px, rgba(255,255,255,0.4) 8px)',
                  }}
                />
              </div>
            ))}
          </div>

          {/* SVG 3-Tier Layered Cake */}
          <div className="relative z-10 -mt-1 w-64 sm:w-72">
            <svg viewBox="0 0 240 140" className="w-full drop-shadow-2xl">
              {/* Top Tier */}
              <rect x="55" y="10" width="130" height="40" rx="10" fill="#fdf2f8" />
              <path
                d="M55 24 Q65 32 75 24 Q85 32 95 24 Q105 32 115 24 Q125 32 135 24 Q145 32 155 24 Q165 32 175 24 Q185 32 185 24 L185 15 Q185 10 175 10 L65 10 Q55 10 55 15 Z"
                fill="#f472b6"
              />
              {/* Top tier pearls / sprinkles */}
              <circle cx="80" cy="36" r="3" fill="#ec4899" />
              <circle cx="105" cy="38" r="3" fill="#a855f7" />
              <circle cx="130" cy="36" r="3" fill="#f43f5e" />
              <circle cx="155" cy="38" r="3" fill="#eab308" />

              {/* Bottom Tier */}
              <rect x="30" y="50" width="180" height="65" rx="14" fill="#fff1f2" />
              <path
                d="M30 68 Q42 78 54 68 Q66 78 78 68 Q90 78 102 68 Q114 78 126 68 Q138 78 150 68 Q162 78 174 68 Q186 78 198 68 Q210 78 210 68 L210 55 Q210 50 198 50 L42 50 Q30 50 30 55 Z"
                fill="#fb7185"
              />
              {/* Heart accents on bottom tier */}
              <circle cx="65" cy="90" r="4" fill="#ec4899" />
              <circle cx="95" cy="95" r="4.5" fill="#f43f5e" />
              <circle cx="120" cy="90" r="4" fill="#a855f7" />
              <circle cx="145" cy="95" r="4.5" fill="#fbbf24" />
              <circle cx="175" cy="90" r="4" fill="#ec4899" />

              {/* Cake Plate / Stand */}
              <ellipse cx="120" cy="118" rx="110" ry="12" fill="#e2e8f0" />
              <ellipse cx="120" cy="116" rx="105" ry="10" fill="#ffffff" />
            </svg>
          </div>
        </div>

        {/* After Candles Blown Announcement */}
        {candlesBlown && (
          <div className="relative my-4 w-full animate-bounce rounded-2xl border-2 border-pink-300 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 p-4 text-white shadow-xl shadow-pink-300/60">
            <h3 className="font-script text-2xl sm:text-3xl font-bold flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6 text-yellow-200 animate-spin" />
              Happy Birthday, Baby Priya! ❤️🎂
              <Sparkles className="h-6 w-6 text-yellow-200 animate-spin" />
            </h3>
            <p className="mt-1 font-handwriting text-2xl sm:text-3xl text-pink-100 font-semibold">
              Make a wish! ✨ Your wish will surely come true.
            </p>
          </div>
        )}

        {/* Action Controls */}
        <div className="mt-4 flex flex-col items-center gap-3 w-full max-w-sm">
          {!candlesBlown ? (
            <>
              {/* Primary Blow Button */}
              <button
                type="button"
                onClick={handleBlowCandles}
                className="w-full group relative inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 px-6 py-4 text-lg font-bold text-white shadow-lg shadow-pink-500/30 transition-all duration-300 hover:scale-105 hover:shadow-pink-500/50 focus:outline-none focus:ring-4 focus:ring-pink-300 active:scale-95"
              >
                <span>Blow the Candles 🎂</span>
              </button>

              {/* Optional Microphone Blow Feature */}
              <div className="flex flex-col items-center">
                {!micActive ? (
                  <button
                    type="button"
                    onClick={startMicListener}
                    className="flex items-center gap-1.5 rounded-full border border-pink-200 bg-white/80 px-3.5 py-1.5 text-xs font-medium text-pink-700 shadow-sm transition hover:bg-pink-50"
                  >
                    <Mic className="h-3.5 w-3.5 text-pink-500" />
                    <span>Or blow into your phone microphone 🎙️</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2 rounded-full border border-pink-400 bg-pink-100/90 px-3.5 py-1.5 text-xs font-semibold text-pink-800 animate-pulse">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-500 opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-pink-600"></span>
                    </span>
                    <span>Listening... Blow gently onto your mic! 🌬️</span>
                    <button
                      type="button"
                      onClick={stopMic}
                      className="ml-1 text-pink-500 hover:text-pink-800"
                      title="Turn off microphone"
                    >
                      <MicOff className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
                {micError && (
                  <p className="mt-1 text-[11px] text-pink-600 font-medium">{micError}</p>
                )}
              </div>
            </>
          ) : (
            /* Button to proceed to Step 4 */
            <button
              type="button"
              onClick={onNext}
              className="w-full group relative inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 px-6 py-4 text-lg font-bold text-white shadow-xl shadow-pink-500/40 transition-all duration-300 hover:scale-105 hover:shadow-pink-500/60 focus:outline-none focus:ring-4 focus:ring-pink-300 active:scale-95 animate-bounce"
            >
              <Heart className="h-5 w-5 fill-white text-white" />
              <span>One Last Surprise 💌</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
