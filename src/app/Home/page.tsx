'use client'
import React from 'react'
import { InfiniteMovingCardsDemo } from '@/components/Testimonials/Testimonials'
import Footer from '@/components/Footer/Footer'
import { ThreeDCardDemo } from '@/components/Categories/Categories'
import Link from 'next/link'
import { useState } from 'react'
import { useSession } from 'next-auth/react'


const  Page = () => {

  
    
  return (
    <div className='bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 w-full mt-0 pt-0'>
  <div className='w-full'>
    <img
      src="https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      alt=""
      className='w-full object-cover'
    />
  </div>
  <div className='text-center w-full text-5xl font-bold font-sans opacity-70 mt-5'>
    <h1>Categories</h1>
  </div>
  
  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 w-full'>
    <Link href={"/Countries/CountryPhotos/TopDestinations?query=Religious places"}>
      <ThreeDCardDemo
        title="Religious"
        sourc='https://images.pexels.com/photos/415708/pexels-photo-415708.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      />
    </Link>
    <Link href={"/Countries/CountryPhotos/TopDestinations?query=Historical places"}>
      <ThreeDCardDemo
        title="Historical"
        sourc='https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      />
    </Link>
    <Link href={"/Countries/CountryPhotos/TopDestinations?query=Natural wonders"}>
      <ThreeDCardDemo
        title="Nature"
        sourc='https://images.pexels.com/photos/2918152/pexels-photo-2918152.jpeg?auto=compress&cs=tinysrgb&w=600'
      />
    </Link>
  </div>

  <div className='p-5 w-full mt-10'>
    <div className='text-center w-full text-3xl font-semibold font-sans opacity-70 p-2 m-7'>
      <h1 className='text-center text-black font-extrabold hover:text-black'>Popular Destinations</h1>
      <Link href={"/Countries/CountryPhotos/TopDestinations?query=world"}>
        <button className="text-center text-white font-extrabold bg-violet-600 p-5 rounded-full hover:bg-fuchsia-500 hover:text-black m-5">
          Explore Popular Destinations &rarr;
        </button>
      </Link>
    </div>

    <InfiniteMovingCardsDemo />
  </div>

  <div>
    <Footer />
  </div>
</div>

     
  )
}

export default Page