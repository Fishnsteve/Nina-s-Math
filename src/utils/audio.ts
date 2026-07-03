/**
 * Retro/Chiptune Synthesized Audio Engine using Web Audio API
 * Zero dependencies, works instantly, lazy-initializes on user gesture
 */

let audioCtx: AudioContext | null = null;
let isMuted = localStorage.getItem('sulan_dancer_muted') === 'true';

// Lazy-initialize and resume AudioContext safely
function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  
  return audioCtx;
}

export const audioEngine = {
  getIsMuted(): boolean {
    return isMuted;
  },

  setMuted(muted: boolean) {
    isMuted = muted;
    localStorage.setItem('sulan_dancer_muted', muted ? 'true' : 'false');
  },

  toggleMute(): boolean {
    this.setMuted(!isMuted);
    // Play a short click to confirm unmuting if unmuted
    if (!isMuted) {
      this.play('click');
    }
    return isMuted;
  },

  play(sound: 'click' | 'nav' | 'correct' | 'wrong' | 'unlock' | 'equip' | 'level_up' | 'game_win' | 'game_over' | 'dance_1' | 'dance_2' | 'dance_3' | 'dance_4' | 'dance_5') {
    if (isMuted) return;

    const ctx = getAudioContext();
    if (!ctx) return;

    // Safety check for suspended context
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;

    switch (sound) {
      case 'click': {
        // High-fidelity tiny bubble-click/tick sound
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.08);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.08);
        break;
      }

      case 'nav': {
        // Ultra-clean high-pitch sliding tab indicator sound
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);

        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.12);
        break;
      }

      case 'correct': {
        // Retro joyful double arpeggio sound (C5 -> E5 -> G5 -> C6)
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, index) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + index * 0.06);

          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.08, now + index * 0.06 + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.06 + 0.18);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now + index * 0.06);
          osc.stop(now + index * 0.06 + 0.18);
        });
        break;
      }

      case 'wrong': {
        // Flat, slightly vibrating, sad downward slide (G3 -> E3 -> C3)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.linearRampToValueAtTime(110, now + 0.35);

        // Add a bit of tremolo/wobble
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 15; // 15Hz
        lfoGain.gain.value = 8; // pitch delta
        
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);

        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        lfo.start(now);
        osc.start(now);
        
        lfo.stop(now + 0.35);
        osc.stop(now + 0.35);
        break;
      }

      case 'unlock': {
        // Majestic glittering arcade sound
        const notes = [392.00, 523.25, 659.25, 783.99, 987.77, 1174.66, 1318.51]; // G4, C5, E5, G5, B5, D6, E6
        notes.forEach((freq, index) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + index * 0.05);

          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.06, now + index * 0.05 + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.05 + 0.25);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now + index * 0.05);
          osc.stop(now + index * 0.05 + 0.25);
        });
        break;
      }

      case 'equip': {
        // High-pitch dual-click popping sound
        [0, 0.06].forEach((delay) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(1200 - (delay * 3000), now + delay);
          osc.frequency.exponentialRampToValueAtTime(400, now + delay + 0.05);

          gain.gain.setValueAtTime(0.05, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.05);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now + delay);
          osc.stop(now + delay + 0.05);
        });
        break;
      }

      case 'level_up': {
        // Epic triumphant melody
        const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]; // C4 to G6 arpeggio
        notes.forEach((freq, index) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + index * 0.045);

          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.08, now + index * 0.045 + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.045 + 0.35);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now + index * 0.045);
          osc.stop(now + index * 0.045 + 0.35);
        });
        break;
      }

      case 'game_win': {
        // Happy little fanfare
        const fanfare = [
          { f: 523.25, d: 0.1 },  // C5
          { f: 659.25, d: 0.1 },  // E5
          { f: 783.99, d: 0.1 },  // G5
          { f: 1046.50, d: 0.18 }, // C6 (longer)
          { f: 783.99, d: 0.1 },  // G5
          { f: 1046.50, d: 0.3 }  // C6 (hold)
        ];
        let runningTime = 0;
        fanfare.forEach((note) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(note.f, now + runningTime);

          gain.gain.setValueAtTime(0, now + runningTime);
          gain.gain.linearRampToValueAtTime(0.06, now + runningTime + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.001, now + runningTime + note.d);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now + runningTime);
          osc.stop(now + runningTime + note.d);

          runningTime += note.d - 0.02; // slightly overlapping
        });
        break;
      }

      case 'game_over': {
        // Dramatic sad fail
        const badNotes = [
          { f: 293.66, d: 0.2 }, // D4
          { f: 277.18, d: 0.2 }, // C#4
          { f: 261.63, d: 0.2 }, // C4
          { f: 246.94, d: 0.45 } // B3 (hold & vibrato)
        ];
        let runningTime = 0;
        badNotes.forEach((note, index) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = index === 3 ? 'sawtooth' : 'triangle';
          osc.frequency.setValueAtTime(note.f, now + runningTime);

          if (index === 3) {
            // Add vibrato to the last note
            const lfo = ctx.createOscillator();
            const lfoGain = ctx.createGain();
            lfo.frequency.value = 8;
            lfoGain.gain.value = 5;
            lfo.connect(lfoGain);
            lfoGain.connect(osc.frequency);
            lfo.start(now + runningTime);
            lfo.stop(now + runningTime + note.d);
          }

          gain.gain.setValueAtTime(0, now + runningTime);
          gain.gain.linearRampToValueAtTime(0.06, now + runningTime + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.001, now + runningTime + note.d);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now + runningTime);
          osc.stop(now + runningTime + note.d);

          runningTime += note.d - 0.02;
        });
        break;
      }

      // 5 distinct melodic notes for the dance moves!
      case 'dance_1': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(261.63, now); // C4
        osc.frequency.exponentialRampToValueAtTime(329.63, now + 0.15); // E4
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
        break;
      }
      case 'dance_2': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(329.63, now); // E4
        osc.frequency.exponentialRampToValueAtTime(392.00, now + 0.15); // G4
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
        break;
      }
      case 'dance_3': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(392.00, now); // G4
        osc.frequency.exponentialRampToValueAtTime(523.25, now + 0.15); // C5
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
        break;
      }
      case 'dance_4': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.15); // E5
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
        break;
      }
      case 'dance_5': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(659.25, now); // E5
        osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.15); // G5
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
        break;
      }
    }
  }
};
