'use client'
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PexelsQuery } from '@/components/APIs/Pexels/Query';
import Image from 'next/image';
import Navbar from '@/components/Navbar/Navbar';
import { Run } from '@/components/APIs/Gemini/Recommendations';
import { Plan } from '@/components/APIs/Gemini/RoutePlan';
import { Divide } from 'lucide-react';

interface TouristDestinationsProps {
  query: string;
}




const Route: React.FC<TouristDestinationsProps> = () => {

  //for input
  const [start,setStart] = useState('')
  const [end,setEnd] = useState('')
  const [date,setDate] = useState("")
  const [days,setDays] = useState()

  //for overall travel plan
  const [accommodation,setAccomodation] = useState({})
  const [activities,setActivities] = useState([{}])
  const [budget,setBudget] = useState({})
  const [packingList,setPackingList] = useState([])
  const [transportation,setTransportation] = useState([])

  //for specific travel components
  const [flight,setFlight] = useState({})
  const [train,setTrain] = useState({})
  const [road,setRoad] = useState({})

  //Entire plan
  const [plan,setTravelPlan] = useState({})
  
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
  const handleDaysChange = (e: ChangeEvent<HTMLInputElement>) => {
    
    const days1 = e.target.value;
    
    setDays(days1);
  };
  

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await Plan(start,end,date,days);
    
    console.log(data)

    //Main fields
    setAccomodation(data.Details.Accommodation[0])
    setActivities(data.Details.Activities)
    setBudget(data.Details.Budget)
    setPackingList(data.Details.PackingList)
    setTransportation(data.Details.Transportation)

    //sub components
    setFlight(data.Details.Transportation[0].Details)
    setTrain(data.Details.Transportation[1].Details)
    setRoad(data.Details.Transportation[2].Details)

    //Entire plan
    setTravelPlan({accommodation,activities,budget,packingList,transportation})

    
  };



  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
  <Navbar />
  <div className="max-w-screen mx-auto mt-16 p-6 bg-white rounded-lg shadow-lg">
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
        <input
          value={days}
          onChange={handleDaysChange}
          placeholder="Days"
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

  <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8 py-12">
    {activities ? (
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-8">
        <div className='text-center text-3xl font-semibold mb-6'>
          Your plan &darr;
        </div>
        
        {/* Transportation */}
        <div>
          <div className='text-black text-3xl font-bold text-center p-4 m-4'>
            Transportation options
          </div>
          <div className='flex flex-wrap justify-center space-y-4 md:space-y-0 md:space-x-4'>
            {/* Flight */}
            <div className='p-6 bg-fuchsia-100 rounded-md text-center shadow-lg'>
              <div className='text-center text-xl font-serif font-semibold mb-4'>
                Flight
              </div>
              <ol className='space-y-2'>
                <li>Info: {flight.AdditionalInfo}</li>
                <li>Departure Location: {flight.DepartureLocation}</li>
                <li>Departure Time: {flight.DepartureTime}</li>
                <li>Duration: {flight.Duration}</li>
                <li>Booking: {flight.Booking}</li>
                <li>Arrival Location: {flight.ArrivalLocation}</li>
                <li>Arrival Time: {flight.ArrivalTime}</li>
                <li>Cost: {flight.Cost} {budget.Currency}</li>
              </ol>
            </div>
            
            {/* Train */}
            <div className='p-6 bg-fuchsia-100 rounded-md text-center shadow-lg'>
              <div className='text-center text-xl font-serif font-semibold mb-4'>
                Train
              </div>
              <ol className='space-y-2'>
                <li>Info: {train.AdditionalInfo}</li>
                <li>Departure Location: {train.DepartureLocation}</li>
                <li>Departure Time: {train.DepartureTime}</li>
                <li>Duration: {train.Duration}</li>
                <li>Booking: {train.Booking}</li>
                <li>Arrival Location: {train.ArrivalLocation}</li>
                <li>Arrival Time: {train.ArrivalTime}</li>
                <li>Cost: {train.Cost} {budget.Currency}</li>
              </ol>
            </div>
            
            {/* Road */}
            <div className='p-6 bg-fuchsia-100 rounded-md text-center shadow-lg'>
              <div className='text-center text-xl font-serif font-semibold mb-4'>
                Road
              </div>
              <ol className='space-y-2'>
                <li>Info: {road.AdditionalInfo}</li>
                <li>Departure Location: {road.DepartureLocation}</li>
                <li>Departure Time: {road.DepartureTime}</li>
                <li>Duration: {road.Duration}</li>
                <li>Booking: {road.Booking}</li>
                <li>Arrival Location: {road.ArrivalLocation}</li>
                <li>Arrival Time: {road.ArrivalTime}</li>
                <li>Cost: {road.Cost} {budget.Currency}</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Activities */}
        <div className='text-center'>
          <div className='text-black text-3xl font-bold p-4 m-4'>
            Activities
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {activities.map((activity) => (
              <div className='p-4 bg-fuchsia-100 rounded-md text-center shadow-lg'>
                <ol className='space-y-2'>
                  <li>Date: {activity.Date}</li>
                  <li>Name: {activity.Name}</li>
                  <li>Location: {activity.Location}</li>
                  <li>Time: {activity.Time}</li>
                  <li>Info: {activity.AdditionalInfo}</li>
                  <li>Booking: {activity.Booking}</li>
                  <li>Cost: {activity.Cost}</li>
                </ol>
              </div>
            ))}
          </div>
        </div>

        {/* Accommodation */}
        <div className='text-center bg-lime-200 rounded-md shadow-lg p-6'>
          <div className='text-3xl p-4 font-sans font-bold'>
            Accommodations
          </div>
          <ol className='space-y-2'>
            <li>Check In Date: {accommodation.CheckInDate}</li>
            <li>Check Out Date: {accommodation.CheckOutDate}</li>
            <li>Info: {accommodation.AdditionalInfo}</li>
            <li>Name of place: {accommodation.Name}</li>
            <li>Address: {accommodation.Address}</li>
            <li>Type: {accommodation.Type}</li>
            <li>Contact info: {accommodation.ContactInfo}</li>
            <li>Cost Per Night: {accommodation.CostPerNight}</li>
            <li>Total Stay Cost: {accommodation.TotalCost}</li>
          </ol>
        </div>

        {/* Expenses */}
        <div className='text-center bg-lime-200 rounded-md shadow-lg p-6'>
          <div className='text-3xl p-4 font-sans font-bold'>
            Expenses
          </div>
          <ol className='space-y-2'>
            <li>Currency: {budget.Currency}</li>
            <li>Total trip Cost: {budget.TotalCost}</li>
            <li>Flight Cost: {budget.FlightCost}</li>
            <li>Accommodation Cost: {budget.AccommodationCost}</li>
            <li>Food Cost: {budget.FoodCost}</li>
            <li>Activities Cost: {budget.ActivitiesCost}</li>
          </ol>
        </div>

        {/* Packing List */}
        <div className='text-center bg-lime-200 rounded-md shadow-lg p-6'>
          <div className='text-3xl p-4 font-sans font-bold'>
            Packing List
          </div>
          <div className='space-y-2'>
            {packingList.map((item) => (
              <div className='p-2 m-1'>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    ) : (
      <div className="text-black-700 text-center text-xl font-semibold">
        Creating your trip plan...
      </div>
    )}
  </div>
</div>


)}

export default Route;