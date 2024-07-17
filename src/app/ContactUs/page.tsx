import Image from "next/image";
import { ContactUs } from "@/components/ContactUs/ContactUs";
import Navbar from "@/Navbar/Navbar";

export default function Home() {
  return (
    <main className="bg-orange-100 pt-20  w-full h-full">
      <div className="bg-orange-100 w-full h-full ">
       
          <ContactUs/>
      </div>
    </main>
  );
}
