import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { config } from "@/data/config";

import Script from "next/script";
import SiteFrame from "@/components/site-frame";
import { Providers } from "@/components/providers";
import { GoogleAnalytics } from "@next/third-parties/google";

// Inter carries the whole interface at 400/500 — the design uses no bold.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500"],
  display: "swap",
});

// Instrument Serif appears once, on the curved name in the hero.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(config.site),
  title: config.title,
  description: config.description.long,
  keywords: config.keywords,
  authors: [{ name: config.author }],
  openGraph: {
    title: config.title,
    description: config.description.short,
    url: config.site,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: config.title,
    description: config.description.short,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={[
        inter.variable,
        instrumentSerif.variable,
        "font-sans",
      ].join(" ")}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://unpkg.com" crossOrigin="anonymous" />
        {process.env.UMAMI_DOMAIN && process.env.UMAMI_SITE_ID ? (
          <Script
            defer
            src={process.env.UMAMI_DOMAIN}
            data-website-id={process.env.UMAMI_SITE_ID}
          />
        ) : null}
      </head>
      <body>
        {/* Global UI Overlays */}

        <Providers>
          <SiteFrame>{children}</SiteFrame>
        </Providers>
        
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        
        {/* JSON-LD Structured Data moved INSIDE the body tag to satisfy Next.js 16 strict HTML rules */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": config.author,
              "url": config.site,
              "image": `${config.site}/opengraph-image`,
              "sameAs": [
                "https://github.com/Nilesh1735",
                "https://www.linkedin.com/in/nilesh-raj-nr1735/"
              ],
              "jobTitle": "AI / ML Engineer | GenAI Developer",
              "knowsAbout": ["Python", "LangChain", "RAG Pipelines", "FastAPI", "React", "Next.js"]
            })
          }}
        />
      </body>
    </html>
  );
}