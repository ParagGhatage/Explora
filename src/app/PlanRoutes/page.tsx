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
  const [plan,setTravelPlan] = useState([])
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
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className='text-center text-3xl font-semibold mb-6'>
          Your plan &darr;
        </div>
        
        {/* //Transportation */}
        <div >
        <div className='text-black text-3xl font-bold text-center p-4 m-4'>
          Transportation options
        </div>
        <div className='flex justify-between p-2 m-3'>
                {/* //Flight */}
              <div className=' p-1 m-2 bg-fuchsia-100 rounded-md text-center shadow shadow-slate-400'>
                <div className='text-center text-xl font-serif font-semibold p-4'>
                Flight
                </div>
                <div className=''>
                    <ol>
                      <li className='p-2'>Info : {flight.AdditionalInfo}</li>
                      <li className='p-2'>Departure Location : {flight.DepartureLocation}</li>
                      <li className='p-2'>Departure Time : {flight.DepartureTime}</li>
                      <li className='p-2'>Duration : {flight.Duration}</li>
                      <li className='p-2'>Booking : {flight.Booking}</li>
                      <li className='p-2'>Arrival Location : {flight.ArrivalLocation}</li>
                      <li className='p-2'>Arrival Time : {flight.ArrivalTime}</li>
                      <li className='p-2'>Cost : {flight.Cost} {budget.Currency}</li>
                    </ol>
                </div>
              </div>

            {/* //Train */}
              <div className=' p-1 m-2  bg-fuchsia-100 rounded-md text-center shadow shadow-slate-400'>
              <div className='text-center text-xl font-serif font-semibold p-4'>
                Train
                </div>
                <div>
                    <ol>
                      <li className='p-2'>Info : {train.AdditionalInfo}</li>
                      <li className='p-2'>Departure Location : {train.DepartureLocation}</li>
                      <li className='p-2'>Departure Time : {train.DepartureTime}</li>
                      
                      <li className='p-2'>Duration : {train.Duration}</li>
                      <li className='p-2'>Booking : {train.Booking}</li>
                      <li className='p-2'>Arrival Location : {train.ArrivalLocation}</li>
                      <li className='p-2'>Arrival Time : {train.ArrivalTime}</li>
                      <li className='p-2'>Cost : {train.Cost} {budget.Currency}</li>
                    </ol>
                </div>
              </div>

            {/* //Road */}
              <div className=' p-1 m-2  bg-fuchsia-100 rounded-md text-center shadow shadow-slate-400'>
              <div className='text-center text-xl font-serif font-semibold p-4'>
                Road
                </div>
                <div>
                    <ol>
                      <li className='p-2'>Info : {road.AdditionalInfo}</li>
                      <li className='p-2'>Departure Location : {road.DepartureLocation}</li>
                      <li className='p-2'>Departure Time : {road.DepartureTime}</li>
                      
                      <li className='p-2'>Duration : {road.Duration}</li>
                      <li className='p-2'>Booking : {road.Booking}</li>
                      <li className='p-2'>Arrival Location : {road.ArrivalLocation}</li>
                      <li className='p-2'>Arrival Time : {road.ArrivalTime}</li>
                      <li className='p-2'>Cost : {road.Cost} {budget.Currency}</li>
                    </ol>
                </div>

              </div>
        </div>
      </div>

        {/* //Activities */}
        <div className='text-center justify-evenly'>
          <div className='text-black text-3xl font-bold text-center p-4 m-4'>
            Activities :
          </div>
          <div className='flex justify-evenly text-center p-2 m-3'>
          {activities.map((activity) => (
            <div className=' p-1 m-2 bg-fuchsia-100 rounded-md text-center shadow shadow-slate-400'>
                <ol>
                   <li className='p-2'>Date : {activity.Date}</li>
                   <li className='p-2'>Name : {activity.Name}</li>
                   <li className='p-2'>Location : {activity.Location}</li>
                   <li className='p-2'>Time : {activity.Time}</li>
                   <li className='p-2'>Info : {activity.AdditionalInfo}</li>
                   <li className='p-2'>Booking : {activity.Booking}</li>
                   <li className='p-2'>Cost : {activity.Cost}</li>
                </ol>
            </div>
          ))}
          </div>
        </div>

        {/* //Accomodation */}
        <div className='text-center m-2 p-2 bg-lime-200 rounded-md'>
          <div className='text-3xl p-4 m-4 font-sans font-bold'>
            Accomodations
          </div>
          <div>
            <ol>
              <li className='p-2 m-1'>Check In Date : {accommodation.CheckInDate}</li>
              <li className='p-2 m-1'>Check Out Date : {accommodation.CheckOutDate}</li>
              <li className='p-2 m-1'>Info : {accommodation.AdditionalInfo}</li>
              <li className='p-2 m-1'>Name of place : {accommodation.Name}</li>
              <li className='p-2 m-1'>Address : {accommodation.Address}</li>
              <li className='p-2 m-1'>Type : {accommodation.Type}</li>
              <li className='p-2 m-1'>Contact info : {accommodation.ContactInfo}</li>
              <li className='p-2 m-1'>Cost Per Night : {accommodation.CostPerNight}</li>
              <li className='p-2 m-1'>Total Stay Cost : {accommodation.TotalCost}</li>
            </ol>
          </div>
        </div>

        {/* //Expenses */}
        <div className='text-center m-2 p-2 bg-lime-200 rounded-md'>
            <div className='text-3xl p-4 m-4 font-sans font-bold'>
                Expenses
            </div>
            <div>
              <ol>
                <li className='p-2 m-1'>Currency : {budget.Currency}</li>
                <li className='p-2 m-1'>Total trip Cost : {budget.TotalCost}</li>
                <li className='p-2 m-1'>Flight Cost : {budget.FlightCost}</li>
                <li className='p-2 m-1'>Accomodation Cost : {budget.AccommodationCost}</li>
                <li className='p-2 m-1'>Food Cost : {budget.FoodCost}</li>
                <li className='p-2 m-1'>Activities Cost : {budget.ActivitiesCost}</li>





              </ol>
            </div>
        </div>

        {/* //Packing List */}
        <div className='text-center m-2 p-2 bg-lime-200 rounded-md'>
        <div className='text-3xl p-4 m-4 font-sans font-bold'>
            Packing List
          </div>
          <div>
          {packingList.map((item) => (
            <div className='p-2 m-1'>
                {item}
            </div>
          ))}
          </div>
        </div>

      </div>
      
    ) : (

      <div className="text-black-700 text-center text-xl  font-semibold">
        Creating your trip plan...
      </div>
    )}

  </div>
</div>

)}

export default Route;