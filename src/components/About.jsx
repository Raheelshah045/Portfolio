import React from 'react';
import { motion } from 'framer-motion';
import Section, { SectionTitle } from './Section';
import { INFO } from '../data/info';

export default function About() {
  return (
    <Section id="about">
      <SectionTitle>About Me</SectionTitle>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="responsive-card"
        style={{
          maxWidth: '56rem', margin: '0 auto', backgroundColor: 'white',
          borderRadius: '1rem',
          boxShadow: '0 20px 50px rgba(0,0,0,0.1)', border: '1px solid #E2E8F0'
        }}
      >
        <p style={{ fontSize: '1.05rem', color: '#0F172A', marginBottom: '1.25rem', lineHeight: '1.7' }}>
          I am <span style={{ fontWeight: 700, color: '#0B1120' }}>{INFO.name}</span>, a versatile professional bridging the gap between digital banking operations, educational instruction, and technology. Currently pursuing my Bachelor's degree in Computer Science at SZABIST University, I work as an ADC Operations Officer at UBL, supporting digital banking and international card processing.
        </p>
        <p style={{ fontSize: '1.05rem', color: '#475569', marginBottom: '1.25rem', lineHeight: '1.7' }}>
          My journey combines hands-on experience in financial operations—specifically transaction monitoring, operational reporting, and workflow optimization—with a strong background in Quranic and academic education. This allows me to bring a structured, detail-oriented approach to both technical and operational challenges.
        </p>
        <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: '1.7' }}>
          On the technical and creative side, I work with web development, creating functional applications, and graphic design using Adobe Creative Suite. I also possess skills in SEO, digital marketing, and project management (Microsoft Project). This multi-disciplinary expertise enables me to optimize operational workflows, develop software solutions, and create premium branding and publication designs.
        </p>
      </motion.div>
    </Section>
  );
}
