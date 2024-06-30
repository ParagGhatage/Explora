'use client'
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PexelsQuery } from '@/components/APIs/Pexels/Query';
import Image from 'next/image';
import Navbar from '@/components/Navbar/Navbar';
import { Run } from '@/components/APIs/Gemini/Recommendations';
import { Plan } from '@/components/APIs/Gemini/RoutePlan';

interface TouristDestinationsProps {
  query: string;
}


const Route: React.FC<TouristDestinationsProps> = () => {
  const [start,setStart] = useState('')
  const [end,setEnd] = useState('')
  const [plan,setTravelPlan] = useState([])
  
  const handleStartChange = (e: ChangeEvent<HTMLInputElement>) => {
    
    setStart(e.target.value);
  };
  const handleEndChange = (e: ChangeEvent<HTMLInputElement>) => {
    
    setEnd(e.target.value);
  };
  

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await Plan(start,end);
    const datails = data.candidates[0].content.parts[0].text
    const arr=datails.split("\n");
    console.log(arr)
    setTravelPlan(arr)
    
  };

  return (
    <div className="min-h-screen bg-indigo-100">
      <Navbar></Navbar>
      <div className="max-w-80% mx-auto mt-8 p-4">
        <h1 className="text-4xl font-bold text-center text-gray-900 pb-4">Plan Your Trip</h1>
        <form onSubmit={handleSearchSubmit} className="bg-white rounded-lg shadow-lg p-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={start}
              onChange={handleStartChange}
              placeholder="Your Location"
              className="bg-teal-50 p-6 w-screen border-transparent border m-7"
            />
            <input
              type="text"
              value={end}
              onChange={handleEndChange}
              placeholder="Your Destination"
              className="bg-teal-50 p-6 w-screen border-transparent border m-7"
            />
            <button
              type="submit"
              className="text-center text-white font-extrabold bg-violet-600 p-5 rounded-full hover:bg-fuchsia-500"
            >
              Search
            </button>
          </div>
          </form> 
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
          {plan ?  (
            <div>
            <div className='text-center text-3xl justify-center bg-lime-200 rounded-lg p-3'>
           Your plan &darr;
        </div>

            <div className="text-gray-700 flex flex-wrap">
                {plan.map((element) => (
                <div key={element} className="p-3 text-middle text-2xl ">
                  {element}
                </div>
              ))}
                
                
            </div>
            </div>

          ) : (
            <div className="text-gray-700">Creating your trip plan</div>
          )}

        </div>
    </div>
)}

export default Route;