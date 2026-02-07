"use client";

import React, { useState } from 'react';
import { FaExternalLinkAlt, FaPlayCircle, FaMusic, FaSearchPlus } from 'react-icons/fa';
import MediaModal from './MediaModal';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [modalData, setModalData] = useState({
    isOpen: false,
    url: '',
    title: '',
    type: 'image' as 'image' | 'video' ,
  });

  const projectData = [
    {
      id: 1,
      title: "InkPulse E-commerce",
      category: "web",
      image: "/myprojects/inkpulse.PNG", 
      mediaUrl: "/myprojects/inkpulse.PNG", // For web, we show the full screenshot in modal
      type: "image",
      link: "https://inkpulse.com.lk",
      tools: ["Next.js", "Firebase"]
    },
    {
      id: 2,
      title: "Cinematic Travel Reel",
      category: "video",
      image: "/myprojects/travel-video.webp", 
      mediaUrl: "/myprojects/reels.mp4", // Path to your MP4
      type: "video",
      link: "#",
      tools: ["Premiere Pro", "After Effects"]
    },
    {
      id: 3,
      title: "Modern Brand Identity",
      category: "design",
      image: "/myprojects/graphic.webp",
      mediaUrl: "/myprojects/graphic.webp",
      type: "image",
      link: "#",
      tools: ["Photoshop", "Illustrator"]
    },
    {
      id: 4,
      title: "Modern Brand Identity",
      category: "design",
      image: "/myprojects/4.webp",
      mediaUrl: "/myprojects/4.webp",
      type: "image",
      link: "#",
      tools: ["Photoshop", "Illustrator"]
    },
    {
      id: 5,
      title: "Modern Brand Identity",
      category: "design",
      image: "/myprojects/5.webp",
      mediaUrl: "/myprojects/5.webp",
      type: "image",
      link: "#",
      tools: ["Photoshop", "Illustrator"]
    },
    {
      id: 6,
      title: "Modern Brand Identity",
      category: "design",
      image: "/myprojects/6.webp",
      mediaUrl: "/myprojects/6.webp",
      type: "image",
      link: "#",
      tools: ["Photoshop", "Illustrator"]
    },
    {
      id: 7,
      title: "Modern Brand Identity",
      category: "design",
      image: "/myprojects/7.webp",
      mediaUrl: "/myprojects/7.webp",
      type: "image",
      link: "#",
      tools: ["Photoshop", "Illustrator"]
    },
    {
      id: 8,
      title: "Modern Brand Identity",
      category: "design",
      image: "/myprojects/8.webp",
      mediaUrl: "/myprojects/8.webp",
      type: "image",
      link: "#",
      tools: ["Photoshop", "Illustrator"]
    },
    {
      id: 9,
      title: "Modern Brand Identity",
      category: "design",
      image: "/myprojects/9.webp",
      mediaUrl: "/myprojects/9.webp",
      type: "image",
      link: "#",
      tools: ["Photoshop", "Illustrator"]
    },
    {
      id: 10,
      title: "Modern Brand Identity",
      category: "design",
      image: "/myprojects/10.webp",
      mediaUrl: "/myprojects/10.webp",
      type: "image",
      link: "#",
      tools: ["Photoshop", "Illustrator"]
    },
    {
      id: 11,
      title: "Modern Brand Identity",
      category: "design",
      image: "/myprojects/11.webp",
      mediaUrl: "/myprojects/11.webp",
      type: "image",
      link: "#",
      tools: ["Photoshop", "Illustrator"]
    },
  ];

  const handleOpenMedia = (project: any) => {
    // If it's a website and you want the link to work normally, 
    // we only open modal for video/design/audio
    if (project.category === 'web' && project.link !== '#') {
       window.open(project.link, '_blank');
       return;
    }
    setModalData({
      isOpen: true,
      url: project.mediaUrl,
      title: project.title,
      type: project.type as any
    });
  };

  const filtered = filter === 'all' ? projectData : projectData.filter(p => p.category === filter);

  return (
    <section id="projects" className="projects-section container">
      <div className="section-header">
        <h2 className="glitch-text">Featured Work</h2>
        <div className="filter-tabs">
          {['all', 'web', 'video', 'design', ].map((tab) => (
            <button 
              key={tab}
              onClick={() => setFilter(tab)}
              className={filter === tab ? 'active' : ''}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="modern-grid">
        {filtered.map((project) => (
          <div key={project.id} className="project-card-v2" onClick={() => handleOpenMedia(project)}>
            
            {/* Browser Dots for Web/Design */}
            {(project.category === 'web' || project.category === 'design') && (
              <div className="browser-ui">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            )}

            <div className="card-image-wrapper">
              <div 
                className={`card-image ${project.category === 'web' ? 'scroll-effect' : ''}`} 
                style={{ backgroundImage: `url(${project.image})` }}
              >
                <div className="card-overlay">
                  <div className="overlay-content">
                    <span className="project-cat-tag">{project.category}</span>
                    <h3>{project.title}</h3>
                    
                    <div className="action-trigger">
                      {project.type === 'video' && <FaPlayCircle className="play-btn" />}
                      {project.type === 'audio' && <FaMusic className="play-btn" />}
                      {project.type === 'image' && <FaSearchPlus className="play-btn" />}
                    </div>

                    <div className="project-tools-mini">
                      {project.tools.map(t => <span key={t}>{t}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <MediaModal 
        isOpen={modalData.isOpen}
        onClose={() => setModalData(prev => ({ ...prev, isOpen: false }))}
        mediaUrl={modalData.url}
        title={modalData.title}
        type={modalData.type}
      />
    </section>
  );
};

export default Projects;