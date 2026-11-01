import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Eye, ArrowUpRight, Lock } from 'lucide-react';
import Section, { SectionTitle } from './Section';
import { PROJ } from '../data/info';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const categories = ['All', 'Software', 'AI & Automation', 'Client Applications', 'Design Engineering'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJ
    : PROJ.filter(p => p.category === selectedCategory);

  return (
    <Section id="projects">
      <SectionTitle
        subtitle="VERIFIED PRODUCTION SYSTEMS & INTERACTIVE SOLUTIONS"
        title="Selected Work & Engineering"
      />

      {/* Category Filter Pills (Swipeable on Mobile / Centered on Desktop) */}
      <div
        style={{
          display: 'flex',
          gap: '0.6rem',
          justifyContent: 'flex-start',
          alignItems: 'center',
          overflowX: 'auto',
          paddingBottom: '0.5rem',
          marginBottom: '2.5rem',
          maxWidth: '100%',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none'
        }}
        className="md:justify-center"
      >
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                flexShrink: 0,
                padding: '0.5rem 1.15rem',
                borderRadius: '9999px',
                fontSize: '0.85rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                minHeight: '42px',
                border: isSelected ? '1px solid #18181B' : '1px solid rgba(24, 24, 27, 0.1)',
                background: isSelected ? '#18181B' : 'rgba(255, 255, 255, 0.8)',
                color: isSelected ? '#FFFFFF' : '#52525B',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                boxShadow: isSelected ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = 'rgba(24, 24, 27, 0.25)';
                  e.currentTarget.style.color = '#18181B';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = 'rgba(24, 24, 27, 0.1)';
                  e.currentTarget.style.color = '#52525B';
                }
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <motion.div
        layout
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
          gap: '1.75rem'
        }}
      >
        <AnimatePresence>
          {filteredProjects.map((p) => (
            <motion.article
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="interactive-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                background: 'var(--bg-card, #FFFFFF)',
                border: '1px solid var(--border-subtle, rgba(24, 24, 27, 0.08))'
              }}
            >
              <div>
                {/* Visual Thumbnail */}
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '16 / 9',
                    backgroundColor: '#F2F2ED',
                    borderBottom: '1px solid rgba(24, 24, 27, 0.08)',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.75rem'
                  }}
                >
                  <img
                    src={p.img}
                    alt={p.alt || p.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      transition: 'transform 0.4s ease'
                    }}
                    onMouseEnter={(e) => (e.target.style.transform = 'scale(1.04)')}
                    onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                  />

                  {/* Category Badge overlay */}
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: 'rgba(255, 255, 255, 0.94)',
                      border: '1px solid rgba(154, 91, 50, 0.22)',
                      color: '#9A5B32',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '3px 9px',
                      borderRadius: '9999px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.06)'
                    }}
                  >
                    {p.category}
                  </span>
                </div>

                {/* Card Content */}
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#18181B', marginBottom: '0.4rem' }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: '#9A5B32', fontWeight: 600, marginBottom: '0.75rem' }}>
                    {p.subtitle}
                  </p>
                  <p style={{ color: '#52525B', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    {p.desc}
                  </p>

                  {/* Technology Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1rem' }}>
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: '0.75rem',
                          padding: '0.25rem 0.65rem',
                          borderRadius: '9999px',
                          background: 'rgba(24, 24, 27, 0.04)',
                          color: '#52525B',
                          border: '1px solid rgba(24, 24, 27, 0.08)',
                          fontWeight: 500
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Cluster */}
              <div
                style={{
                  padding: '1rem 1.5rem',
                  borderTop: '1px solid rgba(24, 24, 27, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                  backgroundColor: 'rgba(24, 24, 27, 0.02)'
                }}
              >
                {/* Deep Dive Modal Trigger */}
                <button
                  onClick={() => setActiveModalProject(p)}
                  aria-label={`Inspect ${p.title} architecture and technical deep dive`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: '#18181B',
                    border: '1px solid #18181B',
                    color: '#FFFFFF',
                    padding: '0.45rem 0.95rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#27272A';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#18181B';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Eye size={14} /> Technical View
                </button>

                {/* External Links / Confidential Badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {p.confidential ? (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        padding: '0.35rem 0.75rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        color: '#9A5B32',
                        background: 'rgba(154, 91, 50, 0.08)',
                        border: '1px solid rgba(154, 91, 50, 0.25)',
                        letterSpacing: '0.02em'
                      }}
                    >
                      <Lock size={13} /> Confidential
                    </span>
                  ) : (
                    <>
                      {(p.github || p.links?.code) && (
                        <a
                          href={p.github || p.links.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${p.title} source code repository`}
                          style={{
                            padding: '0.45rem',
                            borderRadius: '0.5rem',
                            color: '#52525B',
                            border: '1px solid rgba(24, 24, 27, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#FFFFFF',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#18181B';
                            e.currentTarget.style.color = '#18181B';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(24, 24, 27, 0.1)';
                            e.currentTarget.style.color = '#52525B';
                          }}
                        >
                          <Github size={15} />
                        </a>
                      )}

                      {(p.link || p.links?.live) && (
                        <a
                          href={p.link || p.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${p.title} live system`}
                          style={{
                            padding: '0.45rem',
                            borderRadius: '0.5rem',
                            color: '#52525B',
                            border: '1px solid rgba(24, 24, 27, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#FFFFFF',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#18181B';
                            e.currentTarget.style.color = '#18181B';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(24, 24, 27, 0.1)';
                            e.currentTarget.style.color = '#52525B';
                          }}
                        >
                          <ArrowUpRight size={15} />
                        </a>
                      )}
                    </>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Interactive Architecture Case-Study Modal */}
      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </Section>
  );
}
