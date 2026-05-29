import React from 'react';
import PageLayout from '../../components/PageLayout';
import Business from '../../components/Business';

export const metadata = {
  title: "Developer Alliances & Business Partner Desk | FollowProperty",
  description: "Partner with FollowProperty to access RERA compliance databases, channel partnership inventories, and real estate tools.",
};

export default function BusinessPage() {
  return (
    <PageLayout>
      <div className="pt-10">
        <Business inlineForm={true} />
      </div>
    </PageLayout>
  );
}
