"use client";

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PageLayout from '../components/PageLayout';
import { 
  Search, 
  ArrowRight, 
  Home, 
  HelpCircle, 
  Briefcase, 
  Users, 
  ShieldCheck, 
  FileText, 
  Phone, 
  Newspaper, 
  Building, 
  Compass, 
  Sparkles, 
  MapPin, 
  X 
} from 'lucide-react';

const PAGES = [
  { url: '/', title: 'Home', description: 'FollowProperty homepage and corporate overview.', category: 'Main', icon: Home },
  { url: '/services', title: 'Services & Advisory', description: 'Prop-tech research and transaction due diligence.', category: 'Services', icon: Sparkles },
  { url: '/current-projects', title: 'Current Projects', description: 'Construction trackers and project updates.', category: 'Tracker', icon: Building },
  { url: '/products', title: 'Our Products', description: 'Technology platforms for real estate intelligence.', category: 'Platform', icon: Compass },
  { url: '/business', title: 'B2B Business Solutions', description: 'Solutions for developers and land owners.', category: 'Business', icon: Briefcase },
  { url: '/contact', title: 'Contact Advisory Desk', description: 'Get in touch with our advisory desk.', category: 'Support', icon: Phone },
  { url: '/faq', title: 'FAQs & Support', description: 'Frequently asked questions and client help.', category: 'Support', icon: HelpCircle },
  { url: '/press-releases', title: 'Press Releases & Research', description: 'Follow our research channels and news.', category: 'Research', icon: Newspaper },
  { url: '/careers', title: 'Careers', description: 'Join our analyst, engineering, or product teams.', category: 'Company', icon: Users },
  { url: '/team', title: 'Our Team', description: 'Meet the founders and team of researchers.', category: 'Company', icon: Users },
  { url: '/locate-us', title: 'Locate Us', description: 'Office address and location details.', category: 'Company', icon: MapPin },
  { url: '/privacy', title: 'Privacy Policy', description: 'Data privacy and security guidelines.', category: 'Legal', icon: ShieldCheck },
  { url: '/terms', title: 'Terms of Use', description: 'Terms and conditions for FollowProperty.', category: 'Legal', icon: FileText },
  { url: '/security', title: 'Security Protocol', description: 'B2B registration and compliance security.', category: 'Legal', icon: ShieldCheck }
];

export default function NotFound() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  // Filter pages based on search query
  const filteredPages = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();
    return PAGES.filter(
      page => 
        page.title.toLowerCase().includes(query) || 
        page.description.toLowerCase().includes(query) ||
        page.category.toLowerCase().includes(query) ||
        page.url.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Reset selection index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (filteredPages.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredPages.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredPages.length) % filteredPages.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const targetPage = filteredPages[selectedIndex];
      if (targetPage) {
        router.push(targetPage.url);
      }
    } else if (e.key === 'Escape') {
      setSearchQuery('');
      inputRef.current?.blur();
    }
  };

  const selectSuggested = (query) => {
    setSearchQuery(query);
    inputRef.current?.focus();
  };

  return (
    <PageLayout>
      <section className="relative py-20 md:py-28 overflow-hidden bg-white border-b border-brand-borderMid/10 flex flex-col items-center justify-center min-h-[80vh]">
        {/* Modern structural dot mesh background */}
        <div className="absolute inset-0 bg-dot-mesh pointer-events-none z-0"></div>

        {/* Decorative glows */}
        <div className="absolute top-1/4 left-1/4 w-[320px] h-[320px] bg-brand-primary/2 rounded-full blur-[90px] pointer-events-none z-0"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[280px] h-[280px] bg-brand-teal/2 rounded-full blur-[95px] pointer-events-none z-0"></div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 relative z-10 w-full text-center flex flex-col items-center">
          
          {/* Large Clean 404 Text */}
          <h1 className="text-7xl sm:text-8xl font-black text-brand-navy tracking-tighter mb-4 font-sans bg-clip-text text-transparent bg-gradient-to-b from-brand-navy to-brand-slate">
            404
          </h1>

          <h2 className="text-xl sm:text-2xl font-bold text-brand-navy mb-4 font-sans tracking-tight">
            Page Not Found
          </h2>

          <p className="text-sm sm:text-base text-brand-slate font-light leading-relaxed mb-8 max-w-md mx-auto font-sans">
            The page you are looking for doesn't exist, has been moved, or has a temporary technical hold. Search our directory below to find what you need.
          </p>

          {/* Interactive Search Container */}
          <div className="w-full max-w-lg mx-auto mb-10 relative">
            <div 
              className={`relative flex items-center rounded-2xl transition-all duration-300 ${
                isFocused 
                  ? 'glassmorphic-input shadow-brand-primary border-brand-primary scale-[1.01]' 
                  : 'glassmorphic border-brand-border'
              }`}
            >
              <span className="pl-4 text-brand-slate pointer-events-none">
                <Search className={`w-5 h-5 transition-colors duration-300 ${isFocused ? 'text-brand-primary' : 'text-brand-slateLight'}`} />
              </span>

              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)} // delay to allow clicks
                onKeyDown={handleKeyDown}
                placeholder="Search pages (e.g., projects, careers, contact)..."
                className="w-full py-4 px-3 text-sm text-brand-navy bg-transparent outline-none border-none placeholder-brand-slateLight font-sans"
              />

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="pr-4 text-brand-slate hover:text-brand-navy transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Instant Search Results dropdown */}
            {searchQuery.trim() !== '' && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md border border-brand-borderMid/20 rounded-2xl shadow-brand-lg overflow-hidden z-50 animate-fadeIn text-left">
                {filteredPages.length > 0 ? (
                  <div className="max-h-[280px] overflow-y-auto p-2">
                    <div className="px-3 py-1.5 text-[10px] font-semibold text-brand-slateLight tracking-wider uppercase border-b border-brand-border/40 mb-1">
                      Matching Pages ({filteredPages.length})
                    </div>
                    {filteredPages.map((page, index) => {
                      const IconComponent = page.icon;
                      const isSelected = index === selectedIndex;
                      return (
                        <Link
                          key={page.url}
                          href={page.url}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                            isSelected 
                              ? 'bg-brand-primary text-white' 
                              : 'hover:bg-brand-primaryBg text-brand-navy'
                          }`}
                          onMouseEnter={() => setSelectedIndex(index)}
                        >
                          <div className={`p-1.5 rounded-lg shrink-0 transition-colors ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-brand-bgAlt text-brand-primary'
                          }`}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-brand-navy'}`}>
                              {page.title}
                            </div>
                            <div className={`text-[10px] truncate ${isSelected ? 'text-white/80' : 'text-brand-slate'}`}>
                              {page.description}
                            </div>
                          </div>
                          <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            isSelected ? 'text-white translate-x-0.5' : 'text-brand-slateLight opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5'
                          }`} />
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-6 text-center text-brand-slate text-xs font-light">
                    🔍 No pages found for "{searchQuery}". <br/>
                    Try searching <span className="font-semibold text-brand-primary cursor-pointer hover:underline" onClick={() => selectSuggested('projects')}>projects</span>,{' '}
                    <span className="font-semibold text-brand-primary cursor-pointer hover:underline" onClick={() => selectSuggested('careers')}>careers</span>, or{' '}
                    <span className="font-semibold text-brand-primary cursor-pointer hover:underline" onClick={() => selectSuggested('services')}>services</span>.
                  </div>
                )}
              </div>
            )}

            {/* Quick suggested chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              <span className="text-[11px] text-brand-slateLight font-medium">Quick Links:</span>
              <button 
                onClick={() => selectSuggested('projects')}
                className="px-3 py-1 rounded-full text-[11px] bg-brand-bgAlt text-brand-slate hover:bg-brand-primaryBg hover:text-brand-primary border border-brand-border transition-all duration-200 cursor-pointer"
              >
                Projects
              </button>
              <button 
                onClick={() => selectSuggested('services')}
                className="px-3 py-1 rounded-full text-[11px] bg-brand-bgAlt text-brand-slate hover:bg-brand-primaryBg hover:text-brand-primary border border-brand-border transition-all duration-200 cursor-pointer"
              >
                Services
              </button>
              <button 
                onClick={() => selectSuggested('team')}
                className="px-3 py-1 rounded-full text-[11px] bg-brand-bgAlt text-brand-slate hover:bg-brand-primaryBg hover:text-brand-primary border border-brand-border transition-all duration-200 cursor-pointer"
              >
                Our Team
              </button>
              <button 
                onClick={() => selectSuggested('careers')}
                className="px-3 py-1 rounded-full text-[11px] bg-brand-bgAlt text-brand-slate hover:bg-brand-primaryBg hover:text-brand-primary border border-brand-border transition-all duration-200 cursor-pointer"
              >
                Careers
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3 rounded-full font-bold text-xs tracking-widest uppercase bg-brand-navy text-white hover:bg-brand-navy/90 shadow-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer font-sans"
            >
              <Home className="w-4 h-4" />
              Return Home
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-6 py-3 rounded-full font-bold text-xs tracking-widest uppercase bg-transparent text-brand-navy border border-brand-navy/20 hover:border-brand-navy hover:bg-brand-bgAlt/50 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer font-sans"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
