import React from 'react';
import Section, { SectionTitle } from './Section';
import { INFO } from '../data/info';

const EmailIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="#25D366">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="#0A66C2">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zM7.119 20.452H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="url(#instagram-gradient)">
    <defs>
      <linearGradient id="instagram-gradient" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#405DE6" />
        <stop offset="25%" stopColor="#5851DB" />
        <stop offset="50%" stopColor="#833AB4" />
        <stop offset="75%" stopColor="#C13584" />
        <stop offset="100%" stopColor="#E1306C" />
        <stop offset="100%" stopColor="#FD1D1D" />
        <stop offset="100%" stopColor="#F56040" />
      </linearGradient>
    </defs>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const XIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="#000000">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Contact() {
  const contactMethods = [
    {
      name: 'Email',
      icon: <EmailIcon />,
      link: `mailto:${INFO.email}`,
      bgColor: '#F1F5F9', // slate-100/slate-600
      username: INFO.email,
    },
    {
      name: 'WhatsApp',
      icon: <WhatsAppIcon />,
      link: `https://wa.me/${INFO.phone.replace(/[^0-9]/g, '')}`,
      bgColor: '#D1FAE5', // emerald-100/emerald-500
      username: INFO.phone,
    },
    {
      name: 'LinkedIn',
      icon: <LinkedinIcon />,
      link: INFO.links.linkedin,
      bgColor: '#DBEAFE', // blue-100/blue-500
      username: INFO.name,
    },
    {
      name: 'Instagram',
      icon: <InstagramIcon />,
      link: INFO.links.instagram,
      bgColor: '#FFE4E6', // rose-100/rose-600
      username: '@raheel_shah315',
    },
    {
      name: 'Facebook',
      icon: <FacebookIcon />,
      link: INFO.links.facebook,
      bgColor: '#DBEAFE', // blue-100/blue-600
      username: INFO.name,
    },
    {
      name: 'X (Twitter)',
      icon: <XIcon />,
      link: 'https://x.com/Raheelshah5588',
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
