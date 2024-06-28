'use client'
import React from 'react';
import {
    IconBrandGithub,
    IconBrandGoogle,
    Icon3dCubeSphere,
    IconBrandX,
    IconBrandGmail,
    IconBrandInstagram,
    IconBrandLinkedin,
    IconPhoneCall,
    IconLocation
  } from "@tabler/icons-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="md:flex justify-between items-center">
          {/* Left section */}
          <div className="mb-6 md:mb-0">
            <h5 className="font-bold text-lg mb-2">Quick Links</h5>
            <ul className="list-none">
              <li className="mb-1">
                <a href="Home" className="hover:text-gray-300">Home</a>
              </li>
              <li className="mb-1">
                <a href="Countries" className="hover:text-gray-300">Countries</a>
              </li>
              <li className="mb-1">
                <a href="About" className="hover:text-gray-300">About</a>
              </li>
              <li className="mb-1">
                <a href="/ContactUs" className="hover:text-gray-300">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Right section */}
          <div>
            <h5 className="font-bold text-lg mb-2">Contact Information</h5>
            <p className="mb-2">India</p>
            <p className="mb-2">Email: phghatage1@gmail.com</p>
            <p className="mb-2">Phone: +91 9552417320</p>

            {/* Social icons */}
            <div className="flex space-x-4 mt-4">
              <a href="https://github.com/ParagGhatage" className="text-slate-300 hover:text-white">
                <IconBrandGithub/>
              </a>
              <a href="https://www.linkedin.com/in/parag-ghatage-7601b825a/" className="text-slate-300 hover:text-white">
                <IconBrandLinkedin/>
              </a>
              <a href="https://x.com/PARAG_GHATAGE" className="text-slate-300 hover:text-white">
                <IconBrandX/>
              </a>
              <a href="https://www.instagram.com/reels/C70qsGESUf3/" className="text-slate-300 hover:text-white">
                <IconBrandInstagram/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;