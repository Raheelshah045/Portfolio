import React from 'react';
import { Mail, MessageCircle } from 'lucide-react';
import Section, { SectionTitle } from './Section';
import { INFO } from '../data/info';

export default function Contact() {
  return (
    <Section id="contact">
      <SectionTitle>Contact</SectionTitle>
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        <a
          href={`mailto:${INFO.email}`}
          style={{
            background: 'linear-gradient(to bottom right, #EF4444, #F97316)',
            padding: '2rem', borderRadius: '1.5rem', color: 'white',
            boxShadow: '0 20px 50px rgba(0,0,0,0.2)', textDecoration: 'none',
            transition: 'transform 0.3s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <Mail size={48} style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Email</h3>
          <p>{INFO.email}</p>
        </a>

        <a
          href={`https://wa.me/${INFO.phone.replace(/[^0-9]/g, '')}`}
          target="_blank" rel="noopener noreferrer"
          style={{
            background: 'linear-gradient(to bottom right, #10B981, #14B8A6)',
            padding: '2rem', borderRadius: '1.5rem', color: 'white',
            boxShadow: '0 20px 50px rgba(0,0,0,0.2)', textDecoration: 'none',
            transition: 'transform 0.3s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <MessageCircle size={48} style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>WhatsApp</h3>
          <p>{INFO.phone}</p>
        </a>
      </div>
    </Section>
  );
}
