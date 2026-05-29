import React from 'react';
import PageLayout from '../../components/PageLayout';
import ContactClient from './ContactClient';

export const metadata = {
  title: "Contact Advisory Desk | FollowProperty",
  description: "Get in touch with FollowProperty's Gurgaon advisory desk for real estate questions, due diligence audits, and partnership queries.",
};

export default function ContactPage() {
  return (
    <PageLayout>
      <ContactClient />
    </PageLayout>
  );
}
