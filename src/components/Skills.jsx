import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Cpu, Briefcase, Palette, Sparkles } from 'lucide-react';
import Section, { SectionTitle } from './Section';
import { SKILL_GROUPS } from '../data/info';

const ICON_MAP = {
  Code: Code,
  Cpu: Cpu,
  Briefcase: Briefcase,
  Palette: Palette
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState(SKILL_GROUPS[0].id);
  const [selectedSkill, setSelectedSkill] = useState(SKILL_GROUPS[0].skills[0]);

  const activeGroup = SKILL_GROUPS.find(g => g.id === activeTab) || SKILL_GROUPS[0];

  return (
    <Section id="skills">
      <SectionTitle
        subtitle="GROUNDED TECHNICAL COMPETENCIES WITHOUT FAKE PERCENTAGE BARS"
        title="Technical Capabilities & Tooling"
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Capability Group Tabs (Swipeable on Mobile) */}
        <div
          style={{
            display: 'flex',
            gap: '0.65rem',
            justifyContent: 'flex-start',
            alignItems: 'center',
            overflowX: 'auto',
            paddingBottom: '0.5rem',
            maxWidth: '100%',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none'
          }}
          className="md:justify-center"
        >
          {SKILL_GROUPS.map((group) => {
            const Icon = ICON_MAP[group.icon] || Code;
            const isActive = activeTab === group.id;
            return (
              <button
                key={group.id}
                onClick={() => {
                  setActiveTab(group.id);
                  setSelectedSkill(group.skills[0]);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '0.75rem',
                  background: isActive ? '#18181B' : 'rgba(255, 255, 255, 0.85)',
                  border: isActive ? '1px solid #18181B' : '1px solid rgba(24, 24, 27, 0.08)',
                  color: isActive ? '#FFFFFF' : '#52525B',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  backdropFilter: 'blur(8px)',
                  boxShadow: isActive ? '0 2px 8px rgba(0, 0, 0, 0.12)' : 'none',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'rgba(24, 24, 27, 0.2)';
                    e.currentTarget.style.color = '#18181B';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'rgba(24, 24, 27, 0.08)';
                    e.currentTarget.style.color = '#52525B';
                  }
                }}
              >
                <Icon size={18} />
                {group.category}
              </button>
            );
          })}
        </div>

        {/* Interactive Capability Explorer */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="glass-panel"
          style={{ padding: '2rem 2.5rem' }}
        >
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#18181B', marginBottom: '0.4rem' }}>
              {activeGroup.category}
            </h3>
            <p style={{ color: '#52525B', fontSize: '0.95rem', margin: 0 }}>
              {activeGroup.summary}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              alignItems: 'start'
            }}
          >
            {/* Skill Matrix List */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.85rem' }}>
              {activeGroup.skills.map((skill) => {
                const isSelected = selectedSkill?.name === skill.name;
                return (
                  <div
                    key={skill.name}
                    onClick={() => setSelectedSkill(skill)}
                    style={{
                      padding: '1rem',
                      borderRadius: '0.75rem',
                      background: isSelected ? 'rgba(24, 24, 27, 0.06)' : 'rgba(255, 255, 255, 0.6)',
                      border: isSelected ? '1px solid #18181B' : '1px solid rgba(24, 24, 27, 0.08)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.35rem'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = 'rgba(24, 24, 27, 0.2)';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = 'rgba(24, 24, 27, 0.08)';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.6)';
                      }
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: isSelected ? '#18181B' : '#27272A', fontWeight: 700, fontSize: '0.95rem' }}>
                        {skill.name}
                      </span>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          padding: '2px 7px',
                          borderRadius: '9999px',
                          background: isSelected ? 'rgba(154, 91, 50, 0.12)' : 'rgba(24, 24, 27, 0.05)',
                          color: isSelected ? '#9A5B32' : '#71717A'
                        }}
                      >
                        {skill.level}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Skill Context Pane */}
            {selectedSkill && (
              <motion.div
                key={selectedSkill.name}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  background: 'var(--bg-card, #FFFFFF)',
                  border: '1px solid rgba(24, 24, 27, 0.12)',
                  borderRadius: '1rem',
                  padding: '1.75rem',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#9A5B32' }}>
                  <Sparkles size={18} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    PRACTICAL APPLICATION
                  </span>
                </div>
                <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#18181B', marginBottom: '0.5rem' }}>
                  {selectedSkill.name}
                </h4>
                <div style={{ display: 'inline-block', marginBottom: '1rem' }}>
                  <span
                    style={{
                      background: 'rgba(154, 91, 50, 0.08)',
                      color: '#9A5B32',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '3px 10px',
                      borderRadius: '9999px',
                      border: '1px solid rgba(154, 91, 50, 0.22)'
                    }}
                  >
                    Domain Status: {selectedSkill.level}
                  </span>
                </div>
                <p style={{ color: '#52525B', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
                  {selectedSkill.desc}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
