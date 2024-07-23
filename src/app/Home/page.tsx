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
    <div className='bg-orange-100  w-full mt-0 pt-0'>
    
  <div className='w-full'>
    <img
      src="https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      alt=""
      className='w-full object-cover'
    />
    
  </div>
  <div className='text-center w-full text-5xl font-bold font-sans  mt-5'>
    <h1>Categories</h1>
  </div>
  
  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 w-full'>
  <Link href={"/Countries/CountryPhotos/TopDestinations?query=Cities"}>
      <ThreeDCardDemo
        title="Cities"
        sourc='https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg?auto=compress&cs=tinysrgb&w=600'
      />
    </Link>
  <Link href={"/Countries/CountryPhotos/TopDestinations?query=Adventure places"}>
      <ThreeDCardDemo
        title="Adventure"
        sourc='https://images.pexels.com/photos/390051/surfer-wave-sunset-the-indian-ocean-390051.jpeg?auto=compress&cs=tinysrgb&w=600'
      />
    </Link>
    <Link href={"/Countries/CountryPhotos/TopDestinations?query=Space related"}>
      <ThreeDCardDemo
        title="Space"
        sourc='https://images.pexels.com/photos/3862606/pexels-photo-3862606.jpeg?auto=compress&cs=tinysrgb&w=600'
      />
    </Link>
    <Link href={"/Countries/CountryPhotos/TopDestinations?query=ancient civilizations"}>
      <ThreeDCardDemo
        title="Ancient Civilizations"
        sourc='https://images.pexels.com/photos/5862696/pexels-photo-5862696.jpeg?auto=compress&cs=tinysrgb&w=600'
      />
    </Link>
    <Link href={"/Countries/CountryPhotos/TopDestinations?query=Religious places"}>
      <ThreeDCardDemo
        title="Religious"
        sourc='https://images.pexels.com/photos/415708/pexels-photo-415708.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      />
    </Link>
    <Link href={"/Countries/CountryPhotos/TopDestinations?query=Museums"}>
      <ThreeDCardDemo
        title="Museums"
        sourc='https://images.pexels.com/photos/1604991/pexels-photo-1604991.jpeg?auto=compress&cs=tinysrgb&w=600'
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

  <div className='p-5 w-100% mt-10'>
    <div className='text-center w-full text-3xl font-semibold font-sans  p-2 m-7'>
      
      <Link href={"/Countries/CountryPhotos/TopDestinations?query=world"}>
        <button className=" rounded-xl p-5 hover:bg-white hover:text-black hover:border-2 hover:border-black bg-black hover:font-bold  text-white text-2xl font-bold">
          Explore Popular Destinations &rarr;
        </button>
      </Link>

      <div className='text-center text-4xl text-black font-extrabold hover:text-black mt-7'>Popular Destinations</div>
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