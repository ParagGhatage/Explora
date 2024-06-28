'use client'
import React from 'react'
import Navbar from '@/components/Navbar/Navbar'

import { InfiniteMovingCardsDemo } from '@/components/Testimonials/Testimonials'
import Footer from '@/components/Footer/Footer'
import { ThreeDCardDemo } from '@/components/Categories/Categories'

function page() {
  return (
    <div className='bg-indigo-100 w-100%'>
    
     <Navbar></Navbar>
     <div className='p-20 w-100%' >
      
      <img src="https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt=""  
      className=' rounded-2xl w-100%'/>
     </div>
     <div className=' text-center w-100% text-5xl text-bold font-sans opacity-70'><h1>Categories</h1></div>
    <div className='flex w-100%'>
        
       <ThreeDCardDemo title="Religious" sourc='https://images.pexels.com/photos/415708/pexels-photo-415708.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'></ThreeDCardDemo>
       <ThreeDCardDemo title="Historical" sourc='https://images.pexels.com/photos/3185488/pexels-photo-3185488.jpeg?auto=compress&cs=tinysrgb&w=600'></ThreeDCardDemo>
       <ThreeDCardDemo title="Nature" sourc='https://images.pexels.com/photos/2918152/pexels-photo-2918152.jpeg?auto=compress&cs=tinysrgb&w=600'></ThreeDCardDemo>
       
      </div> 
    
<div className='p-5 w-100%'>
     <div>
     <div className=' text-center w-100% text-3xl text-bold font-sans opacity-70 font-semibold p-2 m-7'><h1>Popular Destinations</h1></div>
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