import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import localFont from "next/font/local";
import { Playfair_Display } from "next/font/google";
import QueryProvider from "@/provider/queryProvider";
import { Toaster } from "react-hot-toast";
import { GTMPageViewTracker } from "./components/GtmPageTracker";
import { Suspense } from "react";

// Body: Circe Rounded (existing brand sans, soft and warm)
const circeRoundRegular = localFont({
  src: "./fonts/CirceRounded-Regular.otf",
  variable: "--font-circe",
  display: "swap",
});

// Display: Playfair Display (premium editorial serif for headlines)
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Koffelo — United by Coffee",
  description: "Crafted with care and driven by purpose. Premium artisanal coffee for those who savour the ritual.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${circeRoundRegular.variable} ${playfair.variable}`}>
      <head>
        <Script
          id="gtm-base"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-TMRTQV4H');
            `,
          }}
        />
      </head>
      <body className={circeRoundRegular.className}>
        <Suspense>
          <GTMPageViewTracker />
        </Suspense>
        <QueryProvider>{children}</QueryProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#3D2418",
              color: "#F5EFE4",
              fontFamily: "var(--font-circe)",
              borderRadius: "999px",
              padding: "12px 20px",
              fontSize: "14px",
              letterSpacing: "0.01em",
            },
          }}
        />
      </body>
    </html>
  );
}
