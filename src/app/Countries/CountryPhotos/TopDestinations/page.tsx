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
          const Recommendation1: any = await Run(query);
          const arr=Recommendation1.split("\n");
          console.log(arr)
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
    <div className="min-h-screen bg-indigo-100">
      <Navbar></Navbar>
      <div className="max-w-80% mx-auto mt-8 p-4">
        <h1 className="text-4xl font-bold text-center text-gray-900 pb-4">Explore Travel Destinations</h1>
        <form onSubmit={handleSearchSubmit} className="bg-white rounded-lg shadow-lg p-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for travel destinations..."
              className="bg-teal-50 p-6 w-screen border-transparent border m-7"
            />
            <button
              type="submit"
              className="text-center text-white font-extrabold bg-violet-600 p-5 rounded-full hover:bg-fuchsia-500"
            >
              Search
            </button>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
          {Recommendations ?  (
            <div>
            <div className='text-center text-3xl justify-center bg-lime-200 rounded-lg p-3'>
            Scroll down to see images &darr;
        </div>

            <div className="text-gray-700 flex flex-wrap">
                 
                
                
                {Recommendations.map((place) => (
                <div key={place} className="p-3 text-left ">
                  {place}
                </div>
              ))}
                
                
            </div>
            </div>

          ) : (
            <div className="text-gray-700">Loading recommendations...</div>
          )}

        </div>
      

        </form>
      </div>
      <div className="container mx-auto py-8">
        {photos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {photos.map((photo) => (
              <div key={photo.id} className="relative group">
                <Image
                  src={photo.src.large2x}
                  alt={"Loading..."}
                  height={500}
                  width={500}
                  className="object-cover rounded-lg shadow-lg transition-transform transform group-hover:scale-105"
                />
                
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-700 mt-10"></p>
        )}
      </div>
      
    </div>
  );
};

export default TouristDestinations;