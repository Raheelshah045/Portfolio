import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Code, Palette, TrendingUp, Star } from 'lucide-react';
import Section, { SectionTitle } from './Section';
import { SKILLS } from '../data/info';

const ICON_MAP = { BookOpen, Code, Palette, TrendingUp, Star };

export default function Skills() {
  return (
    <Section id="skills">
      <SectionTitle>Skills</SectionTitle>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SKILLS.map((s, i) => {
          const Icon = ICON_MAP[s.icon];
          return (
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
              <div style={{
                width: '4rem', height: '4rem',
                background: 'linear-gradient(to bottom right, #0B1120, #06B6D4)',
                borderRadius: '1rem', display: 'flex', alignItems: 'center',
                justifyContent: 'center', marginBottom: '1.5rem',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
              }}>
                {Icon && <Icon size={32} style={{ color: 'white' }} />}
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0B1120', marginBottom: '1.5rem' }}>{s.cat}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {s.items.map(item => (
                  <span
                    key={item}
                    style={{
                      padding: '0.5rem 1rem', backgroundColor: '#F8FAFC', color: '#475569',
                      border: '1px solid #E2E8F0', borderRadius: '9999px', fontSize: '0.875rem',
                      fontWeight: 500, transition: 'all 0.3s', cursor: 'default'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'linear-gradient(to right, #0B1120, #06B6D4)';
                      e.target.style.color = 'white'; e.target.style.border = 'none';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#F8FAFC';
                      e.target.style.color = '#475569'; e.target.style.border = '1px solid #E2E8F0';
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
