import { useEffect, useRef, useState } from "react";
import { Waves, VolumeX, Volume2 } from "lucide-react";
import audioAsset from "@/assets/audio/mar-con-art-ambient.mp3.asset.json";

const STORAGE_KEY = "marconart-audio";
const INITIAL_VOLUME = 0.15;
const FADE_MS = 1200;

type Saved = { enabled: boolean; volume: number };

const loadPrefs = (): Saved => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { enabled: false, volume: INITIAL_VOLUME, ...JSON.parse(raw) };
  } catch {}
  return { enabled: false, volume: INITIAL_VOLUME };
};

const AmbientPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const volumeRef = useRef<number>(INITIAL_VOLUME);
  const [prefs] = useState<Saved>(loadPrefs);
  const [enabled, setEnabled] = useState(false);
  const [volume, setVolume] = useState(prefs.volume);
  const [showSlider, setShowSlider] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);

  volumeRef.current = volume > 0 ? volume : INITIAL_VOLUME;

  // Init audio element once + attempt autoplay if previously enabled
  useEffect(() => {
    const a = new Audio(audioAsset.url);
    a.loop = true;
    a.preload = "auto";
    a.volume = 0;
    audioRef.current = a;

    if (prefs.enabled) {
      const p = a.play();
      if (p && typeof p.then === "function") {
        p.then(() => {
          setEnabled(true);
          fadeTo(volumeRef.current);
        }).catch(() => {
          setNeedsGesture(true);
        });
      }
    }

    return () => {
      a.pause();
      audioRef.current = null;
      if (fadeRef.current) window.clearInterval(fadeRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fadeTo = (target: number, onDone?: () => void) => {
    const a = audioRef.current;
    if (!a) return;
    if (fadeRef.current) window.clearInterval(fadeRef.current);
    const start = a.volume;
    const startTime = performance.now();
    fadeRef.current = window.setInterval(() => {
      const t = Math.min(1, (performance.now() - startTime) / FADE_MS);
      a.volume = start + (target - start) * t;
      if (t >= 1) {
        if (fadeRef.current) window.clearInterval(fadeRef.current);
        fadeRef.current = null;
        onDone?.();
      }
    }, 30) as unknown as number;
  };

  // Live volume change while playing
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (enabled && !fadeRef.current) a.volume = volume;
  }, [volume, enabled]);

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ enabled, volume }));
    } catch {}
  }, [enabled, volume]);

  const handleToggle = () => {
    const a = audioRef.current;
    if (!a) return;

    // If currently playing -> pause
    if (enabled) {
      fadeTo(0, () => a.pause());
      setEnabled(false);
      setNeedsGesture(false);
      return;
    }

    // Not playing: try to start NOW, inside user gesture
    a.volume = 0;
    const target = volumeRef.current;
    const p = a.play();
    if (p && typeof p.then === "function") {
      p.then(() => {
        setEnabled(true);
        setNeedsGesture(false);
        fadeTo(target);
      }).catch(() => {
        setNeedsGesture(true);
        setEnabled(false);
      });
    } else {
      setEnabled(true);
      setNeedsGesture(false);
      fadeTo(target);
    }
  };

  const showPulse = enabled || needsGesture;

  return (
    <div
      className="fixed bottom-5 right-5 z-[100] flex items-end gap-2"
      onMouseEnter={() => setShowSlider(true)}
      onMouseLeave={() => setShowSlider(false)}
    >
      {needsGesture && !enabled && (
        <div className="absolute bottom-14 right-0 bg-background/95 backdrop-blur-md border border-border rounded-2xl px-4 py-2.5 shadow-lg max-w-[240px] animate-fade-in">
          <p className="text-xs font-body text-foreground leading-snug">
            🎨 Toca el icono para activar la experiencia sonora
          </p>
          <span className="absolute -bottom-1.5 right-5 w-3 h-3 rotate-45 bg-background border-r border-b border-border" />
        </div>
      )}
      {showSlider && enabled && (
        <div className="bg-background/90 backdrop-blur-md border border-border rounded-full px-3 py-2 shadow-md flex items-center gap-2 animate-fade-in">
          <Volume2 size={14} className="text-muted-foreground" />
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-24 accent-primary cursor-pointer"
            aria-label="Volumen"
          />
        </div>
      )}
      <button
        onClick={handleToggle}
        aria-label={enabled ? "Silenciar música ambiente" : "Activar experiencia sonora"}
        title={enabled ? "Silenciar" : "🎨 Activar experiencia sonora"}
        className={`relative h-12 w-12 rounded-full border border-border bg-background/90 backdrop-blur-md shadow-md flex items-center justify-center transition-all hover:scale-105 hover:bg-primary/10 ${
          enabled ? "text-primary" : "text-muted-foreground"
        }`}
      >
        {enabled ? <Waves size={20} /> : <VolumeX size={20} />}
        {showPulse && (
          <span className={`absolute inset-0 rounded-full border ${needsGesture && !enabled ? "border-sakura-deep/60" : "border-primary/40"} animate-ping`} />
        )}
      </button>
    </div>
  );
};

export default AmbientPlayer;
