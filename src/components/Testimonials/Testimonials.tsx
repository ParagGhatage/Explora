"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";


export function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-pink-50 dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={Categories}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const Categories = [
  
  {
    quote:
      "",
    
    name: "",
    title: "Japan",
     sourc:"https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
     {
    quote: "",
    name: "",
    title: "India",
     sourc:"https://images.pexels.com/photos/3574440/pexels-photo-3574440.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    quote:
      "",
    name: "Ice Land",
    title: "",
     sourc:"https://images.pexels.com/photos/831061/pexels-photo-831061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    quote:
      "",
    name: "",
    title: "Nepal",
     sourc:"https://images.pexels.com/photos/3027138/pexels-photo-3027138.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
];