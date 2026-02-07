"use client";

import { useState, useEffect } from 'react';

const professions = [
  'Graphic Designer',
  'Video Editor',
  'Web Developer',
  'UI/UX Designer',
  'SEO Specialist',
];

export const Typewriter = () => {
  const [text, setText] = useState('');
  const [professionIndex, setProfessionIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentProfession = professions[professionIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && charIndex < currentProfession.length) {
      timeout = setTimeout(() => {
        setText(currentProfession.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 80);
    } else if (!isDeleting && charIndex === currentProfession.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setText(currentProfession.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, 40);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setProfessionIndex((prev) => (prev + 1) % professions.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, professionIndex]);

  return (
    <div className="typewriter-container">
      <div className="typewriter">
        I am a <span className="typewriter-text">{text}</span>
      </div>
    </div>
  );
};