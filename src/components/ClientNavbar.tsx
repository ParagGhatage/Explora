"use client";

import React from 'react';
import { usePathname } from 'next/navigation'; // Correct hook for getting the pathname
import Navbar from '@/components/Navbar/Navbar';

const ClientNavbar = () => {
  const pathname = usePathname();

  // List of paths where the Navbar should not be displayed
  const noNavbarPaths = ['/'];

  return !noNavbarPaths.includes(pathname) ? <Navbar /> : null;
};

export default ClientNavbar;
