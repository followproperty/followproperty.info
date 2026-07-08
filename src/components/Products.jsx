"use client";

import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import contentData from '../data/content.js';

export default function Products({ onOpenLeadForm }) {
  const productsData = contentData.products || {};
  const productsList = productsData.items || [];
  const badgeText = productsData.badge || 'OUR PRODUCTS';
  const titleText = productsData.title || 'Next-generation real estate technology.';
  const subtitleText = productsData.subtitle || 'Explore our upcoming suite of intelligent real estate products.';

  return (
    <section id="products" className="relative py-20 md:py-28 bg-white border-b border-brand-borderMid/10 overflow-hidden flex flex-col items-center justify-center">
      
      {/* Modern structural dot mesh background */}
      <div className="absolute inset-0 bg-dot-mesh pointer-events-none z-0"></div>

      {/* Background visual glows */}
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-brand-primary/2 rounded-full blur-[90px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-brand-teal/2 rounded-full blur-[95px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center">
        
        {/* Section Header */}
        <div className="max-w-3xl text-center mb-16 md:mb-24">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primaryBg border border-brand-primaryBorder/20 text-[10px] sm:text-xs font-semibold tracking-widest text-brand-primary uppercase mb-5 transition-premium font-sans mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary inline-block mr-1 animate-pulse"></span>
            {badgeText}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight font-sans max-w-2xl leading-tight mx-auto mb-5">
            {titleText}
          </h2>
          <p className="text-sm sm:text-base text-brand-slate font-normal leading-relaxed max-w-xl mx-auto font-sans">
            {subtitleText}
          </p>
        </div>

        {/* Scalable Products Container */}
        <div className="w-full flex flex-col items-center gap-16">
          {productsList.map((product) => (
            <div 
              key={product.id}
              className="w-full max-w-5xl relative overflow-hidden group/product p-4 sm:p-6"
            >
              
              {/* Product Layout Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                
                {/* Left Column - Product Copy & CTAs */}
                <div className="lg:col-span-7 flex flex-col items-start text-left">
                  
                  {/* Badge & Status Block */}
                  <div className="flex items-center gap-2.5 mb-5">
                    <span className="px-3 py-1 rounded bg-brand-primaryBg border border-brand-primaryBorder/30 text-[10px] font-semibold tracking-wider text-brand-primary uppercase font-sans">
                      {product.badge}
                    </span>
                    <span className="text-xs text-brand-slateLight font-medium tracking-wide">
                      • {product.status}
                    </span>
                  </div>

                  {/* Product Title */}
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-navy font-sans tracking-tight leading-tight mb-4">
                    {product.title}
                  </h3>

                  {/* Product Description */}
                  <p className="text-sm sm:text-base text-brand-slate font-normal leading-relaxed mb-8 font-sans">
                    {product.desc}
                  </p>

                  {/* Core Highlight Bullets */}
                  {product.features && (
                    <div className="w-full mb-8 pt-6 border-t border-brand-border/20">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-brand-navy mb-4 font-sans">
                        Key Capabilities Included
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {product.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-brand-navy font-sans">
                            <div className="w-4 h-4 rounded-full bg-brand-primaryBg border border-brand-primaryBorder/20 flex items-center justify-center text-brand-primary shrink-0 transition-premium group-hover/product:bg-brand-primary group-hover/product:text-white">
                              <Check className="w-2.5 h-2.5" strokeWidth={3} />
                            </div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA Action Trigger */}
                  {product.href ? (
                    <a
                      href={product.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto max-w-xs sm:max-w-none px-5.5 py-2 sm:px-7 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm tracking-widest uppercase bg-white text-brand-navy border border-brand-navy/80 hover:bg-brand-navy hover:text-white hover:border-brand-navy shadow-sm hover:-translate-y-0.5 active:translate-y-0 hover:scale-[1.012] active:scale-[0.988] transition-premium flex items-center justify-center gap-2.5 cursor-pointer font-sans text-center no-underline"
                    >
                      {product.ctaText}
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/product:translate-x-1" />
                    </a>
                  ) : (
                    <button
                      onClick={() => onOpenLeadForm({ leadSource: 'waitlist' })}
                      className="w-full sm:w-auto max-w-xs sm:max-w-none px-5.5 py-2 sm:px-7 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm tracking-widest uppercase bg-white text-brand-navy border border-brand-navy/80 hover:bg-brand-navy hover:text-white hover:border-brand-navy shadow-sm hover:-translate-y-0.5 active:translate-y-0 hover:scale-[1.012] active:scale-[0.988] transition-premium flex items-center justify-center gap-2.5 cursor-pointer font-sans"
                    >
                      {product.ctaText}
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/product:translate-x-1" />
                    </button>
                  )}

                </div>

                {/* Right Column - Futuristic Minimalist Technical Art Illustration */}
                <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
                  <div className="w-full max-w-[340px] aspect-square rounded-[24px] relative select-none group-hover/product:scale-[1.015] transition-premium animate-float">
                    <svg className="w-full h-full rounded-[24px] bg-[#FAFAF8]/70 border border-brand-border/25 p-6 shadow-brand" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <radialGradient id="glow-grad" cx="100" cy="100" r="80" fx="100" fy="100" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#325FEC" stopOpacity="0.08" />
                          <stop offset="100%" stopColor="#325FEC" stopOpacity="0" />
                        </radialGradient>
                      </defs>

                      {/* Soft central glowing backdrop */}
                      <circle cx="100" cy="100" r="80" fill="url(#glow-grad)" />

                      {/* Outer orbital lines */}
                      <circle cx="100" cy="100" r="70" stroke="rgba(50,95,236,0.06)" strokeWidth="1" strokeDasharray="3 3" />
                      <circle cx="100" cy="100" r="50" stroke="rgba(50,95,236,0.08)" strokeWidth="1.5" />
                      <circle cx="100" cy="100" r="30" stroke="rgba(50,95,236,0.12)" strokeWidth="1.5" />

                      {/* Linked node system */}
                      <g stroke="#325FEC" strokeWidth="1.2" strokeLinecap="round" className="transition-premium group-hover/product:opacity-90">
                        <line x1="100" y1="50" x2="65" y2="90" strokeWidth="0.8" strokeOpacity="0.4" />
                        <line x1="100" y1="50" x2="135" y2="90" strokeWidth="0.8" strokeOpacity="0.4" />
                        <line x1="65" y1="90" x2="100" y2="150" strokeWidth="0.8" strokeOpacity="0.4" />
                        <line x1="135" y1="90" x2="100" y2="150" strokeWidth="0.8" strokeOpacity="0.4" />
                        <line x1="65" y1="90" x2="135" y2="90" strokeWidth="0.8" strokeOpacity="0.4" />
                        
                        <line x1="100" y1="50" x2="100" y2="150" strokeWidth="1.2" strokeOpacity="0.6" />
                        <line x1="100" y1="100" x2="135" y2="90" strokeWidth="1.2" strokeOpacity="0.6" />
                        <line x1="100" y1="100" x2="65" y2="90" strokeWidth="1.2" strokeOpacity="0.6" />
                      </g>

                      {/* Nodes */}
                      <circle cx="100" cy="100" r="5" fill="#325FEC" className="transition-premium group-hover/product:fill-brand-primaryDark" />
                      <circle cx="100" cy="100" r="10" stroke="#325FEC" strokeWidth="1" strokeOpacity="0.2" className="animate-pulse" />

                      <circle cx="100" cy="50" r="4.5" fill="#325FEC" className="transition-premium group-hover/product:scale-110 origin-[100px_50px]" />
                      <circle cx="65" cy="90" r="4.5" fill="#325FEC" className="transition-premium group-hover/product:scale-110 origin-[65px_90px]" />
                      <circle cx="135" cy="90" r="4.5" fill="#325FEC" className="transition-premium group-hover/product:scale-110 origin-[135px_90px]" />
                      <circle cx="100" cy="150" r="4.5" fill="#325FEC" className="transition-premium group-hover/product:scale-110 origin-[100px_150px]" />

                      {/* Technical text labels */}
                      <text x="100" y="38" textAnchor="middle" fill="#8C97A8" fontSize="6" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.5">Micro-Market Data</text>
                      <text x="100" y="165" textAnchor="middle" fill="#8C97A8" fontSize="6" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.5">Continuous Monitoring</text>
                    </svg>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
