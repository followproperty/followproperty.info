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
  { url: '/security', title: 'Security Protocol', description: 'B2B registration and compliance security.', category: 'Legal', strokeWidth: 1.5, icon: ShieldCheck }
];

const FUNNY_MESSAGES = [
  "Even our legal compliance desk couldn't trace these coordinates.",
  "This plot is off-market... literally.",
  "We ran a full title search. This page doesn't exist on the map.",
  "404: Land acquisition failed. The page has been demolished.",
  "Our surveyors checked the blueprint. Seems this sector is still under construction."
];

export default function NotFound() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [randomMessage, setRandomMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  // Set a random funny message on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * FUNNY_MESSAGES.length);
    setRandomMessage(FUNNY_MESSAGES[randomIndex]);
  }, []);

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
      <section className="relative py-16 md:py-24 overflow-hidden bg-white border-b border-brand-borderMid/10 flex flex-col items-center justify-center min-h-[85vh]">
        {/* Modern structural dot mesh background */}
        <div className="absolute inset-0 bg-dot-mesh pointer-events-none z-0"></div>

        {/* Decorative glows */}
        <div className="absolute top-1/4 left-1/4 w-[320px] h-[320px] bg-brand-primary/2 rounded-full blur-[90px] pointer-events-none z-0 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[280px] h-[280px] bg-brand-teal/2 rounded-full blur-[95px] pointer-events-none z-0"></div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 w-full text-center flex flex-col items-center">
          
          {/* Professional Yet Funny Custom SVG Animation */}
          <div className="w-full max-w-[280px] md:max-w-[340px] mb-8 select-none relative group">
            {/* Blueprint Grid background container */}
            <div className="absolute inset-0 bg-brand-primary/5 rounded-2xl border border-brand-primary/10 -rotate-1 scale-105 pointer-events-none transition-all duration-500 group-hover:rotate-0"></div>
            
            <svg 
              viewBox="0 0 400 300" 
              className="w-full h-auto relative z-10 filter drop-shadow-md"
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Grid Lines */}
              <path d="M 50,0 L 50,300 M 100,0 L 100,300 M 150,0 L 150,300 M 200,0 L 200,300 M 250,0 L 250,300 M 300,0 L 300,300 M 350,0 L 350,300" stroke="rgba(50, 95, 236, 0.08)" strokeWidth="1" />
              <path d="M 0,50 L 400,50 M 0,100 L 400,100 M 0,150 L 400,150 M 0,200 L 400,200 M 0,250 L 400,250" stroke="rgba(50, 95, 236, 0.08)" strokeWidth="1" />
              
              {/* Compass Indicator (Rotating) */}
              <g transform="translate(340, 60)" className="animate-spin" style={{ transformOrigin: '340px 60px', animationDuration: '20s' }}>
                <circle cx="0" cy="0" r="20" stroke="rgba(50, 95, 236, 0.25)" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="0" y1="-25" x2="0" y2="25" stroke="rgba(50, 95, 236, 0.3)" strokeWidth="1" />
                <line x1="-25" y1="0" x2="25" y2="0" stroke="rgba(50, 95, 236, 0.3)" strokeWidth="1" />
                <polygon points="0,-18 5,0 0,5 -5,0" fill="var(--color-brand-primary, #325FEC)" opacity="0.6" />
                <polygon points="0,18 5,0 0,-5 -5,0" fill="var(--color-brand-teal, #0284C7)" opacity="0.4" />
              </g>

              {/* The "404" Land Plot boundary line */}
              <rect x="80" y="80" width="240" height="150" rx="12" stroke="var(--color-brand-primary, #325FEC)" strokeWidth="2.5" strokeDasharray="6 4" opacity="0.8" className="animate-pulse" />
              
              {/* Little Construction Crane swing arms */}
              <g transform="translate(60, 240)">
                {/* Vertical Tower */}
                <line x1="20" y1="0" x2="20" y2="-120" stroke="#1E293B" strokeWidth="4" />
                <line x1="10" y1="0" x2="20" y2="-40" stroke="#1E293B" strokeWidth="2" />
                <line x1="30" y1="0" x2="20" y2="-40" stroke="#1E293B" strokeWidth="2" />
                <line x1="10" y1="-40" x2="20" y2="-80" stroke="#1E293B" strokeWidth="2" />
                <line x1="30" y1="-80" x2="20" y2="-120" stroke="#1E293B" strokeWidth="2" />
                
                {/* Cabin */}
                <rect x="12" y="-128" width="16" height="16" rx="3" fill="#0F172A" />
                
                {/* Boom/Jib */}
                <g className="origin-[20px_-120px]" style={{ animation: 'float 6s ease-in-out infinite' }}>
                  <line x1="-30" y1="-120" x2="90" y2="-120" stroke="#0284C7" strokeWidth="3" />
                  {/* Counterweight */}
                  <rect x="-30" y="-123" width="12" height="8" fill="#475569" />
                  {/* Trolley hook line */}
                  <line x1="60" y1="-120" x2="60" y2="-80" stroke="#475569" strokeWidth="1.5" strokeDasharray="2 2" className="animate-bounce" />
                  {/* Hook carrying a tiny "404" label */}
                  <g transform="translate(42, -80)">
                    <rect x="0" y="0" width="36" height="20" rx="4" fill="#325FEC" className="shadow-md" />
                    <text x="18" y="14" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">404</text>
                  </g>
                </g>
              </g>

              {/* The Lost House Character */}
              <g transform="translate(180, 110)" style={{ animation: 'float 3.5s ease-in-out infinite' }}>
                {/* Yellow Hardhat */}
                <path d="M 12 10 A 18 18 0 0 1 48 10 L 52 14 A 2 2 0 0 1 50 16 L 10 16 A 2 2 0 0 1 8 14 Z" fill="#F59E0B" />
                <rect x="27" y="5" width="6" height="6" fill="#D97706" rx="1" />

                {/* Main House Body */}
                <path d="M 5 35 L 30 18 L 55 35 L 55 65 L 5 65 Z" fill="#F8FAFC" stroke="#0F172A" strokeWidth="3" />
                {/* Roof Outline */}
                <path d="M 2 34 L 30 15 L 58 34" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" />
                
                {/* Dazed/Confused Eyes */}
                <g stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round">
                  {/* Left X eye */}
                  <line x1="16" y1="36" x2="24" y2="44" />
                  <line x1="24" y1="36" x2="16" y2="44" />
                  
                  {/* Right X eye */}
                  <line x1="36" y1="36" x2="44" y2="44" />
                  <line x1="44" y1="36" x2="36" y2="44" />
                </g>
                
                {/* Confused Mouth */}
                <path d="M 25 54 Q 30 48 35 54" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" fill="none" />

                {/* Sweating Droplet */}
                <path d="M 52 38 Q 55 42 52 45 Q 49 42 52 38 Z" fill="#38BDF8" className="animate-pulse" />

                {/* Cute Wobbling legs */}
                <g className="origin-[30px_65px]">
                  {/* Left Leg */}
                  <path d="M 20 65 L 17 78 C 15 80, 10 78, 12 75" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" fill="none" />
                  {/* Right Leg */}
                  <path d="M 40 65 L 43 78 C 45 80, 50 78, 48 75" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" fill="none" />
                </g>
              </g>

              {/* Magnifying Glass looking for page */}
              <g transform="translate(180, 95)" style={{ animation: 'float 4.2s ease-in-out infinite', animationDelay: '0.8s' }}>
                <circle cx="90" cy="90" r="22" stroke="#0284C7" strokeWidth="3.5" fill="rgba(2, 132, 199, 0.05)" />
                <line x1="106" y1="106" x2="128" y2="128" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" />
                {/* Lens Highlight */}
                <path d="M 76 82 A 16 16 0 0 1 96 74" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
              </g>
              
              {/* Question Marks popping up */}
              <text x="140" y="85" fill="#325FEC" fontSize="24" fontWeight="bold" className="animate-bounce" style={{ animationDuration: '2.5s' }}>?</text>
              <text x="250" y="100" fill="#0284C7" fontSize="20" fontWeight="bold" className="animate-bounce" style={{ animationDuration: '3s', animationDelay: '0.4s' }}>?</text>
            </svg>
          </div>

          {/* Error Details */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primaryBg border border-brand-primaryBorder/20 text-[10px] sm:text-xs font-semibold tracking-widest text-brand-primary uppercase mb-4 font-sans">
            ⚠️ Plot #404 Uncharted
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-brand-navy tracking-tight mb-3 font-sans">
            Looking for something?
          </h1>

          {/* Funny dynamically selected message */}
          <p className="text-sm sm:text-base text-brand-slate font-light leading-relaxed mb-8 max-w-md mx-auto font-sans min-h-[48px] flex items-center justify-center">
            {randomMessage || "The page you are looking for has been relocated or doesn't exist on our registry."}
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
                      Matching Registered Pages ({filteredPages.length})
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
                    🔍 No land records found for "{searchQuery}". <br/>
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
                Track Projects
              </button>
              <button 
                onClick={() => selectSuggested('services')}
                className="px-3 py-1 rounded-full text-[11px] bg-brand-bgAlt text-brand-slate hover:bg-brand-primaryBg hover:text-brand-primary border border-brand-border transition-all duration-200 cursor-pointer"
              >
                Advisory Desk
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
