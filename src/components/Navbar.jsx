"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar({ data, ctaText, onOpenLeadForm }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLinkPath = (link) => {
    const normalized = link.toLowerCase().trim();
    if (normalized === 'about us' || normalized === 'about') return '/';
    if (normalized === 'refer a friend' || normalized === 'refer') return '/refer';
    if (normalized === 'services') return '/services';
    if (normalized === 'products') return '/products';
    if (normalized === 'team' || normalized === 'our team') return '/team';
    if (normalized === 'faq' || normalized === 'faqs') return '/faq';
    if (normalized === 'press release' || normalized === 'press releases' || normalized === 'press') return '/press-releases';
    if (normalized === 'careers') return '/careers';
    if (normalized === 'business owner' || normalized === 'are you a business owner?' || normalized === 'business') return '/business';
    if (normalized === 'locate us') return '/locate-us';
    if (normalized === 'contact us' || normalized === 'contact') return '/contact';
    return `/${normalized.replace(/[^a-z0-9]+/g, '-')}`;
  };

  const primaryLinks = ['About Us', 'Refer a Friend', 'Services', 'Products', 'Current Projects', 'Locate Us', 'Contact Us'];
  const dropdownLinks = [
      "Our Team",
      "FAQ",
      "Press Release",
      "Careers",
      "Business Owner"
    ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-40 transition-premium ${
      scrolled 
        ? 'py-4 bg-white/95 backdrop-blur-md border-b border-brand-border/40 shadow-sm' 
        : 'py-5.5 bg-white/70 backdrop-blur-sm border-b border-brand-border/20'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          
          {/* Logo - FollowProperty */}
          <Link 
            href="/" 
            className="flex items-center cursor-pointer select-none group shrink-0"
          >
            <img 
              src="/logo.svg" 
              alt="Follow Property Logo" 
              className="h-5 sm:h-5.5 w-auto object-contain transition-premium group-hover:scale-[1.008]" 
            />
          </Link>

          {/* Centered Desktop Navigation - Refined & Calm */}
          <div className="hidden lg:flex items-center gap-7 xl:gap-8 text-xs font-medium tracking-wide">
            {primaryLinks.map((link) => {
              const path = getLinkPath(link);
              const isActive = pathname === path;
              return (
                <Link
                  key={link}
                  href={path}
                  className={`transition-premium py-1 font-sans relative group ${
                    isActive ? 'text-brand-primary' : 'text-brand-slate hover:text-brand-primary'
                  }`}
                >
                  {link}
                  <span className={`absolute bottom-0 left-0 h-[1.5px] bg-brand-primary rounded-full transition-all duration-300 ease-out ${
                    isActive ? 'w-full' : 'w-0 left-1/2 group-hover:w-full group-hover:left-0'
                  }`}></span>
                </Link>
              );
            })}

            {/* More Dropdown */}
            <div 
              className="relative py-1"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button
                className={`transition-premium flex items-center gap-1 font-sans cursor-pointer hover:text-brand-primary ${
                  dropdownLinks.some(l => pathname === getLinkPath(l)) ? 'text-brand-primary' : 'text-brand-slate'
                }`}
              >
                <span>More</span>
                <svg 
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Dropdown Menu Panel */}
              <div className={`absolute top-full right-0 w-44 mt-1 bg-white border border-brand-border/40 rounded-2xl shadow-brand-lg py-2.5 transition-all duration-300 origin-top-right z-50 ${
                isDropdownOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
              }`}>
                {dropdownLinks.map((link) => {
                  const path = getLinkPath(link);
                  const isActive = pathname === path;
                  return (
                    <Link
                      key={link}
                      href={path}
                      className={`block px-4 py-2 text-[11px] font-medium font-sans hover:bg-brand-bgAlt transition-premium ${
                        isActive ? 'text-brand-primary font-semibold' : 'text-brand-slate hover:text-brand-primary'
                      }`}
                    >
                      {link}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-brand-slate hover:text-brand-navy rounded-xl hover:bg-brand-border/5 transition-colors cursor-pointer"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div className={`lg:hidden absolute top-full left-0 w-full h-[calc(100vh-100%)] bg-white/98 backdrop-blur-xl border-t border-brand-border/40 origin-top transition-all duration-300 cubic-bezier(0.16,1,0.3,1) z-35 ${
        isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-95 pointer-events-none'
      }`}>
        <div className="px-6 py-8 flex flex-col h-full justify-between overflow-y-auto">
          <div className="flex flex-col gap-1.5">
            {primaryLinks.map((link, idx) => {
              const path = getLinkPath(link);
              const isActive = pathname === path;
              return (
                <Link
                  key={link}
                  href={path}
                  onClick={() => setIsOpen(false)}
                  style={{ transitionDelay: `${idx * 20}ms` }}
                  className={`text-left text-sm font-medium tracking-wide transition-all duration-300 py-2.5 border-b border-brand-border/20 cursor-pointer font-sans transform ${
                    isActive ? 'text-brand-primary' : 'text-brand-navy hover:text-brand-primary'
                  } ${
                    isOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                  }`}
                >
                  {link}
                </Link>
              );
            })}

            {/* Separator for secondary pages */}
            <div className="h-6"></div>
            <div className="text-[10px] font-bold tracking-widest text-brand-slateLight uppercase mb-2">More Sections</div>

            {dropdownLinks.map((link, idx) => {
              const path = getLinkPath(link);
              const isActive = pathname === path;
              return (
                <Link
                  key={link}
                  href={path}
                  onClick={() => setIsOpen(false)}
                  style={{ transitionDelay: `${(primaryLinks.length + idx) * 20}ms` }}
                  className={`text-left text-xs font-medium tracking-wide transition-all duration-300 py-2 border-b border-brand-border/10 cursor-pointer font-sans transform ${
                    isActive ? 'text-brand-primary' : 'text-brand-slate hover:text-brand-primary'
                  } ${
                    isOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                  }`}
                >
                  {link}
                </Link>
              );
            })}
          </div>
          <div className="h-20"></div>
        </div>
      </div>
    </nav>
  );
}
