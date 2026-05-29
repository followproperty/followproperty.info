"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';
import contentData from '../data/content.js';
import { useLeadForm } from '../lib/LeadFormContext';

export default function CurrentProjects() {
  const { openLeadForm } = useLeadForm();
  
  const projectsData = contentData.projectsSection || {};
  const projectsList = projectsData.items || [];
  const badgeText = projectsData.badge || 'CURRENT PROJECTS';
  const titleText = projectsData.title || 'Institutional Project Offerings';
  const subtitleText = projectsData.subtitle || 'Discover verified residential, plotting, and commercial projects across key Indian micro-markets.';



  return (
    <section id="projects" className="relative py-28 md:py-36 bg-white border-b border-brand-borderMid/10 overflow-hidden flex flex-col items-center justify-center min-h-[70vh]">
      {/* Modern structural dot mesh background */}
      <div className="absolute inset-0 bg-dot-mesh pointer-events-none z-0"></div>

      {/* Decorative glows */}
      <div className="absolute top-1/4 left-1/4 w-[320px] h-[320px] bg-brand-primary/2 rounded-full blur-[90px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[280px] h-[280px] bg-brand-teal/2 rounded-full blur-[95px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center">
        
        {/* Section Header */}
        <div className="max-w-3xl text-center mb-16 sm:mb-20 flex flex-col items-center">
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

        {/* 3-Column Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {projectsList.map((project) => (
            <div 
              key={project.id}
              className="bg-white border border-brand-borderMid/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-brand hover:shadow-brand-md transition-premium group hover:-translate-y-1 relative"
            >
              {/* Top border highlight gradient on hover */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-primary via-brand-primaryLight to-brand-teal opacity-0 group-hover:opacity-100 transition-premium rounded-t-3xl"></div>

              <div>


                {/* Project Header (Price & Status Tags) */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {project.status && (
                    <span className={`px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider ${
                      project.status === 'Coming Soon' 
                        ? 'bg-brand-tealBg text-brand-teal border border-brand-tealBorder' 
                        : 'bg-brand-primaryBg text-brand-primary border border-brand-primaryBorder'
                    }`}>
                      {project.status}
                    </span>
                  )}
                  {project.price && (
                    <span className="px-2.5 py-1 rounded-md text-[9px] font-bold bg-[#FAFAF8] text-brand-navy border border-brand-borderMid/50 tracking-wider">
                      {project.price}
                    </span>
                  )}
                </div>

                {/* Project Name */}
                <h3 className="text-xl sm:text-2xl font-extrabold text-brand-navy mb-3 font-sans tracking-tight leading-tight">
                  {project.name}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-brand-slate font-light leading-relaxed mb-8 font-sans">
                  {project.description}
                </p>
              </div>

              {/* Call to Action Button */}
              <button
                onClick={() => openLeadForm({ 
                  leadSource: 'project_interest', 
                  projectName: project.name 
                })}
                className="w-full py-3.5 mt-auto rounded-xl text-xs font-bold tracking-widest uppercase bg-white text-brand-navy border border-brand-navy/80 hover:bg-brand-navy hover:text-white hover:border-brand-navy shadow-sm hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] hover:scale-[1.01] transition-premium flex items-center justify-center gap-2 cursor-pointer font-sans"
              >
                {project.cta || "I'm Interested"}
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
