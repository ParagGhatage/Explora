"use client"
import React, { useEffect, useState } from 'react';

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);
  return (
    isVisible && (
      <div className="fixed inset-0 flex items-center justify-center  bg-white z-50">
        <img src="/logo.svg" alt="Explora logo" className="w-full h-full" />
      </div>
    )
  );
};

export default SplashScreen;
