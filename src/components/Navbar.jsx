import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { INFO } from '../data/info';

const NAV_ITEMS = ['Home', 'About', 'Experience', 'Projects', 'Skills', 'Education', 'Contact'];

export default function Navbar() {
  const [menu, setMenu] = useState(false);

  const scroll = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 50,
        backdropFilter: 'blur(20px)', backgroundColor: 'rgba(255,255,255,0.95)',
        borderBottom: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 style={{
          fontSize: '1.5rem', fontWeight: 900,
          background: 'linear-gradient(to right, #0B1120, #06B6D4)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
        }}>
          {INFO.name}
        </h1>

        <div className="hidden md:flex gap-8">
          {NAV_ITEMS.map(i => (
            <button
              key={i}
              onClick={() => scroll(i.toLowerCase())}
              style={{ color: '#475569', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.3s' }}
              onMouseEnter={(e) => e.target.style.color = '#06B6D4'}
              onMouseLeave={(e) => e.target.style.color = '#475569'}
            >
              {i}
            </button>
          ))}
        </div>

        <button className="md:hidden" onClick={() => setMenu(!menu)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          {menu ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {menu && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ backgroundColor: 'white', borderTop: '1px solid #E2E8F0' }}>
          {NAV_ITEMS.map(i => (
            <button
              key={i}
              onClick={() => { setMenu(false); scroll(i.toLowerCase()); }}
              className="block w-full text-left px-6"
              style={{ padding: '1rem 1.5rem', color: '#475569', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}
            >
              {i}
            </button>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
