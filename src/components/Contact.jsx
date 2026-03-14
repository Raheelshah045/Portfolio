import React from 'react';
import { Mail, MessageCircle, Linkedin, Instagram, Facebook, Twitter } from 'lucide-react';
import Section, { SectionTitle } from './Section';
import { INFO } from '../data/info';

export default function Contact() {
  const contactMethods = [
    {
      name: 'Email',
      icon: <Mail size={32} />,
      link: `mailto:${INFO.email}`,
      color: '#475569',
      bgColor: '#F1F5F9', // slate-100/slate-600
      username: INFO.email,
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle size={32} />,
      link: `https://wa.me/${INFO.phone.replace(/[^0-9]/g, '')}`,
      color: '#10B981',
      bgColor: '#D1FAE5', // emerald-100/emerald-500
      username: INFO.phone,
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin size={32} />,
      link: INFO.links.linkedin,
      color: '#3B82F6',
      bgColor: '#DBEAFE', // blue-100/blue-500
      username: INFO.name,
    },
    {
      name: 'Instagram',
      icon: <Instagram size={32} />,
      link: INFO.links.instagram,
      color: '#E11D48',
      bgColor: '#FFE4E6', // rose-100/rose-600
      username: '@raheel_shah315',
    },
    {
      name: 'Facebook',
      icon: <Facebook size={32} />,
      link: INFO.links.facebook,
      color: '#2563EB',
      bgColor: '#DBEAFE', // blue-100/blue-600
      username: INFO.name,
    },
    {
      name: 'X (Twitter)',
      icon: <Twitter size={32} />,
      link: 'https://x.com/Raheelshah5588',
      color: '#0F172A',
      bgColor: '#F1F5F9', // slate-100/slate-900 (Black for X)
      username: '@Raheelshah5588',
    }
  ];

  return (
    <Section id="contact">
      <SectionTitle>Contact Me</SectionTitle>

      <p style={{ textAlign: 'center', color: '#64748B', maxWidth: '36rem', margin: '0 auto 4rem auto', fontSize: '1.1rem', lineHeight: 1.6 }}>
        Whether you have a project, an opportunity, or just want to say hello — I'm always happy to connect!
      </p>

      <div className="max-w-4xl mx-auto" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        justifyItems: 'center'
      }}>
        {contactMethods.map((method, idx) => (
          <a
            key={idx}
            href={method.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              backgroundColor: 'white',
              border: '1px solid #E2E8F0',
              borderRadius: '1rem',
              padding: '2.5rem 1rem',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)';
            }}
          >
            <div style={{
              backgroundColor: method.bgColor,
              color: method.color,
              padding: '1rem',
              borderRadius: '0.75rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {method.icon}
            </div>
            <h3 style={{ color: '#64748B', fontSize: '1rem', fontWeight: 500, marginBottom: '0.5rem', marginTop: 0 }}>
              {method.name}
            </h3>
            <p style={{ color: '#0F172A', fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>
              {method.username}
            </p>
          </a>
        ))}
      </div>
    </Section>
  );
}
