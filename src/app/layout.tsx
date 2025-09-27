import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/header";
import {ClientThemeWrapper, ThemeProvider} from "@/components/themeController";
import Footer from "@/components/footer";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { ToastContainer } from 'react-toastify';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Firefly Analytics",
  description: "Analytics tool for Veritas",
    icons: {
      icon: "/ff-sranalysis.png",
      shortcut: "/ff-sranalysis.ico",
      apple: "/ff-sranalysis.png",
    },
    openGraph: {
      title: "Firefly Analytics",
      description: "Analytics tool for Veritas",
      url: "https://sranalysis.kain.id.vn",
      siteName: "Firefly Analytics",
      images: [
        {
          url: "https://sranalysis.kain.id.vn/ff-sranalysis.png",
          width: 312,
          height: 312,
          alt: "Firefly Analytics Logo",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Firefly Analytics",
      description: "Analytics tool for Veritas",
      images: ["https://sranalysis.kain.id.vn/ff-sranalysis.png"],
    },
  };

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  const locale = await getLocale()
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
          <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <ClientThemeWrapper>
              <div className="h-full">
                <Header></Header>
                {children}
                <Footer></Footer>
              </div>
            </ClientThemeWrapper>
          </ThemeProvider>
          </NextIntlClientProvider>
          <ToastContainer/>
      </body>
    </html>
  );
}
