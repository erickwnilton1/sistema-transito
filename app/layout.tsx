import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Boletim de Sinistro de Trânsito",
  description:
    "Boletim de Sinistro de Trânsito - Autarquia Municipal de Trânsito e Transportes",
  icons: {
    icon: ["/logo-amttrans.png"],
  },
  keywords: [
    "trânsito",
    "boletim de ocorrência",
    "agentes de trânsito",
    "AMTTRANS",
    "Prefeitura do Ipojuca",
    "gestão municipal",
    "sistema de trânsito",
  ],
  openGraph: {
    title: "Boletim de Sinistro de Trânsito",
    description: "Gerencie boletins de ocorrência de forma rápida e eficiente.",
    url: "",
    siteName: "Boletim de Sinistro de Trânsito",
    images: [
      {
        url: "/logo-amttrans.png",
        width: 500,
        height: 500,
        alt: "Logo AMTTRANS",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  manifest: "/manifest.json",
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 3000 }}
        />
        {children}
      </body>
    </html>
  );
}
