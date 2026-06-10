"use client";

import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Footer({ data, navbarLinks }) {
  if (!data) return null;

  const contact = data.contactDetails || {};
  const socials = data.socialLinks || {};
  const logoText = data.navbar?.logo || 'FollowProperty';
  const navLinks = navbarLinks || data.navbar?.links || [];

  const getLinkPath = (link) => {
    const normalized = link.toLowerCase().trim();
    if (normalized === 'about us' || normalized === 'about') return '/';
    if (normalized === 'refer a friend' || normalized === 'refer') return '/refer';
    if (normalized === 'services') return '/services';
    if (normalized === 'products') return '/products';
    if (normalized === 'team') return '/team';
    if (normalized === 'faq' || normalized === 'faqs') return '/faq';
    if (normalized === 'press release' || normalized === 'press releases' || normalized === 'press') return '/press-releases';
    if (normalized === 'careers') return '/careers';
    if (normalized === 'business owner' || normalized === 'are you a business owner?' || normalized === 'business') return '/business';
    if (normalized === 'locate us') return '/locate-us';
    if (normalized === 'contact us' || normalized === 'contact') return '/contact';
    return `/${normalized.replace(/[^a-z0-9]+/g, '-')}`;
  };

  return (
    <footer className="relative z-10 bg-brand-bgAlt border-t border-brand-border/40 py-16 text-sm text-brand-slate select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 pb-12 border-b border-brand-border/40">
          
          {/* Logo & Contact details */}
          <div className="md:col-span-5 flex flex-col items-start gap-5">
            <Link 
              href="/"
              className="flex items-center cursor-pointer select-none"
            >
              <img 
                src="/logo.svg" 
                alt="Follow Property Logo" 
                className="h-5 sm:h-5.5 w-auto object-contain" 
              />
            </Link>
            
            <p className="text-xs text-brand-slateLight leading-relaxed max-w-xs font-sans">
              FollowProperty is a professional real-estate advisory and prop-tech firm. We bring absolute clarity, research, and due diligence to property buyers and developers in India.
            </p>
            
            {/* Contact Grid */}
            <div className="flex flex-col gap-3 pt-2 text-xs font-semibold text-brand-navy">
              {contact.email && (
                <a href={`mailto:${contact.email}`} className="flex items-center gap-2.5 hover:text-brand-primary transition-colors">
                  <Mail className="w-4 h-4 text-brand-slateLight shrink-0" />
                  {contact.email}
                </a>
              )}
              {contact.phone && (
                <a href={`tel:${contact.phone}`} className="flex items-center gap-2.5 hover:text-brand-primary transition-colors">
                  <Phone className="w-4 h-4 text-brand-slateLight shrink-0" />
                  {contact.phone}
                </a>
              )}
              {contact.address && (
                <div className="flex items-center gap-2.5 text-brand-slate">
                  <MapPin className="w-4 h-4 text-brand-slateLight shrink-0" />
                  <span>{contact.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 flex flex-col items-start gap-4 w-full">
            <h4 className="text-[10px] font-bold tracking-wider uppercase text-brand-navy font-sans">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 w-full max-w-xs sm:max-w-sm">
              {navLinks.map((link) => (
                <Link
                  key={link}
                  href={getLinkPath(link)}
                  className="text-xs text-brand-slate hover:text-brand-navy transition-premium font-bold tracking-wider cursor-pointer font-sans relative py-0.5 group w-fit"
                >
                  {link}
                  <span className="absolute bottom-0 left-1/2 w-0 h-[1.5px] bg-brand-primary rounded-full transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
                </Link>
              ))}
            </div>
          </div>

          {/* Connect & Social Media */}
          <div className="md:col-span-4 flex flex-col items-start gap-4">
            <h4 className="text-[10px] font-bold tracking-wider uppercase text-brand-navy font-sans">
              Connect With Us
            </h4>
            <p className="text-xs text-brand-slateLight leading-relaxed">
              Inquire with our advisory desk or follow our research channels.
            </p>
            
            {/* Social Icons row */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {socials.instagram && (
                <a 
                  href={socials.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl border border-brand-borderMid/50 flex items-center justify-center text-brand-slateLight hover:text-white hover:bg-[#E1306C] hover:border-[#E1306C] transition-premium hover:-translate-y-0.5 hover:scale-105 fill-brand-slateLight hover:fill-white shadow-sm"
                  aria-label="Instagram Profile"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
              )}
              {socials.facebook && (
                <a 
                  href={socials.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl border border-brand-borderMid/50 flex items-center justify-center text-brand-slateLight hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-premium hover:-translate-y-0.5 hover:scale-105 fill-brand-slateLight hover:fill-white shadow-sm"
                  aria-label="Facebook Profile"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              {socials.linkedin && (
                <a 
                  href={socials.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl border border-brand-borderMid/50 flex items-center justify-center text-brand-slateLight hover:text-white hover:bg-[#0A66C2] hover:border-[#0A66C2] transition-premium hover:-translate-y-0.5 hover:scale-105 fill-brand-slateLight hover:fill-white shadow-sm"
                  aria-label="LinkedIn Profile"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              )}
              {socials.youtube && (
                <a 
                  href={socials.youtube} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl border border-brand-borderMid/50 flex items-center justify-center text-brand-slateLight hover:text-white hover:bg-[#FF0000] hover:border-[#FF0000] transition-premium hover:-translate-y-0.5 hover:scale-105 fill-brand-slateLight hover:fill-white shadow-sm"
                  aria-label="YouTube Channel"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              )}
              {socials.twitter && (
                <a 
                  href={socials.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl border border-brand-borderMid/50 flex items-center justify-center text-brand-slateLight hover:text-white hover:bg-[#000000] hover:border-[#000000] transition-premium hover:-translate-y-0.5 hover:scale-105 fill-brand-slateLight hover:fill-white shadow-sm"
                  aria-label="Twitter Profile"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

        </div>

        {/* Lower Footer (Copyrights & Legal) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[11px] text-brand-slateLight font-medium">
          <p className="font-sans text-center sm:text-left">
            © {new Date().getFullYear()} {logoText}. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center sm:justify-end gap-x-4 gap-y-2 font-sans tracking-wide">
            <Link href="/privacy" className="hover:text-brand-navy cursor-pointer transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brand-navy cursor-pointer transition-colors">Terms of Service</Link>
            <Link href="/security" className="hover:text-brand-navy cursor-pointer transition-colors">Security Registry</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
