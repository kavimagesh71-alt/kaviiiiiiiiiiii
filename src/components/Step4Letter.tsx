import React, { useState } from 'react';
import { Mail, RotateCcw, Heart, Sparkles, Send, Share2 } from 'lucide-react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface Step4LetterProps {
  onReplay: () => void;
  onOpenShareModal: () => void;
}

export const Step4Letter: React.FC<Step4LetterProps> = ({
  onReplay,
  onOpenShareModal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpeningAnim, setIsOpeningAnim] = useState(false);

  const handleOpenLetter = () => {
    sound.playLetterOpenSound();
    setIsOpeningAnim(true);

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#f472b6', '#fb7185', '#c084fc', '#ffd1dc'],
    });

    setTimeout(() => {
      setIsOpen(true);
      setIsOpeningAnim(false);
    }, 600);
  };

  const handleReadAgain = () => {
    setIsOpen(false);
    setTimeout(() => {
      handleOpenLetter();
    }, 300);
  };

  return (
    <div className="relative mx-auto flex w-full max-w-xl flex-col items-center px-4 py-6 text-center">
      {/* Title */}
      <div className="inline-flex items-center gap-1.5 rounded-full border border-pink-200/90 bg-white/80 px-4 py-1 text-xs font-semibold text-pink-700 shadow-sm backdrop-blur-md mb-3 animate-float-slow">
        <Sparkles className="h-3.5 w-3.5 text-pink-500" />
        <span>A Special Letter from Kavi's Heart</span>
        <Heart className="h-3 w-3 fill-pink-500 text-pink-500" />
      </div>

      <h2 className="font-script text-3xl sm:text-4xl font-bold text-pink-800 drop-shadow-sm mb-4">
        For Baby Priya 💌
      </h2>

      {/* Closed Envelope view */}
      {!isOpen ? (
        <div className="relative my-4 flex flex-col items-center justify-center w-full max-w-md">
          {/* Animated Envelope Visual */}
          <div
            onClick={handleOpenLetter}
            className={`group relative flex h-52 w-72 sm:h-60 sm:w-80 cursor-pointer flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100 p-6 shadow-2xl shadow-pink-200/70 border-2 border-pink-200 transition-all duration-300 hover:scale-105 active:scale-95 ${
              isOpeningAnim ? 'scale-110 rotate-1' : 'animate-float-slow'
            }`}
            title="Click to open the letter"
          >
            {/* Wax seal heart stamp */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white shadow-lg ring-4 ring-pink-100 group-hover:scale-110 transition-transform">
              <Heart className="h-7 w-7 fill-white" />
            </div>

            {/* Envelope flap folds */}
            <div className="absolute inset-x-0 top-0 h-1/2 border-b-2 border-pink-200/80 bg-gradient-to-b from-pink-200/50 to-transparent pointer-events-none" />

            <div className="z-10 mt-20 flex flex-col items-center">
              <span className="font-script text-2xl font-bold text-pink-700">
                Baby Priya ❤️
              </span>
              <span className="text-[11px] font-medium uppercase tracking-widest text-purple-600/70">
                Confidential & With Love
              </span>
            </div>
          </div>

          {/* Button to open */}
          <button
            type="button"
            onClick={handleOpenLetter}
            disabled={isOpeningAnim}
            className="mt-6 group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-pink-500/30 transition-all duration-300 hover:scale-105 hover:shadow-pink-500/50 focus:outline-none focus:ring-4 focus:ring-pink-300 active:scale-95 animate-bounce"
          >
            <Mail className="h-5 w-5" />
            <span>Open My Letter 💌</span>
          </button>
        </div>
      ) : (
        /* Revealed Letter Content */
        <div className="relative my-2 w-full animate-[fadeIn_0.7s_ease-out]">
          {/* Letter Parchment Container */}
          <div className="relative overflow-hidden rounded-3xl border-2 border-pink-200 bg-gradient-to-b from-[#fffafb] via-[#fff5f8] to-[#fdf2f8] p-6 sm:p-9 text-left shadow-2xl shadow-pink-200/80 backdrop-blur-md">
            {/* Top decorative ribbon */}
            <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-pink-200/40 blur-xl pointer-events-none" />
            <div className="absolute -left-12 -bottom-12 h-28 w-28 rounded-full bg-purple-200/40 blur-xl pointer-events-none" />

            {/* Letter Heading */}
            <div className="border-b border-pink-200/80 pb-4 mb-5 text-center">
              <h3 className="font-script text-3xl sm:text-4xl font-bold text-pink-700">
                A Letter For You, Paithiya Kari 💗
              </h3>
              <p className="text-xs text-purple-600/70 mt-1">Written with all my heart</p>
            </div>

            {/* Exact Letter Body text with Tanglish formatting & emojis preserved */}
            <div className="space-y-4 font-sans text-slate-800 text-sm sm:text-base leading-relaxed tracking-normal font-normal">
              <p className="font-handwriting text-2xl sm:text-3xl text-pink-700 font-bold">
                Dear paithiya kari... 💗🎂🫶🏻
              </p>

              <p>
                Un life la nee eppovume happy ah irukanum. Unna happy ah paakanum nu thaan enakku eppovume aasai. 🥰🎂❤️
              </p>

              <p>
                Unakku kashtam varumbothu un kooda na irupa. ✨ Un dreams ellame nijam aaganum. Nee nenachathu ellame unakku kidaikanum.
              </p>

              <p>
                Oru vishayam eppovume nyabagam vachiko paa. 🥹❤️ Unakku pudichatha pannu, aana eppovume correct decision eduthu nadanthuko. Yaaru enna sonnalum atha nenachu feel pannatha. Ellathayum kandukama un life-la focus pannu. Unna pudikathavanga kitta touch vaikathaaa.
              </p>

              <p>
                Appa amma nalla pathuko. Avangala thittatha, kovapadatha, nalla pesu. Safe ah pathuko, safe ah iru.
              </p>

              <p>
                Oru life irukura varaikum jolly ah irupom, irukaaa... ❤️♾️
              </p>

              <p>
                Ippo thaan na pesa pora, unakku epdi theriyala, enakku unna romba pudikum. 💗 Eppovume enna vittu poidatha. Pogama irunda na romba santhosam paduva.
              </p>

              <p>
                Un life la enna nadanthaalum unakku support ah irukka try pannuven. Unna athukaga vittutu poirava maata. Kadisi varaikkum kandippa irupaen. ❤️♾️
              </p>

              <p>
                Yedhavathu ithula thappa sonna sorry. Kathukittu irukken. Be happy eppovumae! 🥹💗
              </p>

              <p>
                Once again, happiest birthday, paithiya kariiii... 🙈❤️
              </p>

              <div className="pt-3 text-right">
                <span className="font-handwriting text-2xl sm:text-3xl font-bold text-pink-700">
                  — Kavi ❤️
                </span>
              </div>
            </div>

            {/* Glowing divider */}
            <div className="my-6 flex items-center justify-center gap-2">
              <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent to-pink-300" />
              <Heart className="h-4 w-4 fill-pink-500 text-pink-500 animate-pulse" />
              <div className="h-0.5 flex-1 bg-gradient-to-l from-transparent to-pink-300" />
            </div>

            {/* Animated Final Message */}
            <div className="rounded-2xl border border-pink-200 bg-pink-100/60 p-4 text-center animate-pulse-glow">
              <p className="font-handwriting text-2xl sm:text-3xl font-bold text-pink-800 tracking-wide">
                "Distance evlo irundhaalum, nee eppovume special dhaan. ❤️♾️"
              </p>
            </div>
          </div>

          {/* Action Buttons: Read Again, Replay, Share/QR Card */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleReadAgain}
              className="inline-flex items-center gap-2 rounded-2xl border border-pink-300 bg-white px-5 py-3 text-sm font-semibold text-pink-700 shadow-md hover:bg-pink-50 hover:border-pink-400 transition-all active:scale-95"
            >
              <Mail className="h-4 w-4 text-pink-500" />
              <span>Read My Letter Again 💌</span>
            </button>

            <button
              type="button"
              onClick={onReplay}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-pink-500/25 hover:scale-105 transition-all active:scale-95"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Replay Birthday Surprise 🎂</span>
            </button>

            <button
              type="button"
              onClick={onOpenShareModal}
              className="inline-flex items-center gap-2 rounded-2xl border border-purple-200 bg-purple-50 px-5 py-3 text-sm font-semibold text-purple-700 shadow-sm hover:bg-purple-100 transition-all active:scale-95"
            >
              <Share2 className="h-4 w-4 text-purple-600" />
              <span>Gift Card & QR Code 🎁</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
