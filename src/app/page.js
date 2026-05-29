import React from 'react';
import PageLayout from '../components/PageLayout';
import About from '../components/About';
import HomeClient from './HomeClient';

export default function RootPage() {
  return (
    <PageLayout>
      <HomeClient />
      <About />
    </PageLayout>
  );
}