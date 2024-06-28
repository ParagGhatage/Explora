'use client'
import React from 'react'
import Navbar from '@/components/Navbar/Navbar'

import { InfiniteMovingCardsDemo } from '@/components/Testimonials/Testimonials'
import Footer from '@/components/Footer/Footer'
import { ThreeDCardDemo } from '@/components/Categories/Categories'

function page() {
  return (
    <div className='bg-indigo-100'>
    
     <Navbar></Navbar>
     <div className='p-28' >
      <img src="https://images.pexels.com/photos/3030268/pexels-photo-3030268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt=""  className=' rounded-2xl' />
     </div>
     <div className=' text-center  text-5xl text-bold font-sans opacity-70'><h1>Categories</h1></div>
    <div className='flex '>
        
       <ThreeDCardDemo title="Religious" sourc='https://images.pexels.com/photos/415708/pexels-photo-415708.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'></ThreeDCardDemo>
       <ThreeDCardDemo title="Historical" sourc='https://images.pexels.com/photos/161183/thailand-monks-temple-tourism-161183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'></ThreeDCardDemo>
       <ThreeDCardDemo title="Nature" sourc='https://images.pexels.com/photos/235731/pexels-photo-235731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'></ThreeDCardDemo>
       
      </div> 
    
<div className='p-5'>
     <div>
     <div className=' text-center  text-3xl text-bold font-sans opacity-70 font-semibold p-4 m-7'><h1>Popular Destinations</h1></div>
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

export default page