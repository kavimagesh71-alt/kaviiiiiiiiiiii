// Web Audio API Synthesizer for gentle music-box style birthday melody and magical sound effects
class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isMusicPlaying: boolean = false;
  private musicTimer: number | null = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.musicGain.connect(this.masterGain);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.8, this.ctx.currentTime);
    }
    if (!this.isMuted && !this.isMusicPlaying) {
      this.startBackgroundMelody();
    }
    return !this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getIsPlaying(): boolean {
    return this.isMusicPlaying && !this.isMuted;
  }

  // Play a music-box bell chime note
  private playBellNote(freq: number, time: number, duration: number = 0.8) {
    if (!this.ctx || !this.musicGain || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    // Sweet sine with slight harmonic for a music box sound
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    // Subtle gentle vibrato
    const vib = this.ctx.createOscillator();
    const vibGain = this.ctx.createGain();
    vib.frequency.setValueAtTime(5, time);
    vibGain.gain.setValueAtTime(1.5, time);
    vib.connect(osc.frequency);
    vib.start(time);
    vib.stop(time + duration);

    // Bell envelope: quick attack, sparkling sustain, gentle exponential decay
    noteGain.gain.setValueAtTime(0, time);
    noteGain.gain.linearRampToValueAtTime(0.25, time + 0.02);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(noteGain);
    noteGain.connect(this.musicGain);

    osc.start(time);
    osc.stop(time + duration);
  }

  // Soft "Happy Birthday to you" lullaby melody loop
  public startBackgroundMelody() {
    this.initContext();
    if (this.isMusicPlaying) return;
    this.isMusicPlaying = true;

    // Melody: Happy Birthday (G4, G4, A4, G4, C5, B4 ...) in music-box octave
    const notes: [number, number][] = [
      // note freq, duration in beats (0.5 = 1 beat, 1 = 2 beats)
      [392.0, 0.75], // G4
      [392.0, 0.25], // G4
      [440.0, 1.0],  // A4
      [392.0, 1.0],  // G4
      [523.25, 1.0], // C5
      [493.88, 2.0], // B4

      [392.0, 0.75], // G4
      [392.0, 0.25], // G4
      [440.0, 1.0],  // A4
      [392.0, 1.0],  // G4
      [587.33, 1.0], // D5
      [523.25, 2.0], // C5

      [392.0, 0.75], // G4
      [392.0, 0.25], // G4
      [783.99, 1.0], // G5
      [659.25, 1.0], // E5
      [523.25, 1.0], // C5
      [493.88, 1.0], // B4
      [440.0, 1.5],  // A4

      [698.46, 0.75], // F5
      [698.46, 0.25], // F5
      [659.25, 1.0],  // E5
      [523.25, 1.0],  // C5
      [587.33, 1.0],  // D5
      [523.25, 2.5],  // C5
    ];

    const tempoSecPerBeat = 0.55; // Gentle peaceful tempo

    const scheduleSequence = () => {
      if (!this.ctx || !this.isMusicPlaying) return;
      const startTime = this.ctx.currentTime + 0.1;
      let curTime = startTime;

      for (let i = 0; i < notes.length; i++) {
        const [freq, beats] = notes[i];
        this.playBellNote(freq, curTime, beats * tempoSecPerBeat * 1.6);
        // Add soft warm octave companion
        if (i % 2 === 0) {
          this.playBellNote(freq * 0.5, curTime, beats * tempoSecPerBeat * 1.8);
        }
        curTime += beats * tempoSecPerBeat;
      }

      // Schedule loop with a gentle 2 second breathing pause between loops
      const totalDuration = (curTime - startTime) + 2.5;
      this.musicTimer = window.setTimeout(() => {
        if (this.isMusicPlaying) {
          scheduleSequence();
        }
      }, totalDuration * 1000);
    };

    scheduleSequence();
  }

  public stopBackgroundMelody() {
    this.isMusicPlaying = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }

  // Sound Effect 1: Magic Unlock Chime
  public playUnlockSound() {
    this.initContext();
    if (!this.ctx || this.isMuted) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    const startTime = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      const t = startTime + idx * 0.1;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.3, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(t);
      osc.stop(t + 0.65);
    });
  }

  // Sound Effect 2: Candle Blowout Wind Sound
  public playCandleBlowSound() {
    this.initContext();
    if (!this.ctx || this.isMuted) return;

    // Filtered noise simulating a gentle breath/puff of air
    const bufferSize = this.ctx.sampleRate * 0.6;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.5);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.55);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain!);

    noise.start();
  }

  // Sound Effect 3: Birthday Fanfare & Sparkles
  public playCelebrationSound() {
    this.initContext();
    if (!this.ctx || this.isMuted) return;

    const chords = [
      [523.25, 659.25, 783.99], // C Major
      [587.33, 739.99, 880.0],  // D Major
      [659.25, 830.61, 987.77], // E
      [1046.5, 1318.5, 1567.98] // Sparkling High C Major
    ];

    const t = this.ctx.currentTime;
    chords.forEach((chord, step) => {
      chord.forEach((freq) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const noteTime = t + step * 0.16;

        osc.type = step === chords.length - 1 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.01, noteTime);
        gain.gain.linearRampToValueAtTime(0.2, noteTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + (step === 3 ? 1.4 : 0.4));

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(noteTime);
        osc.stop(noteTime + 1.5);
      });
    });
  }

  // Sound Effect 4: Letter Open gentle paper rustle & sparkle
  public playLetterOpenSound() {
    this.initContext();
    if (!this.ctx || this.isMuted) return;

    const t = this.ctx.currentTime;
    const notes = [659.25, 880.0, 1174.66, 1318.51];
    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      const noteTime = t + idx * 0.08;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.01, noteTime);
      gain.gain.linearRampToValueAtTime(0.18, noteTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.5);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(noteTime);
      osc.stop(noteTime + 0.55);
    });
  }

  // Error buzz sound
  public playErrorSound() {
    this.initContext();
    if (!this.ctx || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const t = this.ctx.currentTime;

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, t);
    osc.frequency.linearRampToValueAtTime(140, t + 0.25);

    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

    osc.connect(gain);
    gain.connect(this.masterGain!);

    osc.start(t);
    osc.stop(t + 0.26);
  }
}

export const sound = new SoundEngine();
