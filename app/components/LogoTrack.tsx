"use client";

import React from 'react';
import { FaSearch } from 'react-icons/fa';

const LogoTrack = () => {
  const logoItems = [
    { icon: '/icons/premiere-pro.jpg', alt: 'Adobe Premiere Pro', label: 'Premiere Pro' },
    { icon: '/icons/photoshop-lightroom.png', alt: 'Adobe Lightroom', label: 'Lightroom' },
    { icon: '/icons/after-effects.png', alt: 'Adobe After Effects', label: 'After Effects' },
    { icon: '/icons/photoshop.png', alt: 'Adobe Photoshop', label: 'Photoshop' },
    { icon: '/icons/capcut-logo-on-transparent-white-background-free-vector.jpg', alt: 'Capcut', label: 'CapCut' },
    { icon: '/icons/palette.png', alt: 'Canva', label: 'Canva' },
    { icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968267.png', alt: 'HTML5', label: 'HTML5' },
    { icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968242.png', alt: 'CSS3', label: 'CSS3' },
    { icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968292.png', alt: 'JavaScript', label: 'JavaScript' },
    { icon: 'https://cdn-icons-png.flaticon.com/512/1126/1126012.png', alt: 'React', label: 'React' },
    { icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968358.png', alt: 'Firebase', label: 'Firebase' },
    { icon: 'https://cdn-icons-png.flaticon.com/512/6124/6124997.png', alt: 'Google Maps', label: 'Google Maps' },
    { icon: null, component: <FaSearch />, label: 'SEO' },
  ];

  // Duplicate for seamless loop
  const allLogos = [...logoItems, ...logoItems];

  return (
    <section className="logo-loop-section">
      <div className="container">
        <h3 className="logo-loop-title">Technologies & Tools I Master</h3>
        <div className="logo-slider">
          <div className="logo-track">
            {allLogos.map((item, index) => (
              <div key={index} className="logo-item">
                {item.component ? (
                  <span className="logo-icon-svg">{item.component}</span>
                ) : (
                  <img src={item.icon} alt={item.alt} className="custom-icon" />
                )}
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoTrack;