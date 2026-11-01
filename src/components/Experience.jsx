import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import Section, { SectionTitle } from './Section';
import { EXP } from '../data/info';

export default function Experience() {
  const [filter, setFilter] = useState('All');

  const filteredExp = filter === 'All'
    ? EXP
    : filter === 'Fintech & Banking'
    ? EXP.filter(e => e.type === 'Industry Role' || e.company.includes('UBL'))
    : filter === 'Digital & Creative'
    ? EXP.filter(e => e.type.includes('Digital') || e.type.includes('Creative'))
    : EXP.filter(e => e.type.includes('Education') || e.type.includes('Instruction'));

  return (
    <Section id="experience">
      <SectionTitle
        subtitle="VERIFIED ENTERPRISE OPERATIONS & PROFESSIONAL LEADERSHIP"
        title="Experience & Career Journey"
      />

      {/* Filter Selector */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
        {['All', 'Fintech & Banking', 'Digital & Creative', 'Education & Teaching'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            style={{
              padding: '0.45rem 1.15rem',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 600,
              border: filter === type ? '1px solid #18181B' : '1px solid rgba(24, 24, 27, 0.1)',
              background: filter === type ? '#18181B' : 'rgba(255, 255, 255, 0.8)',
              color: filter === type ? '#FFFFFF' : '#52525B',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
              boxShadow: filter === type ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Timeline Container */}
      <div
        style={{
          maxWidth: '56rem',
          margin: '0 auto',
          position: 'relative',
          paddingLeft: '1rem',
          borderLeft: '2px solid rgba(24, 24, 27, 0.15)'
        }}
      >
        {filteredExp.map((e, idx) => {
          const title = e.title || e.role;
          const company = e.company || e.org;
          const duration = e.date || e.dur;
          const location = e.location || e.loc;
          const items = e.desc || e.responsibilities || e.pts || [];

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              style={{
                position: 'relative',
                marginBottom: idx === filteredExp.length - 1 ? 0 : '2rem',
                paddingLeft: '0.75rem'
              }}
            >
              {/* Timeline Node Dot */}
              <div
                style={{
                  position: 'absolute',
                  left: '-1.45rem',
                  top: '1.25rem',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '3px solid #18181B',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
                  zIndex: 2
                }}
              />

              {/* Experience Card */}
              <div
                className="interactive-card"
                style={{
                  padding: '1.75rem',
                  background: 'var(--bg-card, #FFFFFF)',
                  border: '1px solid var(--border-subtle, rgba(24, 24, 27, 0.08))'
                }}
              >
                {/* Header: Logo, Title, Company */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    marginBottom: '1rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {e.logo && (
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          backgroundColor: '#FFFFFF',
                          border: '1px solid rgba(24, 24, 27, 0.1)',
                          padding: e.logo.includes('szabist') || e.logo.includes('gssc') ? '0' : '4px',
                          overflow: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                        }}
                      >
                        <img
                          src={e.logo}
                          alt={company}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: e.logo.includes('szabist') || e.logo.includes('gssc') ? 'cover' : 'contain'
                          }}
                        />
                      </div>
                    )}

                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#18181B', margin: 0 }}>
                        {title}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.2rem' }}>
                        <span style={{ color: '#9A5B32', fontWeight: 700, fontSize: '0.95rem' }}>
                          {company}
                        </span>
                        <span style={{ color: '#71717A', fontSize: '0.8rem' }}>•</span>
                        <span style={{ color: '#71717A', fontSize: '0.82rem' }}>{e.type}</span>
                      </div>
                    </div>
                  </div>

                  {/* Duration & Location */}
                  <div style={{ textAlign: 'right' }}>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: '0.78rem',
                        color: '#52525B',
                        background: 'rgba(24, 24, 27, 0.04)',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '9999px',
                        fontWeight: 600
                      }}
                    >
                      <Calendar size={13} />
                      {duration}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '0.75rem',
                        color: '#71717A',
                        marginTop: '0.35rem',
                        justifyContent: 'flex-end'
                      }}
                    >
                      <MapPin size={12} />
                      {location}
                    </div>
                  </div>
                </div>

                {/* Responsibilities list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.75rem' }}>
                  {items.map((pt, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                      <CheckCircle2 size={16} color="#9A5B32" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span style={{ color: '#52525B', fontSize: '0.92rem', lineHeight: 1.6 }}>{pt}</span>
                    </div>
                  ))}
                </div>

                {/* Skills tags if present */}
                {e.skills && e.skills.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(24, 24, 27, 0.06)' }}>
                    {e.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        style={{
                          fontSize: '0.75rem',
                          padding: '0.2rem 0.65rem',
                          borderRadius: '9999px',
                          background: 'rgba(154, 91, 50, 0.08)',
                          color: '#9A5B32',
                          border: '1px solid rgba(154, 91, 50, 0.2)',
                          fontWeight: 600
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
