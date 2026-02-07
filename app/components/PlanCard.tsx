"use client";

import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

interface Feature {
  text: string;
  included: boolean;
}

interface PlanCardProps {
  tier: string;
  name: string;
  price: string;
  description: string;
  features: Feature[];
  onSelect: (name: string, price: string, serviceType: string) => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ tier, name, price, description, features, onSelect }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div ref={ref} className={`plan-card ${tier} ${inView ? 'visible' : ''}`}>
      <div className="plan-badge">{tier.toUpperCase()}</div>
      <h3 className="plan-name">{name}</h3>
      <div className="plan-price">{price}</div>
      <p className="plan-desc">{description}</p>
      <ul className="plan-features">
        {features.map((feature, index) => (
          <li key={index} className={feature.included ? 'included' : 'not-included'}>
            {feature.included ? <FaCheck className="icon-check" /> : <FaTimes className="icon-times" />}
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>
      <button className="plan-button" onClick={() => onSelect(name, price, 'Service')}>
        Choose Plan
      </button>
    </div>
  );
};

export default PlanCard;