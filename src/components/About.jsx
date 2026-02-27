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
          I am <span style={{ fontWeight: 700, color: '#0B1120' }}>{INFO.name}</span>, a passionate educator dedicated to teaching Quranic studies and academic subjects. Currently pursuing my Bachelor's degree in Computer Science at SZABIST University, I am bridging the gap between traditional education and modern technology.
        </p>
        <p style={{ fontSize: '1.05rem', color: '#475569', marginBottom: '1.25rem', lineHeight: '1.7' }}>
          My journey combines years of experience in Quranic instruction—specializing in Nazira, Tajweed, and Hifz—with a growing expertise in the digital world. I have taught students across various age groups and backgrounds, helping them build strong foundations in both religious and academic subjects.
        </p>
        <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: '1.7' }}>
          On the technical side, I work with web development, creating functional websites and applications. I'm proficient in graphic design using Adobe Creative Suite, crafting visual identities and marketing materials. Additionally, I focus on SEO and digital marketing strategies to help businesses establish their online presence. This unique blend of education and technology allows me to create meaningful learning experiences while developing innovative digital solutions.
        </p>
      </motion.div>
    </Section>
  );
}
