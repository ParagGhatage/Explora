"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
interface cardprop{
  title:string
  sourc:string

}

const ThreeDCardDemo:React.FC<cardprop>=({title,sourc})=> {
  return (
    <CardContainer className="inter-var h-92  px-5 text-center justify-center w-full">
      <CardBody className="bg-gray-50 text-center justify-center relative   dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1]  sm:w-[30rem]  rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-black text-center justify-center dark:text-white"
        >
         {title}
        </CardItem>
        
        <CardItem
          translateZ="100"
          rotateX={20}
          rotateZ={-10}
          className="w-full mt-4 text-center"
        >
          <Image
            src={sourc}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20 text-center">
            <a href="/Countries">
          <CardItem
            translateZ={20}
            translateX={-40}
            as="button"
            className=" text-center mt-6 text-white font-extrabold bg-fuchsia-500 p-5 rounded-full border-2 border-fuchsia-500 shadow-lg transform transition duration-300 ease-in-out hover:bg-violet-300 hover:text-black hover:scale-105 hover:border-violet-300"
          >
            Try now &rarr;
          </CardItem>
          </a>

          <a href="/SignIn">
          <CardItem
            translateZ={20}
            translateX={40}
            as="button"
            className="text-center mt-6 text-white font-extrabold bg-fuchsia-500 p-5 rounded-full border-2 border-fuchsia-500 shadow-lg transform transition duration-300 ease-in-out hover:bg-violet-300 hover:text-black hover:scale-105 hover:border-violet-300"
          >
            Sign In &rarr;
          </CardItem>
          </a>

        </div>
      </CardBody>
    </CardContainer>
  );
}
export { ThreeDCardDemo}