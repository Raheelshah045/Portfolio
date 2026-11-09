import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, MessageCircle, Layers, Mail, Play, RotateCcw } from 'lucide-react';
import { INFO } from '../data/info';

/**
 * Hero Component (Seamless Video Stage & Right-Anchored Full-Body Composition)
 * ==============================================================================
 * Hosts the authentic 'Raheel_Intro.mp4' video directly inside the Hero Section.
 * Remains paused on initial load with an elegant, compact "Watch Intro · Sound On"
 * glass pill indicator. Audio-enabled playback is initiated directly via user interaction.
 * Pauses when scrolled out of view and resumes from exact timestamp if active.
 * Positioned on the right side with complete head-to-shoe visibility.
 */
export default function Hero({ onOpenContact }) {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const wasPlayingRef = useRef(false);
  const hasUserStartedRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [playError, setPlayError] = useState(false);

  const roles = useMemo(() => [
    'Software Developer',
    'Full-Stack Developer',
    'Automation Engineer',
    'Solution Architect',
    'AI Integration Specialist'
  ], []);

  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter Animation (Strictly preserved in sequence, timing and behavior)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCharIdx(roles[roleIdx].length);
      return;
    }

    const currentRole = roles[roleIdx];
    const typingSpeed = isDeleting ? 38 : 75;

    const timer = setTimeout(() => {
      if (!isDeleting && charIdx < currentRole.length) {
        setCharIdx(charIdx + 1);
      } else if (isDeleting && charIdx > 0) {
        setCharIdx(charIdx - 1);
      } else if (!isDeleting && charIdx === currentRole.length) {
        setTimeout(() => setIsDeleting(true), 2100);
      } else if (isDeleting && charIdx === 0) {
        setIsDeleting(false);
        setRoleIdx((prev) => (prev + 1) % roles.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, roleIdx, roles]);

  // Viewport Intersection Monitoring (Never autoplays on mount; pauses when scrolled away,
  // and only resumes if user intentionally started playback)
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = videoRef.current;
          if (!video) return;

          if (!entry.isIntersecting) {
            if (!video.paused && !video.ended) {
              wasPlayingRef.current = true;
              video.pause();
            }
          } else {
            // Only auto-resume if the user explicitly clicked to play previously!
            if (wasPlayingRef.current && hasUserStartedRef.current && !video.ended) {
              video.play().catch(() => {});
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  // Direct User Interaction Playback Trigger (Unmuted audio initiated inside click event)
  const handlePlayToggle = (e) => {
    if (e) {
      e.stopPropagation();
    }
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      // Direct user gesture allows unmuted audio playback per browser security policy
      video.muted = false;
      video.volume = 1.0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsEnded(false);
            setPlayError(false);
            setHasStarted(true);
            hasUserStartedRef.current = true;
            wasPlayingRef.current = true;
          })
          .catch((err) => {
            // Strictly reject muted fallback: keep paused, keep audio unmuted, report error, allow retry
            console.error('Sound-enabled video playback failed:', err);
            video.pause();
            video.muted = false;
            setIsPlaying(false);
            setPlayError(true);
            wasPlayingRef.current = false;
          });
      }
    } else {
      video.pause();
      setIsPlaying(false);
      wasPlayingRef.current = false;
    }
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section ref={heroRef} id="home" className="hero-stage-container">
      {/* Ambient Floor Light (Native continuation of studio atmosphere) */}
      <div className="hero-ambient-spotlight" aria-hidden="true" />

      {/* 
        Hero Video Stage Anchor:
        - Occupies the right side of the Hero section.
        - Raheel stands naturally in full-body view (head near top, shoes near bottom).
        - Edge mask dissolves all perimeter edges seamlessly into the background.
        - Clicking anywhere on the video area toggles play/pause with audio.
      */}
      <div
        className="hero-video-stage-anchor"
        onClick={handlePlayToggle}
        aria-label={isPlaying ? "Pause video introduction" : "Play video introduction with sound"}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handlePlayToggle(e);
          }
        }}
      >
        <video
          ref={videoRef}
          src="/Raheel_Intro.mp4"
          poster="/intro_poster.jpg"
          playsInline
          loop={false}
          preload="metadata"
          className="hero-video-element"
          onPlay={() => {
            setIsPlaying(true);
            setIsEnded(false);
            setHasStarted(true);
          }}
          onPause={() => setIsPlaying(false)}
          onEnded={() => {
            setIsPlaying(false);
            setIsEnded(true);
            wasPlayingRef.current = false;
          }}
        />
        {/* Seamless desktop blending overlay — smoothly dissolves video into the dark studio backdrop */}
        <div className="hero-desktop-gradient-overlay" aria-hidden="true" />
        {/* Subtle mobile gradient overlay for pristine typography contrast without obscuring character */}
        <div className="hero-mobile-gradient-overlay" aria-hidden="true" />
      </div>

      {/* Subtle, attractive Glass-Style Play Pill Indicator */}
      <button
        type="button"
        onClick={handlePlayToggle}
        className="hero-video-pill"
        aria-label={
          isPlaying
            ? "Pause introduction video"
            : isEnded
            ? "Replay introduction video with sound"
            : playError
            ? "Playback failed. Tap to retry with sound"
            : hasStarted
            ? "Resume introduction video with sound"
            : "Watch introduction video with sound"
        }
      >
        {isPlaying ? (
          <span className="hero-sound-wave" aria-hidden="true">
            <span className="hero-sound-wave-bar" />
            <span className="hero-sound-wave-bar" />
            <span className="hero-sound-wave-bar" />
          </span>
        ) : isEnded || playError ? (
          <RotateCcw size={13} aria-hidden="true" />
        ) : (
          <Play size={13} fill="currentColor" aria-hidden="true" />
        )}
        <span>
          {isPlaying
            ? "Intro Playing · Pause"
            : isEnded
            ? "Replay Intro · Sound On"
            : playError
            ? "Tap to Retry · Sound On"
            : hasStarted
            ? "Resume Intro · Sound On"
            : "Watch Intro · Sound On"}
        </span>
      </button>

      {/* Left Content Area */}
      <div className="container-max hero-content-area" style={{ position: 'relative', zIndex: 5, width: '100%' }}>
        <motion.div
          className="hero-content-wrapper"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            maxWidth: '43rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.4rem'
          }}
        >
          {/* Primary Name Headline */}
          <div>
            <h1
              className="hero-heading"
              style={{
                fontSize: 'clamp(2.4rem, 7vw, 5rem)',
                fontWeight: 900,
                letterSpacing: '-0.035em',
                lineHeight: 1.05,
                color: '#F8FAFC',
                marginBottom: '0.65rem'
              }}
            >
              {INFO.name}
            </h1>

            {/* Typewriter Role Presentation with Warm Accent */}
            <div
              className="hero-typewriter"
              style={{
                fontSize: 'clamp(1.2rem, 3.2vw, 2.2rem)',
                fontWeight: 700,
                minHeight: '2.8rem',
                display: 'flex',
                alignItems: 'center',
                letterSpacing: '-0.015em'
              }}
            >
              <span style={{ color: '#E2E8F0' }}>
                {roles[roleIdx].substring(0, charIdx)}
              </span>
              <span
                style={{
                  color: '#C27838',
                  marginLeft: '4px',
                  fontWeight: 300,
                  display: 'inline-block'
                }}
                className="animate-pulse"
              >
                |
              </span>
            </div>
          </div>

          {/* Authentic Professional Value Proposition */}
          <p
            className="hero-description"
            style={{
              fontSize: 'clamp(0.98rem, 2vw, 1.08rem)',
              color: '#CBD5E1',
              lineHeight: 1.7,
              maxWidth: '38rem',
              margin: 0
            }}
          >
            Building high-performance software products, intelligent automation workflows, and resilient digital architectures.
            Combining computer science principles with real-world enterprise banking discipline at United Bank Limited.
          </p>

          {/* Action Buttons in Refined Neutral Styling */}
          <div className="hero-action-buttons" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '0.25rem' }}>
            <button
              onClick={() => scrollTo('projects')}
              className="btn-primary"
              style={{
                fontSize: '0.95rem',
                padding: '0.85rem 1.65rem',
                flex: '1 1 auto',
                minWidth: '160px',
                backgroundColor: '#F8FAFC',
                color: '#0A0E17',
                border: '1px solid #F8FAFC'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#E2E8F0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F8FAFC';
              }}
            >
              <Layers size={18} />
              Explore Projects
            </button>

            <button
              onClick={() => {
                if (onOpenContact) onOpenContact();
                else window.dispatchEvent(new CustomEvent('open-contact-modal'));
              }}
              className="btn-secondary"
              style={{
                fontSize: '0.95rem',
                padding: '0.85rem 1.65rem',
                flex: '1 1 auto',
                minWidth: '150px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#F8FAFC',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.16)';
                e.currentTarget.style.borderColor = '#F8FAFC';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              <Mail size={18} />
              Get in Touch
            </button>
          </div>

          {/* Official Social Portals */}
          <div
            className="hero-social-links"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              paddingTop: '0.75rem',
              flexWrap: 'wrap'
            }}
          >
            <a
              href={INFO.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand-github"
              title="GitHub Repositories"
            >
              <Github size={15} /> GitHub
            </a>

            <a
              href={INFO.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand-linkedin"
              title="LinkedIn Profile"
            >
              <Linkedin size={15} /> LinkedIn
            </a>

            <a
              href={INFO.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand-whatsapp"
              title="Direct WhatsApp"
            >
              <MessageCircle size={15} /> WhatsApp
            </a>
          </div>
        </motion.div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <div
        className="hero-scroll-indicator"
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.35rem'
        }}
      >
        <button
          onClick={() => scrollTo('about')}
          aria-label="Scroll down to About section"
          style={{
            background: 'none',
            border: 'none',
            color: '#94A3B8',
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#F8FAFC')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
        >
          <ArrowDown size={18} className="animate-bounce" />
        </button>
      </div>
    </section>
  );
}
