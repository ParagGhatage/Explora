"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";


export function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-orange-200 dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={Categories}
        direction="right"
        speed="slow"
        className="bg-white"
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
     sourc:"https://images.pexels.com/photos/2758567/pexels-photo-2758567.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
     {
    quote: "",
    name: "",
    title: "India",
     sourc:"https://images.pexels.com/photos/3037435/pexels-photo-3037435.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    quote:
      "",
    name: "",
    title: "Iceland",
     sourc:"https://images.pexels.com/photos/3363331/pexels-photo-3363331.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    quote:
      "",
    name: "",
    title: "Nepal",
     sourc:"https://images.pexels.com/photos/20825921/pexels-photo-20825921/free-photo-of-aerial-view-of-the-village-on-top-of-the-mountain.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
];