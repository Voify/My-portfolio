"use client";

import React from 'react';
import PlanCard from './PlanCard';

const ServicePlans = () => {
  // --- 1. THE DATA (The missing arrays) ---
  const graphicPlans = [
    {
      tier: 'bronze',
      name: 'Basic Design',
      price: 'LKR 500-800',
      description: 'Perfect for simple design needs and startups',
      features: [
        { text: '1 Custom Logo Designs', included: true },
        { text: '1 Social Media Graphics', included: true },
        { text: '1 Business Card Design', included: true },
        { text: '2 Revision Rounds', included: true },
        { text: 'Brand Guidelines', included: false },
        { text: 'Source Files', included: false },
      ],
    },
    {
      tier: 'silver',
      name: 'Professional Design',
      price: 'LKR 800-1,500',
      description: 'Comprehensive design package for growing businesses',
      features: [
        { text: '1-3 Custom Logo Designs', included: true },
        { text: '1-5 Social Media Graphics', included: true },
        { text: 'Complete Brand Identity', included: true },
        { text: '5 Revision Rounds', included: true },
        { text: 'Basic Brand Guidelines', included: true },
        { text: 'Source Files Included', included: true },
      ],
    },
    {
      tier: 'gold',
      name: 'Premium Design',
      price: 'LKR 1,500+',
      description: 'Complete design solution for established brands',
      features: [
        { text: '3+ Logo Concepts', included: true },
        { text: '5+ Social Media Graphics', included: true },
        { text: 'Full Brand Identity System', included: true },
        { text: 'Unlimited Revisions', included: true },
        { text: 'Complete Brand Guidelines', included: true },
        { text: '3 Months Support', included: true },
      ],
    },
  ];

  const webPlans = [
    {
      tier: 'bronze',
      name: 'Basic Website',
      price: 'LKR 5,000-10,000',
      description: 'Simple, responsive website for small businesses and portfolios(Domain not included)',
      features: [
        { text: '1-3 Page Website', included: true },
        { text: 'Responsive Design', included: true },
        { text: 'Contact Form', included: true },
        { text: 'Basic SEO Setup', included: true },
        { text: 'Firebase Integration', included: false },
        { text: 'Google Authentication', included: false },
        { text: 'Payment Gateway', included: false },
      ],
    },
    {
      tier: 'silver',
      name: 'Business Website',
      price: 'LKR 15,000-40,000',
      description: 'Feature-rich website for growing businesses(Domain not included)',
      features: [
        { text: '3-5 Page Website', included: true },
        { text: 'Responsive Design', included: true },
        { text: 'Contact & Inquiry Forms', included: true },
        { text: 'Advanced SEO', included: true },
        { text: 'Firebase Integration', included: true },
        { text: 'Google Authentication', included: true },
        { text: 'Google Maps Integration', included: true },
        { text: 'E-commerce Integration', included: true },
        { text: 'Google Analytics Setup', included: false },
        { text: 'Payment Gateway', included: false },
      ],
    },
    {
      tier: 'gold',
      name: 'Premium Web App',
      price: 'LKR 45,000+',
      description: 'Custom web applications with advanced features(Domain not included)',
      features: [
        { text: 'Firebase Integration', included: true },
        { text: 'Google Authentication', included: true },
        { text: 'Google Maps Integration', included: true },
        { text: 'E-commerce Integration', included: true },
        { text: 'Google Analytics Setup', included: false },
        { text: 'Payment Gateway', included: false },
        { text: 'Google Maps Integration', included: true },
        { text: 'Full SEO Package', included: true },
        { text: '6 Months Support', included: true },
      ],
    },
  ];

  const videoPlans = [
    {
      tier: 'bronze',
      name: 'Basic Editing',
      price: 'LKR 800-1,500',
      description: 'Simple video editing for social media content',
      features: [
        { text: 'Up to 5 min video', included: true },
        { text: 'Basic Cuts & Trims', included: true },
        { text: 'Text Overlays', included: true },
        { text: 'Music Addition', included: true },
        { text: 'Color Grading', included: false },
      ],
    },
    {
      tier: 'silver',
      name: 'Professional Editing',
      price: 'LKR 2,000-3,500',
      description: 'High-quality editing for YouTube & social media',
      features: [
        { text: 'Up to 10 min video', included: true },
        { text: 'Advanced Editing', included: true },
        { text: 'Color Correction', included: true },
        { text: 'Sound Design', included: true },
        { text: '3 Revision Rounds', included: true },
      ],
    },
    {
      tier: 'gold',
      name: 'Premium Production',
      price: 'LKR 3,500+',
      description: 'Professional video production with advanced effects',
      features: [
        { text: 'Up to 20 min video', included: true },
        { text: 'Advanced Color Grading', included: true },
        { text: 'Complex Motion Graphics', included: true },
        { text: 'Unlimited Revisions', included: true },
        { text: 'VFX & Sound Design', included: true },
      ],
    },
  ];

  // --- 2. THE HANDLER ---
 const handlePlanSelect = (tier: string, category: string) => {
  const contactSection = document.getElementById('contact');
  
  // 1. Format the string exactly as it appears in the <option>
  const capitalizedTier = tier.charAt(0).toUpperCase() + tier.slice(1);
  const selectedValue = `${capitalizedTier} - ${category}`;

  // 2. Create and dispatch a custom event to update React State
  const event = new CustomEvent('planSelected', { detail: selectedValue });
  window.dispatchEvent(event);

  // 3. Smooth scroll
  contactSection?.scrollIntoView({ behavior: 'smooth' });
  
  setTimeout(() => {
    document.getElementById('name')?.focus();
  }, 800);
};
  // --- 3. THE RENDER ---
  return (
    <section id="services" className="service-plans section-padding">
      <div className="container">
        <h2 className="section-title">Service Plans</h2>

       
<div className="category-group">
  <h3 className="category-title">Graphic Design</h3>
  <div className="plan-tiers">
    {graphicPlans.map((plan, index) => (
      <PlanCard 
        key={index} 
        {...plan} 
        onSelect={() => handlePlanSelect(plan.tier, "Graphic Design")} // Pass only tier and category
      />
    ))}
  </div>
</div>

<div className="category-group">
  <h3 className="category-title">Web Development</h3>
  <div className="plan-tiers">
    {webPlans.map((plan, index) => (
      <PlanCard 
        key={index} 
        {...plan} 
        onSelect={() => handlePlanSelect(plan.tier, "Web Development")} // Pass only tier and category
      />
    ))}
  </div>
</div>

<div className="category-group">
  <h3 className="category-title">Video Editing</h3>
  <div className="plan-tiers">
    {videoPlans.map((plan, index) => (
      <PlanCard 
        key={index} 
        {...plan} 
        onSelect={() => handlePlanSelect(plan.tier, "Video Editing")} // Pass only tier and category
      />
    ))}
  </div>
</div>
      </div>
    </section>
  );
};

export default ServicePlans;