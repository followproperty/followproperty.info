import React from 'react';
import PageLayout from '../../components/PageLayout';
import { Lock } from 'lucide-react';

export const metadata = {
  title: "Security Registry & Ledgers | FollowProperty",
  description: "Learn about the security ledgers, data safeguards, and encryption protocols protecting your B2B property inquiries.",
};

export default function SecurityPage() {
  return (
    <PageLayout>
      <section className="relative py-20 md:py-28 overflow-hidden bg-white border-b border-brand-borderMid/10 flex flex-col items-center justify-center min-h-[600px]">
        <div className="absolute inset-0 bg-dot-mesh pointer-events-none z-0"></div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-left font-sans">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-brand-primaryBorder/20 text-[10px] sm:text-xs font-semibold tracking-widest text-brand-primary uppercase mb-6 font-sans">
            <Lock className="w-4 h-4 text-brand-primary shrink-0" />
            SECURITY REGISTRY
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight leading-tight mb-8">
            Security Registry & Ledger Safeguards
          </h1>

          <div className="text-sm sm:text-base text-brand-slate leading-relaxed space-y-6">
            <p className="text-xs text-brand-slateLight font-medium">
              Last Updated: May 28, 2026
            </p>
            <p>
              Security and confidentiality are core foundations of our real-estate advisory operations. FollowProperty implements institutional protections to safeguard land deeds, circle rate indices, and client consultations.
            </p>
            <h3 className="text-lg font-bold text-brand-navy mt-8 mb-3">
              1. Registry Safeguards
            </h3>
            <p>
              We monitor land registry updates and title safety parameters. Data feeds utilized by our prop-tech analytics maps are aggregated from verified, public RERA archives and municipal deed records.
            </p>
            <h3 className="text-lg font-bold text-brand-navy mt-8 mb-3">
              2. Transaction Privacy
            </h3>
            <p>
              B2B partner details, developer data queries, and individual advisory consultations are secured under strict non-disclosure registries. We employ bank-grade encryption protocols for all form submissions and databases.
            </p>
            <h3 className="text-lg font-bold text-brand-navy mt-8 mb-3">
              3. Security Compliance
            </h3>
            <p>
              Our software infrastructure is continuously updated to prevent cross-site scripting, SQL injections, and unauthorized database access. Security checkups are run weekly by our Gurgaon-based technical operations team.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
