"use client";
import React, { useEffect, useRef, useState } from 'react';

interface SkillBarProps {
  skill: string;
  percentage: number;
  delay?: number;
  animate?: boolean;
}

const SkillBar: React.FC<SkillBarProps> = ({ skill, percentage, delay = 0, animate = false }) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (animate && !hasAnimated) {
      const timer = setTimeout(() => {
        setHasAnimated(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [animate, hasAnimated, delay]);

  return (
    <div className="skill-item">
      <div className="skill-info">
        <span className="skill-name">{skill}</span>
        <span className="skill-percentage">{percentage}%</span>
      </div>
      <div className="skill-bar">
        <div 
          ref={progressRef} 
          className="skill-progress"
          style={{ 
            width: hasAnimated ? `${percentage}%` : '0%',
            transition: `width 1.5s cubic-bezier(0.1, 0, 0.2, 1)` 
          }}
        ></div>
      </div>
    </div>
  );
};

export default SkillBar;