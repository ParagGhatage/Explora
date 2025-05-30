"use client";

import { cn } from "@/utils/cn";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = false,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
    sourc:string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  },[]);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "70s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
        
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-5  py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
             
        {items.map((item, idx) => (
           <Link
           key={item.name}
           href={`/Countries/CountryPhotos?query=${encodeURIComponent(item.title)}`}>
          <li
            
            className="w-[350px] max-w-full  relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-100 px-8 py-6 md:w-[450px]"
            style={{
              background:
                "linear-gradient(180deg, var(--slate-100), var(--slate-100)",
            }}
            
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              <span className=" relative z-20 text-sm leading-[1.6] text-black font-normal">
                {item.quote}
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <span className=" text-2xl leading-[1.6] text-black font-normal text-center">
                    {item.name}
                  </span>
                  <span className=" text-2xl leading-[1.6] text-black font-normal text-center">
                    {item.title}
                  </span>
                  
                  <span className=" text-2xl leading-[1.6] text-black font-normal hover: w-full text-center">
                   <img src={item.sourc} alt=""  height="1000"  width="1000" className="h-50 w-full object-cover rounded-xl group-hover/card:shadow-xl"   /> 
                  </span>

                </span>
              </div>
            </blockquote>
          </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};