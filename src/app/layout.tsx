import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { site } from "@/lib/site";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Arizona Luxury Real Estate`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Arizona luxury real estate",
    "Paradise Valley homes",
    "Scottsdale luxury homes",
    "Arcadia Phoenix real estate",
    "Arizona investment property",
    "international buyers Arizona",
    "Gray Group Realty",
  ],
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  publisher: site.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Arizona Luxury Real Estate`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Arizona Luxury Real Estate`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "real estate",
};

export const viewport: Viewport = {
  themeColor: "#f7f4ee",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:z-[100] focus:bg-charcoal focus:px-5 focus:py-3 focus:text-xs focus:uppercase focus:tracking-[0.18em] focus:text-ivory"
        >
          Skip to content
        </a>

        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />

        <script
          type="application/ld+json"
          // Structured data helps the brokerage surface correctly in search.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              name: site.name,
              legalName: site.legalName,
              url: site.url,
              telephone: site.phone,
              email: site.email,
              areaServed: [
                "Paradise Valley, AZ",
                "Scottsdale, AZ",
                "Phoenix, AZ",
                "Gilbert, AZ",
                "Mesa, AZ",
                "Tempe, AZ",
              ],
              address: {
                "@type": "PostalAddress",
                streetAddress: `${site.office.street}, ${site.office.suite}`,
                addressLocality: site.office.city,
                addressRegion: site.office.state,
                postalCode: site.office.zip,
                addressCountry: "US",
              },
              priceRange: "$$$$",
            }),
          }}
        />
      </body>
    </html>
  );
}
