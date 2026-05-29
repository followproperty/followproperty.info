import React from 'react';
import PageLayout from '../../components/PageLayout';
import { Shield } from 'lucide-react';

export const metadata = {
  title: "Privacy Policy | FollowProperty",
  description: "Read our privacy disclosure and learn how we safeguard client and developer information under security ledgers.",
};

export default function PrivacyPage() {
  return (
    <PageLayout>
      <section className="relative py-20 md:py-28 overflow-hidden bg-white border-b border-brand-borderMid/10 flex flex-col items-center justify-center min-h-[600px]">
        <div className="absolute inset-0 bg-dot-mesh pointer-events-none z-0"></div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-left font-sans">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-brand-primaryBorder/20 text-[10px] sm:text-xs font-semibold tracking-widest text-brand-primary uppercase mb-6 font-sans">
            <Shield className="w-4 h-4 text-brand-primary shrink-0" />
            PRIVACY DISCLOSURE
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight leading-tight mb-8">
            Privacy Policy
          </h1>

          <div className="text-sm sm:text-base text-brand-slate leading-relaxed space-y-6">
            <p className="text-xs text-brand-slateLight font-medium">
              Last Updated: May 28, 2026
            </p>
            <p>
              At FollowProperty, we prioritize the confidentiality and security of our clients, family offices, and developers. This Privacy Policy details how we handle property inquiries, due diligence records, and registration inputs.
            </p>
            <h3 className="text-lg font-bold text-brand-navy mt-8 mb-3">
              1. Data Collection
            </h3>
            <p>
              We collect user inputs provided voluntarily through our Advisory Desk registration, B2B partnership form, and search parameters. This includes contact details, requirements, and enterprise details. We do not sell or lease this information to third-party brokerages.
            </p>
            <h3 className="text-lg font-bold text-brand-navy mt-8 mb-3">
              2. Information Security
            </h3>
            <p>
              All advisory data and RERA audit records are stored behind bank-grade encryption ledgers. Access is restricted to authorized real-estate analysts at our Gurgaon corporate desk.
            </p>
            <h3 className="text-lg font-bold text-brand-navy mt-8 mb-3">
              3. Communication Preferences
            </h3>
            <p>
              We maintain a zero-spam policy. Communications are strictly limited to requested consultations, custom property valuations, and title safety alerts.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
