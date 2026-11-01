import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';
import Section, { SectionTitle } from './Section';
import { EDU } from '../data/info';

export default function Education() {
  return (
    <Section id="education">
      <SectionTitle
        subtitle="ACADEMIC FOUNDATION & FORMAL ACCREDITATIONS"
        title="Education & Qualifications"
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.75rem'
        }}
      >
        {EDU.map((item, idx) => {
          const year = item.yr || item.year;
          const location = item.location || item.loc;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="interactive-card"
              style={{
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1.25rem',
                background: 'var(--bg-card, #FFFFFF)',
                border: '1px solid var(--border-subtle, rgba(24, 24, 27, 0.08))'
              }}
            >
              <div>
                {/* Header: Logo & Institution */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                  {item.logo ? (
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid rgba(24, 24, 27, 0.1)',
                        padding: item.logo.includes('szabist') || item.logo.includes('gssc') ? '0' : '4px',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                      }}
                    >
                      <img
                        src={item.logo}
                        alt={item.inst}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: item.logo.includes('szabist') || item.logo.includes('gssc') ? 'cover' : 'contain'
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(154, 91, 50, 0.08)',
                        border: '1px solid rgba(154, 91, 50, 0.22)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#9A5B32'
                      }}
                    >
                      <GraduationCap size={28} />
                    </div>
                  )}

                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#18181B', margin: 0 }}>
                      {item.deg}
                    </h3>
                    <p style={{ fontSize: '0.92rem', color: '#9A5B32', fontWeight: 700, margin: '0.2rem 0 0 0' }}>
                      {item.inst}
                    </p>
                  </div>
                </div>

                {/* Location & Year */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    fontSize: '0.8rem',
                    color: '#71717A',
                    marginBottom: '1rem',
                    flexWrap: 'wrap'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <MapPin size={13} style={{ color: '#9A5B32' }} />
                    {location}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Calendar size={13} />
                    {year}
                  </div>
                </div>

                {/* Description */}
                <p style={{ color: '#52525B', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
