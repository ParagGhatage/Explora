'use client'
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PexelsQuery } from '@/components/APIs/Pexels/Query';
import Image from 'next/image';
import Navbar from '@/components/Navbar/Navbar';
import { Run } from '@/components/APIs/Gemini/Recommendations';

interface TouristDestinationsProps {
  query: string;
}
interface Photo {
  id: number;
  src: {
    medium: string;
    original: string;
  };
  photographer: string;
}

const TouristDestinations: React.FC<TouristDestinationsProps> = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [destinations, setDestinations] = useState("");
  const [Recommendations, setRecommendations] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const query: string = searchParams.get('query') || '';
  console.log(query)
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      if (query) {
        try {
          const Recommendation: any = await Run(query);
          console.log(Recommendation)
          const arr=Recommendation.places;

          setRecommendations(arr);
        } catch (error) {
          console.error("Error fetching recommendations:", error);
        }
      }
      
    };
    
    fetchData();
    
  }, [photos]);

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await PexelsQuery(searchQuery);
    setPhotos(data.photos);
    setRecommendations([])
  };

  

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
  
  <div className="max-w-7xl mx-auto mt-8 p-4">
    <h1 className="text-4xl font-bold text-center text-gray-900 pb-4">Explore Travel Destinations</h1>
    <form onSubmit={handleSearchSubmit} className="bg-white rounded-lg shadow-lg p-6">
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
          className="text-center mt-6 text-white font-extrabold bg-fuchsia-500 p-5 rounded-full border-2 border-fuchsia-500 shadow-lg transform transition duration-300 ease-in-out hover:bg-violet-300 hover:text-black hover:scale-105 hover:border-violet-300"
        >
          Search
        </button>
      </div>
    </form>
    <div className='text-center m-5 w-100% '>
        <a href="/PlanRoutes">
    <button
          
          className="text-center mt-6 text-white font-extrabold bg-fuchsia-500 p-5 rounded-full border-2 border-fuchsia-500 shadow-lg transform transition duration-300 ease-in-out hover:bg-violet-300 hover:text-black hover:scale-105 hover:border-violet-300"
        >
          Plan Your Trip &rarr;
        </button>
        </a>

    </div>
    

    <div className="py-5">
      {Recommendations ? (
        <div>
          
          <div className='text-center text-3xl p-3'>
            Suggestions
          </div>

          <div className="text-gray-700 flex flex-wrap justify-center">
            {Recommendations.map((place) => (
              <div key={place} className="p-3 text-left">
                {place}
              </div>
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
                src={photo.src.large2x}
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

export default TouristDestinations;