import React from 'react';
import { motion } from 'framer-motion';
import Section, { SectionTitle } from './Section';
import { EXP } from '../data/info';

export default function Experience() {
  return (
    <Section id="experience">
      <SectionTitle>Experience</SectionTitle>
      <div className="max-w-5xl mx-auto">
        {EXP.map((e, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true }}
            className="experience-item last:pb-0"
          >
            <div className="experience-icon">
              {e.icon}
            </div>

            <div className="experience-content">
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0B1120', marginBottom: '0.5rem' }}>{e.title}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                {e.logo && (
                  <div style={{
                    width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #E2E8F0', padding: '0.25rem'
                  }}>
                    <img src={e.logo} alt={e.company} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                )}
                <p style={{ color: '#06B6D4', fontWeight: 700, fontSize: '1.125rem', margin: 0 }}>{e.company}</p>
              </div>
              <span style={{
                background: 'linear-gradient(to right, #0B1120, #06B6D4)', color: 'white',
                padding: '0.5rem 1.25rem', borderRadius: '9999px', fontSize: '0.875rem',
                fontWeight: 600, display: 'inline-block', marginBottom: '1rem'
              }}>
                {e.date}
              </span>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {e.desc.map((d, idx) => (
                  <li key={idx} style={{ color: '#475569', display: 'flex', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <span style={{ color: '#06B6D4', marginRight: '0.75rem', fontSize: '1.25rem', fontWeight: 700 }}>✓</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
