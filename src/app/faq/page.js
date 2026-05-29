import React from 'react';
import PageLayout from '../../components/PageLayout';
import FAQ from '../../components/FAQ';
import contentData from '../../data/content.json';

export const metadata = {
  title: "Frequently Asked Questions | FollowProperty",
  description: "Find answers to common questions about FollowProperty's real estate intelligence platform and advisory services.",
};

export default function FAQPage() {
  return (
    <PageLayout>
      <FAQ data={contentData.faq} />
    </PageLayout>
  );
}
