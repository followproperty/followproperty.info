import React from 'react';
import PageLayout from '../../components/PageLayout';
import CurrentProjects from '../../components/CurrentProjects';

export const metadata = {
  title: "Current Projects & Institutional Offerings | FollowProperty",
  description: "Browse verified residential, commercial, and plotting projects. Inquire with our Gurgaon desk to express interest.",
};

export default function CurrentProjectsPage() {
  return (
    <PageLayout>
      <CurrentProjects />
    </PageLayout>
  );
}
