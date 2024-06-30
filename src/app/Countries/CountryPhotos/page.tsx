'use client';

import React, { useEffect, useState } from "react";
import { useSearchParams,useRouter } from "next/navigation";
import Image from "next/image";
import { PexelsQuery } from "@/components/APIs/Pexels/Query";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import { CountryQuery } from "@/components/APIs/AllCountries/Countries";

interface Photo {
  id: number;
  src: {
    medium: string;
  };
  photographer: string;
}

const Country = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [name, setName] = useState("");
  const [flag, setFlag] = useState("");
  const [capital, setCapital] = useState("");
  const [currency, setCurrency] = useState("");
  const [currencySymbol, setCurrencySymbol] = useState("");
  const [languages, setLanguages] = useState([]);
  const [population, setPopulation] = useState();
  const [drive, setDriveSide] = useState("");
  const [timezones, setTimezones] = useState([]);
  


  const searchParams = useSearchParams();
  const query:any = searchParams.get('query') || '';

  useEffect(() => {
    const fetchData = async () => {
      if (query) {
        try {
          const data: any = await PexelsQuery(query);
          setPhotos(data.photos);
        } catch (error) {
          console.error("Error fetching photos:", error);
        }
      }
    };
    const fetchCountry = async () => {
      if (query) {
        try {
          const Country: any = await CountryQuery(query);
          console.log(Country)
          setName(Country[0].name.common);
          const first = Country[0].currencies
          const second = first[Object.keys(first)[0]]
          const final_currency = second[Object.keys(second)[0]]
          const currency_symbol = second[Object.keys(second)[1]]

          const Lang = Country[0].languages
          const Length = Object.keys(Lang).length
          const arr = []
          for(let i=0;i <= Length;i++){
            arr.push(Lang[Object.keys(Lang)[i]])
          }
          
          setCurrency(final_currency)
          setCurrencySymbol(currency_symbol)
          setCapital(Country[0].capital[0])
          setLanguages(arr)
          setPopulation(Country[0].population)
          setDriveSide(Country[0].car.side)
          setTimezones(Country[0].timezones)
          setFlag(Country[0].flags.png)

         
        } catch (error) {
          console.error("Error fetching Country datails:", error);
        }
      }
    };

    fetchData();
    fetchCountry()
  }, [query]);
  const router = useRouter();
  const handleGoBack = () => {
    router.back(); // This function navigates back to the previous page
  };
  const handleTopDestinationsInCountry = () => {
    router.push((`/Countries/CountryPhotos/TopDestinations?query=${encodeURIComponent(query)}`))
  }

  return (
    <main className="bg-indigo-100 min-h-screen">
        <Navbar></Navbar>
        <div className="text-blue-900 text-5xl font-bold font-serif text-center">
            {name}
        </div>
      <div>
        <div className="flex p-4 justify-evenly">
        <div className=" flex bg-white p-4 rounded-md text-3xl font-mono font-bold text-center text-black m-5">
          <div className="mt-10">
          Flag :
          </div>
          
            <Image
            src={flag}
            alt='flag image'
            width={200}
            height={100}
            className="rounded-lg border ml-8 border-black shadow-sm shadow-slate-400 justify-center m-2">

            </Image>
        </div>
          
          <div className="text-3xl  bg-white p-4 rounded-md font-mono m-8 font-bold text-center text-black">
              Capital : {capital}
          </div>
      </div>
        
        <div className="flex p-4 justify-evenly">
        <div className=" flex text-3xl  bg-white p-4 rounded-md font-mono font-bold text-center text-black mt-8">
            <div >
            <div>
            Currency :  {currency}
            </div> 
            <div className="ml-8">
              {currencySymbol}
            </div>
            </div>
            
          </div>
          <div className="text-3xl  bg-white p-4 rounded-md font-mono m-8 font-bold text-center text-black">
            Languages :  {languages.map((language) =>(
              <div>
                {language}
              </div>
            ))}
          </div>
          
        </div>

        <div className="flex p-4 justify-evenly">
        <div className="  text-3xl  bg-white p-4 rounded-md font-mono font-bold text-center text-black mt-8">
            Timezones : {timezones.map((zone) =>(
              <div>
                {zone}
              </div>
            ))}

          </div>
          <div className="text-3xl pl-12  bg-white p-4 rounded-md font-mono m-8 font-bold text-center text-black">
            Drive : {drive} hand Drive
          </div>
        </div>
          <div className="  text-3xl  bg-white p-4 rounded-md font-mono font-bold text-center text-black mt-8">
              Population :  {population}
          </div>

      </div>
      <div className="text-center mt-3">
        <button 
        onClick={handleTopDestinationsInCountry}
        className="text-center border w-100% text-black font-extrabold bg-violet-600 p-5 rounded-full border-stone-950 hover:bg-fuchsia-500">
          Explore Destinations in {name}  &rarr;
        </button>
      </div>

     <div>
  <h1 className="text-center mt-10 text-4xl font-extrabold text-gray-800 opacity-90 py-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text">
    Images
  </h1>
</div>


      <div className="container mx-auto py-8">
        {photos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="p-2">
                <Image
                  src={photo.src.large2x}
                  alt={""}
                  height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            
                />
                <div className="mt-2 text-center">
              
                </div>
              </div>
            ))}
            <div className=" text-center">

            
            
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-700 mt-10">
            No photos found for the query "{query}"
          </p>
        )}
        <div className="text-center">
        <button
              className="text-center border w-100% text-black font-extrabold bg-violet-600 p-5 rounded-full border-stone-950 hover:bg-fuchsia-500"
              onClick={handleGoBack}
            >
               Go Back
            </button>
        </div>
        
      </div>
            
    </main>
  );
};

export default Country;