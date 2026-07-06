import React from 'react';
import PageLayout from '../../components/PageLayout';
import NewsClient from './NewsClient';

export const metadata = {
  title: "News Aggregation | FollowProperty",
  description: "Read official news updates, corporate announcements, and updates from the FollowProperty team.",
};

export default function NewsPage() {
  return (
    <PageLayout>
      <NewsClient />
    </PageLayout>
  );
}
