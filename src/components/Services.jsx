"use client";

import React, { useState } from 'react';
import { ArrowRight, Home } from 'lucide-react';
import contentData from '../data/content.js';
import WatchlistFlow from './WatchlistFlow';

export default function Services() {
  const [showWatchlist, setShowWatchlist] = useState(false);

  const servicesData = contentData.services || {};
  const badgeText = servicesData.badge || 'OUR SERVICES';
  const watchlistSectionData = contentData.watchlistSection || {};

  return (
    <section id="services" className="relative py-20 md:py-28 bg-white border-b border-brand-borderMid/10 overflow-hidden flex flex-col items-center justify-center min-h-[500px]">
      
      {/* Modern structural dot mesh background */}
      <div className="absolute inset-0 bg-dot-mesh pointer-events-none z-0"></div>

      {/* Background visual glows */}
      <div className="absolute top-1/3 right-1/4 w-[380px] h-[380px] bg-brand-primary/3 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/3 left-1/4 w-[340px] h-[340px] bg-brand-teal/2 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center">
        
        {!showWatchlist ? (
          /* Initial State: Clean, Consultative Company Advisory Intro */
          <div className="max-w-3xl text-center flex flex-col items-center animate-fadeIn select-none">
            
            {/* Section Pill Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primaryBg border border-brand-primaryBorder/20 text-[10px] sm:text-xs font-semibold tracking-widest text-brand-primary uppercase mb-6 transition-premium font-sans mx-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary inline-block mr-1 animate-pulse"></span>
              {badgeText}
            </span>

            {/* Premium Consultative Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight font-sans max-w-2xl leading-tight mx-auto mb-5">
              {servicesData.title || "Strategic Advisory & Buyer Intelligence"}
            </h2>

            {/* Clean minimal description */}
            <p className="text-sm sm:text-base lg:text-lg text-brand-slate font-normal leading-relaxed max-w-2xl mx-auto mb-10 font-sans">
              {servicesData.subtitle || "Define your transaction profile to request tailored analytics, project due diligence, and comprehensive circle-rate reporting."}
            </p>

            {/* Interactive Call to Action Button */}
            <button
              onClick={() => setShowWatchlist(true)}
              className="w-full sm:w-auto max-w-xs sm:max-w-none px-5.5 py-2.5 sm:px-7 sm:py-3 rounded-full font-bold text-xs sm:text-sm tracking-widest uppercase bg-white text-brand-navy border border-brand-navy/80 hover:bg-brand-navy hover:text-white hover:border-brand-navy shadow-sm hover:-translate-y-0.5 active:translate-y-0 hover:scale-[1.012] active:scale-[0.988] transition-premium flex items-center justify-center gap-2.5 cursor-pointer font-sans group/btn mb-12"
            >
              <Home className="w-4 h-4 text-brand-navy group-hover/btn:text-white transition-colors" />
              {servicesData.ctaText || "Configure Advisory Profile"}
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Service Items Grid (Scalable/Configurable) */}
            {servicesData.items && servicesData.items.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 w-full text-left">
                {servicesData.items.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 bg-white border border-brand-border/40 hover:border-brand-primary/25 rounded-[20px] transition-premium hover:-translate-y-0.5 hover:shadow-brand flex flex-col gap-2.5 group"
                  >
                    <h3 className="text-base sm:text-lg font-bold text-brand-navy font-sans tracking-tight group-hover:text-brand-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-slate leading-relaxed font-sans font-normal">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Business Owner CTA Card */}
            <div className="w-full mt-20 pt-10 border-t border-brand-borderMid/10 flex flex-col items-center">
              <h3 className="text-xl sm:text-2xl font-extrabold text-brand-navy mb-4 font-sans tracking-tight text-center">
                Are you a Developer or Channel Partner?
              </h3>
              <p className="text-sm sm:text-base text-brand-slate max-w-2xl mb-8 font-sans leading-relaxed text-center">
                Access our institutional RERA tracking, circle-rate analytics database, and dedicated marketing desks to scale your project reach.
              </p>
              <a
                href="/business"
                className="w-full sm:w-auto px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm tracking-widest uppercase bg-brand-navy text-white hover:bg-brand-navy/90 hover:scale-[1.012] transition-premium flex items-center justify-center gap-2.5 cursor-pointer font-sans no-underline inline-flex shadow-sm"
              >
                Inquire for B2B Partnership
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        ) : (
          /* Active State: Renders the highly interactive, mobile-friendly WatchlistFlow wizard */
          <div className="w-full max-w-4xl animate-scaleIn">
            
            {/* The exact mobile-friendly WatchlistFlow component */}
            <WatchlistFlow data={watchlistSectionData} onClose={() => setShowWatchlist(false)} />

          </div>
        )}

      </div>
    </section>
  );
}
