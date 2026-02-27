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
              <p style={{ color: '#06B6D4', fontWeight: 700, fontSize: '1.125rem', marginBottom: '0.25rem' }}>{e.company}</p>
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
