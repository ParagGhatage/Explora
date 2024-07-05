'use client'
import React from 'react'
import Navbar from '@/components/Navbar/Navbar'

import { InfiniteMovingCardsDemo } from '@/components/Testimonials/Testimonials'
import Footer from '@/components/Footer/Footer'
import { ThreeDCardDemo } from '@/components/Categories/Categories'
import Link from 'next/link' 
import axios from 'axios'
import Router from 'next/router'
import { useRouter } from 'next/router'

const  Page = () => {

 
    
  return (
    <div className='bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 w-100% mt-0 pt-0'>
    
     
     
     <div className='p-10 w-100%' >
      
      <img src="https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt=""  
      className=' rounded-2xl w-100%'/>
     </div>
     <div className=' text-center w-100% text-5xl text-bold font-sans opacity-70'><h1>Categories</h1></div>
     <Link href={"/Countries/CountryPhotos/TopDestinations?query=world"}>
    <div className='flex w-100%'>
    
       <ThreeDCardDemo title="Religious" sourc='https://images.pexels.com/photos/415708/pexels-photo-415708.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'></ThreeDCardDemo>
       
       <ThreeDCardDemo title="Historical" sourc='https://images.pexels.com/photos/3185488/pexels-photo-3185488.jpeg?auto=compress&cs=tinysrgb&w=600'></ThreeDCardDemo>
       <ThreeDCardDemo title="Nature" sourc='https://images.pexels.com/photos/2918152/pexels-photo-2918152.jpeg?auto=compress&cs=tinysrgb&w=600'></ThreeDCardDemo>
       
      </div> 
      </Link>
    
<div className='p-5 w-100%'>
     <div>
     <div className=' text-center w-100% text-3xl text-bold font-sans opacity-70 font-semibold p-2 m-7'>
      <h1 className='mb-5'>Popular Destinations</h1>
      <Link href={"/Countries/CountryPhotos/TopDestinations?query=world"}>
      <button 
      
      
      className="text-center mt-6 text-white font-extrabold bg-fuchsia-500 p-5 rounded-full border-2 border-fuchsia-500 shadow-lg transform transition duration-300 ease-in-out hover:bg-violet-300 hover:text-black hover:scale-105 hover:border-violet-300">
  Explore Popular Destinations &rarr;
</button>
</Link>


      </div>
     </div>
     
      <InfiniteMovingCardsDemo>

      </InfiniteMovingCardsDemo>
      
    </div>
    

    
    
   
  <div>
    <Footer></Footer>
  </div>

   
   
    </div>
     
  )
}

export default Page