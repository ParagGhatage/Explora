import Image from "next/image";
import { ContactUs } from "@/components/ContactUs/ContactUs";
import Navbar from "@/components/Navbar/Navbar";

export default function Home() {
  return (
    <main className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 w-full h-full">
      <div className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 w-full h-full ">
       
          <ContactUs/>
      </div>
    </main>
  );
}
