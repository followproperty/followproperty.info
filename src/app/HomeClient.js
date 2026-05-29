"use client";

import React from 'react';
import { useLeadForm } from '../lib/LeadFormContext';
import { ArrowRight } from 'lucide-react';
import contentData from '../data/content.json';
import Link from 'next/link';

export default function HomeClient() {
  const { openLeadForm } = useLeadForm();

  return (
    <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-white w-full flex flex-col items-center justify-center">
      {/* Soft decorative background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[620px] h-[320px] sm:h-[620px] bg-gradient-to-tr from-brand-primary/4 to-brand-primary/0 rounded-full blur-[80px] sm:blur-[130px] pointer-events-none z-0"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center flex flex-col items-center">
        {/* Institutional Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-primaryBg border border-brand-primaryBorder/10 mb-6 transition-premium mx-auto">
          <span className="text-[10px] sm:text-xs font-bold tracking-wider text-brand-primary uppercase font-sans">
            {contentData.hero.badge}
          </span>
        </div>

        {/* Calm Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-navy leading-[1.15] mb-6 font-sans max-w-3xl mx-auto">
          {contentData.hero.title}
        </h1>

        {/* Subheadline */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base lg:text-lg text-brand-slate font-normal leading-relaxed mb-10 text-center">
          {contentData.hero.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="w-full flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={openLeadForm}
            className="w-full sm:w-72 h-11 rounded-full font-bold text-xs tracking-widest uppercase bg-brand-gradient text-white shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-premium flex items-center justify-center gap-2 cursor-pointer font-sans"
          >
            {contentData.hero.cta}
            <ArrowRight className="w-4 h-4" />
          </button>
          <Link
            href="/services"
            className="w-full sm:w-72 h-11 rounded-full font-bold text-xs tracking-widest uppercase bg-transparent text-brand-navy border border-brand-navy/60 hover:bg-brand-bgAlt transition-premium flex items-center justify-center gap-2 cursor-pointer font-sans"
          >
            {contentData.hero.secondaryCta}
          </Link>
        </div>

        <div className="text-[10px] sm:text-xs text-brand-slateLight tracking-wide font-sans mt-12">
          {contentData.hero.securityText}
        </div>
      </div>
    </section>
  );
}
