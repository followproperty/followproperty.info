"use client";

import React from "react";
import WatchlistFlow from "../../components/WatchlistFlow";
import contentData from "../../data/content.json";

export default function IWantClient() {
  return (
    <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden bg-white w-full flex flex-col items-center">
      {/* Dot mesh background */}
      <div className="absolute inset-0 bg-dot-mesh pointer-events-none z-0"></div>

      {/* Decorative glows */}
      <div className="absolute right-1/4 top-1/4 w-[400px] h-[400px] bg-brand-primary/3 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute left-1/4 bottom-10 w-[350px] h-[350px] bg-brand-teal/3 rounded-full blur-[90px] pointer-events-none z-0"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center">
        {/* Elegant Page-Level Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 select-none">
          {/* High-Readability Section Pill Badge */}
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-primaryBg border border-brand-primaryBorder/55 text-xs sm:text-[13px] font-extrabold tracking-[0.18em] text-brand-primary uppercase mb-6 shadow-[0_2px_12px_rgba(37,99,235,0.02)] transition-premium font-sans mx-auto">
            <span className="w-2 h-2 rounded-full bg-brand-primary inline-block mr-1 animate-pulse shadow-[0_0_6px_#325FEC]"></span>
            ADVISORY INTAKE
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight font-sans mb-4 leading-tight">
            Connect with Our Advisory Desk
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-brand-slate font-light leading-relaxed max-w-xl mx-auto font-sans">
            Define your transaction goals and property criteria to help our real-estate intelligence team prepare tailored project due diligence, compliance reports, and localized valuations.
          </p>
        </div>

        {/* The WatchlistFlow form component rendered natively in plainLayout */}
        <div className="w-full">
          <WatchlistFlow
            data={contentData.watchlistSection}
            onClose={() => {}}
            plainLayout={true}
          />
        </div>
      </div>
    </section>
  );
}
