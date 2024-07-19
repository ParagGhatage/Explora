'use client'
import React, { useState, ChangeEvent } from 'react';
import Navbar from '@/Navbar/Navbar';
import { Plan } from '@/components/APIs/Gemini/RoutePlan';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import Directions from '@/components/GoogleMaps/Directions';

interface Accommodation {
  CheckInDate: string;
  CheckOutDate: string;
  AdditionalInfo: string;
  Name: string;
  Address: string;
  Type: string;
  ContactInfo: string;
  CostPerNight: number;
  TotalCost: number;
}

interface Activity {
  Name: string;
  AdditionalInfo: string;
  Booking: string;
  Cost: number;
  Time: string;
  Location: string;
}

interface Budget {
  Currency: string;
  TotalCost: number;
  FlightCost: number;
  AccommodationCost: number;
  FoodCost: number;
  ActivitiesCost: number;
}

interface Transportation {
  Mode: string;
  Details: {
    AdditionalInfo: string;
    DepartureLocation: string;
    DepartureTime: string;
    Duration: string;
    Booking: string;
    ArrivalLocation: string;
    ArrivalTime: string;
    Cost: number;
  }
}

interface PlanDetails {
  Details:{
  Accommodation: Accommodation[];
  Activities: Activity[];
  Budget: Budget;
  PackingList: string[];
  Transportation: Transportation[];}
}

const Route: React.FC = () => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [date, setDate] = useState('');
  const [days, setDays] = useState<string | number>('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [wantToSend, setWantToSend] = useState(false);

  const [accommodation, setAccommodation] = useState<Accommodation | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [budget, setBudget] = useState<Budget | null>(null);
  const [packingList, setPackingList] = useState<string[]>([]);
  const [transportation, setTransportation] = useState<Transportation[]>([]);

  const [plan, setTravelPlan] = useState<any>(null);
  const toast = useToast()

  const handleStartChange = (e: ChangeEvent<HTMLInputElement>) => setStart(e.target.value);
  const handleEndChange = (e: ChangeEvent<HTMLInputElement>) => setEnd(e.target.value);
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value);
  const handleDaysChange = (e: ChangeEvent<HTMLInputElement>) => setDays(e.target.value);
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);

  const onPlanSendClick = () => setWantToSend(true);

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const daysNumber = parseInt(days as string, 10); // Convert days to a number
    const data: PlanDetails = await Plan(start, end, date, daysNumber);
    console.log(data)

    if(!(data)){
      toast({
        title: `Some Error occured while generating plan!\n  Please try again.`,
        status: "error",
        isClosable: true,
      })
    }
    if((data)){
      toast({
        title: `Plan generated successufully!`,
        status: "success",
        isClosable: true,
      })
    }
    
    setAccommodation(data.Details.Accommodation[0]);
    setActivities(data.Details.Activities);
    setBudget(data.Details.Budget);
    setPackingList(data.Details.PackingList);
    setTransportation(data.Details.Transportation);

    setTravelPlan({ 
      accommodation: data.Details.Accommodation[0], 
      activities: data.Details.Activities, 
      budget: data.Details.Budget, 
      packingList: data.Details.PackingList, 
      transportation: data.Details.Transportation 
    });
  };

  const onSendEmail = async () => {
    try {
      const response = await axios.post('/api/planSend', { 
        accommodation, activities, budget, packingList, transportation, email, name 
      });
      console.log(response.data);
      if(!(response.data)){
        toast({
          title: `Some Error occured while sending email!  Please try again.`,
          status: "error",
          isClosable: true,
        })
      }
      if((response.data)){
        toast({
          title: `Email sent! \n Check your inbox.`,
          status: "success",
          isClosable: true,
        })
      }
    } catch (error: any) {
      console.log('Unable to send email', error.message);
    }
  };

  return (
    <div className="min-h-screen bg-orange-100 pt-40 ">
      
      <div className="max-w-screen mx-auto mt-16 p-6 bg-orange-200 rounded-lg shadow-lg">
        <div className="text-5xl font-extrabold text-center text-gray-900 mb-8">Plan Your Trip</div>
        <form onSubmit={handleSearchSubmit} className="space-y-6 text-center">
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
            className="rounded-xl p-5 hover:bg-white hover:text-black hover:border-2 hover:border-black bg-black hover:font-bold text-center  text-white text-2xl font-bold"
          >
            Generate
          </button>
        </form>
      </div>

      <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {plan ? (
          <div className="bg-orange-200 rounded-lg shadow-lg p-6 space-y-8">
            <div >
                <Directions start={start} end={end} />
            </div>
            <div className='text-center text-3xl font-semibold mb-6'>
              Your plan &darr;
            </div>
            <div className='text-center'>
              <button
                type="button"
                onClick={onPlanSendClick}
                className="rounded-xl p-5 text-center hover:bg-white hover:text-black hover:border-2 hover:border-black bg-black hover:font-bold  text-white text-2xl font-bold"
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
                      className="w-full rounded-xl p-5 hover:bg-white hover:text-black hover:border-2 hover:border-black bg-black hover:font-bold  text-white text-2xl font-bold"
                    >
                      Send &rarr;
                    </button>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Rendering the plan details */}
            <div className="mt-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Accommodation</h2>
              {accommodation ? (
                <>
                  <p>Check In Date: {accommodation.CheckInDate}</p>
                  <p>Check Out Date: {accommodation.CheckOutDate}</p>
                  <p>Info: {accommodation.AdditionalInfo}</p>
                  <p>Name of place: {accommodation.Name}</p>
                  <p>Address: {accommodation.Address}</p>
                  <p>Type: {accommodation.Type}</p>
                  <p>Contact info: {accommodation.ContactInfo}</p>
                  <p>Cost Per Night: {accommodation.CostPerNight}</p>
                  <p>Total Stay Cost: {accommodation.TotalCost}</p>
                </>
              ) : null}

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
                  <p>Cost: {trans.Details.Cost} {budget?.Currency}</p>
                </div>
              ))}

              <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Budget</h2>
              {budget ? (
                <>
                  <p>Currency: {budget.Currency}</p>
                  <p>Total trip Cost: {budget.TotalCost}</p>
                  <p>Flight Cost: {budget.FlightCost}</p>
                  <p>Accommodation Cost: {budget.AccommodationCost}</p>
                  <p>Food Cost: {budget.FoodCost}</p>
                  <p>Activities Cost: {budget.ActivitiesCost}</p>
                </>
              ) : null}

              <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Activities</h2>
              {activities.map((activity, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-xl font-semibold">{activity.Name}</h3>
                  <p>Info: {activity.AdditionalInfo}</p>
                  <p>Booking: {activity.Booking}</p>
                  <p>Cost: {activity.Cost} {budget?.Currency}</p>
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