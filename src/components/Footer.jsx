import React from 'react';
import { Github, Linkedin, Facebook, Instagram } from 'lucide-react';
import { INFO } from '../data/info';

export default function Footer() {
  const iconHover = (e) => e.currentTarget.style.transform = 'scale(1.1)';
  const iconLeave = (e) => e.currentTarget.style.transform = 'scale(1)';

  return (
    <footer style={{
      paddingTop: '2rem', paddingBottom: '2rem',
      borderTop: '1px solid #E2E8F0', marginTop: '3rem', textAlign: 'center'
    }}>
      <h3 style={{
        fontSize: '1.75rem', fontWeight: 700,
        background: 'linear-gradient(to right, #0B1120, #06B6D4)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        backgroundClip: 'text', marginBottom: '1rem'
      }}>
        {INFO.name}
      </h3>

      <p style={{ color: '#475569', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        © {new Date().getFullYear()} {INFO.name}. All rights reserved.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <a href={INFO.links.github} target="_blank" rel="noopener noreferrer"
          style={{ padding: '0.75rem', backgroundColor: '#0B1120', borderRadius: '50%', transition: 'transform 0.3s', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', display: 'flex' }}
          onMouseEnter={iconHover} onMouseLeave={iconLeave}>
          <Github size={24} style={{ color: 'white' }} />
        </a>
        <a href={INFO.links.linkedin} target="_blank" rel="noopener noreferrer"
          style={{ padding: '0.75rem', backgroundColor: '#0A66C2', borderRadius: '50%', transition: 'transform 0.3s', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', display: 'flex' }}
          onMouseEnter={iconHover} onMouseLeave={iconLeave}>
          <Linkedin size={24} style={{ color: 'white' }} />
        </a>
        <a href={INFO.links.facebook} target="_blank" rel="noopener noreferrer"
          style={{ padding: '0.75rem', backgroundColor: '#1877F2', borderRadius: '50%', transition: 'transform 0.3s', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', display: 'flex' }}
          onMouseEnter={iconHover} onMouseLeave={iconLeave}>
          <Facebook size={24} style={{ color: 'white' }} />
        </a>
        <a href={INFO.links.instagram} target="_blank" rel="noopener noreferrer"
          style={{ padding: '0.75rem', background: 'linear-gradient(45deg, #F58529, #DD2A7B, #515BD4)', borderRadius: '50%', transition: 'transform 0.3s', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', display: 'flex' }}
          onMouseEnter={iconHover} onMouseLeave={iconLeave}>
          <Instagram size={24} style={{ color: 'white' }} />
        </a>
      </div>
    </footer>
  );
}
