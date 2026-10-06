'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import { api } from '@/lib/api';

interface VideoPlayerProps {
  lessonId: string;
  streamUrl: string;
  isHls?: boolean;
  initialPosition?: number;
  onComplete?: () => void;
  onProgress?: (seconds: number) => void;
}

export function VideoPlayer({
  lessonId, streamUrl, isHls = true,
  initialPosition = 0, onComplete, onProgress,
}: VideoPlayerProps) {
  const videoRef    = useRef<HTMLVideoElement>(null);
  const hlsRef      = useRef<null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  const [playing,  setPlaying]  = useState(false);
  const [muted,    setMuted]    = useState(false);
  const [loading,  setLoading]  = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration,    setDuration]    = useState(0);
  const [volume,      setVolume]      = useState(1);
  const [controlsVisible, setControlsVisible] = useState(true);
  const controlsTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const showControls = () => {
    setControlsVisible(true);
    clearTimeout(controlsTimer.current);
    controlsTimer.current = setTimeout(() => { if (playing) setControlsVisible(false); }, 3000);
  };

  // Save progress every 10 seconds
  const saveProgress = useCallback(async (positionSecs: number, isCompleted = false) => {
    try {
      await api(`/lessons/${lessonId}/progress`, {
        method: 'POST',
        body: JSON.stringify({
          watch_time_seconds: Math.floor(positionSecs),
          last_position_secs: Math.floor(positionSecs),
          is_completed: isCompleted,
        }),
      });
    } catch { /* silent */ }
  }, [lessonId]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Direct MP4 playback (HLS transcoding not yet implemented)
    video.src = streamUrl;
    video.currentTime = initialPosition;
    setLoading(false);

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      onProgress?.(video.currentTime);
    };
    const handleDuration = () => setDuration(video.duration);
    const handleEnded    = () => {
      setPlaying(false);
      saveProgress(video.duration, true);
      onComplete?.();
    };
    const handlePlay   = () => setPlaying(true);
    const handlePause  = () => setPlaying(false);
    const handleWaiting = () => setLoading(true);
    const handleCanPlay = () => setLoading(false);

    video.addEventListener('timeupdate',    handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleDuration);
    video.addEventListener('ended',         handleEnded);
    video.addEventListener('play',          handlePlay);
    video.addEventListener('pause',         handlePause);
    video.addEventListener('waiting',       handleWaiting);
    video.addEventListener('canplay',       handleCanPlay);

    // Auto-save every 10s
    progressRef.current = setInterval(() => {
      if (!video.paused) saveProgress(video.currentTime);
    }, 10_000);

    return () => {
      hlsRef.current = null;
      clearInterval(progressRef.current);
      clearTimeout(controlsTimer.current);
      video.removeEventListener('timeupdate',    handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleDuration);
      video.removeEventListener('ended',         handleEnded);
      video.removeEventListener('play',          handlePlay);
      video.removeEventListener('pause',         handlePause);
      video.removeEventListener('waiting',       handleWaiting);
      video.removeEventListener('canplay',       handleCanPlay);
    };
  }, [streamUrl, isHls, initialPosition, saveProgress, onComplete, onProgress]);

  const togglePlay = () => {
    const v = videoRef.current!;
    playing ? v.pause() : v.play();
  };

  const toggleMute = () => {
    const v = videoRef.current!;
    v.muted = !muted;
    setMuted(!muted);
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current!;
    v.currentTime = Number(e.target.value);
    setCurrentTime(Number(e.target.value));
  };

  const toggleFullscreen = () => {
    const el = containerRef.current!;
    document.fullscreenElement ? document.exitFullscreen() : el.requestFullscreen();
  };

  const rewind = () => {
    const v = videoRef.current!;
    v.currentTime = Math.max(0, v.currentTime - 10);
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-black rounded-xl overflow-hidden group select-none"
      onMouseMove={showControls}
      onClick={showControls}
      style={{ aspectRatio: '16/9' }}
    >
      <video
        ref={videoRef}
        className="w-full h-full"
        onClick={togglePlay}
        playsInline
      />

      {/* Loading spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <Loader2 className="w-10 h-10 text-white animate-spin" />
        </div>
      )}

      {/* Controls overlay */}
      <div className={clsx(
        'absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity duration-300',
        controlsVisible ? 'opacity-100' : 'opacity-0'
      )}>
        {/* Progress bar */}
        <div className="px-4 pb-1">
          <input
            type="range" min={0} max={duration || 100} step={0.1} value={currentTime}
            onChange={seek}
            className="w-full h-1 accent-brand-500 cursor-pointer"
          />
        </div>

        {/* Buttons row */}
        <div className="flex items-center gap-2 px-4 pb-3">
          <button onClick={togglePlay} className="text-white hover:text-brand-400 transition-colors p-1">
            {playing ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
          </button>
          <button onClick={rewind} className="text-white hover:text-brand-400 transition-colors p-1">
            <RotateCcw className="w-5 h-5" />
          </button>
          <button onClick={toggleMute} className="text-white hover:text-brand-400 transition-colors p-1">
            {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          <input
            type="range" min={0} max={1} step={0.05} value={muted ? 0 : volume}
            onChange={(e) => { videoRef.current!.volume = Number(e.target.value); setVolume(Number(e.target.value)); }}
            className="w-20 h-1 accent-brand-500 cursor-pointer"
          />
          <span className="text-white text-xs ml-1">{fmt(currentTime)} / {fmt(duration)}</span>
          <button onClick={toggleFullscreen} className="text-white hover:text-brand-400 transition-colors p-1 ml-auto">
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
