import React from 'react';
import { motion, useInView } from 'framer-motion';

export default function Section({ children, id, className = '' }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 35 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`section-wrapper ${className}`}
    >
      <div className="container-max">{children}</div>
    </motion.section>
  );
}

export function SectionTitle({ title, subtitle, center = true }) {
  return (
    <div
      style={{
        textAlign: center ? 'center' : 'left',
        marginBottom: '3rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: center ? 'center' : 'flex-start',
        gap: '0.4rem'
      }}
    >
      {subtitle && (
        <span
          style={{
            fontSize: '0.78rem',
            fontWeight: 800,
            color: 'var(--accent-subtle, #9A5B32)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-subtle, #9A5B32)' }} />
          {subtitle}
        </span>
      )}
      <h2
        style={{
          fontSize: 'clamp(2rem, 5vw, 3.25rem)',
          fontWeight: 900,
          color: 'var(--text-primary, #18181B)',
          letterSpacing: '-0.025em',
          lineHeight: 1.15,
          margin: 0
        }}
      >
        {title}
      </h2>
    </div>
  );
}
