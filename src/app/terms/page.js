import React from 'react';
import PageLayout from '../../components/PageLayout';
import { BookOpen } from 'lucide-react';

export const metadata = {
  title: "Terms of Service | FollowProperty",
  description: "Review the terms and conditions of using FollowProperty's real-estate advisory services and intelligence platform.",
};

export default function TermsPage() {
  return (
    <PageLayout>
      <section className="relative py-20 md:py-28 overflow-hidden bg-white border-b border-brand-borderMid/10 flex flex-col items-center justify-center min-h-[600px]">
        <div className="absolute inset-0 bg-dot-mesh pointer-events-none z-0"></div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-left font-sans">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-brand-primaryBorder/20 text-[10px] sm:text-xs font-semibold tracking-widest text-brand-primary uppercase mb-6 font-sans">
            <BookOpen className="w-4 h-4 text-brand-primary shrink-0" />
            TERMS OF SERVICE
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight leading-tight mb-8">
            Terms of Service
          </h1>

          <div className="text-sm sm:text-base text-brand-slate leading-relaxed space-y-6">
            <p className="text-xs text-brand-slateLight font-medium">
              Last Updated: May 28, 2026
            </p>
            <p>
              Welcome to FollowProperty. By using our website, intelligence platform, or consultation services, you agree to these Terms of Service.
            </p>
            <h3 className="text-lg font-bold text-brand-navy mt-8 mb-3">
              1. Advisory Limitation
            </h3>
            <p>
              FollowProperty provides real-estate advisory services, municipal deed analysis, and prop-tech research data. Our reports, valuations, and compliance metrics are structured for informational and buyer assistance purposes.
            </p>
            <h3 className="text-lg font-bold text-brand-navy mt-8 mb-3">
              2. Intellectual Property
            </h3>
            <p>
              All proprietary algorithms, circle rate maps, and research indexes published on FollowProperty.com are the intellectual property of FollowProperty. Unauthorized duplication or API crawling is strictly prohibited.
            </p>
            <h3 className="text-lg font-bold text-brand-navy mt-8 mb-3">
              3. Partnership Disclosures
            </h3>
            <p>
              We collaborate with developers as strategic channel partners (e.g. representing premium inventory like BPTP Downtown 66). Buyers are encouraged to review all final RERA contract documents independently prior to closing.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
