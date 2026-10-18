import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { sound } from '../utils/audio';

interface AudioPlayerProps {
  autoStartTrigger?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ autoStartTrigger }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  useEffect(() => {
    if (autoStartTrigger && !hasInteracted) {
      sound.startBackgroundMelody();
      setIsPlaying(true);
      setHasInteracted(true);
    }
  }, [autoStartTrigger, hasInteracted]);

  const handleToggle = () => {
    setHasInteracted(true);
    if (!isPlaying) {
      sound.startBackgroundMelody();
      setIsPlaying(true);
    } else {
      const unmuted = sound.toggleMute();
      setIsPlaying(unmuted);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <button
        onClick={handleToggle}
        aria-label={isPlaying ? 'Mute background birthday music' : 'Play soft birthday melody'}
        title={isPlaying ? 'Mute Music' : 'Play Birthday Melody'}
        className="group relative flex items-center gap-2 rounded-full border border-pink-200/80 bg-white/85 px-3 py-2 text-pink-600 shadow-md backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-pink-50 hover:shadow-pink-200/50 focus:outline-none focus:ring-2 focus:ring-pink-400"
      >
        <div className="relative flex items-center justify-center">
          {isPlaying ? (
            <Volume2 className="h-5 w-5 animate-pulse text-pink-500" />
          ) : (
            <VolumeX className="h-5 w-5 text-gray-400 group-hover:text-pink-400" />
          )}
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-pink-500"></span>
            </span>
          )}
        </div>
        <span className="hidden text-xs font-medium sm:inline-block">
          {isPlaying ? (
            <span className="flex items-center gap-1 text-pink-600">
              <Music className="h-3.5 w-3.5 animate-bounce" />
              Melody Playing
            </span>
          ) : (
            <span className="text-gray-500">Play Song 🎵</span>
          )}
        </span>
      </button>
    </div>
  );
};
