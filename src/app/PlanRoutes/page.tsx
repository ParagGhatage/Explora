'use client'
import React, { useState, useEffect, ChangeEvent } from 'react';
import Navbar from '@/Navbar/Navbar';
import { Plan } from '@/components/APIs/Gemini/RoutePlan';
import axios from 'axios';

const Route: React.FC = () => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [date, setDate] = useState('');
  const [days, setDays] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [wantToSend, setWantToSend] = useState(false);

  const [accommodation, setAccommodation] = useState({});
  const [activities, setActivities] = useState([{}]);
  const [budget, setBudget] = useState({});
  const [packingList, setPackingList] = useState([]);
  const [transportation, setTransportation] = useState([]);

  const [plan, setTravelPlan] = useState<any>(null);

  const handleStartChange = (e: ChangeEvent<HTMLInputElement>) => setStart(e.target.value);
  const handleEndChange = (e: ChangeEvent<HTMLInputElement>) => setEnd(e.target.value);
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value);
  const handleDaysChange = (e: ChangeEvent<HTMLInputElement>) => setDays(e.target.value);
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);

  const onPlanSendClick = () => setWantToSend(true);

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await Plan(start, end, date, days);
    
    setAccommodation(data.Details.Accommodation[0]);
    setActivities(data.Details.Activities);
    setBudget(data.Details.Budget);
    setPackingList(data.Details.PackingList);
    setTransportation(data.Details.Transportation);

    setTravelPlan({ accommodation: data.Details.Accommodation[0], activities: data.Details.Activities, budget: data.Details.Budget, packingList: data.Details.PackingList, transportation: data.Details.Transportation });
  };

  const onSendEmail = async () => {
    try {
      const response = await axios.post('/api/planSend', { accommodation, activities, budget, packingList, transportation, email, name });
      console.log(response.data);
    } catch (error: any) {
      console.log('Unable to send email', error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r pt-20 from-indigo-200 via-purple-200 to-pink-200">
      
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
              type="number"
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
            Generate
          </button>
        </form>
      </div>

      <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {plan ? (
          <div className="bg-white rounded-lg shadow-lg p-6 space-y-8">
            <div className='text-center text-3xl font-semibold mb-6'>
              Your plan &darr;
            </div>
            <div>
              <button
                type="button"
                onClick={onPlanSendClick}
                className="w-full py-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold rounded-lg shadow-lg hover:bg-gradient-to-l hover:from-fuchsia-500 hover:to-violet-500 transition-all duration-300"
              >
               Get Plan On your Email  
               <div>
               Lets Go &rarr;
                </div>
              </button>
              <div>
                {wantToSend ? (
                  <div className='m-4 justify-center text-center'>
                    <input
                      type="text"
                      value={name}
                      onChange={handleNameChange}
                      placeholder="Your Name"
                      className=" bg-teal-50 m-3 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Your Email address"
                      className=" bg-teal-50 m-3 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                    />
                    <button
                      type="button"
                      onClick={onSendEmail}
                      className="w-full py-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold rounded-lg shadow-lg hover:bg-gradient-to-l hover:from-fuchsia-500 hover:to-violet-500 transition-all duration-300"
                    >
                      Send &rarr;
                    </button>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Rendering the plan details */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Accommodation</h2>
              <p>Check In Date: {accommodation.CheckInDate}</p>
              <p>Check Out Date: {accommodation.CheckOutDate}</p>
              <p>Info: {accommodation.AdditionalInfo}</p>
              <p>Name of place: {accommodation.Name}</p>
              <p>Address: {accommodation.Address}</p>
              <p>Type: {accommodation.Type}</p>
              <p>Contact info: {accommodation.ContactInfo}</p>
              <p>Cost Per Night: {accommodation.CostPerNight}</p>
              <p>Total Stay Cost: {accommodation.TotalCost}</p>

              <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Transportation</h2>
              {transportation.map((trans, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-xl font-semibold">{trans.Mode}</h3>
                  <p>Info: {trans.Details.AdditionalInfo}</p>
                  <p>Departure Location: {trans.Details.DepartureLocation}</p>
                  <p>Departure Time: {trans.Details.DepartureTime}</p>
                  <p>Duration: {trans.Details.Duration}</p>
                  <p>Booking: {trans.Details.Booking}</p>
                  <p>Arrival Location: {trans.Details.ArrivalLocation}</p>
                  <p>Arrival Time: {trans.Details.ArrivalTime}</p>
                  <p>Cost: {trans.Details.Cost} {budget.Currency}</p>
                </div>
              ))}

              <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Budget</h2>
              <p>Currency: {budget.Currency}</p>
              <p>Total trip Cost: {budget.TotalCost}</p>
              <p>Flight Cost: {budget.FlightCost}</p>
              <p>Accommodation Cost: {budget.AccommodationCost}</p>
              <p>Food Cost: {budget.FoodCost}</p>
              <p>Activities Cost: {budget.ActivitiesCost}</p>

              <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Activities</h2>
              {activities.map((activity, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-xl font-semibold">{activity.Name}</h3>
                  <p>Info: {activity.AdditionalInfo}</p>
                  <p>Booking: {activity.Booking}</p>
                  <p>Cost: {activity.Cost} {budget.Currency}</p>
                  <p>Start Time: {activity.Time}</p>
                  
                  <p>Location: {activity.Location}</p>
                  
                </div>
              ))}

              <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Packing List</h2>
              <ul className="list-disc pl-5">
                {packingList.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="text-black-700 text-center text-xl font-semibold">
            Creating your trip plan...
          </div>
        )}
      </div>
    </div>
  );
}

export default Route;
