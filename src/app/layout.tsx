import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import localFont from "next/font/local";
import QueryProvider from "@/provider/queryProvider";
import { Toaster } from "react-hot-toast";
import { GTMPageViewTracker } from "./components/GtmPageTracker";
import { Suspense } from "react";

const circeRoundRegular = localFont({
  src: "./fonts/CirceRounded-Regular.otf",
});

export const metadata: Metadata = {
  title: "Koffelo - United by Coffee",
  description: "Crafted with care and driven by purpose.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        {/* <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-5G5QS2VJ');
            `,
          }}
        /> */}
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
        {/* End Google Tag Manager */}
      </head>
      <body className={circeRoundRegular.className}>
        <Suspense>
          <GTMPageViewTracker />
        </Suspense>
        <QueryProvider>{children}</QueryProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
