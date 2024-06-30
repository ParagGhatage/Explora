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
  const [date,setDate] = useState("")
  const elementsToRemove = ["[","```json","```", "]",];

  const removeElements = (arr, elements) => {
    return arr.filter(item => !elements.includes(item));
  };
  
  const handleStartChange = (e: ChangeEvent<HTMLInputElement>) => {
    
    setStart(e.target.value);
  };
  const handleEndChange = (e: ChangeEvent<HTMLInputElement>) => {
    
    setEnd(e.target.value);
  };
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    
    const dateString = e.target.value.toString();
    console.log(dateString)
    
    setDate(dateString);
  };
  

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await Plan(start,end,date);
    const datails = data.candidates[0].content.parts[0].text
    const arr=datails.split('\n');
    const newArray = removeElements(arr, elementsToRemove);
    console.log(arr)
    setTravelPlan(newArray)
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
  <Navbar />
  <div className="max-w-3xl mx-auto mt-16 p-6 bg-white rounded-lg shadow-lg">
    <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-8">Plan Your Trip</h1>
    <form onSubmit={handleSearchSubmit} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        <input
          type="text"
          value={start}
          onChange={handleStartChange}
          placeholder="Your Location"
          className="flex-1 bg-teal-50 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
        />
        <input
          type="text"
          value={end}
          onChange={handleEndChange}
          placeholder="Your Destination"
          className="flex-1 bg-teal-50 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
        />
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          placeholder="Date of Departure"
          className="flex-1 bg-teal-50 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
        />
      </div>
      <button
        type="submit"
        className="w-full py-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold rounded-lg shadow-lg hover:bg-gradient-to-l hover:from-fuchsia-500 hover:to-violet-500 transition-all duration-300"
      >
        Search
      </button>
    </form>
  </div>
  <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    {plan ? (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className='text-center text-3xl font-semibold mb-6'>
          Your plan &darr;
        </div>
        <div className="text-gray-700 flex flex-wrap justify-center space-x-4 space-y-4">
          {plan.map((element) => (
            <div key={element} className="bg-lime-100 rounded-lg p-4 text-2xl font-medium shadow-md">
              {element}
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div className="text-gray-700 text-center text-xl font-semibold">Creating your trip plan...</div>
    )}
  </div>
</div>

)}

export default Route;