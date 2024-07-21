'use client';
import React, { useState, useEffect, ChangeEvent, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Assuming this is the correct import path
import { PexelsQuery } from '@/components/APIs/Pexels/Query';
import Image from 'next/image';
import Link from 'next/link';
import { Run } from '@/components/APIs/Gemini/Recommendations';
import { IconSearch } from '@tabler/icons-react';
import { requestToBodyStream } from 'next/dist/server/body-streams';
import PlaceMap from '@/components/GoogleMaps/PlacesMaps';
import { Info } from '@/components/APIs/Gemini/Info';

interface Photo {
  id: number;
  src: {
    medium: string;
    original: string;
  };
  photographer: string;
}

const TouristDestinations = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [Recommendations, setRecommendations] = useState<string[] | undefined>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showRecommendations,setShowRecommendations] = useState(true)

  const [ShowInfo,setShowInfo] = useState(false)

  const [infoName,setInfoName] = useState("")
  const [infoDescription,setInfoDescription] = useState("")
  const [tips,setTips] = useState([])
  const [highlights,setHighlights] = useState([])

  const query: string = searchParams.get('query') || '';

  

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (query) {
        try {
          const Recommendation: any = await Run(query);
          
          const arr = Recommendation.places;
          setRecommendations(arr);
        } catch (error) {
          console.error("Error fetching recommendations:", error);
        }
      }
    };
    if(!searchQuery){
      setShowRecommendations(true)
      setShowInfo(false)
      setInfoName("")
      setInfoDescription("")
      setHighlights([])
      setTips([])
    }

    fetchData();
  },[query,searchQuery]);

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await PexelsQuery(searchQuery);
    setPhotos(data.photos);
    setShowRecommendations(false)
    const info1 = await Info(searchQuery,query)
    console.log(info1)
    if(info1){
      setInfoName(info1?.name)
      setInfoDescription(info1?.description)
      setHighlights(info1?.highlights)
      setTips(info1.tips)
    setShowInfo(true)
    }
  };
  const handleRecSubmit = async (place:string) => {
    setSearchQuery(place)
    const data = await PexelsQuery(place);
    setPhotos(data.photos);
    setShowRecommendations(false)
    console.log(place)
    const info1 = await Info(place,query)
    console.log(info1)
    if(info1){
      setInfoName(info1?.name)
      setInfoDescription(info1?.description)
      setHighlights(info1?.highlights)
      setTips(info1.tips)
    setShowInfo(true)
    }
    
  };

  return (
    <div className="min-h-screen bg-orange-100 pt-20 mt-20 ">
      <div className="max-w-7xl mx-auto mt-8 p-4">
        <h1 className="text-4xl font-bold text-center text-gray-900 pb-4 m-5">Explore Travel Destinations</h1>
        <form onSubmit={handleSearchSubmit} className="bg-orange-200 rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for travel destinations..."
              className="bg-teal-50 p-4 w-full border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="rounded-xl p-5 hover:bg-white hover:text-black hover:border-2 hover:border-black bg-black hover:font-bold  text-white text-2xl font-bold"
            >
              Search
            </button>
          </div>
        </form>
        <div className='text-center m-5 w-100% '>
          <Link href="/PlanRoutes">
            <button
              className="rounded-xl p-5 hover:bg-white hover:text-black hover:border-2 hover:border-black bg-black hover:font-bold  text-white text-2xl font-bold"
            >
              Plan Your Trip &rarr;
            </button>
          </Link>
        </div>

        <div className="py-5 ">
          {searchQuery?(
            <div className='sm:flex justify-evenly bg-white rounded-md p-4'>
              <div>
              <div className=' border-black border-2'>
              <PlaceMap map_params={ query } extra_address={ searchQuery +"," }/>
            </div>
            <div>
              {searchQuery}
            </div>
              </div>
            
            <div>
            <div className='mt-5 sm:mt-0 border-black border-2 '>
            <PlaceMap map_params={ query }/>
          </div>
          <div>
            {query}
          </div>
            </div>
          </div>
          ):null}
          
          {(Recommendations && (showRecommendations==true)) ? (
            <div>
              <div className='text-center text-3xl p-3'>
                Suggestions
              </div>

              <div className="text-gray-700 flex-wrap lg:grid lg:grid-cols-3  justify-center sm:grid-cols-2 sm:grid sm:justify-evenly">
                {Recommendations.map((place, index) => (
                  <button key={index} 
                  onClick={()=>{
                    handleRecSubmit(place)
                  }

                  }
                  className="p-1 text-left border m-2 rounded-md border-black">
                    <IconSearch className='text-sm'/>
                    {place}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
          {infoName?(
            <div>
              {infoName}
              {infoDescription}
            </div>
          ):null}
        </div>

        <div className="container mx-auto py-8">
          {photos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {photos.map((photo) => (
                <div key={photo.id} className="relative group">
                  <Image
                    src={photo.src.original}
                    alt="Travel destination"
                    height={500}
                    width={500}
                    className="object-cover rounded-lg shadow-lg transition-transform transform group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-700 mt-10">No photos found for the query.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Page1(){
  return(
    <Suspense>
    <TouristDestinations/>
    </Suspense>
  )
}

