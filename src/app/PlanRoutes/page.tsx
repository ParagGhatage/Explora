'use client'
import React, { useState, ChangeEvent, useCallback } from 'react';
import axios from 'axios';
import Navbar from '@/Navbar/Navbar';
import { Plan } from '@/components/APIs/Gemini/RoutePlan';
import { useToast } from '@chakra-ui/react';
import Directions from '@/components/GoogleMaps/Directions';
import { IconSearch } from '@tabler/icons-react';

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
  Details: {
    Accommodation: Accommodation[];
    Activities: Activity[];
    Budget: Budget;
    PackingList: string[];
    Transportation: Transportation[];
  }
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

  const [autocompleteList, setAutocompleteList] = useState<any[]>([]);
  const [autosuggestionsStart,setAutoSuggestionsStart] = useState(true)
  const [autosuggestionsEnd,setAutoSuggestionsEnd] = useState(true)
  const key = process.env.NEXT_PUBLIC_OLA_MAPS_API_KEY;

  const autocompleteCache: { [query: string]: any[] } = {};

  function debounce(func: (...args: any[]) => void, timeout = 800) {
    let timer: any;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func(...args); }, timeout, timeout);
    };
  }

  const handleAutocomplete = async (query: string, key: string) => {
    if (autocompleteCache[query]) {
      setAutocompleteList(autocompleteCache[query]);
      return;
    }

    try {
      const response = await axios.get(`https://api.olamaps.io/places/v1/autocomplete?input=${query}&api_key=${key}`);
      const results = response.data.predictions;
      autocompleteCache[query] = results;
      setAutocompleteList(results);
      console.log(response)
    } catch (error) {
      console.error('Error fetching autocomplete data:', error);
    }
  };

  const debouncedAutocomplete = useCallback(debounce(handleAutocomplete, 800), []);

  const handleStartChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setStart(query);
    if (query.trim()) {
      debouncedAutocomplete(query, key);
    } else {
      setAutocompleteList([]);
    }
    if(!query){
      setAutoSuggestionsStart(true)
    }
  };

  const handleEndChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setEnd(query);
    if (query.trim()) {
      debouncedAutocomplete(query, key);
    } else {
      setAutocompleteList([]);
    }
    if(!query){
      setAutoSuggestionsEnd(true)
    }
  }
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value);
  const handleDaysChange = (e: ChangeEvent<HTMLInputElement>) => setDays(e.target.value);
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);

  const onPlanSendClick = () => setWantToSend(true);

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const daysNumber = parseInt(days as string, 10); // Convert days to a number
    const data: PlanDetails = await Plan(start, end, date, daysNumber);
    console.log(data);

    if (!data) {
      toast({
        title: `Some Error occurred while generating plan! Please try again.`,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: `Plan generated successfully!`,
        status: "success",
        isClosable: true,
      });
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
      if (!response.data) {
        toast({
          title: `Some Error occurred while sending email! Please try again.`,
          status: "error",
          isClosable: true,
        });
      } else {
        toast({
          title: `Email sent! Check your inbox.`,
          status: "success",
          isClosable: true,
        });
      }
    } catch (error: any) {
      console.log('Unable to send email', error.message);
    }
  };

  

  return (
    <div className="min-h-screen bg-orange-100 pt-40">
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
            {(start && autocompleteList && autosuggestionsStart==true)?(
            <div>
              {autocompleteList.map((place)=>(
                <div>
                  <button  
                  type='button'//for preventing default form submission
                  onClick={()=>{
                    setStart(place.description)
                    setAutoSuggestionsStart(false)
                    setAutocompleteList([])
                  }

                  }
                  className="p-1 text-left border m-2 rounded-md border-black">
                    <IconSearch className='text-sm'/>
                    {place.description}
                  </button>
                </div>
              )
                      
            )
              }
            </div>
            ):null
            }
            <input
              type="text"
              value={end}
              onChange={handleEndChange}
              placeholder="Your Destination"
              className="flex-1 bg-teal-50 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
            {(end && autocompleteList && autosuggestionsEnd==true)?(
            <div>
              {autocompleteList.map((place)=>(
                <div>
                  <button  
                  type='button'//for preventing default form submission
                  onClick={()=>{
                    setEnd(place.description)
                    setAutoSuggestionsEnd(false)
                    setAutocompleteList([])
                  }

                  }
                  className="p-1 text-left border m-2 rounded-md border-black">
                    <IconSearch className='text-sm'/>
                    {place.description}
                  </button>
                </div>
              )
                      
            )
              }
            </div>
            ):null
            }
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
            className="rounded-xl p-5 hover:bg-white hover:text-black hover:border-2 hover:border-black bg-black hover:font-bold text-center text-white text-2xl font-bold"
          >
            Generate
          </button>
        </form>
      </div>

      <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {plan ? (
          
          <div className="bg-orange-200 rounded-lg shadow-lg p-6 space-y-8">
            

            <div className="max-w-screen mx-auto mt-16 p-6 bg-orange-200 rounded-lg shadow-lg">
          <form className="space-y-6 text-center">
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="Your Name"
                className="flex-1 bg-teal-50 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Your Email"
                className="flex-1 bg-teal-50 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>
            <button
              type="button"
              onClick={onSendEmail}
              className="rounded-xl p-5 hover:bg-white hover:text-black hover:border-2 hover:border-black bg-black hover:font-bold text-center text-white text-2xl font-bold"
            >
              Send Plan to Email
            </button>
          </form>
        </div>

            <div>
              <Directions start={start} end={end} />
            </div>
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
              <h2 className="text-3xl font-extrabold text-gray-900">Accommodation</h2>
              <p><strong>Name:</strong> {accommodation?.Name}</p>
              <p><strong>Address:</strong> {accommodation?.Address}</p>
              <p><strong>Check-in:</strong> {accommodation?.CheckInDate}</p>
              <p><strong>Check-out:</strong> {accommodation?.CheckOutDate}</p>
              <p><strong>Cost per Night:</strong> {accommodation?.CostPerNight}{" "+budget?.Currency}</p>
              <p><strong>Total Cost:</strong> {accommodation?.TotalCost}{ " "+budget?.Currency}</p>
              <p><strong>Contact Info:</strong> {accommodation?.ContactInfo}</p>
              <p><strong>Additional Info:</strong> {accommodation?.AdditionalInfo}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
              <h2 className="text-3xl font-extrabold text-gray-900">Activities</h2>
              {activities.map((activity, index) => (
                <div key={index} className="bg-gray-100 rounded-lg p-4 space-y-2">
                  <p><strong>Name:</strong> {activity.Name}</p>
                  <p><strong>Location:</strong> {activity.Location}</p>
                  <p><strong>Cost:</strong> {activity.Cost}{" "+budget?.Currency}</p>
                  <p><strong>Time:</strong> {activity.Time}</p>
                  <p><strong>Booking:</strong> {activity.Booking}</p>
                  <p><strong>Additional Info:</strong> {activity.AdditionalInfo}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
              <h2 className="text-3xl font-extrabold text-gray-900">Budget</h2>
              <p><strong>Currency:</strong> {budget?.Currency}</p>
              <p><strong>Total Cost:</strong> {budget?.TotalCost}</p>
              <p><strong>Flight Cost:</strong> {budget?.FlightCost}</p>
              <p><strong>Accommodation Cost:</strong> {budget?.AccommodationCost}</p>
              <p><strong>Food Cost:</strong> {budget?.FoodCost}</p>
              <p><strong>Activities Cost:</strong> {budget?.ActivitiesCost}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
              <h2 className="text-3xl font-extrabold text-gray-900">Packing List</h2>
              <ul className="list-disc pl-5 space-y-2">
                {packingList.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
              <h2 className="text-3xl font-extrabold text-gray-900">Transportation</h2>
              {transportation.map((transport, index) => (
                <div key={index} className="bg-gray-100 rounded-lg p-4 space-y-2">
                  <p><strong>Mode:</strong> {transport.Mode}</p>
                  <p><strong>Departure Location:</strong> {transport.Details.DepartureLocation}</p>
                  <p><strong>Departure Time:</strong> {transport.Details.DepartureTime}</p>
                  <p><strong>Arrival Location:</strong> {transport.Details.ArrivalLocation}</p>
                  <p><strong>Arrival Time:</strong> {transport.Details.ArrivalTime}</p>
                  <p><strong>Duration:</strong> {transport.Details.Duration}</p>
                  <p><strong>Cost:</strong> ${transport.Details.Cost}{" "+budget?.Currency}</p>
                  <p><strong>Booking:</strong> {transport.Details.Booking}</p>
                  <p><strong>Additional Info:</strong> {transport.Details.AdditionalInfo}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        
      </div>
    </div>
  );
};

export default Route;
