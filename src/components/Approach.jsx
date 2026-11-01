import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Cpu, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Section, { SectionTitle } from './Section';
import { PILLARS, PHILOSOPHY } from '../data/info';

const ICON_MAP = {
  Layers: Layers,
  Cpu: Cpu,
  ShieldCheck: ShieldCheck
};

export default function Approach() {
  return (
    <Section id="approach">
      <SectionTitle
        subtitle="ENGINEERING PHILOSOPHY & PRODUCTION PILLARS"
        title="What I Build & How I Work"
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {/* Core Pillars Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
          {PILLARS.map((p, idx) => {
            const Icon = ICON_MAP[p.icon] || Layers;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="interactive-card"
                style={{
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1.5rem',
                  background: 'var(--bg-card, #FFFFFF)',
                  border: '1px solid var(--border-subtle, rgba(24, 24, 27, 0.08))'
                }}
              >
                <div>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: 'rgba(154, 91, 50, 0.08)',
                      border: '1px solid rgba(154, 91, 50, 0.22)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#9A5B32',
                      marginBottom: '1.25rem'
                    }}
                  >
                    <Icon size={24} />
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#9A5B32', fontWeight: 700, letterSpacing: '0.05em' }}>
                    0{idx + 1} {" • "} {p.subtitle.toUpperCase()}
                  </span>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#18181B', marginTop: '0.35rem', marginBottom: '0.75rem' }}>
                    {p.title}
                  </h3>
                  <p style={{ color: '#52525B', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                    {p.description}
                  </p>
                </div>

                {/* Metrics / Key Focus Areas */}
                <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(24, 24, 27, 0.08)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {p.metrics.map((m, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle2 size={15} color="#9A5B32" />
                      <span style={{ fontSize: '0.85rem', color: '#52525B', fontWeight: 500 }}>{m}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Philosophy Principles Box */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel"
          style={{ padding: '2rem 2.5rem' }}
        >
          <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#18181B', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: '#9A5B32' }}>{"•"}</span> Operational Engineering Philosophy
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {PHILOSOPHY.map((item, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#9A5B32', textTransform: 'uppercase' }}>
                  {item.title}
                </span>
                <p style={{ color: '#52525B', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                  {item.desc || item.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
