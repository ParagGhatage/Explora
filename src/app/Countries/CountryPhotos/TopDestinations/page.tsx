'use client';
import React, { useState, useEffect, ChangeEvent, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Assuming this is the correct import path
import { PexelsQuery } from '@/components/APIs/Pexels/Query';
import Image from 'next/image';
import Link from 'next/link';
import { Run } from '@/components/APIs/Gemini/Recommendations';
import { requestToBodyStream } from 'next/dist/server/body-streams';

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
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const query: string = searchParams.get('query') || '';

  console.log(query);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (query) {
        try {
          const Recommendation: any = await Run(query);
          console.log(Recommendation);
          const arr = Recommendation.places;
          setRecommendations(arr);
        } catch (error) {
          console.error("Error fetching recommendations:", error);
        }
      }
    };

    fetchData();
  },[searchQuery]);

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await PexelsQuery(searchQuery);
    setPhotos(data.photos);
    setRecommendations([]);
    setSearchQuery(''); // Clear search input after submission
  };
  const handleRecSubmit = async () => {
    const data = await PexelsQuery(searchQuery);
    setPhotos(data.photos);
    setRecommendations([]);
    setSearchQuery(''); // Clear search input after submission
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

        <div className="py-5">
          {Recommendations ? (
            <div>
              <div className='text-center text-3xl p-3'>
                Suggestions
              </div>

              <div className="text-gray-700 flex-wrap  justify-center sm:grid-cols-2 sm:grid sm:justify-evenly">
                {Recommendations.map((place, index) => (
                  <button key={index} 
                  onClick={()=>{setSearchQuery(place)
                  }

                  }
                  className="p-3 text-left">
                    {place}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-gray-700 text-center">Loading recommendations...</div>
          )}
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

