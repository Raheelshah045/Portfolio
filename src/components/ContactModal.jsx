import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare } from 'lucide-react';
import ContactForm from './ContactForm';

/**
 * ContactModal Component
 * ==============================================================================
 * Centered modal dialog hosting the verified, functional contact inquiry form.
 * Opens on "Get in Touch" clicks across Header, Hero, and Navigation.
 * Closes on backdrop click or Escape key with body scroll preservation.
 */
export default function ContactModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            backgroundColor: 'rgba(24, 24, 27, 0.68)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            overflowY: 'auto'
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '560px',
              maxHeight: '90vh',
              overflowY: 'auto',
              backgroundColor: '#FFFFFF',
              borderRadius: '1.25rem',
              border: '1px solid rgba(24, 24, 27, 0.12)',
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box'
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '1.25rem 1.5rem',
                borderBottom: '1px solid rgba(24, 24, 27, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'sticky',
                top: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(8px)',
                zIndex: 10
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(154, 91, 50, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#9A5B32'
                  }}
                >
                  <MessageSquare size={18} />
                </div>
                <div>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: '#9A5B32',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      display: 'block'
                    }}
                  >
                    Direct Inquiry & Collaboration
                  </span>
                  <h2
                    id="contact-modal-title"
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      color: '#18181B',
                      margin: 0,
                      lineHeight: 1.2
                    }}
                  >
                    Get in Touch
                  </h2>
                </div>
              </div>

              <button
                onClick={onClose}
                aria-label="Close modal"
                style={{
                  background: 'rgba(24, 24, 27, 0.05)',
                  border: '1px solid rgba(24, 24, 27, 0.08)',
                  borderRadius: '50%',
                  width: '34px',
                  height: '34px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#52525B',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#18181B';
                  e.currentTarget.style.backgroundColor = 'rgba(24, 24, 27, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#52525B';
                  e.currentTarget.style.backgroundColor = 'rgba(24, 24, 27, 0.05)';
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '1.5rem' }}>
              <p style={{ color: '#52525B', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Have an engineering inquiry, software project, or automation challenge? Send your details below and I will get back to you within 24 hours.
              </p>

              <ContactForm isModal={true} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
