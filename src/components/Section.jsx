import React from 'react';
import { motion, useInView } from 'framer-motion';

export default function Section({ children, id }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
      className="py-responsive"
    >
      {children}
    </motion.section>
  );
}

export function SectionTitle({ children }) {
  return (
    <h2 style={{
      fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, textAlign: 'center', marginBottom: '3rem',
      background: 'linear-gradient(to right, #0B1120, #06B6D4)',
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
    }}>
      {children}
    </h2>
  );
}
