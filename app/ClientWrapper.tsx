"use client";

import dynamic from 'next/dynamic';
import React from 'react';

// Import ServicePlans only on the client side
const ServicePlans = dynamic(() => import('./components/ServicePlans'), {
  ssr: false,
});

export default function ClientWrapper() {
  return (
    <>
      <ServicePlans />
    </>
  );
}