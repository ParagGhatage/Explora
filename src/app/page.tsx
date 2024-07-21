"use client"
import Image from "next/image";
import { Landing } from "@/components/Landing/Landing";
import Page from "@/components/Home/First";
import SplashScreen from "@/components/SplashScreen/SplashScreen";
import {useEffect,useState} from "react";

export default function Home() {

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
      
      {showSplash ? (
        <SplashScreen />
      ) : (
        <Page/>
      )}
      
    </main>
  );
}
