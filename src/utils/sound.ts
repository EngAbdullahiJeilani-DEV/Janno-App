// Web Audio API Sound Generator for Janno Romantic Experience

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private ambientOscillators: { osc: OscillatorNode; gain: GainNode }[] = [];
  private isAmbientPlaying: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopAmbientMusic();
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  // Play soft romantic shimmer/chime sound on button clicks or interaction
  public playShimmerSound() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
      freqs.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + idx * 0.06);

        gain.gain.setValueAtTime(0.01, this.ctx!.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.08, this.ctx!.currentTime + idx * 0.06 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + idx * 0.06 + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(this.ctx!.currentTime + idx * 0.06);
        osc.stop(this.ctx!.currentTime + idx * 0.06 + 0.45);
      });
    } catch {
      // Audio fallback
    }
  }

  // Unboxing surprise magical chime & warm chord
  public playUnboxCelebrationSound() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      // Arpeggio chord F major 7 -> C major 7
      const notes = [349.23, 440.00, 523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + i * 0.1);

        gain.gain.setValueAtTime(0, this.ctx!.currentTime + i * 0.1);
        gain.gain.linearRampToValueAtTime(0.12, this.ctx!.currentTime + i * 0.1 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx!.currentTime + i * 0.1 + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(this.ctx!.currentTime + i * 0.1);
        osc.stop(this.ctx!.currentTime + i * 0.1 + 1.3);
      });
    } catch {
      // Audio fallback
    }
  }

  // Envelope Wax Seal Snap & Open sound
  public playEnvelopeOpenSound() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 0.22);
    } catch {
      // Audio fallback
    }
  }

  // Toggle ambient romantic music
  public toggleAmbientMusic(): boolean {
    if (this.isAmbientPlaying) {
      this.stopAmbientMusic();
      return false;
    } else {
      this.startAmbientMusic();
      return true;
    }
  }

  public startAmbientMusic() {
    if (this.isMuted || this.isAmbientPlaying) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      this.stopAmbientMusic(); // clear existing if any

      // Romantic soft warm pads (C major 7th chord: C3, G3, B3, E4)
      const frequencies = [130.81, 196.00, 246.94, 329.63, 392.00];
      
      frequencies.forEach(freq => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.value = freq;

        // Slow LFO for warmth amplitude modulation
        gain.gain.setValueAtTime(0.02, this.ctx!.currentTime);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start();
        this.ambientOscillators.push({ osc, gain });
      });

      this.isAmbientPlaying = true;
    } catch {
      // Audio fallback
    }
  }

  public stopAmbientMusic() {
    this.ambientOscillators.forEach(({ osc, gain }) => {
      try {
        gain.gain.exponentialRampToValueAtTime(0.0001, (this.ctx?.currentTime || 0) + 0.5);
        setTimeout(() => {
          osc.stop();
          osc.disconnect();
        }, 500);
      } catch {
        // Safe catch
      }
    });
    this.ambientOscillators = [];
    this.isAmbientPlaying = false;
  }

  public getIsAmbientPlaying(): boolean {
    return this.isAmbientPlaying;
  }
}

export const soundManager = new SoundManager();
