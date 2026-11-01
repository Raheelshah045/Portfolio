import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Approach from './components/Approach';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';
import ContactModal from './components/ContactModal';

export default function App() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const openContact = () => setContactModalOpen(true);
  const closeContact = () => setContactModalOpen(false);

  useEffect(() => {
    // Keyboard shortcut for Command Palette: Ctrl+K or Cmd+K
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };

    const handleOpenContact = () => setContactModalOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-contact-modal', handleOpenContact);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-contact-modal', handleOpenContact);
    };
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', color: 'var(--text-primary)' }}>
      {/* 1. Command Palette (Accessible via Ctrl+K / Cmd+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />

      {/* 2. Contact Inquiry Modal Dialog */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={closeContact}
      />

      {/* 3. Global Header Navigation */}
      <Navbar onOpenContact={openContact} />

      {/* 4. Semantic Main Content Sections */}
      <main id="main-content">
        <Hero onOpenContact={openContact} />
        <About />
        <Approach />
        <Projects />
        <Skills />
        <Experience />
        <Education />
        <Contact />
      </main>

      {/* 5. Semantic Footer */}
      <Footer />
    </div>
  );
}
