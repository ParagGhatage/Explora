"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import { useSession } from "next-auth/react";
interface cardprop{
  title:string
  sourc:string
 

}

const ThreeDCardDemo:React.FC<cardprop>=({title,sourc})=> {
  const { data: session } = useSession();
  return (
      
    <CardContainer className="inter-var w-96 h-96  px-5 ">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1]  sm:w-[30rem]  rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-black dark:text-white"
        >
         {title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Click to explore
        </CardItem>
        <CardItem
          translateZ="100"
          rotateX={20}
          rotateZ={-10}
          className="w-full mt-4"
        >
          <Image
            src={sourc}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
        <Link href={"/Countries"}>
          <CardItem
            translateZ={0}
            translateX={0}
            as="button"
            className="px-4 py-2 rounded-xl text-xl font-normal border border-black"
          >
            Try now &rarr;
          </CardItem>
          </Link>
          <div>
            {session?(null):(
              <Link href={"/SignIn"}>
              <CardItem
                translateZ={0}
                translateX={0}
                as="button"
                className="px-4 py-2 rounded-xl bg-black  text-white text-xl font-bold"
              >
               Sign in
              </CardItem>
              </Link>
            )}
          </div>
          
        </div>
      </CardBody>
    </CardContainer>
    
  );
}
export { ThreeDCardDemo}