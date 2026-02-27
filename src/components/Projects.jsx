import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Section, { SectionTitle } from './Section';
import { PROJ } from '../data/info';

export default function Projects() {
  return (
    <Section id="projects">
      <SectionTitle>Projects</SectionTitle>
      <div className="grid md:grid-cols-2 gap-8">
        {PROJ.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            style={{
              backgroundColor: 'white', borderRadius: '1.5rem', overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0,0,0,0.1)', border: '1px solid #E2E8F0'
            }}
          >
            <div style={{ overflow: 'hidden', height: '18rem' }}>
              <img
                src={p.img}
                alt={p.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              />
            </div>
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.375rem', fontWeight: 700, marginBottom: '0.5rem', color: '#0B1120' }}>{p.title}</h3>
              <p style={{ color: '#475569', marginBottom: '1rem' }}>{p.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
                {p.tags.map(t => (
                  <span key={t} style={{
                    padding: '0.5rem 1rem',
                    background: 'linear-gradient(to right, #0B1120, #06B6D4)',
                    color: 'white', fontSize: '0.875rem', borderRadius: '9999px', fontWeight: 500
                  }}>
                    {t}
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <a href={p.link} target="_blank" rel="noopener noreferrer"
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: '0.5rem', backgroundColor: '#06B6D4', color: 'white',
                    padding: '0.6rem 1rem', borderRadius: '0.6rem', fontWeight: 600,
                    textDecoration: 'none', transition: 'box-shadow 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 30px rgba(6,182,212,0.3)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
                  <ExternalLink size={20} /> Live
                </a>
                <a href={p.github} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: '0.5rem', backgroundColor: '#111827', color: 'white',
                    padding: '0.6rem 1rem', borderRadius: '0.6rem', fontWeight: 600,
                    textDecoration: 'none', transition: 'box-shadow 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
                  <Github size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
