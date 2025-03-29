"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/Avatar/Avatar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const handleLinkClick = () => setIsOpen(false);

  // Define navigation links for easy mapping
  const navLinks = [
    { href: "/Home", label: "Home" },
    { href: "/Countries", label: "Explore" },
    { href: "/PlanRoutes", label: "Plan Trip" },
    { href: "/Countries/CountryPhotos/TopDestinations?query=world", label: "Destinations" },
    { href: "/About", label: "About" },
    { href: "/ContactUs", label: "Contact us" },
  ];

  return (
    <header className="bg-transparent w-full top-0 z-50">
      <nav className="container mx-auto">
        {/* Top Bar */}
        <div className="flex items-center justify-between p-3">
          <Link href="/Home" onClick={handleLinkClick} className="flex items-center">
            <Avatar className="bg-white p-2">
              <img src="/logo-color.svg" alt="logo" className="h-7" />
              <AvatarFallback className="ml-2">Explora</AvatarFallback>
            </Avatar>
          </Link>

          {/* Mobile Menu Toggle */}
          <button onClick={toggleMenu} aria-controls="mobile-menu" aria-expanded={isOpen} className="lg:hidden">
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={handleLinkClick} className="px-3 py-2 text-lg font-bold">
                {link.label}
              </Link>
            ))}
            {session ? (
              <button
                onClick={() => signOut()}
                className="px-3 py-2 text-white bg-black rounded hover:bg-white hover:text-black hover:border hover:border-black transition"
              >
                Sign out
              </button>
            ) : (
              <Link href="/SignIn" onClick={handleLinkClick}>
                <button className="px-3 py-2 text-white bg-black rounded hover:bg-white hover:text-black hover:border hover:border-black transition">
                  Sign in
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div id="mobile-menu" className="lg:hidden bg-white rounded-lg p-3 mt-2 space-y-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={handleLinkClick} className="block px-3 py-2 text-lg font-bold text-black">
                {link.label}
              </Link>
            ))}
            {session ? (
              <button
                onClick={() => {
                  signOut();
                  handleLinkClick();
                }}
                className="block w-full text-left px-3 py-2 text-white bg-black rounded hover:bg-white hover:text-black hover:border hover:border-black transition"
              >
                Sign out
              </button>
            ) : (
              <Link href="/SignIn" onClick={handleLinkClick}>
                <button className="block w-full text-left px-3 py-2 text-white bg-black rounded hover:bg-white hover:text-black hover:border hover:border-black transition">
                  Sign in
                </button>
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
