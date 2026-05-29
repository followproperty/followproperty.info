import React from 'react';
import Link from 'next/link';
import PageLayout from '../components/PageLayout';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <PageLayout>
      <section className="relative py-28 md:py-36 overflow-hidden bg-white border-b border-brand-borderMid/10 flex flex-col items-center justify-center min-h-[70vh]">
        {/* Modern structural dot mesh background */}
        <div className="absolute inset-0 bg-dot-mesh pointer-events-none z-0"></div>

        {/* Decorative glows */}
        <div className="absolute top-1/4 left-1/4 w-[320px] h-[320px] bg-brand-primary/2 rounded-full blur-[90px] pointer-events-none z-0"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[280px] h-[280px] bg-brand-teal/2 rounded-full blur-[95px] pointer-events-none z-0"></div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 relative z-10 w-full text-center flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primaryBg border border-brand-primaryBorder/20 text-[10px] sm:text-xs font-semibold tracking-widest text-brand-primary uppercase mb-6 font-sans">
            ⚠️ 404 ERROR
          </div>

          {/* Heading */}
          <h1 className="text-6xl sm:text-8xl font-black text-brand-navy tracking-tighter mb-4 font-sans bg-clip-text text-transparent bg-gradient-to-b from-brand-navy to-brand-slate">
            404
          </h1>

          <h2 className="text-xl sm:text-2xl font-bold text-brand-navy mb-4 font-sans tracking-tight">
            Page Not Found
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-brand-slate font-light leading-relaxed mb-10 max-w-md mx-auto font-sans">
            The page you are looking for doesn't exist, has been moved, or has a temporary technical validation hold.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3 rounded-full font-bold text-xs tracking-widest uppercase bg-brand-navy text-white hover:bg-brand-navy/90 shadow-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer font-sans"
            >
              <Home className="w-4 h-4" />
              Return Home
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
