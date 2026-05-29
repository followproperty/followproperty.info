import React from 'react';
import PageLayout from '../../components/PageLayout';
import { Newspaper, Calendar, ArrowRight, Tag } from 'lucide-react';
import contentData from '../../data/content.json';

export const metadata = {
  title: "Press Room & Latest Updates | FollowProperty",
  description: "Read official press releases, corporate announcements, and updates from the FollowProperty team.",
};

function PressReleasesContent() {
  const pressReleasesList = contentData.pressReleases || [];

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-white border-b border-brand-borderMid/10 flex flex-col items-center justify-center min-h-[600px]">
      {/* Dot mesh background */}
      <div className="absolute inset-0 bg-dot-mesh pointer-events-none z-0"></div>

      {/* Background decorative glows */}
      <div className="absolute top-1/4 left-1/4 w-[300px] sm:w-[480px] h-[300px] sm:h-[480px] bg-brand-primary/3 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[300px] sm:w-[480px] h-[300px] sm:h-[480px] bg-brand-teal/2 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-brand-primaryBorder/20 text-[10px] sm:text-xs font-semibold tracking-widest text-brand-primary uppercase mb-6 transition-premium font-sans mx-auto">
          <Newspaper className="w-4 h-4 text-brand-primary shrink-0" />
          PRESS ROOM
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight font-sans max-w-3xl leading-tight text-center mx-auto mb-6">
          Latest updates and news from FollowProperty.
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base lg:text-lg text-brand-slate font-normal leading-relaxed max-w-2xl text-center mx-auto mb-16 font-sans">
          Stay informed on our tech launches, partnerships, and research insights as we work to bring complete transparency to Indian real estate.
        </p>

        {/* Press Releases Stack */}
        <div className="w-full flex flex-col gap-8 max-w-3xl">
          {pressReleasesList.map((pr) => (
            <article 
              key={pr.id} 
              className="bg-white border border-brand-border/40 hover:border-brand-primary/25 rounded-3xl p-6 sm:p-8 transition-premium hover:-translate-y-0.5 hover:shadow-brand group flex flex-col gap-4 text-left"
            >
              {/* Meta information row */}
              <div className="flex flex-wrap items-center gap-4 text-brand-slateLight font-semibold text-[10px] sm:text-xs tracking-wider uppercase font-sans">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-brand-slateLight" />
                  {pr.date}
                </span>
                <span className="text-brand-borderMid">•</span>
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-brand-primaryBg border border-brand-primaryBorder/30 text-brand-primary">
                  <Tag className="w-3 h-3" />
                  {pr.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-extrabold text-brand-navy font-sans tracking-tight leading-tight group-hover:text-brand-primary transition-colors">
                {pr.title}
              </h3>

              {/* Summary */}
              <p className="text-xs sm:text-sm md:text-base text-brand-slate font-normal leading-relaxed font-sans">
                {pr.desc}
              </p>

              {/* Read Full Release Link */}
              <div className="pt-2 flex">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-primary uppercase tracking-widest font-sans cursor-pointer group-hover:text-brand-primaryDark transition-colors">
                  Read Full Release
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PressReleasesPage() {
  return (
    <PageLayout>
      <PressReleasesContent />
    </PageLayout>
  );
}
