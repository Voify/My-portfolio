"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface StatItemProps {
  target: number;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ target, label }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const counterRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated && counterRef.current) {
      setHasAnimated(true);
      
      let current = 0;
      const duration = 2000; // 2 seconds animation
      const start = performance.now();
      
      const animateCounter = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        current = Math.floor(progress * target);
        
        if (counterRef.current) {
          counterRef.current.textContent = current.toString();
        }

        if (progress < 1) {
          requestAnimationFrame(animateCounter);
        } else if (counterRef.current) {
          counterRef.current.textContent = target.toString();
        }
      };
      
      requestAnimationFrame(animateCounter);
    }
  }, [inView, target, hasAnimated]);

  return (
    <div ref={ref} className={`stat-item ${inView ? 'visible' : ''}`}>
      <div className="counter-wrapper">
        <span className="counter" ref={counterRef}>0</span>
        {label.includes('%') ? <span className="stat-suffix">%</span> : null}
        {label.includes('Response') ? <span className="stat-suffix">h</span> : null}
      </div>
      <p>{label}</p>
    </div>
  );
};

const Stats = () => {
  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          <StatItem target={18} label="Projects Completed" />
          <StatItem target={15} label="Happy Clients" />
          <StatItem target={98} label="Success Rate %" />
          <StatItem target={12} label="Average Response Time" />
        </div>
      </div>
    </section>
  );
};

export default Stats;