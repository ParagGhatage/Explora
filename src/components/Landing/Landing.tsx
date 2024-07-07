'use client'
import Image from "next/image";
import { Paralax } from "../UIElements/Grid/Paralax";
import Link from "next/link";


export function Landing(){
    return(
        <div className="flex flex-col lg:flex-row justify-between h-full w-full">

        <div className="m-5 mt-20 lg:mt-20 ml-6 lg:m-0">
          <div className="text-black font-sans text-left text-5xl sm:text-7xl">
            Adventure
          </div>
          <div className="text-black font-sans text-left text-5xl sm:text-7xl">
            is 
          </div>
          <div className="text-black font-sans text-left text-5xl sm:text-7xl">
            worthwhile.
          </div>
          <div className="m-10 sm:m-16 sm:ml-20">
            <Link href={"/Home"}>
              <button className="text-center text-white font-extrabold bg-violet-600 p-5 rounded-full hover:bg-fuchsia-500 hover:text-black">
                Let &apos; s Explore &rarr; 
              </button>
            </Link>
          </div>
        </div>
      
        <div className="w-full">
          <Paralax />
        </div>
      
      </div>
      
            
            
    )
}