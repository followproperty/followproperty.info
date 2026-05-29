import "./globals.css";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL("https://www.followproperty.org"),

  title: "FollowProperty | Real Estate Advisory Built for Modern India",

  description:
    "FollowProperty helps buyers, developers, and businesses navigate property decisions through advisory services, due diligence, and technology-driven real-estate solutions.",

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: "/icon.svg",
  },

  openGraph: {
    title: "FollowProperty | Real Estate Advisory Built for Modern India",
    description:
      "FollowProperty helps buyers, developers, and businesses navigate property decisions through advisory services, due diligence, and technology-driven real-estate solutions.",
    url: "https://www.followproperty.org",
    siteName: "FollowProperty",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "FollowProperty | Real Estate Advisory Built for Modern India",
    description:
      "FollowProperty helps buyers, developers, and businesses navigate property decisions through advisory services, due diligence, and technology-driven real-estate solutions.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full scroll-smooth light">
      <body className="min-h-full flex flex-col bg-brand-bg text-brand-navy font-sans antialiased selection:bg-brand-primary selection:text-white">
        {children}

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}