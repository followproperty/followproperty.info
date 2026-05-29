import React from 'react';
import PageLayout from '../../components/PageLayout';
import HomeClient from './HomeClient';

export const metadata = {
  title: "FollowProperty Home | Advisory & Intelligence",
  description: "Consult with our real-estate advisory desk and explore business owner alliance opportunities.",
};

export default function HomePage() {
  return (
    <PageLayout>
      <HomeClient />
    </PageLayout>
  );
}
