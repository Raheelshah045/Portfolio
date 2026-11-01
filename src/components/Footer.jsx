import React from 'react';
import { Github, Linkedin, MessageCircle, ArrowUp } from 'lucide-react';
import { INFO } from '../data/info';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(24, 24, 27, 0.08)',
        backgroundColor: 'var(--bg-secondary, #F2F2ED)',
        paddingTop: '3.5rem',
        paddingBottom: '3.5rem',
        marginTop: '4rem',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div
        className="container-max"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
          textAlign: 'center'
        }}
      >
        {/* Brand & Tagline */}
        <div>
          <h3
            style={{
              fontSize: '1.6rem',
              fontWeight: 900,
              color: '#18181B',
              letterSpacing: '-0.02em',
              marginBottom: '0.4rem'
            }}
          >
            {INFO.name}
          </h3>
          <p style={{ color: '#52525B', fontSize: '0.92rem', maxWidth: '32rem', margin: '0 auto' }}>
            {INFO.tagline}
          </p>
        </div>

        {/* Social Portals */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <a
            href={INFO.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(24, 24, 27, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#52525B',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#181717';
              e.currentTarget.style.borderColor = '#181717';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.borderColor = 'rgba(24, 24, 27, 0.12)';
              e.currentTarget.style.color = '#52525B';
            }}
          >
            <Github size={18} />
          </a>

          <a
            href={INFO.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(24, 24, 27, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#52525B',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0A66C2';
              e.currentTarget.style.borderColor = '#0A66C2';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.borderColor = 'rgba(24, 24, 27, 0.12)';
              e.currentTarget.style.color = '#52525B';
            }}
          >
            <Linkedin size={18} />
          </a>

          <a
            href={INFO.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp consultation"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(24, 24, 27, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#52525B',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#25D366';
              e.currentTarget.style.borderColor = '#25D366';
              e.currentTarget.style.color = '#061A10';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.borderColor = 'rgba(24, 24, 27, 0.12)';
              e.currentTarget.style.color = '#52525B';
            }}
          >
            <MessageCircle size={18} />
          </a>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: '#18181B',
              border: '1px solid #18181B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#27272A';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#18181B';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <ArrowUp size={18} />
          </button>
        </div>

        {/* Copyright & Technical Note */}
        <div style={{ borderTop: '1px solid rgba(24, 24, 27, 0.08)', paddingTop: '1.5rem', width: '100%' }}>
          <p style={{ color: '#71717A', fontSize: '0.82rem', margin: 0 }}>
            © {new Date().getFullYear()} {INFO.name}. Engineered with React & Framer Motion. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
