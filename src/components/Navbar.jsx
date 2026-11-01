import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { INFO } from '../data/info';

const NAV_ITEMS = [
  { label: 'About', id: 'about' },
  { label: 'Approach', id: 'approach' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Experience', id: 'experience' },
  { label: 'Education', id: 'education' },
  { label: 'Contact', id: 'contact' }
];

export default function Navbar({ onOpenContact }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Scroll spy logic
      const sections = ['home', ...NAV_ITEMS.map(item => item.id)];
      const scrollPos = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        paddingTop: scrolled ? '0.75rem' : '1.25rem',
        paddingBottom: scrolled ? '0.75rem' : '1.25rem',
        backgroundColor: scrolled ? 'rgba(249, 249, 247, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(24, 24, 27, 0.08)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 20px -2px rgba(0, 0, 0, 0.05)' : 'none'
      }}
    >
      <div
        className="container-max"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}
      >
        {/* Approved Character Avatar & Brand Name */}
        <button
          onClick={() => scrollToSection('home')}
          aria-label="Scroll to top"
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}
        >
          <img
            src="/avatar_enhanced.png"
            alt={INFO.name}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid rgba(24, 24, 27, 0.15)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              backgroundColor: '#F2F2ED'
            }}
          />
          <div style={{ textAlign: 'left' }}>
            <span
              style={{
                fontSize: '1.05rem',
                fontWeight: 800,
                color: scrolled ? '#18181B' : '#F8FAFC',
                letterSpacing: '-0.02em',
                display: 'block',
                transition: 'color 0.2s'
              }}
            >
              {INFO.name}
            </span>
            <span
              style={{
                fontSize: '0.72rem',
                color: scrolled ? '#71717A' : '#94A3B8',
                fontWeight: 600,
                transition: 'color 0.2s'
              }}
            >
              Software & Automation
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links (Translucent Neutral Glass Pill) */}
        <nav
          className="nav-desktop-links"
          aria-label="Primary Navigation"
          style={{
            alignItems: 'center',
            gap: '0.25rem',
            background: scrolled ? 'rgba(255, 255, 255, 0.7)' : 'rgba(24, 24, 27, 0.4)',
            border: scrolled ? '1px solid rgba(24, 24, 27, 0.08)' : '1px solid rgba(255, 255, 255, 0.15)',
            padding: '0.35rem 0.5rem',
            borderRadius: '9999px',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            transition: 'all 0.2s'
          }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                style={{
                  background: isActive
                    ? (scrolled ? 'rgba(24, 24, 27, 0.08)' : 'rgba(255, 255, 255, 0.15)')
                    : 'transparent',
                  color: isActive
                    ? (scrolled ? '#18181B' : '#FFFFFF')
                    : (scrolled ? '#52525B' : '#CBD5E1'),
                  border: isActive
                    ? (scrolled ? '1px solid rgba(24, 24, 27, 0.14)' : '1px solid rgba(255, 255, 255, 0.25)')
                    : '1px solid transparent',
                  padding: '0.4rem 0.95rem',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = scrolled ? '#18181B' : '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = scrolled ? '#52525B' : '#CBD5E1';
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action: Direct Contact CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => {
              if (onOpenContact) onOpenContact();
              else window.dispatchEvent(new CustomEvent('open-contact-modal'));
            }}
            className="nav-desktop-cta"
            style={{
              alignItems: 'center',
              padding: '0.55rem 1.25rem',
              borderRadius: '9999px',
              backgroundColor: scrolled ? '#18181B' : '#FFFFFF',
              color: scrolled ? '#FFFFFF' : '#0A0E17',
              border: '1px solid rgba(24, 24, 27, 0.15)',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              transition: 'transform 0.2s, background-color 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              if (scrolled) e.currentTarget.style.backgroundColor = '#27272A';
              else e.currentTarget.style.backgroundColor = '#E2E8F0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              if (scrolled) e.currentTarget.style.backgroundColor = '#18181B';
              else e.currentTarget.style.backgroundColor = '#FFFFFF';
            }}
          >
            Get in Touch
          </button>

          {/* Mobile Hamburger Toggle (Strictly hidden on Desktop) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="nav-mobile-toggle"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            style={{
              background: scrolled ? 'rgba(24, 24, 27, 0.06)' : 'rgba(255, 255, 255, 0.08)',
              border: scrolled ? '1px solid rgba(24, 24, 27, 0.12)' : '1px solid rgba(255, 255, 255, 0.15)',
              color: scrolled ? '#18181B' : '#F8FAFC',
              padding: '0.5rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '42px',
              minHeight: '42px'
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="mobile-nav-drawer"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                    style={{
                      color: isActive ? '#18181B' : '#52525B',
                      backgroundColor: isActive ? 'rgba(24, 24, 27, 0.08)' : 'transparent',
                      fontWeight: isActive ? 700 : 500
                    }}
                  >
                    <span>{item.label}</span>
                  </button>
                );
              })}

              <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(24, 24, 27, 0.08)', marginTop: '0.5rem' }}>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenContact) onOpenContact();
                    else window.dispatchEvent(new CustomEvent('open-contact-modal'));
                  }}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Get in Touch
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
