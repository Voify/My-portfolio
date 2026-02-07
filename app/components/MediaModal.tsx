"use client";

import React from 'react';
import { FaTimes, FaPlay, FaMusic } from 'react-icons/fa';

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  mediaUrl: string;
  title: string;
  type: 'video' | 'image';
}

const MediaModal: React.FC<MediaModalProps> = ({ isOpen, onClose, mediaUrl, title, type }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><FaTimes /></button>
        
        <div className="modal-body">
          {type === 'image' && (
            <img src={mediaUrl} alt={title} className="modal-media-element" />
          )}

          {type === 'video' && (
            <video controls autoPlay className="modal-media-element">
              <source src={mediaUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        
        <div className="modal-footer">
          <h3>{title}</h3>
        </div>
      </div>
    </div>
  );
};

export default MediaModal;