import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2, Layers, AlertCircle, Lock } from 'lucide-react';

/**
 * ProjectModal Component
 * -------------------------------------------------------------
 * Comprehensive architectural deep dive for verified projects.
 */
export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(24, 24, 27, 0.65)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '100%',
            maxWidth: '820px',
            maxHeight: '90vh',
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(24, 24, 27, 0.12)',
            borderRadius: '1.25rem',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.18)',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div
            style={{
              padding: '1.25rem 1.75rem',
              borderBottom: '1px solid rgba(24, 24, 27, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'sticky',
              top: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(8px)',
              zIndex: 10
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#9A5B32',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em'
                }}
              >
                PROJECT ARCHITECTURE & DEEP DIVE
              </span>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#18181B', margin: 0 }}>
                {project.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close project details"
              style={{
                background: 'rgba(24, 24, 27, 0.06)',
                border: 'none',
                color: '#52525B',
                padding: '0.5rem',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#18181B';
                e.currentTarget.style.backgroundColor = 'rgba(24, 24, 27, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#52525B';
                e.currentTarget.style.backgroundColor = 'rgba(24, 24, 27, 0.06)';
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Modal Body */}
          <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Visual Preview */}
            <div
              style={{
                position: 'relative',
                borderRadius: '0.75rem',
                overflow: 'hidden',
                backgroundColor: '#F2F2ED',
                border: '1px solid rgba(24, 24, 27, 0.08)',
                aspectRatio: '16 / 9'
              }}
            >
              <img
                src={project.img}
                alt={project.alt || project.title}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>

            {/* Problem & Solution Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <div
                style={{
                  background: 'rgba(239, 68, 68, 0.05)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  borderRadius: '0.75rem',
                  padding: '1.25rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#DC2626' }}>
                  <AlertCircle size={18} />
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>The Friction / Problem</span>
                </div>
                <p style={{ color: '#52525B', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                  {project.problem || project.desc}
                </p>
              </div>

              <div
                style={{
                  background: 'rgba(154, 91, 50, 0.06)',
                  border: '1px solid rgba(154, 91, 50, 0.22)',
                  borderRadius: '0.75rem',
                  padding: '1.25rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#9A5B32' }}>
                  <CheckCircle2 size={18} />
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>The Engineering Solution</span>
                </div>
                <p style={{ color: '#52525B', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                  {project.solution || project.desc}
                </p>
              </div>
            </div>

            {/* System Architecture */}
            {project.architecture && (
              <div
                style={{
                  background: 'rgba(24, 24, 27, 0.03)',
                  border: '1px solid rgba(24, 24, 27, 0.08)',
                  borderRadius: '0.75rem',
                  padding: '1.25rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#18181B' }}>
                  <Layers size={18} />
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Architectural Stack & Flow</span>
                </div>
                <p style={{ color: '#52525B', fontSize: '0.92rem', lineHeight: 1.6, fontFamily: 'monospace', margin: 0 }}>
                  {project.architecture}
                </p>
              </div>
            )}

            {/* Key Technical Highlights */}
            {project.highlights && (
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#18181B', marginBottom: '0.75rem' }}>
                  Technical Highlights & Deliverables
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {project.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.6rem',
                        fontSize: '0.9rem',
                        color: '#52525B',
                        lineHeight: 1.5
                      }}
                    >
                      <span style={{ color: '#9A5B32', fontWeight: 800, marginTop: '2px' }}>•</span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Action Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '0.75rem',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(24, 24, 27, 0.08)'
              }}
            >
              {project.confidential ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    color: '#9A5B32',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    background: 'rgba(154, 91, 50, 0.08)',
                    border: '1px solid rgba(154, 91, 50, 0.22)',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem'
                  }}
                >
                  <Lock size={15} /> Confidential Enterprise System — Architecture Protected
                </div>
              ) : (
                <>
                  {(project.github || project.links?.code) && (
                    <a
                      href={project.github || project.links.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                      style={{ fontSize: '0.88rem', padding: '0.5rem 1.15rem' }}
                    >
                      <Github size={16} /> View Code
                    </a>
                  )}
                  {(project.link || project.links?.live) && (
                    <a
                      href={project.link || project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      style={{ fontSize: '0.88rem', padding: '0.5rem 1.15rem' }}
                    >
                      <ExternalLink size={16} /> Live Application
                    </a>
                  )}
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
