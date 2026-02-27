import React from 'react';
import { motion } from 'framer-motion';
import Section, { SectionTitle } from './Section';
import { EDU } from '../data/info';

export default function Education() {
  return (
    <Section id="education">
      <SectionTitle>Education</SectionTitle>
      <div className="grid md:grid-cols-2 gap-8">
        {EDU.map((e, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            style={{
              backgroundColor: 'white', padding: '2rem', borderRadius: '1.5rem',
              boxShadow: '0 20px 50px rgba(0,0,0,0.1)', border: '1px solid #E2E8F0'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{e.icon}</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0B1120', marginBottom: '0.5rem' }}>{e.deg}</h3>
            <p style={{ color: '#06B6D4', fontWeight: 700, fontSize: '1.125rem', marginBottom: '0.25rem' }}>{e.inst}</p>
            <p style={{ color: '#475569', fontSize: '0.875rem', marginBottom: '0.5rem' }}>📍 {e.location}</p>
            <p style={{ color: '#475569', fontWeight: 600, marginBottom: '0.75rem' }}>{e.yr}</p>
            <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.6' }}>{e.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
