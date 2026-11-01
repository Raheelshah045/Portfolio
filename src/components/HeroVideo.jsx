import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, RotateCcw } from 'lucide-react';

/**
 * HeroVideo Component (Unified Atmospheric Video Stage)
 * =============================================================
 * Eliminates all rectangular video frames and container borders.
 * Uses hardware-accelerated CSS masking (mask-image and -webkit-mask-image)
 * to dissolve all 4 perimeter edges of the video directly into alpha transparency.
 * Raheel Jamal stands naturally on the right side with complete head-to-shoe
 * visibility, and the reflective studio floor flows seamlessly into the page.
 */
export default function HeroVideo() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const wasPlayingRef = useRef(false);

  const [isMuted, setIsMuted] = useState(true);
  const [hasEnded, setHasEnded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Respect user's operating system preferences for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      video.pause();
      return;
    }

    // Initial autoplay (muted as required by modern browsers)
    const startAutoplay = async () => {
      try {
        video.muted = true;
        await video.play();
        wasPlayingRef.current = true;
      } catch (err) {
        wasPlayingRef.current = false;
      }
    };

    startAutoplay();

    // IntersectionObserver: Pause when out of view, resume from exact position
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!videoRef.current) return;

          if (!entry.isIntersecting) {
            if (!videoRef.current.paused && !videoRef.current.ended) {
              wasPlayingRef.current = true;
              videoRef.current.pause();
            }
          } else {
            if (wasPlayingRef.current && !videoRef.current.ended && !prefersReducedMotion) {
              videoRef.current.play().catch(() => {});
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleSound = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.muted) {
      video.muted = false;
      setIsMuted(false);
      if (video.paused && !video.ended) {
        video.play().catch(() => {});
      }
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  const handleReplay = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    setHasEnded(false);
    video.currentTime = 0;
    video.play().then(() => {
      wasPlayingRef.current = true;
    }).catch(() => {});
  };

  const handleVideoEnded = () => {
    setHasEnded(true);
    wasPlayingRef.current = false;
  };

  return (
    <div ref={containerRef} className="hero-video-unified-stage" aria-hidden="true">
      {/* 
        Video Anchor:
        Positioned on the right side of the screen on desktop.
        CSS dual-axis mask dissolves left, right, top, and bottom edges into transparency.
      */}
      <div className="hero-video-character-frame">
        <video
          ref={videoRef}
          src="/Raheel_Intro.mp4"
          poster="/intro_poster.jpg"
          autoPlay
          muted={isMuted}
          playsInline
          preload="auto"
          onEnded={handleVideoEnded}
          className="hero-video-unified-player"
        />
      </div>

      {/* Subtle Ambient Radial Glow (Seamlessly extends the cyan studio rim light) */}
      <div className="hero-video-ambient-glow" />

      {/* Minimal Accessible Sound & Replay Overlay Controls (Bottom-Right) */}
      <aside
        aria-label="Video Controls"
        style={{
          position: 'absolute',
          bottom: '2rem',
          right: '2.5rem',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          pointerEvents: 'auto'
        }}
      >
        {/* Replay Button (Appears when video finishes) */}
        {hasEnded && (
          <button
            onClick={handleReplay}
            aria-label="Replay introduction"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.45rem 1rem',
              borderRadius: '9999px',
              background: 'rgba(56, 189, 248, 0.15)',
              color: '#38BDF8',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(56, 189, 248, 0.25)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(56, 189, 248, 0.15)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <RotateCcw size={13} /> Replay
          </button>
        )}

        {/* Sound Toggle (Clear, Accessible, Unobtrusive) */}
        <button
          onClick={toggleSound}
          aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.45rem 1rem',
            borderRadius: '9999px',
            background: isMuted ? 'rgba(15, 23, 42, 0.75)' : '#38BDF8',
            color: isMuted ? '#F8FAFC' : '#0A0F1D',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            fontSize: '0.78rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)'
          }}
          onMouseEnter={(e) => {
            if (isMuted) e.currentTarget.style.borderColor = '#38BDF8';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            if (isMuted) e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          <span>{isMuted ? 'Sound Off' : 'Sound On'}</span>
        </button>
      </aside>
    </div>
  );
}
