import React from 'react';
import PageLayout from '../../components/PageLayout';
import CareersClient from './CareersClient';
import contentData from '../../data/content.json';

export const metadata = {
  title: "Careers & Job Openings | FollowProperty",
  description: "Build the future of prop-tech transparency. Explore hybrid and full-time positions at FollowProperty.",
};

export default function CareersPage() {
  const positionsList = contentData.careers || [];

  return (
    <PageLayout>
      <CareersClient positions={positionsList} />
    </PageLayout>
  );
}
