"use client";

import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import LeadForm from './LeadForm';
import { LeadFormContext } from '../lib/LeadFormContext';
import { Phone } from 'lucide-react';
import contentData from '../data/content.json';

export default function PageLayout({ children }) {
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const [leadFormOptions, setLeadFormOptions] = useState(null);

  const handleOpenLeadForm = (options) => {
    if (options && typeof options === 'object') {
      setLeadFormOptions(options);
    } else {
      setLeadFormOptions(null);
    }
    setIsLeadFormOpen(true);
  };
  const handleCloseLeadForm = () => {
    setIsLeadFormOpen(false);
    setLeadFormOptions(null);
  };

  return (
    <LeadFormContext.Provider value={{ openLeadForm: handleOpenLeadForm }}>
      <div className="min-h-screen bg-brand-bg text-brand-navy flex flex-col relative font-sans antialiased selection:bg-brand-primary selection:text-white">
        {/* Header / Navbar */}
        <Navbar 
          data={contentData.navbar} 
          ctaText={contentData.hero.cta}
          onOpenLeadForm={handleOpenLeadForm} 
        />

        {/* Main Content Area */}
        <main className="flex-1 relative z-10">
          {children}
        </main>

        {/* Dynamic Footer Section */}
        <Footer 
          data={contentData} 
          navbarLinks={contentData.navbar.links} 
        />

        {/* Lead Form Modal */}
        <LeadForm 
          isOpen={isLeadFormOpen} 
          onClose={handleCloseLeadForm} 
          ctaText={contentData.hero.cta}
          options={leadFormOptions}
        />

        {/* Floating Missed Call / Callback Button */}
        <a
          href="tel:+918796508866"
          className="fixed bottom-18 sm:bottom-22 right-4 sm:right-6 z-40 p-2.5 sm:p-3.5 bg-brand-primary text-white rounded-full shadow-md transition-premium hover:bg-brand-primaryDark flex items-center justify-center cursor-pointer border border-brand-primaryBorder/20"
          aria-label="Give a Missed Call"
          title="Give a Missed Call for a Callback"
        >
          <Phone className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5" />
        </a>

        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/918796508866"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 p-2.5 sm:p-3.5 bg-[#22C55E] text-white rounded-full shadow-md hover:bg-[#16A34A] transition-premium flex items-center justify-center cursor-pointer border border-[#22C55E]/20"
          aria-label="Chat on WhatsApp"
        >
          <svg className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.451L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.582 2.052 14.12 1.01 11.493 1.01 6.059 1.01 1.633 5.381 1.63 10.81c-.001 1.639.429 3.236 1.246 4.646L1.879 21.36l6.012-1.574L6.647 19.15z" />
          </svg>
        </a>
      </div>
    </LeadFormContext.Provider>
  );
}
