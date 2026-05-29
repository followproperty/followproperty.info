import React from 'react';
import PageLayout from '../../components/PageLayout';
import Services from '../../components/Services';

export const metadata = {
  title: "Real Estate Advisory & Buyer Services | FollowProperty",
  description: "Explore our consultative services including portfolio guidance, builder alliances, due diligence, and buyer assistance in Gurgaon.",
};

export default function ServicesPage() {
  return (
    <PageLayout>
      <Services />
    </PageLayout>
  );
}
