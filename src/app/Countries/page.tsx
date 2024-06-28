'use client'
import React, { ChangeEvent, useState ,useEffect} from 'react'
import Country from './CountryPhotos/page'
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar/Navbar';
function page() {
    const[searchQuery,setsearchquery]=useState('');
    const router=useRouter()
    
    
    const handleSearchChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        
    setsearchquery(e.target.value)
    }
    const handleSearchSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    
       e.preventDefault();
       router.push(`/Countries/CountryPhotos?query=${encodeURIComponent(searchQuery)}`);
     
       console.log(searchQuery)
    
    }
    return (
        <div className='bg-indigo-100'>
       <Navbar></Navbar>
        <div className="max-w-lg mx-auto mt-8 p-4 ">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">Explore Travel Destinations</h1>
        
        <form onSubmit={handleSearchSubmit} className="mb-8">
          <div className="flex items-center bg-white rounded-lg shadow-md p-4">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for travel destinations..."
              className="flex-grow px-4 py-2 border-none rounded-l-lg focus:outline-none focus:ring-2 focus:ring-neutral-700"
            />
            <button
              type="submit"
              className=" text-center border text-black font-extrabold bg-violet-600 p-5 rounded-full border-stone-950 hover:bg-fuchsia-500"
            >
              Search                             
            </button>
          </div>
        </form>
      

    </div>
    </div>
  )
}

export default page