'use client'
import Image from "next/image";
import { Paralax } from "../UIElements/Grid/Paralax";
import Link from "next/link";


export function Landing(){
    return(
            <div className="flex w-max justify-between h-full">

                <div className="m-5 mt-20">
                <div className="text-black font-sans text-left text-7xl">
                Adventure
                </div>
                <div className="text-black font-sans text-left text-7xl">
                is 
                </div>
                <div className="text-black font-sans text-left text-7xl">
                worthwhile.
                </div>
                <div className="m-16 ml-20">
                <Link href={"/Home"}>
                    <button className=" text-center border text-black font-extrabold bg-violet-600 p-5 rounded-full border-stone-950 hover:bg-fuchsia-500">
                            Let's Explore 
                    </button>
                </Link>
                </div>
                </div>
                
                <div className="w-full">
                   <Paralax/>
                </div>

            </div>
            
            
    )
}