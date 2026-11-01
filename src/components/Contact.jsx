import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Copy, Check, MessageCircle, Github, Linkedin, MapPin, Phone, Send } from 'lucide-react';
import Section, { SectionTitle } from './Section';
import { INFO } from '../data/info';
import ContactForm from './ContactForm';

/**
 * Contact Component (Clean, Welcoming & Executive Experience)
 * =============================================================
 * Direct contact credentials, official social brand channels,
 * and a fully functional inquiry form.
 */
export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <Section id="contact">
      <SectionTitle
        subtitle="DIRECT INQUIRIES & COLLABORATION"
        title="Get in Touch"
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          alignItems: 'start'
        }}
      >
        {/* Left Column: Direct Communication Hub */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {/* Welcome Intro Card */}
          <div
            style={{
              padding: '2rem',
              borderRadius: '1.25rem',
              background: 'var(--bg-card, #FFFFFF)',
              border: '1px solid var(--border-subtle, rgba(24, 24, 27, 0.08))',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#18181B', marginBottom: '0.6rem' }}>
              Let's discuss opportunities
            </h3>
            <p style={{ color: '#52525B', fontSize: '0.96rem', lineHeight: 1.7, margin: 0 }}>
              Whether you have a software development project, an automated pipeline requirement, or want to discuss engineering roles, my inbox is open. I respond within 24 hours.
            </p>
          </div>

          {/* Email Channel Card */}
          <div
            style={{
              padding: '1.5rem 1.75rem',
              borderRadius: '1.25rem',
              background: 'var(--bg-card, #FFFFFF)',
              border: '1px solid var(--border-subtle, rgba(24, 24, 27, 0.08))',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#9A5B32', marginBottom: '0.4rem' }}>
              <Mail size={18} />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Direct Email
              </span>
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#18181B', marginBottom: '1rem', wordBreak: 'break-all' }}>
              {INFO.email}
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={copyEmail}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.55rem 1.1rem',
                  borderRadius: '9999px',
                  background: copiedEmail ? 'rgba(22, 101, 52, 0.1)' : 'rgba(24, 24, 27, 0.05)',
                  border: copiedEmail ? '1px solid #166534' : '1px solid rgba(24, 24, 27, 0.12)',
                  color: copiedEmail ? '#166534' : '#52525B',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {copiedEmail ? <Check size={15} /> : <Copy size={15} />}
                <span>{copiedEmail ? 'Copied' : 'Copy Email'}</span>
              </button>

              <a
                href={`mailto:${INFO.email}`}
                className="btn-primary"
                style={{
                  fontSize: '0.85rem',
                  padding: '0.55rem 1.15rem'
                }}
              >
                <Send size={14} /> Send Message
              </a>
            </div>
          </div>

          {/* Location & WhatsApp Card */}
          <div
            style={{
              padding: '1.25rem 1.75rem',
              borderRadius: '1.25rem',
              background: 'var(--bg-card, #FFFFFF)',
              border: '1px solid var(--border-subtle, rgba(24, 24, 27, 0.08))',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(24, 24, 27, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#9A5B32'
                }}
              >
                <MapPin size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#71717A', fontWeight: 700, textTransform: 'uppercase' }}>Location</div>
                <div style={{ fontSize: '0.92rem', color: '#18181B', fontWeight: 600 }}>{INFO.location}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(37, 211, 102, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#25D366'
                }}
              >
                <Phone size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#71717A', fontWeight: 700, textTransform: 'uppercase' }}>Phone & WhatsApp</div>
                <div style={{ fontSize: '0.92rem', color: '#18181B', fontWeight: 600 }}>{INFO.phone}</div>
              </div>
            </div>
          </div>

          {/* Official Social Channels */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <a
              href={INFO.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand-github"
              title="GitHub Repositories"
            >
              <Github size={16} /> GitHub
            </a>

            <a
              href={INFO.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand-linkedin"
              title="LinkedIn Profile"
            >
              <Linkedin size={16} /> LinkedIn
            </a>

            <a
              href={INFO.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand-whatsapp"
              title="Direct WhatsApp"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>
        </motion.div>

        {/* Right Column: Clean Neutral Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            padding: '2.25rem',
            borderRadius: '1.5rem',
            background: 'var(--bg-card, #FFFFFF)',
            border: '1px solid var(--border-subtle, rgba(24, 24, 27, 0.08))',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#18181B', marginBottom: '0.4rem' }}>
            Send a direct message
          </h3>
          <p style={{ color: '#52525B', fontSize: '0.9rem', marginBottom: '1.75rem' }}>
            Fill in your details below to compose a direct message.
          </p>

          <ContactForm isModal={false} />
        </motion.div>
      </div>
    </Section>
  );
}
