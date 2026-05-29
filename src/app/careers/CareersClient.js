"use client";

import React from 'react';
import { useLeadForm } from '../../lib/LeadFormContext';
import { Briefcase, Clock, ArrowRight, Sparkles } from 'lucide-react';

export default function CareersClient({ positions = [] }) {
  const { openLeadForm } = useLeadForm();

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-white border-b border-brand-borderMid/10 flex flex-col items-center justify-center min-h-[600px]">
      {/* Dot mesh background */}
      <div className="absolute inset-0 bg-dot-mesh pointer-events-none z-0"></div>

      {/* Background decorative glows */}
      <div className="absolute top-1/4 right-1/4 w-[300px] sm:w-[480px] h-[300px] sm:h-[480px] bg-brand-primary/3 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[300px] sm:w-[480px] h-[300px] sm:h-[480px] bg-brand-teal/2 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-brand-primaryBorder/20 text-[10px] sm:text-xs font-semibold tracking-widest text-brand-primary uppercase mb-6 transition-premium font-sans mx-auto">
          <Sparkles className="w-4 h-4 text-brand-primary shrink-0" />
          JOIN THE TEAM
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight font-sans max-w-3xl leading-tight text-center mx-auto mb-6">
          Build the future of prop-tech transparency.
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base lg:text-lg text-brand-slate font-normal leading-relaxed max-w-2xl text-center mx-auto mb-16 font-sans">
          We are a focused team of researchers, software engineers, and domain analysts building high-trust real estate infrastructure for India. Join us in making property markets clear and reliable.
        </p>

        {/* Job Listings Stack */}
        <div className="w-full flex flex-col gap-6 max-w-3xl">
          {positions.map((job) => (
            <div 
              key={job.id} 
              className="bg-white border border-brand-border/40 hover:border-brand-primary/25 rounded-3xl p-6 sm:p-8 transition-premium hover:-translate-y-0.5 hover:shadow-brand group flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex-1 text-left">
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-3.5 mb-3 text-brand-slateLight font-semibold text-[10px] sm:text-xs tracking-wider uppercase font-sans">
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-brand-slateLight" />
                    {job.location}
                  </span>
                  <span className="text-brand-borderMid">•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-brand-slateLight" />
                    {job.type}
                  </span>
                </div>

                {/* Job Title */}
                <h3 className="text-lg sm:text-xl font-extrabold text-brand-navy font-sans tracking-tight mb-2.5">
                  {job.title}
                </h3>

                {/* Job Description */}
                <p className="text-xs sm:text-sm text-brand-slate font-normal leading-relaxed mb-5 font-sans max-w-2xl">
                  {job.desc}
                </p>

                {/* Skills Badges */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {job.skills && job.skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="px-2.5 py-1 rounded-lg bg-brand-bgAlt border border-brand-border/40 text-[9px] sm:text-[10px] font-bold text-brand-slateLight uppercase tracking-wider font-sans"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="shrink-0 flex items-center md:justify-end">
                <button
                  onClick={() => openLeadForm({ leadSource: 'careers', jobTitle: job.title })}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full font-bold text-xs tracking-widest uppercase bg-white text-brand-navy border border-brand-navy/80 hover:bg-brand-navy hover:text-white hover:border-brand-navy shadow-sm transition-premium flex items-center justify-center gap-2 cursor-pointer font-sans"
                >
                  Apply Now
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer/Contact CV Note */}
        <div className="mt-20 text-center select-none">
          <p className="text-xs sm:text-sm text-brand-slateLight font-medium font-sans">
            Don't see a matching position? Send your resume and interest area to{" "}
            <a 
              href="mailto:careers@followproperty.com" 
              className="text-brand-primary font-bold hover:underline"
            >
              careers@followproperty.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
