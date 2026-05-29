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
              Welcome to FollowProperty. By accessing or utilizing our website, proprietary prop-tech intelligence platform, consultation desks, or newsletter feeds, you agree to comply with and be bound by these Terms of Service. Please review them carefully.
            </p>

            <h3 className="text-lg font-bold text-brand-navy mt-8 mb-3">
              1. Scope of Advisory Services
            </h3>
            <p>
              FollowProperty operates as an independent prop-tech research firm and real-estate advisory channel partner. Our analytical reports, construction trackers, circular rate guides, and RERA compliance data are provided for research, due diligence, and buyer assistance purposes. 
            </p>
            <p>
              While we make every effort to verify deed registrations and builder construction milestones, our findings do not constitute formal legal binding property appraisals. Users are advised to perform independent physical and legal verifications before making financial commitments.
            </p>

            <h3 className="text-lg font-bold text-brand-navy mt-8 mb-3">
              2. Intellectual Property Rights
            </h3>
            <p>
              All proprietary codebases, circle-rate algorithms, layout plans, valuation structures, and compliance indexing frameworks published on FollowProperty.com are the exclusive intellectual property of FollowProperty. 
            </p>
            <p>
              You agree not to modify, distribute, copy, scrap, crawl, or reverse-engineer any portion of the site’s data feeds, APIs, or interfaces without explicit written authorization from our corporate desk.
            </p>

            <h3 className="text-lg font-bold text-brand-navy mt-8 mb-3">
              3. Partnership and Developer Disclosures
            </h3>
            <p>
              We collaborate with selected institutional developers in strategic marketing alliances (e.g. showcasing premium corporate and retail zones like BPTP Downtown 66). FollowProperty acts as an authorized consultant desk; final sale deeds, payment milestones, and build-to-suit specifications remain governed exclusively by the buyer-developer contract.
            </p>

            <h3 className="text-lg font-bold text-brand-navy mt-8 mb-3">
              4. Accuracy of User Information
            </h3>
            <p>
              When utilizing our Advisory forms, career portals, or watchlist parameter trackers, you agree to provide complete, authentic details (e.g., valid email address and active 10-digit phone number). We reserve the right to suspend or discard registrations that carry synthetic, incomplete, or false parameters.
            </p>

            <h3 className="text-lg font-bold text-brand-navy mt-8 mb-3">
              5. Governing Law and Jurisdiction
            </h3>
            <p>
              These terms, along with your access to the FollowProperty platform, shall be governed by and construed in accordance with the laws of India. Any legal disputes or claims arising out of these terms shall be subject to the exclusive jurisdiction of the competent courts located in Gurgaon, Haryana.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
