import React from 'react';
import { motion } from 'framer-motion';
import Section, { SectionTitle } from './Section';
import { INFO } from '../data/info';

const LinkedInLogo = () => (
  <svg height="22" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.2 9.4H21V28H16.2V9.4ZM18.6 1.8C20.2 1.8 21.5 3.1 21.5 4.7C21.5 6.3 20.2 7.6 18.6 7.6C17 7.6 15.7 6.3 15.7 4.7C15.7 3.1 17 1.8 18.6 1.8Z" fill="#0A66C2" />
    <path d="M24.8 9.4H29.4V11.9H29.5C30.1 10.7 31.8 9 34.6 9C40.3 9 41.4 12.7 41.4 17.6V28H36.6V19.1C36.6 16.4 36.5 13.5 33 13.5C29.4 13.5 28.9 16.3 28.9 18.9V28H24.1V9.4H24.8Z" fill="#0A66C2" />
    <rect x="46" y="2" width="26" height="26" rx="4" fill="#0A66C2" />
    <path d="M51.5 12H55.2V23H51.5V12ZM53.3 7.5C54.6 7.5 55.6 8.5 55.6 9.8C55.6 11.1 54.6 12.1 53.3 12.1C52.1 12.1 51.1 11.1 51.1 9.8C51.1 8.5 52.1 7.5 53.3 7.5Z" fill="white" />
    <path d="M58 12H61.6V13.5H61.7C62.2 12.7 63.5 11.7 65.7 11.7C70.2 11.7 71 14.6 71 18.5V23H67.3V16C67.3 13.9 67.2 11.7 64.4 11.7C61.6 11.7 61.2 13.9 61.2 15.9V23H57.5V12H58Z" fill="white" />
  </svg>
);

const GitHubLogo = () => (
  <svg height="22" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const InstagramLogo = () => (
  <svg height="22" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const FacebookLogo = () => (
  <svg height="22" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const XLogo = () => (
  <svg height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const WhatsAppLogo = () => (
  <svg height="22" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const EmailLogo = () => (
  <svg height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

export default function Contact() {
  const cards = [
    {
      platform: 'LinkedIn',
      headerBg: '#EBEAE5',
      logo: <LinkedInLogo />,
      name: 'Raheel Jamal',
      handle: '@hafiz-raheel-shah',
      bio: "ADC Operations @UBL | SZABIST '29 | AI Automation | Web Developer | Graphic Designer | SEO Specialist | Educator",
      institution: "UBL - United Bank Limited | SZABIST University",
      link: INFO.links.linkedin,
      btnText: 'View profile',
      btnColor: '#0A66C2',
      isLinkedInStyle: true
    },
    {
      platform: 'GitHub',
      headerBg: '#161B22',
      logo: <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'white', fontWeight: 700, fontSize: '0.95rem' }}><GitHubLogo /> GitHub</div>,
      name: 'Raheel Jamal',
      handle: '@Raheelshah045',
      bio: 'Full Stack Developer & CS Student @SZABIST | Building FinFlow ERP, JARVIS AI & Web Solutions',
      institution: '20+ Repositories • Active Contributor',
      link: INFO.links.github,
      btnText: 'Follow on GitHub',
      btnColor: '#0D1117',
      isLinkedInStyle: false
    },
    {
      platform: 'Instagram',
      headerBg: 'linear-gradient(135deg, #405DE6, #833AB4, #E1306C, #FD1D1D)',
      logo: <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'white', fontWeight: 700, fontSize: '0.95rem' }}><InstagramLogo /> Instagram</div>,
      name: 'Raheel Shah',
      handle: '@raheel_shah315',
      bio: "Syed 😇 | SZABIST @CS '29 💻 • 28 posts • 131 followers • 57 following",
      institution: 'Personal & Creative Journey',
      link: INFO.links.instagram,
      btnText: 'Visit Instagram',
      btnColor: '#E1306C',
      isLinkedInStyle: false
    },
    {
      platform: 'Facebook',
      headerBg: '#1877F2',
      logo: <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'white', fontWeight: 700, fontSize: '0.95rem' }}><FacebookLogo /> Facebook</div>,
      name: 'Raheel Shah',
      handle: '@raheel.shah.92123015',
      bio: '3K friends • Lives in Karachi, Pakistan | UBL - United Bank Ltd | SZABIST',
      institution: 'MOLDED BY LIFE, STYLED BY CHOICE 🎁🔥',
      link: INFO.links.facebook,
      btnText: 'Connect on Facebook',
      btnColor: '#1877F2',
      isLinkedInStyle: false
    },
    {
      platform: 'X (Twitter)',
      headerBg: '#000000',
      logo: <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'white', fontWeight: 700, fontSize: '0.95rem' }}><XLogo /> X</div>,
      name: 'Hafiz Raheel Shah',
      handle: '@Raheelshah5588',
      bio: '💫 Dreams is not that you see in the sleep, dream is that does not allow you to sleep 💫',
      institution: 'Graphic Designer | Web Developer | Quran Educator',
      link: 'https://x.com/Raheelshah5588',
      btnText: 'Follow on X',
      btnColor: '#000000',
      isLinkedInStyle: false
    },
    {
      platform: 'WhatsApp',
      headerBg: '#25D366',
      logo: <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'white', fontWeight: 700, fontSize: '0.95rem' }}><WhatsAppLogo /> WhatsApp</div>,
      name: 'Raheel Jamal',
      handle: '+92 311 0338480',
      bio: 'Direct Message & Instant Banking / Web Project Consultation',
      institution: 'Available for freelance inquiries, web dev & tutoring',
      link: `https://wa.me/${INFO.phone.replace(/[^0-9]/g, '')}`,
      btnText: 'Chat on WhatsApp',
      btnColor: '#059669',
      isLinkedInStyle: false
    },
    {
      platform: 'Email',
      headerBg: 'linear-gradient(135deg, #EA4335, #C5221F)',
      logo: <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'white', fontWeight: 700, fontSize: '0.95rem' }}><EmailLogo /> Email</div>,
      name: 'Raheel Jamal',
      handle: INFO.email,
      bio: 'Official Professional Email Inquiry for job opportunities & business collaborations',
      institution: 'Guaranteed response within 24 hours',
      link: `mailto:${INFO.email}`,
      btnText: 'Send Email',
      btnColor: '#EA4335',
      isLinkedInStyle: false
    }
  ];

  return (
    <Section id="contact">
      <SectionTitle>Contact & Social Profiles</SectionTitle>

      <p style={{ textAlign: 'center', color: '#64748B', maxWidth: '42rem', margin: '0 auto 3.5rem auto', fontSize: '1.1rem', lineHeight: 1.6 }}>
        Connect with me across official channels using my interactive profile cards below.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
        gap: '2rem',
        maxWidth: '72rem',
        margin: '0 auto'
      }}>
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            style={{
              backgroundColor: 'white',
              borderRadius: '1.25rem',
              border: '1px solid #E2E8F0',
              overflow: 'hidden',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 20px 35px -5px rgba(0, 0, 0, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)';
            }}
          >
            <div>
              {/* Card Header Banner */}
              <div style={{
                background: card.headerBg,
                height: '4.5rem',
                padding: '0.85rem 1.25rem',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-start'
              }}>
                {card.logo}
              </div>

              {/* Avatar Photo (Overlapping Header) */}
              <div style={{ padding: '0 1.25rem', marginTop: '-2.25rem', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <img
                  src="/profile.jpg"
                  alt={card.name}
                  style={{
                    width: '4.75rem',
                    height: '4.75rem',
                    borderRadius: '50%',
                    border: '3px solid white',
                    objectFit: 'cover',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                    backgroundColor: '#F8FAFC'
                  }}
                />
              </div>

              {/* Card Content Details */}
              <div style={{ padding: '0 1.25rem 1.25rem 1.25rem' }}>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  color: '#0F172A',
                  margin: '0 0 0.15rem 0',
                  lineHeight: 1.2
                }}>
                  {card.name}
                </h3>

                <p style={{
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: card.btnColor,
                  margin: '0 0 0.75rem 0'
                }}>
                  {card.handle}
                </p>

                <p style={{
                  fontSize: '0.92rem',
                  color: '#334155',
                  lineHeight: 1.45,
                  margin: '0 0 0.75rem 0',
                  fontWeight: 500
                }}>
                  {card.bio}
                </p>

                <p style={{
                  fontSize: '0.82rem',
                  color: '#64748B',
                  lineHeight: 1.4,
                  margin: 0
                }}>
                  {card.institution}
                </p>
              </div>
            </div>

            {/* Bottom Interactive Action Button */}
            <div style={{ padding: '1rem 1.25rem 1.25rem 1.25rem', borderTop: '1px solid #F1F5F9' }}>
              <a
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  width: 'fit-content',
                  padding: '0.55rem 1.4rem',
                  borderRadius: '9999px',
                  border: `1.5px solid ${card.btnColor}`,
                  color: card.btnColor,
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                  textAlign: 'center',
                  transition: 'all 0.2s ease-in-out',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = card.btnColor;
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = card.btnColor;
                }}
              >
                {card.btnText}
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

