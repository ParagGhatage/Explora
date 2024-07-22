"use client"
import Image from "next/image";
import { Landing } from "@/components/Landing/Landing";
import Page from "@/components/Home/First";
import SplashScreen from "@/components/SplashScreen/SplashScreen";
import {useEffect,useState} from "react";
import {useRouter} from "next/navigation";

export default function Home() {
  const router = useRouter()

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      router.push("/Home")
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
      
      {showSplash ? (
        <SplashScreen />
      ):null}
      
    </main>
  );
}
