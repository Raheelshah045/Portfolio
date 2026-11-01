import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Terminal, FastForward } from 'lucide-react';
import { INFO } from '../data/info';

/**
 * OpeningSequence Component
 * -------------------------------------------------------------
 * Cinematic, high-tech opening experience.
 * Fully respectful of returning visitors & prefers-reduced-motion.
 * Immediate Skip [Esc] support.
 */
export default function OpeningSequence({ onComplete }) {
  const [step, setStep] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);

  const handleSkip = useCallback(() => {
    sessionStorage.setItem('rj_intro_seen', 'true');
    setIsDismissed(true);
    setTimeout(onComplete, 400);
  }, [onComplete]);

  useEffect(() => {
    // If the user already experienced the opening in this session, skip automatically
    const hasSeen = sessionStorage.getItem('rj_intro_seen');
    if (hasSeen) {
      onComplete();
      setIsDismissed(true);
      return;
    }

    // Step timers
    const timer1 = setTimeout(() => setStep(1), 700);
    const timer2 = setTimeout(() => setStep(2), 1700);
    const timer3 = setTimeout(() => setStep(3), 2800);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleSkip();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete, handleSkip]);

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          backgroundColor: '#060911',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          color: '#F8FAFC'
        }}
      >
        {/* Ambient background glow */}
        <div
          style={{
            position: 'absolute',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
            filter: 'blur(40px)'
          }}
        />

        {/* Skip Button (Top Right) */}
        <button
          onClick={handleSkip}
          aria-label="Skip introduction sequence"
          style={{
            position: 'absolute',
            top: '2rem',
            right: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#94A3B8',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#38BDF8';
            e.currentTarget.style.borderColor = '#38BDF8';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#94A3B8';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
          }}
        >
          <FastForward size={16} />
          Skip Intro <span style={{ opacity: 0.6, fontSize: '0.75rem' }}>[Esc]</span>
        </button>

        {/* Console Box */}
        <div
          style={{
            width: '100%',
            maxWidth: '560px',
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            borderRadius: '1rem',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 40px rgba(56, 189, 248, 0.1)',
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '0.75rem 1.25rem',
              background: 'rgba(2, 6, 23, 0.9)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Terminal size={16} color="#38BDF8" />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.06em' }}>
                BOOT_SEQUENCE // v2.6.4
              </span>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }} />
            </div>
          </div>

          {/* Body Content */}
          <div style={{ padding: '1.75rem 1.5rem', minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ fontSize: '0.85rem', color: '#64748B', fontFamily: 'monospace', marginBottom: '0.75rem' }}
            >
              &gt; Loading personal architecture...
            </motion.p>

            {step >= 1 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <p style={{ fontSize: '1rem', color: '#38BDF8', fontWeight: 600, marginBottom: '0.25rem' }}>
                  System Verified:
                </p>
                <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', fontWeight: 800, color: '#F8FAFC', lineHeight: 1.1, marginBottom: '0.5rem' }}>
                  {INFO.name}
                </h1>
              </motion.div>
            )}

            {step >= 2 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <p style={{ fontSize: '0.95rem', color: '#CBD5E1', fontWeight: 500, marginBottom: '1.25rem' }}>
                  {INFO.tagline}
                </p>
              </motion.div>
            )}

            {step >= 3 && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
                <button
                  onClick={handleSkip}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'linear-gradient(135deg, #0284C7, #0369A1)',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(2, 132, 199, 0.4)'
                  }}
                >
                  Enter Digital Environment <ArrowRight size={18} />
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
