"use client";

import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  ArrowRight, 
  Tag, 
  MapPin,
  Building2,
  Globe,
  ShieldCheck
} from 'lucide-react';

const getSourceVisuals = (sourceName) => {
  const name = sourceName?.toLowerCase() || '';
  if (name.includes('rera')) {
    return {
      initials: 'RERA',
      bgColor: 'bg-amber-50 border border-amber-200 text-amber-700 font-extrabold',
    };
  }
  if (name.includes('delhi') || name.includes('dda')) {
    return {
      initials: 'DDA',
      bgColor: 'bg-sky-50 border border-sky-200 text-sky-700 font-extrabold',
    };
  }
  if (name.includes('upsida')) {
    return {
      initials: 'UPSI',
      bgColor: 'bg-teal-50 border border-teal-200 text-teal-700 font-extrabold',
    };
  }
  if (name.includes('haryana') || name.includes('huda')) {
    return {
      initials: 'HR',
      bgColor: 'bg-indigo-50 border border-indigo-200 text-indigo-700 font-extrabold',
    };
  }
  if (name.includes('mint') || name.includes('livemint')) {
    return {
      initials: 'LM',
      bgColor: 'bg-emerald-50 border border-emerald-200 text-emerald-700 font-extrabold',
    };
  }
  if (name.includes('moneycontrol')) {
    return {
      initials: 'MC',
      bgColor: 'bg-blue-50 border border-blue-200 text-blue-700 font-extrabold',
    };
  }
  return {
    initials: sourceName ? sourceName.substring(0, 3).toUpperCase() : 'PR',
    bgColor: 'bg-brand-primaryBg border border-brand-primaryBorder/30 text-brand-primary font-extrabold',
  };
};

function PressReleasesClient() {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedSource, setSelectedSource] = useState('ALL');
  const [visibleCount, setVisibleCount] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  useEffect(() => {
    setVisibleCount(10);
  }, [selectedCategory]);

  useEffect(() => {
    async function fetchFeed() {
      setLoading(true);
      setError(null);
      try {
        const queryParams = new URLSearchParams({
          state: selectedState,
          source: selectedSource === 'ALL' ? 'all' : selectedSource
        });
        
        const res = await fetch(`/api/press-releases?${queryParams.toString()}`);
        if (!res.ok) {
          throw new Error('Failed to fetch media feed.');
        }
        const json = await res.json();
        if (json.success) {
          setFeed(json.data || []);
          setVisibleCount(10); // Reset count when filter is changed/loaded
        } else {
          throw new Error(json.message || 'API failed to fetch feed.');
        }
      } catch (err) {
        console.error('Error fetching press feed:', err);
        setError(err.message || 'Failed to retrieve media feed.');
      } finally {
        setLoading(false);
      }
    }

    fetchFeed();
  }, [selectedState, selectedSource]);

  // Helper to format date strings
  const formatDate = (dateStr) => {
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString('en-US', options);
    } catch (e) {
      return dateStr;
    }
  };

  // Helper for state tags mapping
  const getStateName = (code) => {
    switch (code?.toUpperCase()) {
      case 'DL': return 'Delhi';
      case 'HR': return 'Haryana';
      case 'UP': return 'Uttar Pradesh';
      default: return code || 'NCR';
    }
  };

  const filteredFeed = feed.filter(item => {
    if (selectedCategory === 'ALL') return true;
    const itemCats = (item.categories || []).map(c => c.toLowerCase());
    
    if (selectedCategory === 'RERA') {
      return itemCats.includes('rera');
    }
    if (selectedCategory === 'TAX') {
      return itemCats.includes('tax') || itemCats.includes('stamp duty') || itemCats.includes('registry');
    }
    if (selectedCategory === 'INFRA') {
      return itemCats.includes('infrastructure') || 
             itemCats.includes('infra') || 
             itemCats.includes('expressway') || 
             itemCats.includes('metro') || 
             itemCats.includes('airport') || 
             itemCats.includes('smart city') ||
             itemCats.includes('government project');
    }
    return true;
  });

  return (
    <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-white border-b border-brand-borderMid/10 min-h-[700px] w-full flex flex-col items-center justify-center">
      {/* Soft decorative background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[620px] h-[320px] sm:h-[620px] bg-gradient-to-tr from-brand-primary/4 to-brand-primary/0 rounded-full blur-[80px] sm:blur-[130px] pointer-events-none z-0"></div>

      {/* Dot mesh background */}
      <div className="absolute inset-0 bg-dot-mesh pointer-events-none z-0"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16">
          {/* Brand Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-primaryBg border border-brand-primaryBorder/10 mb-6 transition-premium mx-auto">
            <span className="text-[10px] sm:text-xs font-bold tracking-wider text-brand-primary uppercase font-sans">
              PRESS ROOM
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-navy leading-[1.15] mb-6 font-sans max-w-3xl mx-auto">
            Latest updates and news.
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base lg:text-lg text-brand-slate font-normal leading-relaxed text-center font-sans">
            Stay informed on our tech launches, partnerships, and research insights.
          </p>
        </div>

        {/* Sleek Minimalist Filter Header */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center border-b border-brand-borderMid/10 pb-0 mb-16 gap-6 z-20">
          {/* Source Tabs (Left side) */}
          <div 
            className="flex gap-6 sm:gap-8 items-center w-full md:w-auto overflow-x-auto whitespace-nowrap pb-0 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {['ALL', 'articles', 'press_releases'].map(sourceCode => (
              <button
                key={sourceCode}
                onClick={() => setSelectedSource(sourceCode)}
                className={`relative pb-3 text-xs sm:text-sm font-bold font-sans tracking-wider uppercase transition-premium cursor-pointer border-b-2 outline-none ${
                  selectedSource === sourceCode
                    ? 'text-brand-primary border-brand-primary'
                    : 'text-brand-slateLight border-transparent hover:text-brand-navy'
                }`}
              >
                {sourceCode === 'ALL' ? 'All Updates' : sourceCode === 'articles' ? 'Property News' : 'Press Releases'}
              </button>
            ))}
          </div>

          {/* Region & Type Filters (Right side) */}
          <div className="flex flex-row items-center justify-between md:justify-end gap-3 sm:gap-4 w-full md:w-auto pb-3 md:pb-0">
            {/* Region Select */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-1 sm:flex-initial w-full sm:w-auto">
              <label htmlFor="region-select" className="hidden sm:inline-block text-[10px] sm:text-xs uppercase font-extrabold tracking-widest text-brand-slateLight font-sans shrink-0">
                Region:
              </label>
              <select
                id="region-select"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full sm:w-auto px-2 sm:px-3.5 py-1.5 pr-7 sm:pr-8 rounded-xl border border-brand-borderMid/20 bg-white text-[11px] sm:text-xs font-bold text-brand-slate hover:text-brand-navy transition-premium cursor-pointer outline-none focus:border-brand-primary font-sans shadow-sm appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2364748B%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:0.6rem_auto] bg-[right_0.6rem_center] bg-no-repeat focus:ring-2 focus:ring-brand-primaryBg"
              >
                <option value="ALL">All Regions</option>
                <option value="DL">Delhi</option>
                <option value="HR">Haryana</option>
                <option value="UP">Uttar Pradesh</option>
              </select>
            </div>

            {/* Type Select */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-1 sm:flex-initial w-full sm:w-auto">
              <label htmlFor="category-select" className="hidden sm:inline-block text-[10px] sm:text-xs uppercase font-extrabold tracking-widest text-brand-slateLight font-sans shrink-0">
                Type:
              </label>
              <select
                id="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full sm:w-auto px-2 sm:px-3.5 py-1.5 pr-7 sm:pr-8 rounded-xl border border-brand-borderMid/20 bg-white text-[11px] sm:text-xs font-bold text-brand-slate hover:text-brand-navy transition-premium cursor-pointer outline-none focus:border-brand-primary font-sans shadow-sm appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2364748B%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:0.6rem_auto] bg-[right_0.6rem_center] bg-no-repeat focus:ring-2 focus:ring-brand-primaryBg"
              >
                <option value="ALL">All Types</option>
                <option value="RERA">RERA</option>
                <option value="TAX">Tax & Stamp Duty</option>
                <option value="INFRA">Infrastructure / Infra</option>
              </select>
            </div>
          </div>
        </div>

        {/* Chronological News Feed List */}
        <div className="w-full flex flex-col gap-6 max-w-2xl min-h-[300px]">
          {loading ? (
            /* Minimal Skeleton Loaders */
            <div className="w-full flex flex-col gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse flex flex-col gap-3 p-6 bg-white border border-brand-borderMid/10 rounded-2xl shadow-brand">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex flex-col gap-2 flex-1">
                      <div className="h-3 bg-slate-100 rounded w-1/4"></div>
                      <div className="h-5.5 bg-slate-100 rounded w-3/4"></div>
                    </div>
                    <div className="w-12 h-12 bg-slate-100 rounded-xl"></div>
                  </div>
                  <div className="h-4 bg-slate-100 rounded w-full"></div>
                  <div className="h-4 bg-slate-100 rounded w-5/6"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            /* Premium Error Display */
            <div className="bg-brand-redBg border border-brand-red/10 rounded-3xl p-8 text-center w-full">
              <p className="text-brand-red font-semibold font-sans mb-3 text-sm">Error syncing: {error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-navy text-white text-[10px] font-extrabold tracking-wider uppercase shadow hover:bg-brand-primary transition-premium cursor-pointer"
              >
                Retry Sync
              </button>
            </div>
          ) : filteredFeed.length === 0 ? (
            /* Premium Empty State */
            <div className="bg-brand-bgAlt border border-brand-border/60 rounded-3xl p-12 text-center w-full">
              <p className="text-brand-slate font-sans mb-2 font-bold text-sm">No updates found.</p>
              <p className="text-xs text-brand-slateLight font-sans font-normal">Try selecting another category or region.</p>
            </div>
          ) : (
            /* Chronological Feed Stream */
            filteredFeed.slice(0, visibleCount).map((item) => {
              const visuals = getSourceVisuals(item.sourceName);
              return (
                <article 
                  key={item.id} 
                  className="flex flex-col gap-4 text-left p-6 sm:p-8 bg-white border border-brand-borderMid/10 rounded-2xl shadow-brand hover:shadow-brand-md hover:border-brand-primary/25 hover:-translate-y-0.5 transition-premium group relative"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex flex-col gap-2 flex-1">
                      {/* Meta Header */}
                      <div className="flex flex-wrap items-center gap-2 text-brand-slateLight font-semibold text-[10px] sm:text-xs tracking-wider uppercase font-sans">
                        <span>{formatDate(item.date)}</span>
                        <span className="text-brand-borderMid">•</span>
                        <span className="text-brand-primary font-bold">{item.category}</span>
                        {item.state && item.state !== 'General' && (
                          <>
                            <span className="text-brand-borderMid">•</span>
                            <span className="text-brand-slate">{getStateName(item.state)}</span>
                          </>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-brand-navy font-sans tracking-tight leading-snug group-hover:text-brand-primary transition-colors duration-300">
                        {item.title}
                      </h3>
                    </div>

                    {/* Source Logo Emblem */}
                    <div className={`flex items-center justify-center shrink-0 w-12 h-12 rounded-xl border text-[10px] uppercase ${visuals.bgColor}`}>
                      {visuals.initials}
                    </div>
                  </div>

                  {/* Clean Metadata Tags */}
                  {item.source === 'articles' && (item.builders?.length > 0 || item.projects?.length > 0 || item.authorities?.length > 0) && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.builders?.map((b, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-brand-bgAlt border border-brand-border/40 text-[9px] font-bold text-brand-slate uppercase font-sans">
                          <Building2 className="w-2.5 h-2.5 text-brand-slateLight shrink-0" />
                          {b}
                        </span>
                      ))}
                      {item.projects?.map((p, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-brand-primaryBg border border-brand-primaryBorder/30 text-[9px] font-bold text-brand-primary uppercase font-sans">
                          <Globe className="w-2.5 h-2.5 text-brand-primaryLight shrink-0" />
                          {p}
                        </span>
                      ))}
                      {item.authorities?.map((a, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-brand-tealBg border border-brand-tealBorder/40 text-[9px] font-bold text-brand-teal uppercase font-sans">
                          <ShieldCheck className="w-2.5 h-2.5 text-brand-teal shrink-0" />
                          {a}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Description with Line Clamp */}
                  <p className="text-xs sm:text-sm text-brand-slate font-normal leading-relaxed font-sans line-clamp-3 overflow-hidden text-ellipsis">
                    {item.content}
                  </p>

                  {/* Divider */}
                  <div className="border-t border-brand-borderMid/10 my-1"></div>

                  {/* Footer Details & Action Link */}
                  <div className="flex justify-between items-center text-xs font-sans">
                    <span className="text-[10px] sm:text-xs font-semibold text-brand-slateLight uppercase tracking-wider font-sans">
                      Source: {item.sourceName || (item.source === 'articles' ? 'Media Article' : 'Official Press Release')}
                    </span>
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-brand-primary uppercase tracking-widest font-sans cursor-pointer group-hover:text-brand-primaryDark transition-colors"
                    >
                      Read Full Release
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  </div>
                </article>
              );
            })
          )}
          
          {/* Load More Button */}
          {!loading && !error && filteredFeed.length > visibleCount && (
            <div className="flex justify-center pt-8">
              <button
                onClick={() => setVisibleCount(prev => prev + 10)}
                className="px-8 py-2.5 rounded-full font-bold text-xs tracking-wider uppercase bg-white border border-brand-borderMid/15 text-brand-slate hover:text-brand-primary hover:border-brand-primary hover:-translate-y-0.5 active:translate-y-0 transition-premium cursor-pointer shadow-sm font-sans"
              >
                Load More Updates
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default PressReleasesClient;
