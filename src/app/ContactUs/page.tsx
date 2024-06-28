import Image from "next/image";
import { ContactUs } from "@/components/ContactUs/ContactUs";
import Navbar from "@/components/Navbar/Navbar";

export default function Home() {
  return (
    <main className="bg-indigo-100 w-full h-full">
      <div className="bg-indigo-100 w-full h-full ">
        <Navbar/>
          <ContactUs/>
      </div>
    </main>
  );
}
