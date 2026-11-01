import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, MessageCircle, Layers, Mail } from 'lucide-react';
import { INFO } from '../data/info';

/**
 * Hero Component (Seamless Video Stage & Right-Anchored Full-Body Composition)
 * ==============================================================================
 * Hosts the authentic 'Raheel_Intro.mp4' video directly inside the Hero Section.
 * Plays inline muted on mount, pauses silently on click, resumes from exact position,
 * pauses when scrolled out of view, and stops cleanly at its final frame.
 * Positioned on the right side with complete head-to-shoe visibility.
 */
export default function Hero({ onOpenContact }) {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const wasPlayingRef = useRef(true);

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

  // Typewriter Animation
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

  // Video Autoplay & Viewport Intersection Monitoring
  useEffect(() => {
    const video = videoRef.current;
    const hero = heroRef.current;
    if (!video || !hero) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      video.pause();
      return;
    }

    let removeListeners = null;

    // Helper to silently unmute on first genuine user interaction outside the video
    const setupInteractionUnmute = () => {
      const unlockAudio = () => {
        if (videoRef.current) {
          videoRef.current.muted = false;
          if (videoRef.current.paused && wasPlayingRef.current) {
            videoRef.current.play().catch(() => {});
          }
        }
        cleanup();
      };

      const cleanup = () => {
        window.removeEventListener('pointerdown', unlockAudio, true);
        window.removeEventListener('keydown', unlockAudio, true);
        window.removeEventListener('scroll', unlockAudio, true);
        window.removeEventListener('touchstart', unlockAudio, true);
      };

      window.addEventListener('pointerdown', unlockAudio, { once: true, capture: true });
      window.addEventListener('keydown', unlockAudio, { once: true, capture: true });
      window.addEventListener('scroll', unlockAudio, { once: true, capture: true });
      window.addEventListener('touchstart', unlockAudio, { once: true, capture: true });

      removeListeners = cleanup;
    };

    // Attempt unmuted playback first
    video.muted = false;
    video.play().then(() => {
      wasPlayingRef.current = true;
    }).catch(() => {
      // Browser blocked unmuted autoplay: fall back to muted playback immediately
      video.muted = true;
      video.play().then(() => {
        wasPlayingRef.current = true;
      }).catch(() => {
        wasPlayingRef.current = false;
      });
      // Register silent interaction listener to unlock audio on first user gesture
      setupInteractionUnmute();
    });

    // Pause when scrolling away, resume from exact timestamp when returning
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
            if (wasPlayingRef.current && !videoRef.current.ended) {
              videoRef.current.play().catch(() => {});
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(hero);

    return () => {
      observer.disconnect();
      if (removeListeners) removeListeners();
    };
  }, []);

  // Silent toggle on click: pause if playing, resume from exact timestamp if paused
  const handleVideoAreaClick = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.muted = false;
      video.play().then(() => {
        wasPlayingRef.current = true;
      }).catch(() => {});
    } else {
      wasPlayingRef.current = false;
      video.pause();
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
        - Clicking anywhere on the video area toggles pause/resume silently with zero visual feedback.
      */}
      <div
        className="hero-video-stage-anchor"
        onClick={handleVideoAreaClick}
        aria-label="Toggle video playback"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleVideoAreaClick(e);
          }
        }}
      >
        <video
          ref={videoRef}
          src="/Raheel_Intro.mp4"
          autoPlay
          playsInline
          loop={false}
          preload="auto"
          className="hero-video-element"
        />
        {/* Subtle mobile gradient overlay for pristine typography contrast without obscuring character */}
        <div className="hero-mobile-gradient-overlay" aria-hidden="true" />
      </div>

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
