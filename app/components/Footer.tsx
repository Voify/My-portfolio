"use client";

import React from 'react';
import { FaCode } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Column 1: Brand */}
        <div className="footer-col">
          <a href="#hero" className="logo">
            <FaCode /> MithunMinsara
          </a>
          <p className="footer-description">
            Creative Designer & Web Developer in Colombo, Sri Lanka. 
            I transform ideas into stunning digital experiences.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="#hero">Home</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Column 3: Services */}
        <div className="footer-col">
          <h3>Services</h3>
          <ul className="footer-list">
            <li>Graphic Design</li>
            <li>Web Development</li>
            <li>Video Editing</li>
            <li>SEO Optimization</li>
          </ul>
        </div>
      </div>
      
      {/* Copyright area */}
      <div className="footer-bottom">
        <p>© {currentYear} Mithun Minsara. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;