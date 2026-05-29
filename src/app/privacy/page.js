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
              At FollowProperty, we prioritize the confidentiality, safety, and security of our clients, institutional buyers, family offices, and developers. This Privacy Policy details how we collect, process, utilize, and safeguard property inquiries, due diligence records, and registration inputs.
            </p>

            <h3 className="text-lg font-bold text-brand-navy mt-8 mb-3">
              1. Information We Collect
            </h3>
            <p>
              We collect user inputs provided voluntarily through our Advisory Desk registration, B2B partnership form, contact pages, and personalized property watchlist search parameters. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Contact details:</strong> First name, last name, email address, phone number, and city.</li>
              <li><strong>Search parameters:</strong> Preferred locations, budgets, BHK specifications, possession timelines, and preferred builders.</li>
              <li><strong>Business details:</strong> Organization name, title/designation, and specific commercial requirements for business owner inquiries.</li>
              <li><strong>Candidate data:</strong> For job applications, we collect student status, professional credentials, and public resume links.</li>
            </ul>

            <h3 className="text-lg font-bold text-brand-navy mt-8 mb-3">
              2. How We Use Your Information
            </h3>
            <p>
              Your information is strictly used to deliver tailormade, highly personalized real estate advisory services. Specifically, we use your data to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Process and respond to your general advisory or project inquiries.</li>
              <li>Provide real-time property matches and RERA compliance alert updates based on your search parameters.</li>
              <li>Analyze market pricing metrics and circle rate fluctuations in target micro-markets.</li>
              <li>Evaluate career applications and contact candidates for technical, research, or executive roles.</li>
            </ul>
            <p>
              We maintain a zero-spam policy. FollowProperty does not sell, lease, trade, or distribute your private contact details or requirements to third-party marketing agencies or external broker databases.
            </p>

            <h3 className="text-lg font-bold text-brand-navy mt-8 mb-3">
              3. Data Security and Encryption
            </h3>
            <p>
              All advisory files, circle-rate feeds, and database records are safeguarded behind bank-grade encryption protocols (TLS 1.3 and AES-256). Database access is restricted strictly to authorized property analysts at our Gurgaon operations desk on a strict need-to-know basis.
            </p>

            <h3 className="text-lg font-bold text-brand-navy mt-8 mb-3">
              4. Cookies and Analytical Tracking
            </h3>
            <p>
              We employ lightweight analytical cookies and tracking scripts (such as Google Analytics) to measure site performance, page response times, and user engagement metrics. This data is strictly aggregated and anonymized, carrying no personally identifiable details.
            </p>

            <h3 className="text-lg font-bold text-brand-navy mt-8 mb-3">
              5. Your Rights and Opt-Out Options
            </h3>
            <p>
              You maintain complete ownership of your personal data. You may contact our data privacy officer at any time to request access to, correction of, or complete deletion of your records from our databases by writing to <a href="mailto:privacy@followproperty.com" className="text-brand-primary font-bold hover:underline">privacy@followproperty.com</a>.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
