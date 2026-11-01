import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FolderGit2, Compass, Mail, ExternalLink, X, Terminal, Cpu } from 'lucide-react';
import { INFO, PROJ } from '../data/info';

/**
 * CommandPalette Component
 * -------------------------------------------------------------
 * Accessible keyboard-first navigation console (Ctrl+K / Cmd+K).
 */
export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  // Navigable items
  const items = [
    { type: 'section', title: 'Home // Hero Experience', id: 'home', icon: Compass },
    { type: 'section', title: 'About // Background & Story', id: 'about', icon: Compass },
    { type: 'section', title: 'Philosophy // What I Build', id: 'approach', icon: Cpu },
    { type: 'section', title: 'Projects // Software & AI Systems', id: 'projects', icon: FolderGit2 },
    { type: 'section', title: 'Skills // Technical Capabilities', id: 'skills', icon: Terminal },
    { type: 'section', title: 'Experience // UBL Operations & Roles', id: 'experience', icon: Compass },
    { type: 'section', title: 'Education // SZABIST CS & Honors', id: 'education', icon: Compass },
    { type: 'section', title: 'Contact // Direct Reachout', id: 'contact', icon: Mail },
    ...PROJ.map(p => ({
      type: 'project',
      title: `${p.title} (${p.category})`,
      id: 'projects',
      projectData: p,
      icon: FolderGit2
    })),
    { type: 'link', title: 'GitHub Repository Profile', url: INFO.links.github, icon: ExternalLink },
    { type: 'link', title: 'LinkedIn Professional Profile', url: INFO.links.linkedin, icon: ExternalLink },
    { type: 'link', title: 'Direct WhatsApp Consultation', url: INFO.links.whatsapp, icon: ExternalLink }
  ];

  const filtered = items.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  const executeItem = useCallback((item) => {
    if (item.type === 'section' || item.type === 'project') {
      const el = document.getElementById(item.id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      onClose();
    } else if (item.type === 'link') {
      window.open(item.url, '_blank', 'noopener,noreferrer');
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % (filtered.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = filtered[selectedIndex];
        if (selected) {
          executeItem(selected);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose, executeItem]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(24, 24, 27, 0.65)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 999,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingTop: '15vh',
          paddingLeft: '1rem',
          paddingRight: '1rem'
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          style={{
            width: '100%',
            maxWidth: '580px',
            background: '#FFFFFF',
            border: '1px solid rgba(24, 24, 27, 0.12)',
            borderRadius: '1rem',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.15)',
            overflow: 'hidden'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '1rem 1.25rem',
              borderBottom: '1px solid rgba(24, 24, 27, 0.08)',
              gap: '0.75rem'
            }}
          >
            <Search size={20} color="#9A5B32" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Type to search sections, projects, or credentials..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              aria-label="Command search"
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#18181B',
                fontSize: '1rem',
                fontFamily: 'inherit'
              }}
            />
            <button
              onClick={onClose}
              style={{ background: 'none', border: 'none', color: '#71717A', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Results List */}
          <div
            style={{
              maxHeight: '340px',
              overflowY: 'auto',
              padding: '0.5rem'
            }}
          >
            {filtered.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#71717A', padding: '2rem 1rem', fontSize: '0.9rem' }}>
                No commands matching "{query}"
              </p>
            ) : (
              filtered.map((item, index) => {
                const Icon = item.icon;
                const isSelected = index === selectedIndex;
                return (
                  <div
                    key={index}
                    onClick={() => executeItem(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.5rem',
                      background: isSelected ? 'rgba(24, 24, 27, 0.06)' : 'transparent',
                      color: isSelected ? '#18181B' : '#52525B',
                      cursor: 'pointer',
                      transition: 'background 0.15s, color 0.15s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Icon size={16} color={isSelected ? '#18181B' : '#71717A'} />
                      <span style={{ fontSize: '0.92rem', fontWeight: isSelected ? 600 : 500 }}>
                        {item.title}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        background: 'rgba(24, 24, 27, 0.04)',
                        color: '#71717A'
                      }}
                    >
                      {item.type}
                    </span>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Guide */}
          <div
            style={{
              padding: '0.65rem 1.25rem',
              background: 'rgba(24, 24, 27, 0.02)',
              borderTop: '1px solid rgba(24, 24, 27, 0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.75rem',
              color: '#71717A'
            }}
          >
            <span>Navigate with ↑ and ↓</span>
            <span>Enter to select • Esc to close</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
