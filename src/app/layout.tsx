"use client"
import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation"; // Import usePathname
import Navbar from "@/Navbar/Navbar";
import { metadata } from "./metadata"; // Import metadata
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ChakraProvider } from '@chakra-ui/react'


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Use usePathname to get the current path
  const noNavbarRoutes = ["/"];

  return (
    <html lang="en">
      <head>
        <title>{metadata.title as string}</title>
        <meta name="description" content={metadata.description as string} />
        <meta name="norton-safeweb-site-verification" content="ZARL500DA-YRHO3ZO305VTY0SGCXC1O922JCI55IFI-9BC4L31TV0KVJ2QSO6QXQQZOVKFKKI6AWMB2ARVYN7U71ZXX5RNWRMNSMZM840-MUK-H8VATCNKQ1--P83X8N" />
      </head>
      <ChakraProvider>
      <body className={inter.className}>
        <SessionProvider>
          <Navbar />
          <div>{children}</div>
          <Analytics />
          <SpeedInsights />
        </SessionProvider>
      </body>
      </ChakraProvider>
    </html>
  );
}
