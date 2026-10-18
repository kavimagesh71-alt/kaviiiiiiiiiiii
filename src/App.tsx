import React, { useState } from 'react';
import { BackgroundEffects } from './components/BackgroundEffects';
import { AudioPlayer } from './components/AudioPlayer';
import { StepIndicator } from './components/StepIndicator';
import { Step1Password } from './components/Step1Password';
import { Step2Wish } from './components/Step2Wish';
import { Step3Cake } from './components/Step3Cake';
import { Step4Letter } from './components/Step4Letter';
import { ShareModal } from './components/ShareModal';
import { QrCode, Heart, Sparkles } from 'lucide-react';

export default function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [unlockedStep, setUnlockedStep] = useState<number>(1);
  const [autoStartAudio, setAutoStartAudio] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);

  // Transition from Step 1 to Step 2
  const handlePasswordSuccess = () => {
    setAutoStartAudio(true);
    setUnlockedStep((prev) => Math.max(prev, 2));
    setCurrentStep(2);
  };

  // Transition from Step 2 to Step 3
  const handleWishNext = () => {
    setUnlockedStep((prev) => Math.max(prev, 3));
    setCurrentStep(3);
  };

  // Transition from Step 3 to Step 4
  const handleCakeNext = () => {
    setUnlockedStep((prev) => Math.max(prev, 4));
    setCurrentStep(4);
  };

  // Replay surprise from Step 1 or Step 2
  const handleReplay = () => {
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-gradient-to-br from-pink-50 via-purple-50/70 to-rose-50 selection:bg-pink-300 selection:text-pink-900">
      {/* Dynamic Animated Particles: Rose Petals, Hearts, Sparkles */}
      <BackgroundEffects />

      {/* Top Floating Controls */}
      <header className="relative z-40 w-full px-4 pt-4 sm:pt-6">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          {/* Share / QR Code Hub Button */}
          <button
            type="button"
            onClick={() => setIsShareModalOpen(true)}
            className="group flex items-center gap-1.5 rounded-full border border-pink-200/90 bg-white/85 px-3 py-1.5 text-xs font-semibold text-pink-700 shadow-sm backdrop-blur-md transition-all hover:scale-105 hover:bg-pink-50 hover:shadow-pink-200/60 focus:outline-none focus:ring-2 focus:ring-pink-300"
            title="Open Gift Card & QR Code Generator"
          >
            <QrCode className="h-4 w-4 text-pink-500 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">Gift Card & QR</span>
            <span className="sm:hidden">QR</span>
          </button>

          {/* Background Audio Melody Toggle */}
          <AudioPlayer autoStartTrigger={autoStartAudio} />
        </div>

        {/* Step Progress Indicator (Visible from step 1 through 4) */}
        <div className="mt-2">
          <StepIndicator
            currentStep={currentStep}
            totalSteps={4}
            unlockedStep={unlockedStep}
            onSelectStep={(s) => setCurrentStep(s)}
          />
        </div>
      </header>

      {/* Main Experience Screen */}
      <main className="relative z-10 flex flex-1 items-center justify-center py-4 px-2 sm:px-4">
        {currentStep === 1 && (
          <div className="w-full animate-[fadeIn_0.5s_ease-out]">
            <Step1Password onSuccess={handlePasswordSuccess} />
          </div>
        )}

        {currentStep === 2 && (
          <div className="w-full animate-[fadeIn_0.5s_ease-out]">
            <Step2Wish onNext={handleWishNext} />
          </div>
        )}

        {currentStep === 3 && (
          <div className="w-full animate-[fadeIn_0.5s_ease-out]">
            <Step3Cake onNext={handleCakeNext} />
          </div>
        )}

        {currentStep === 4 && (
          <div className="w-full animate-[fadeIn_0.5s_ease-out]">
            <Step4Letter
              onReplay={handleReplay}
              onOpenShareModal={() => setIsShareModalOpen(true)}
            />
          </div>
        )}
      </main>

      {/* Bottom Footer */}
      <footer className="relative z-20 py-4 px-4 text-center">
        <p className="flex items-center justify-center gap-1 text-xs text-pink-500/80 font-medium">
          <span>Made with love by Kavi</span>
          <Heart className="h-3.5 w-3.5 fill-pink-500 text-pink-500 inline-block animate-pulse" />
          <span>for Baby Priya • 2026</span>
        </p>
      </footer>

      {/* Share & QR Code Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </div>
  );
}
