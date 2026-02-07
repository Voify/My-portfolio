"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { 
  FaChevronDown, 
  FaWhatsapp, FaEnvelope, FaLinkedinIn, 
  FaGithub, FaBehance 
} from 'react-icons/fa';
import { Typewriter } from './Typewriter'; 

const FloatingLines = dynamic(() => import('./FloatingLines'), { 
  ssr: false,
  loading: () => <div className="hero-background" /> 
});

const Hero: React.FC = () => {
  return (
    <section id="hero" className="hero-section">
      
      {/* Background Layer */}
      <div className="hero-background-wrapper">
        <FloatingLines 
          linesGradient={["#010014", "#034555", "#0f5c68"]} // blue-teal clean
          enabledWaves={["top", "middle", "bottom"]}
          animationSpeed={1}
          interactive={true}
        />
      </div>

      {/* Content Layer */}
      <div className="hero-content container">
        {/* Step 1: Name appears first */}
        <h1 className="reveal-name">Mithun Minsara</h1>

        {/* Step 2: Rest fades in */}
        <div className="fade-in-content">
          <Typewriter />

          <p className="hero-description">
            Professional creative designer and web developer from Colombo, Sri Lanka.
            I transform ideas into stunning digital experiences through innovative design
            and cutting-edge development.
          </p>

          <div className="hero-btns">
             <a href="#projects" className="hero-btn btn-primary">View Portfolio</a>
             <a href="#contact" className="hero-btn btn-secondary">Get in Touch</a>
          </div>

          <div className="social-icons">
            <a href="https://github.com" className="social-icon"><FaGithub /></a>
            <a href="https://linkedin.com" className="social-icon"><FaLinkedinIn /></a>
            <a href="https://behance.net" className="social-icon"><FaBehance /></a>
            <a href="https://wa.me/94702685025" className="social-icon"><FaWhatsapp /></a>
            <a href="mailto:mithunminsara10@gmail.com" className="social-icon"><FaEnvelope /></a>
          </div>
        </div>
      </div>

      <div className="scroll-down">
        <FaChevronDown />
      </div>
    </section>
  );
};

export default Hero;