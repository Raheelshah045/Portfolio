import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, MessageCircle } from 'lucide-react';
import { INFO } from '../data/info';

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const role = INFO.roles[roleIdx];
    const speed = del ? 50 : 100;
    const timer = setTimeout(() => {
      if (!del && charIdx < role.length) setCharIdx(charIdx + 1);
      else if (del && charIdx > 0) setCharIdx(charIdx - 1);
      else if (!del && charIdx === role.length) setTimeout(() => setDel(true), 2000);
      else if (del && charIdx === 0) { setDel(false); setRoleIdx((roleIdx + 1) % INFO.roles.length); }
    }, speed);
    return () => clearTimeout(timer);
  }, [charIdx, del, roleIdx]);

  const btnHover = (e) => e.currentTarget.style.transform = 'translateY(-5px)';
  const btnLeave = (e) => e.currentTarget.style.transform = 'translateY(0)';

  return (
  <section id="home" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center' }}
        className="space-y-8"
      >
  <p style={{ color: '#06B6D4', fontSize: '1.1rem', fontWeight: 700 }}>👋 Hello, I'm</p>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 9vw, 4.5rem)', fontWeight: 900,
          background: 'linear-gradient(to right, #0B1120, #06B6D4)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          marginBottom: '1rem'
        }}>
          {INFO.name}
        </h1>

        <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 700, height: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#0F172A' }}>{INFO.roles[roleIdx].substring(0, charIdx)}</span>
          <span style={{ color: '#06B6D4', marginLeft: '0.25rem' }} className="animate-pulse">|</span>
        </div>

  <p style={{ fontSize: '1rem', color: '#475569', maxWidth: '48rem', margin: '0 auto' }}>{INFO.bio}</p>

  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center', paddingTop: '0.5rem' }}>
          <a href={INFO.links.github} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1rem', backgroundColor: '#0B1120', color: 'white', borderRadius: '0.75rem', fontWeight: 600, textDecoration: 'none', boxShadow: '0 8px 20px rgba(0,0,0,0.12)', transition: 'transform 0.3s' }}
            onMouseEnter={btnHover} onMouseLeave={btnLeave}>
            <Github size={24} /> GitHub
          </a>
          <a href={INFO.links.linkedin} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1rem', backgroundColor: '#0A66C2', color: 'white', borderRadius: '0.75rem', fontWeight: 600, textDecoration: 'none', boxShadow: '0 8px 20px rgba(0,0,0,0.12)', transition: 'transform 0.3s' }}
            onMouseEnter={btnHover} onMouseLeave={btnLeave}>
            <Linkedin size={24} /> LinkedIn
          </a>
          <a href={`https://wa.me/${INFO.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1rem', backgroundColor: '#25D366', color: 'white', borderRadius: '0.75rem', fontWeight: 600, textDecoration: 'none', boxShadow: '0 8px 20px rgba(0,0,0,0.12)', transition: 'transform 0.3s' }}
            onMouseEnter={btnHover} onMouseLeave={btnLeave}>
            <MessageCircle size={24} /> WhatsApp
          </a>
        </div>
      </motion.div>
    </section>
  );
}
