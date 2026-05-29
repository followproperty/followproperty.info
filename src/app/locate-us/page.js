import React from 'react';
import PageLayout from '../../components/PageLayout';
import { MapPin, Phone, Mail, Navigation } from 'lucide-react';
import contentData from '../../data/content.json';

export const metadata = {
  title: "Find Our Corporate Office | FollowProperty",
  description: "Contact or visit our corporate office at Sector 49, Gurgaon. Get directions and contact details.",
};

function LocateUsContent() {
  const contact = contentData.contactDetails || {};

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-white border-b border-brand-borderMid/10 flex flex-col items-center justify-center min-h-[600px]">
      {/* Dot mesh background */}
      <div className="absolute inset-0 bg-dot-mesh pointer-events-none z-0"></div>

      {/* Decorative glows */}
      <div className="absolute top-1/4 right-1/4 w-[300px] sm:w-[480px] h-[300px] sm:h-[480px] bg-brand-primary/3 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[300px] sm:w-[480px] h-[300px] sm:h-[480px] bg-brand-teal/2 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-brand-primaryBorder/20 text-[10px] sm:text-xs font-semibold tracking-widest text-brand-primary uppercase mb-6 transition-premium font-sans mx-auto">
          <MapPin className="w-4 h-4 text-brand-primary shrink-0" />
          LOCATE US
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight font-sans max-w-3xl leading-tight text-center mx-auto mb-6">
          Our Corporate Office
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base lg:text-lg text-brand-slate font-normal leading-relaxed max-w-2xl text-center mx-auto mb-16 font-sans">
          FollowProperty is headquartered in Gurgaon's premium business corridor. Inquire with our desk or visit us for consultations.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center max-w-3xl mx-auto text-left">
          {/* Card Info */}
          <div className="md:col-span-5 bg-brand-bgAlt border border-brand-border/40 rounded-3xl p-6 sm:p-8 flex flex-col gap-6 w-full">
            <h3 className="text-lg font-bold text-brand-navy font-sans tracking-tight">
              Office Details
            </h3>

            <div className="flex flex-col gap-4 text-xs sm:text-sm font-semibold text-brand-navy font-sans">
              <div className="flex items-start gap-3 text-brand-slate">
                <MapPin className="w-5 h-5 text-brand-slateLight shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-brand-slateLight tracking-wider uppercase">Address</span>
                  <span className="mt-0.5 font-bold text-brand-navy">{contact.address}</span>
                </div>
              </div>

              {contact.phone && (
                <a href={`tel:${contact.phone}`} className="flex items-start gap-3 hover:text-brand-primary transition-colors">
                  <Phone className="w-5 h-5 text-brand-slateLight shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                     <span className="text-[9px] font-bold text-brand-slateLight tracking-wider uppercase">Phone</span>
                    <span className="mt-0.5 font-bold">{contact.phone}</span>
                  </div>
                </a>
              )}

              {contact.email && (
                <a href={`mailto:${contact.email}`} className="flex items-start gap-3 hover:text-brand-primary transition-colors">
                  <Mail className="w-5 h-5 text-brand-slateLight shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-brand-slateLight tracking-wider uppercase">Email</span>
                    <span className="mt-0.5 font-bold">{contact.email}</span>
                  </div>
                </a>
              )}
            </div>

            <div className="pt-2 border-t border-brand-border/20">
              <a 
                href={`https://maps.google.com/?q=${encodeURIComponent(contact.address)}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl font-bold text-xs tracking-widest uppercase bg-brand-gradient text-white shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-premium text-center"
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </a>
            </div>
          </div>

          {/* Editorial Map Graphic */}
          <div className="md:col-span-7 w-full flex justify-center">
            <div className="w-full max-w-[340px] aspect-square rounded-[32px] relative select-none bg-brand-bgAlt border border-brand-border/30 p-6 shadow-sm flex items-center justify-center">
              <svg className="w-full h-full text-brand-slate" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="map-glow" cx="100" cy="100" r="70" fx="100" fy="100" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#325FEC" stopOpacity="0.06" />
                    <stop offset="100%" stopColor="#325FEC" stopOpacity="0" />
                  </radialGradient>
                </defs>
                {/* Glow */}
                <circle cx="100" cy="100" r="70" fill="url(#map-glow)" />

                {/* Abstract road grid layout */}
                <path d="M20 50h160M20 100h160M20 150h160M50 20v160M100 20v160M150 20v160" stroke="rgba(15,23,42,0.06)" strokeWidth="2" strokeLinecap="round" />
                {/* Highlight Sohna Road / Sector 49 corridor */}
                <path d="M100 20v160" stroke="#325FEC" strokeWidth="3" strokeOpacity="0.12" strokeLinecap="round" />
                <path d="M20 100h160" stroke="#325FEC" strokeWidth="3" strokeOpacity="0.12" strokeLinecap="round" />

                {/* Abstract corporate buildings */}
                <rect x="35" y="35" width="30" height="30" rx="6" fill="#FFFFFF" stroke="rgba(15,23,42,0.06)" strokeWidth="1" />
                <rect x="115" y="35" width="30" height="30" rx="6" fill="#FFFFFF" stroke="rgba(15,23,42,0.06)" strokeWidth="1" />
                <rect x="35" y="115" width="30" height="30" rx="6" fill="#FFFFFF" stroke="rgba(15,23,42,0.06)" strokeWidth="1" />
                {/* Spaze i-Tech Park block */}
                <rect x="115" y="115" width="35" height="35" rx="8" fill="#FFFFFF" stroke="rgba(50,95,236,0.2)" strokeWidth="1.5" className="shadow-sm" />
                
                {/* Connection lines */}
                <circle cx="132" cy="132" r="12" fill="rgba(50,95,236,0.06)" />
                <circle cx="132" cy="132" r="5" fill="#325FEC" />
                <circle cx="132" cy="132" r="9" stroke="#325FEC" strokeWidth="1" strokeOpacity="0.2" className="animate-pulse" />

                <text x="132" y="156" textAnchor="middle" fill="#325FEC" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.3">IT Spaze Park</text>
                <text x="50" y="93" textAnchor="middle" fill="#94A3B8" fontSize="5" fontWeight="semibold" fontFamily="sans-serif">Sohna Road</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function LocateUsPage() {
  return (
    <PageLayout>
      <LocateUsContent />
    </PageLayout>
  );
}
