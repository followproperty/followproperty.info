"use client";

import React from 'react';
import Hero from '../../components/Hero';
import Business from '../../components/Business';
import { useLeadForm } from '../../lib/LeadFormContext';
import contentData from '../../data/content.json';

export default function HomeClient() {
  const { openLeadForm } = useLeadForm();
  return (
    <>
      <Hero data={contentData.hero} onOpenLeadForm={openLeadForm} />
      <Business />
    </>
  );
}
