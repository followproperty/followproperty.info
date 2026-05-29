import React from 'react';
import PageLayout from '../components/PageLayout';
import About from '../components/About';
import HomeClient from './HomeClient';

export const metadata = {
  title: "FollowProperty | Real Estate Advisory Built for Modern India",
  description:
    "FollowProperty helps buyers, developers, and businesses make informed property decisions through advisory services, due diligence, project intelligence, and technology-driven real-estate solutions.",
};

export default function RootPage() {
  return (
    <PageLayout>
      <HomeClient />
      <About />
    </PageLayout>
  );
}
