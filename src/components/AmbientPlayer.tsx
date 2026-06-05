import { useEffect, useRef, useState } from "react";
import { Waves, VolumeX, Volume2 } from "lucide-react";
import audioAsset from "@/assets/audio/mar-con-art-ambient.mp3.asset.json";

const STORAGE_KEY = "marconart-audio";
const INITIAL_VOLUME = 0.15;
const FADE_MS = 1200;
const AUDIO_SRC = new URL(audioAsset.url, "https://marconart.lovable.app").href;

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
  const ignoreClickRef = useRef(false);

  const [prefs] = useState<Saved>(loadPrefs);
  const [enabled, setEnabled] = useState(false);
  const [volume, setVolume] = useState(prefs.volume);
  const [showSlider, setShowSlider] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);

  volumeRef.current = volume > 0 ? volume : INITIAL_VOLUME;

  // Create audio element once (no autoplay attempt — iOS/Safari requires gesture)
  useEffect(() => {
    const a = new Audio();
    a.src = AUDIO_SRC;
    a.loop = true;
    a.preload = "auto";
    a.crossOrigin = "anonymous";
    (a as any).playsInline = true;
    a.setAttribute("playsinline", "");
    a.setAttribute("webkit-playsinline", "");
    a.volume = Math.max(prefs.volume || INITIAL_VOLUME, 0.05);
    a.muted = false;
    audioRef.current = a;

    // If user previously enabled it, surface the gesture hint so first tap starts audio
    if (prefs.enabled) setNeedsGesture(true);

    return () => {
      a.pause();
      audioRef.current = null;
      if (fadeRef.current) window.clearInterval(fadeRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fadeTo = (target: number, onDone?: () => void) => {
    const a = audioRef.current;
    if (fadeRef.current) window.clearInterval(fadeRef.current);
    const start = a?.volume ?? 0;
    const startTime = performance.now();
    fadeRef.current = window.setInterval(() => {
      const t = Math.min(1, (performance.now() - startTime) / FADE_MS);
      const v = start + (target - start) * t;
      if (a) a.volume = v;
      if (t >= 1) {
        if (fadeRef.current) window.clearInterval(fadeRef.current);
        fadeRef.current = null;
        onDone?.();
      }
    }, 30) as unknown as number;
  };

  // Live volume change while playing
  useEffect(() => {
    if (!enabled || fadeRef.current) return;
    if (audioRef.current) audioRef.current.volume = volume;
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

    // Pause
    if (enabled) {
      fadeTo(0, () => a.pause());
      setEnabled(false);
      setNeedsGesture(false);
      return;
    }

    // Start — play() must run directly inside the tap/click gesture for iOS/Safari.
    const target = Math.max(volumeRef.current || INITIAL_VOLUME, 0.05);
    if (fadeRef.current) window.clearInterval(fadeRef.current);
    fadeRef.current = null;
    a.src = AUDIO_SRC;
    a.loop = true;
    a.muted = false;
    a.volume = target;

    const p = a.play();
    const onOk = () => {
      a.volume = target;
      setVolume(target);
      setEnabled(true);
      setNeedsGesture(false);
    };
    if (p && typeof p.then === "function") {
      p.then(onOk).catch(() => {
        setNeedsGesture(true);
        setEnabled(false);
      });
    } else {
      onOk();
    }
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    ignoreClickRef.current = true;
    handleToggle();
    window.setTimeout(() => {
      ignoreClickRef.current = false;
    }, 500);
  };

  const handleClick = () => {
    if (ignoreClickRef.current) return;
    handleToggle();
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
        onPointerDown={handlePointerDown}
        onClick={handleClick}
        aria-label={enabled ? "Silenciar música ambiente" : "Activar experiencia sonora"}
        title={enabled ? "Silenciar" : "🎨 Activar experiencia sonora"}
        className={`relative h-12 w-12 rounded-full border border-border bg-background/90 backdrop-blur-md shadow-md flex items-center justify-center transition-all hover:scale-105 hover:bg-primary/10 ${
          enabled ? "text-primary" : "text-muted-foreground"
        }`}
      >
        {enabled ? <Waves size={20} /> : <VolumeX size={20} />}
        {showPulse && (
          <span
            className={`absolute inset-0 rounded-full border ${
              needsGesture && !enabled ? "border-sakura-deep/60" : "border-primary/40"
            } animate-ping`}
          />
        )}
      </button>
    </div>
  );
};

export default AmbientPlayer;
