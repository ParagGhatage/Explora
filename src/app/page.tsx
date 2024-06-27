import Image from "next/image";
import { Landing } from "@/components/Landing/Landing";

export default function Home() {
  return (
    <main className="bg-indigo-100">
      <div className="bg-indigo-100 ">
          <Landing/>
      </div>
    </main>
  );
}
