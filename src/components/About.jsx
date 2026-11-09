import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, GraduationCap, Users2, MapPin, Award } from 'lucide-react';
import Section, { SectionTitle } from './Section';
import { INFO } from '../data/info';

/**
 * About Component (Single Professional Personal-Brand Portrait & Narrative)
 * =========================================================================
 * Features a single, professionally edited executive portrait of Raheel Jamal
 * with studio lighting, clean background treatment, and refined color balance.
 * Presented with the refined professional neutral design palette.
 */
export default function About() {
  const pillars = [
    {
      title: 'Enterprise Banking Operations',
      org: 'UBL - United Bank Limited',
      desc: 'Managing ADC daily operations, international card processing rails, transaction reconciliation, and security workflows in one of Pakistan’s largest financial institutions.',
      icon: ShieldCheck,
      accent: '#18181B'
    },
    {
      title: 'Computer Science Scholar',
      org: 'SZABIST University',
      desc: 'Pursuing BS Computer Science with a strong focus on data structures, object-oriented systems (Java), backend architectures, and database design.',
      icon: GraduationCap,
      accent: '#9A5B32'
    },
    {
      title: 'Instruction & Mentorship',
      org: 'Hassaan Academy & QTV Tutor',
      desc: 'Guided 50+ international students in structured Quranic education and Tajweed, developing systematic digital learning roadmaps with 98% satisfaction.',
      icon: Users2,
      accent: '#475569'
    }
  ];

  return (
    <Section id="about">
      <SectionTitle
        subtitle="AUTHENTIC BACKGROUND & PROFESSIONAL IDENTITY"
        title="Who I Am & What I Build"
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {/* Main 2-Column Row: Single Edited Portrait + Professional Narrative */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center'
          }}
        >
          {/* Left Column: Single Professionally Edited Executive Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ width: '100%', maxWidth: '440px', margin: '0 auto' }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '4 / 5',
                borderRadius: '1.25rem',
                overflow: 'hidden',
                border: '1px solid rgba(24, 24, 27, 0.12)',
                boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.15)',
                backgroundColor: '#111827'
              }}
            >
              <picture style={{ width: '100%', height: '100%' }}>
                <source srcSet="/raheel_portrait_executive_enhanced.webp" type="image/webp" />
                <img
                  src="/raheel_portrait_executive_enhanced.png"
                  alt="Raheel Jamal - Professional Executive Portrait"
                  width="580"
                  height="824"
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </picture>

              {/* Refined Glass Credential Badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '14px',
                  left: '14px',
                  right: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.5rem',
                  padding: '0.65rem 1rem',
                  borderRadius: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.92)',
                  border: '1px solid rgba(24, 24, 27, 0.12)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)'
                }}
              >
                <div>
                  <div style={{ color: '#18181B', fontSize: '0.86rem', fontWeight: 800 }}>
                    {INFO.name}
                  </div>
                  <div style={{ color: '#9A5B32', fontSize: '0.74rem', fontWeight: 600 }}>
                    Software & Automation Engineer
                  </div>
                </div>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: '#52525B',
                    fontSize: '0.72rem',
                    fontWeight: 600
                  }}
                >
                  <MapPin size={13} style={{ color: '#9A5B32' }} />
                  Karachi, PK
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Grounded Professional Narrative */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            <div>
              <span
                style={{
                  color: 'var(--accent-subtle, #9A5B32)',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '0.35rem'
                }}
              >
                Engineering with Operational Discipline
              </span>
              <h3
                style={{
                  fontSize: 'clamp(1.5rem, 3.2vw, 2.1rem)',
                  fontWeight: 800,
                  color: 'var(--text-primary, #18181B)',
                  lineHeight: 1.25,
                  margin: 0
                }}
              >
                Building reliable software informed by real-world systems.
              </h3>
            </div>

            <p style={{ color: 'var(--text-secondary, #52525B)', fontSize: '0.98rem', lineHeight: 1.75, margin: 0 }}>
              I am <strong style={{ color: '#18181B' }}>{INFO.name}</strong>, a Software Developer and Automation Engineer balancing academic studies in Computer Science at <strong style={{ color: '#9A5B32' }}>SZABIST</strong> with active enterprise banking responsibilities in ADC Operations at <strong style={{ color: '#18181B' }}>United Bank Limited (UBL)</strong>.
            </p>

            <p style={{ color: 'var(--text-muted, #71717A)', fontSize: '0.94rem', lineHeight: 1.75, margin: 0 }}>
              Rather than viewing software purely in theory, my day-to-day work with real-time financial settlements, card routing networks, and enterprise risk controls directly shapes how I build applications: prioritizing clean data contracts, transaction safety, structured automation, and seamless human usability.
            </p>

            {/* Quick Fact Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '0.65rem',
                paddingTop: '0.35rem'
              }}
            >
              <div
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '0.75rem',
                  background: 'var(--bg-card, #FFFFFF)',
                  border: '1px solid var(--border-subtle, rgba(24, 24, 27, 0.08))',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ color: '#71717A', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase' }}>Current Role</div>
                <div style={{ color: '#18181B', fontSize: '0.88rem', fontWeight: 600, marginTop: '2px' }}>ADC Operations @ UBL</div>
              </div>

              <div
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '0.75rem',
                  background: 'var(--bg-card, #FFFFFF)',
                  border: '1px solid var(--border-subtle, rgba(24, 24, 27, 0.08))',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ color: '#71717A', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase' }}>Academic Focus</div>
                <div style={{ color: '#18181B', fontSize: '0.88rem', fontWeight: 600, marginTop: '2px' }}>BS CS @ SZABIST</div>
              </div>

              <div
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '0.75rem',
                  background: 'var(--bg-card, #FFFFFF)',
                  border: '1px solid var(--border-subtle, rgba(24, 24, 27, 0.08))',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ color: '#71717A', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase' }}>Core Capabilities</div>
                <div style={{ color: '#9A5B32', fontSize: '0.88rem', fontWeight: 600, marginTop: '2px' }}>Full-Stack & Automations</div>
              </div>

              <div
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '0.75rem',
                  background: 'var(--bg-card, #FFFFFF)',
                  border: '1px solid var(--border-subtle, rgba(24, 24, 27, 0.08))',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ color: '#71717A', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase' }}>Honorary Discipline</div>
                <div style={{ color: '#166534', fontSize: '0.88rem', fontWeight: 600, marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Award size={13} /> Hafiz-ul-Quran
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 3 Pillar Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', paddingTop: '0.5rem' }}>
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="interactive-card"
                style={{
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem'
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: 'rgba(24, 24, 27, 0.04)',
                    border: '1px solid rgba(24, 24, 27, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: pillar.accent
                  }}
                >
                  <Icon size={20} />
                </div>

                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#18181B', marginBottom: '0.2rem' }}>
                    {pillar.title}
                  </h4>
                  <span style={{ fontSize: '0.78rem', color: '#9A5B32', fontWeight: 600, display: 'block', marginBottom: '0.45rem' }}>
                    {pillar.org}
                  </span>
                  <p style={{ fontSize: '0.88rem', color: '#52525B', lineHeight: 1.6, margin: 0 }}>
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
