import React from 'react';
import PageLayout from '../components/PageLayout';
import About from '../components/About';
import HomeClient from './HomeClient';

export const metadata = {
  title: "FollowProperty — Track Any Property in India Like an Investment",
  description: "Smart real-estate tracking and insights for Gurgaon property buyers and owners. Engineered for complete transparency.",
};

export default function RootPage() {
  return (
    <PageLayout>
      <HomeClient />
      <About />
    </PageLayout>
  );
}
