import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import {
  X,
  Download,
  Share2,
  Copy,
  Check,
  Send,
  Printer,
  Sparkles,
  ExternalLink,
  Heart,
  Globe,
} from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  // Use current window location or fall back to the live shared app URL
  const defaultUrl =
    typeof window !== 'undefined' && window.location.origin && window.location.origin !== 'null'
      ? window.location.origin
      : 'https://ais-pre-toofd5fnon6vchyjj35xpu-849906799536.asia-southeast1.run.app';

  const [targetUrl, setTargetUrl] = useState(defaultUrl);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [cardGenerating, setCardGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'share' | 'deploy'>('share');

  // Generate QR Code when targetUrl changes
  useEffect(() => {
    if (!targetUrl) return;
    QRCode.toDataURL(targetUrl, {
      width: 400,
      margin: 2,
      color: {
        dark: '#be185d', // rich deep pink
        light: '#ffffff',
      },
      errorCorrectionLevel: 'H',
    })
      .then((url) => {
        setQrDataUrl(url);
      })
      .catch((err) => {
        console.error('Failed to generate QR code:', err);
      });
  }, [targetUrl]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Hey Baby Priya ❤️ Someone special made a little surprise just for you!\n\nOpen your gift here: ${targetUrl}\n\n(Hint: Enter our secret 4-digit password to unlock it 🤫🎁)`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  // Generate and download a high-res printable Birthday Gift Card with the QR Code
  const handleDownloadCard = () => {
    if (!qrDataUrl) return;
    setCardGenerating(true);

    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1600;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 1200, 1600);
    grad.addColorStop(0, '#fff1f2');
    grad.addColorStop(0.5, '#fdf2f8');
    grad.addColorStop(1, '#fae8ff');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 1600);

    // Decorative outer border
    ctx.strokeStyle = '#f472b6';
    ctx.lineWidth = 14;
    ctx.strokeRect(40, 40, 1120, 1520);

    ctx.strokeStyle = '#fbcfe8';
    ctx.lineWidth = 4;
    ctx.strokeRect(60, 60, 1080, 1480);

    // Card Header
    ctx.textAlign = 'center';
    ctx.fillStyle = '#db2777';
    ctx.font = 'bold 54px Georgia, serif';
    ctx.fillText('A Surprise For You', 600, 180);

    ctx.fillStyle = '#9d174d';
    ctx.font = 'bold 74px "Brush Script MT", cursive, sans-serif';
    ctx.fillText('Baby Priya ❤️', 600, 280);

    ctx.fillStyle = '#6b21a8';
    ctx.font = 'italic 34px sans-serif';
    ctx.fillText('Someone special created something memorable for you...', 600, 360);

    // QR Image drawing
    const qrImg = new Image();
    qrImg.onload = () => {
      // White shadow card for QR
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(244, 114, 182, 0.4)';
      ctx.shadowBlur = 30;
      ctx.beginPath();
      ctx.roundRect(300, 440, 600, 600, 30);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw QR Code
      ctx.drawImage(qrImg, 340, 480, 520, 520);

      // Card instructions
      ctx.fillStyle = '#be185d';
      ctx.font = 'bold 40px sans-serif';
      ctx.fillText('Scan with your phone camera 📷', 600, 1140);

      ctx.fillStyle = '#4c1d95';
      ctx.font = '32px sans-serif';
      ctx.fillText('to unlock your birthday gift! 🎁✨', 600, 1200);

      ctx.fillStyle = '#db2777';
      ctx.font = 'italic 32px sans-serif';
      ctx.fillText('Secret Password: The special 4-digit year/code 🤫', 600, 1280);

      // Footer
      ctx.fillStyle = '#9d174d';
      ctx.font = 'bold 46px "Brush Script MT", cursive, sans-serif';
      ctx.fillText('With infinite love, Kavi ❤️♾️', 600, 1440);

      // Download
      const link = document.createElement('a');
      link.download = 'Baby_Priya_Birthday_Gift_Card.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      setCardGenerating(false);
    };
    qrImg.src = qrDataUrl;
  };

  const handleDownloadQrOnly = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.download = 'Baby_Priya_Surprise_QR.png';
    link.href = qrDataUrl;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-3xl border border-pink-200 bg-white/95 p-6 sm:p-8 shadow-2xl backdrop-blur-md text-slate-800">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close share dialog"
          className="absolute top-4 right-4 rounded-full p-2 text-gray-400 hover:bg-pink-50 hover:text-pink-600 transition"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-700 mb-2">
            <Sparkles className="h-3.5 w-3.5 text-pink-500" />
            <span>Kavi's Gift Delivery Hub</span>
          </div>
          <h3 className="font-script text-3xl sm:text-4xl font-bold text-pink-700">
            Share Gift & Download QR Code
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Send this magical birthday experience to Baby Priya through WhatsApp or print on a card!
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-pink-100 mb-5">
          <button
            onClick={() => setActiveTab('share')}
            className={`flex-1 pb-2.5 text-sm font-semibold transition border-b-2 ${
              activeTab === 'share'
                ? 'border-pink-500 text-pink-600'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            QR Code & Sharing
          </button>
          <button
            onClick={() => setActiveTab('deploy')}
            className={`flex-1 pb-2.5 text-sm font-semibold transition border-b-2 ${
              activeTab === 'deploy'
                ? 'border-pink-500 text-pink-600'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            Free Deployment Guide
          </button>
        </div>

        {activeTab === 'share' ? (
          <div className="flex flex-col items-center">
            {/* Live Target URL Editor */}
            <div className="w-full mb-4 text-left">
              <label className="block text-xs font-semibold text-pink-900 mb-1 flex items-center gap-1">
                <Globe className="h-3.5 w-3.5 text-pink-500" />
                Gift Website Live URL:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  className="flex-1 rounded-xl border border-pink-200 bg-pink-50/50 px-3 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-300 font-mono"
                  placeholder="https://..."
                />
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1 rounded-xl bg-pink-100 px-3 py-2 text-xs font-semibold text-pink-700 hover:bg-pink-200 transition"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Real QR Code Display */}
            <div className="relative group flex flex-col items-center rounded-2xl border-2 border-pink-200 bg-gradient-to-b from-white to-pink-50 p-4 shadow-md">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="Real QR code opening Baby Priya's birthday surprise"
                  className="h-44 w-44 rounded-xl shadow-inner sm:h-52 sm:w-52"
                />
              ) : (
                <div className="flex h-44 w-44 items-center justify-center text-xs text-gray-400">
                  Generating QR...
                </div>
              )}
              <div className="mt-2 text-center">
                <span className="font-script text-xl font-bold text-pink-700">
                  Scan for Baby Priya ❤️
                </span>
                <p className="text-[11px] text-gray-500">
                  Opens directly on any iPhone or Android camera
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              {/* WhatsApp direct share */}
              <button
                type="button"
                onClick={handleWhatsAppShare}
                className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-600 transition active:scale-95"
              >
                <Send className="h-4 w-4" />
                <span>Send to Baby Priya on WhatsApp</span>
              </button>

              {/* Printable Gift Card */}
              <button
                type="button"
                onClick={handleDownloadCard}
                disabled={cardGenerating}
                className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-pink-500/25 hover:from-pink-600 hover:to-rose-600 transition active:scale-95"
              >
                <Printer className="h-4 w-4" />
                <span>{cardGenerating ? 'Designing Card...' : 'Download Printable Gift Card'}</span>
              </button>

              {/* Download QR PNG */}
              <button
                type="button"
                onClick={handleDownloadQrOnly}
                className="flex items-center justify-center gap-2 rounded-2xl border border-pink-200 bg-pink-50 px-4 py-2.5 text-xs font-semibold text-pink-700 hover:bg-pink-100 transition"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Save QR Code PNG</span>
              </button>

              {/* Test link in new tab */}
              <a
                href={targetUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-2xl border border-purple-200 bg-purple-50 px-4 py-2.5 text-xs font-semibold text-purple-700 hover:bg-purple-100 transition"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Test Live Link in Browser</span>
              </a>
            </div>
          </div>
        ) : (
          /* Deployment Guide Tab */
          <div className="space-y-4 text-left text-xs sm:text-sm text-slate-700 leading-relaxed">
            <div className="rounded-2xl border border-pink-200 bg-pink-50/70 p-4">
              <h4 className="font-bold text-pink-900 text-sm mb-1">
                How to Host this Birthday Surprise for Free (HTTPS):
              </h4>
              <p className="text-xs text-pink-800">
                You can host this website online in less than 2 minutes so Baby Priya can access it forever.
              </p>
            </div>

            <div className="space-y-3">
              <div className="rounded-xl border border-slate-200 p-3 bg-white">
                <span className="font-bold text-pink-600">Option 1: Vercel (Easiest & Free)</span>
                <ol className="list-decimal list-inside mt-1.5 space-y-1 text-xs text-slate-600">
                  <li>Push this repository to GitHub.</li>
                  <li>Go to <span className="font-semibold text-slate-800">vercel.com</span>, click "Add New Project" and select the repository.</li>
                  <li>Vercel automatically detects Vite + React. Click <span className="font-semibold text-slate-800">Deploy</span>.</li>
                  <li>Copy your live HTTPS link (e.g., <code className="bg-slate-100 px-1 py-0.5 rounded">https://baby-priya.vercel.app</code>) and paste it into the QR Code tab!</li>
                </ol>
              </div>

              <div className="rounded-xl border border-slate-200 p-3 bg-white">
                <span className="font-bold text-pink-600">Option 2: Firebase Hosting</span>
                <ol className="list-decimal list-inside mt-1.5 space-y-1 text-xs text-slate-600">
                  <li>Run <code className="bg-slate-100 px-1 py-0.5 rounded">npm run build</code> to produce the <code className="font-mono">dist</code> folder.</li>
                  <li>Run <code className="bg-slate-100 px-1 py-0.5 rounded">firebase init hosting</code> and set <code className="font-mono">dist</code> as the public directory.</li>
                  <li>Run <code className="bg-slate-100 px-1 py-0.5 rounded">firebase deploy --only hosting</code>.</li>
                </ol>
              </div>

              <div className="rounded-xl border border-slate-200 p-3 bg-white">
                <span className="font-bold text-pink-600">Option 3: Current Live Cloud Run URL</span>
                <p className="mt-1 text-xs text-slate-600">
                  Your project is already live at:
                  <br />
                  <a
                    href={defaultUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-pink-600 underline font-semibold break-all"
                  >
                    {defaultUrl}
                  </a>
                  <br />
                  You can directly share this link or print the generated QR code!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 border-t border-pink-100 pt-3 text-center text-xs text-gray-500 flex items-center justify-center gap-1">
          <span>Crafted with endless affection by Kavi</span>
          <Heart className="h-3 w-3 fill-pink-500 text-pink-500" />
          <span>for Baby Priya</span>
        </div>
      </div>
    </div>
  );
};
