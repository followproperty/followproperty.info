import React from "react";
import PageLayout from "../../components/PageLayout";
import IWantClient from "./IWantClient";

export const metadata = {
  title: "Advisory Intake & Watchlist Setup | FollowProperty",
  description: "Configure your custom real estate search parameters and build a watchlist on FollowProperty.",
};

export default function IWantPage() {
  return (
    <PageLayout>
      <IWantClient />
    </PageLayout>
  );
}
