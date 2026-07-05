import React from 'react';
import PageLayout from '../../components/PageLayout';
import PressReleasesClient from './PressReleasesClient';

export const metadata = {
  title: "News Aggregation & Latest Updates | FollowProperty",
  description: "Read official news updates, corporate announcements, and updates from the FollowProperty team.",
};

export default function PressReleasesPage() {
  return (
    <PageLayout>
      <PressReleasesClient />
    </PageLayout>
  );
}
