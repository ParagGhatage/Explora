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
        <meta name="norton-safeweb-site-verification" content="V-CU0QVGJQ-I-50FB5XVD7PCNMN2JQVL2SZ8O624UIRW404C2W7Z11SOPL130313BTF3MV1X0STKTCL65HSYX93X0ABHQSKB46Y0RK4V3-C67RPZ2WF8F-RDX9W6F6A0" />
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
