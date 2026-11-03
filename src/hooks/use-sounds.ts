import { useCallback, useEffect, useRef } from "react";

export const useSounds = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const pressBufferRef = useRef<AudioBuffer | null>(null);
  const releaseBufferRef = useRef<AudioBuffer | null>(null);

  useEffect(() => {
    let ctx: AudioContext | null = null;

    // Decode one optional sound asset. Missing files (404) or unsupported
    // audio are treated as "no sound" rather than surfaced as errors — these
    // assets are cosmetic and not shipped in every build.
    const loadBuffer = async (url: string): Promise<AudioBuffer | null> => {
      if (!ctx) return null;
      try {
        const res = await fetch(url);
        if (!res.ok) return null;
        const type = res.headers.get("content-type") ?? "";
        // A 404 handled by the app returns HTML, not audio — skip it.
        if (type.includes("text/html")) return null;
        const arrayBuffer = await res.arrayBuffer();
        if (arrayBuffer.byteLength === 0) return null;
        return await ctx.decodeAudioData(arrayBuffer);
      } catch {
        return null;
      }
    };

    const loadSound = async () => {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;

      ctx = new AudioContext();
      audioContextRef.current = ctx;

      pressBufferRef.current = await loadBuffer("/assets/keycap-sounds/press.mp3");
      releaseBufferRef.current = await loadBuffer("/assets/keycap-sounds/release.mp3");
      confettiBufferRef.current = await loadBuffer("/assets/sounds/vine-boom.mp3");
    };

    loadSound();

    return () => {
      audioContextRef.current?.close();
    };
  }, []);

  const getContext = useCallback(() => {
    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume().catch(() => { });
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback((startFreq: number, endFreq: number, duration: number, vol: number) => {
    try {
      const ctx = getContext();
      if (!ctx) return;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.type = "sine";
      const startTime = ctx.currentTime;

      oscillator.frequency.setValueAtTime(startFreq, startTime);
      oscillator.frequency.exponentialRampToValueAtTime(endFreq, startTime + duration);

      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(vol, startTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    } catch (error) {
      console.error("Failed to play notification sound", error);
    }
  }, [getContext]);

  const playSoundBuffer = useCallback((buffer: AudioBuffer | null, baseDetune = 0) => {
    try {
      const ctx = getContext();
      if (!ctx || !buffer) return;

      const source = ctx.createBufferSource();
      source.buffer = buffer;

      // Add slight variation
      source.detune.value = baseDetune + (Math.random() * 200) - 100;

      const gainNode = ctx.createGain();
      gainNode.gain.value = 0.4;

      source.connect(gainNode);
      gainNode.connect(ctx.destination);

      source.start(0);
    } catch (err) {
      console.error(err);
    }
  }, [getContext]);

  const playPressSound = useCallback(() => {
    playSoundBuffer(pressBufferRef.current);
  }, [playSoundBuffer]);

  const playReleaseSound = useCallback(() => {
    playSoundBuffer(releaseBufferRef.current);
  }, [playSoundBuffer]);

  // Send: Clear, slightly higher pitch, quick
  const playSendSound = useCallback(() => {
    playTone(600, 300, 0.25, 0.08);
  }, [playTone]);

  // Receive: Lower pitch, bubble-like, slightly longer
  const playReceiveSound = useCallback(() => {
    playTone(800, 400, 0.35, 0.1);
  }, [playTone]);

  const confettiBufferRef = useRef<AudioBuffer | null>(null);

  const playConfettiSound = useCallback((intensity: number = 0.5) => {
    try {
      const ctx = getContext();
      const buffer = confettiBufferRef.current;
      if (!ctx || !buffer) return;

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      // Lower intensity = higher pitch (lighter pop), higher = deeper boom
      source.playbackRate.value = 1.2 - intensity * 0.4;
      source.detune.value = (Math.random() * 100) - 50;

      const gainNode = ctx.createGain();
      gainNode.gain.value = 0.15 + intensity * 0.5;

      source.connect(gainNode);
      gainNode.connect(ctx.destination);
      source.start(0);
    } catch (err) {
      console.error(err);
    }
  }, [getContext]);

  // Charge tone — continuous oscillator whose pitch tracks intensity
  const chargeOscRef = useRef<OscillatorNode | null>(null);
  const chargeGainRef = useRef<GainNode | null>(null);

  const startChargeTone = useCallback(() => {
    try {
      const ctx = getContext();
      if (!ctx || chargeOscRef.current) return;

      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = 200;

      const gain = ctx.createGain();
      gain.gain.value = 0;

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      chargeOscRef.current = osc;
      chargeGainRef.current = gain;
    } catch (err) {
      console.error(err);
    }
  }, [getContext]);

  const updateChargeTone = useCallback((intensity: number) => {
    const osc = chargeOscRef.current;
    const gain = chargeGainRef.current;
    if (!osc || !gain) return;
    // Pitch rises from 200Hz to 800Hz
    osc.frequency.value = 200 + intensity * 600;
    // Volume fades in gently
    gain.gain.value = intensity * 0.06;
  }, []);

  const stopChargeTone = useCallback(() => {
    try {
      chargeOscRef.current?.stop();
    } catch { /* already stopped */ }
    chargeOscRef.current = null;
    chargeGainRef.current = null;
  }, []);

  return {
    playSendSound, playReceiveSound, playPressSound, playReleaseSound,
    playConfettiSound,
    startChargeTone, updateChargeTone, stopChargeTone,
  };
};
