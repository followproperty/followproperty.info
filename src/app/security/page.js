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
              At FollowProperty, security, confidentiality, and data integrity are the structural pillars of our real-estate advisory and prop-tech operations. We deploy enterprise-grade safeguards to protect property searches, due diligence audit logs, and B2B registrations.
            </p>

            <h3 className="text-lg font-bold text-brand-navy mt-8 mb-3">
              1. Platform Infrastructure & Database Safeguards
            </h3>
            <p>
              Our web servers, API configurations, and database integrations are structured with strict isolation rules:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Encryption-in-Transit:</strong> All data submitted through our frontend forms is encrypted using Transport Layer Security (TLS 1.3) protocols.</li>
              <li><strong>Encryption-at-Rest:</strong> Our databases (MongoDB Atlas) utilize automated, AES-256 volume encryption to safeguard records at the storage tier.</li>
              <li><strong>Zero-Trust Configuration:</strong> Server access is regulated via private virtual network links, key pair authentications, and IP white-listings.</li>
            </ul>

            <h3 className="text-lg font-bold text-brand-navy mt-8 mb-3">
              2. Independent RERA and Deed Verification Audit Logs
            </h3>
            <p>
              We compile and index municipal registry files, land ownership histories, and construction milestone compliance logs. Audit pipelines run isolated from user identification databases to ensure complete anonymity when consulting or compiling micro-market comparative circle-rates.
            </p>

            <h3 className="text-lg font-bold text-brand-navy mt-8 mb-3">
              3. Confidentiality for Family Offices and B2B Alliances
            </h3>
            <p>
              B2B developer requirements, commercial leasing listings, and custom land acquisitions represent highly sensitive commercial information. We secure these details under institutional non-disclosure guidelines. No details are written to public logs, cached on unencrypted systems, or shared across builder networks.
            </p>

            <h3 className="text-lg font-bold text-brand-navy mt-8 mb-3">
              4. Continuous Threat Assessments
            </h3>
            <p>
              Our engineering team regularly audits codebases, packages, and dependency versions to defend against standard threat vectors:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Cross-Site Scripting (XSS) prevention.</li>
              <li>Cross-Site Request Forgery (CSRF) defenses.</li>
              <li>SQL injection and server request tempering auditing.</li>
              <li>Automated server firewalls and rate-limiting blocks.</li>
            </ul>
            <p>
              To report a technical vulnerability or query data safeguard practices, contact our security operations desk at <a href="mailto:security@followproperty.com" className="text-brand-primary font-bold hover:underline">security@followproperty.com</a>.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
