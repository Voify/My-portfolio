"use client";
import React, { useEffect, useRef, useState } from 'react';
import { FaPaintBrush, FaCode, FaServer } from 'react-icons/fa';
import SkillBar from './SkillBar';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = skillsRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const designSkills = [
    { name: 'Adobe Photoshop', percentage: 95 },
    { name: 'Adobe Lightroom', percentage: 90 },
    { name: 'Premiere Pro', percentage: 92 },
    { name: 'After Effects', percentage: 85 },
    { name: 'CapCut', percentage: 95 }
  ];

  const webSkills = [
    { name: 'HTML5', percentage: 98 },
    { name: 'CSS3', percentage: 96 },
    { name: 'JavaScript', percentage: 90 },
    { name: 'Responsive Design', percentage: 95 },
    { name: 'UI/UX Design', percentage: 88 }
  ];

  const backendSkills = [
    { name: 'Firebase', percentage: 95 },
    { name: 'Google Maps API', percentage: 85 },
    { name: 'SEO Optimization', percentage: 90 },
    { name: 'API Integration', percentage: 80 },
    { name: 'Performance Optimization', percentage: 87 }
  ];

  return (
    <section id="skills" className="skills-section container" ref={skillsRef}>
      <div className="section-header" style={{textAlign: 'center', marginBottom: '3rem'}}>
        <h2 style={{fontSize: '2.5rem', fontWeight: 'bold'}}>My Skills & Expertise</h2>
      </div>
      <div className="skills-categories">
        
        <div className="skill-category">
          <h3><FaPaintBrush /> Design & Editing</h3>
          {designSkills.map((skill, index) => (
            <SkillBar key={index} skill={skill.name} percentage={skill.percentage} delay={index * 100} animate={isVisible} />
          ))}
        </div>

        <div className="skill-category">
          <h3><FaCode /> Web Development</h3>
          {webSkills.map((skill, index) => (
            <SkillBar key={index} skill={skill.name} percentage={skill.percentage} delay={index * 100} animate={isVisible} />
          ))}
        </div>

        <div className="skill-category">
          <h3><FaServer /> Backend & Services</h3>
          {backendSkills.map((skill, index) => (
            <SkillBar key={index} skill={skill.name} percentage={skill.percentage} delay={index * 100} animate={isVisible} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;