'use client';

import React, { useEffect, useState,Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { PexelsQuery } from "@/components/APIs/Pexels/Query";
import { CountryQuery } from "@/components/APIs/AllCountries/Countries";
import PlaceMap from "@/components/GoogleMaps/PlacesMaps";

interface Photo {
  id: number;
  src: {
    original: string;
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
  const [languages, setLanguages] = useState<string[]>([]);
  const [population, setPopulation] = useState<number | undefined>();
  const [driveSide, setDriveSide] = useState("");
  const [timezones, setTimezones] = useState<string[]>([]);

  const searchParams = useSearchParams();
  const query: string = searchParams.get('query') || '';

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
          console.log(Country);
          setName(Country[0].name.common);
          const first = Country[0].currencies;
          const second = first[Object.keys(first)[0]];
          const final_currency = second[Object.keys(second)[0]];
          const currency_symbol = second[Object.keys(second)[1]];

          const Lang = Country[0].languages;
          const Length = Object.keys(Lang).length;
          const arr: string[] = [];
          for (let i = 0; i < Length; i++) {
            arr.push(Lang[Object.keys(Lang)[i]]);
          }

          setCurrency(final_currency);
          setCurrencySymbol(currency_symbol);
          setCapital(Country[0].capital[0]);
          setLanguages(arr);
          setPopulation(Country[0].population);
          setDriveSide(Country[0].car.side);
          setTimezones(Country[0].timezones);
          setFlag(Country[0].flags.png);
        } catch (error) {
          console.error("Error fetching Country details:", error);
        }
      }
    };

    fetchData();
    fetchCountry();
  },[query]);

  const router = useRouter();
  const handleGoBack = () => {
    router.push("/Countries"); // This function navigates back to the previous page
  };

  const handleTopDestinationsInCountry = () => {
    router.push(`/Countries/CountryPhotos/TopDestinations?query=${encodeURIComponent(query)}`);
  };

  return (
    <main className="bg-orange-100 pt-40  min-h-screen">
      <div className="text-blue-900 text-5xl font-bold font-serif text-center py-6">
        {name}
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-evenly mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <div>

            
            <div className="sm:flex  flex-wrap">
             
            <PlaceMap map_params={name} />
            </div>
            
            </div>
            
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-3xl font-mono font-bold text-black text-center">
            Capital: {capital}
            <div className="justify-center items-center mt-6">
            <div className="text-3xl font-mono  m-5 font-bold text-black mr-4">
              Flag:
            </div>
            
            <Image
              src={flag}
              alt="Flag image"
              width={200}
              height={100}
              className="rounded-lg border border-black shadow-sm ml-9 shadow-slate-400"
            />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-evenly mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg text-3xl font-mono font-bold text-black text-center flex items-center">
            <div>
              <div>Currency: {currency}</div>
              <div className="ml-4">{currencySymbol}</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-3xl font-mono font-bold text-black text-center">
            Languages:
            {languages.map((language, index) => (
              <div key={index}>{language}</div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-evenly mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg text-3xl font-mono font-bold text-black text-center">
            Timezones:
            {timezones.map((zone, index) => (
              <div key={index}>{zone}</div>
            ))}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-3xl font-mono font-bold text-black text-center">
            Drive: {driveSide} hand Drive
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg text-3xl font-mono font-bold text-black text-center mb-8">
          Population: {population}
        </div>
        <div className="text-center mt-8 mb-4">
            <button
              className="text-center mt-6 text-white font-extrabold bg-fuchsia-500 p-5 rounded-full border-2 border-fuchsia-500 shadow-lg transform transition duration-300 ease-in-out hover:bg-violet-300 hover:text-black hover:scale-105 hover:border-violet-300"
              onClick={handleGoBack}
            >
              Go Back
            </button>
          </div>

        <div className="text-center mb-8">
          <button
            onClick={handleTopDestinationsInCountry}
            className="rounded-xl p-5 hover:bg-white hover:text-black hover:border-2 hover:border-black bg-black hover:font-bold  text-white text-2xl font-bold"
          >
            Explore Destinations in {name} &rarr;
          </button>
        </div>

        <div className="text-center mt-10">
          <h1 className="text-4xl font-extrabold text-gray-800 opacity-90 py-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text">
            Images
          </h1>
        </div>

        <div className="container mx-auto py-8">
          {photos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((photo) => (
                <div key={photo.id} className="p-2">
                  <Image
                    src={photo.src.original}
                    alt=""
                    height={1000}
                    width={1000}
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-700 mt-10">
              No photos found for the &quot;{query}&quot;
            </p>
          )}
          
        </div>
      </div>
    </main>
  );
};

export default function Page2(){
  return(
    <Suspense>
    <Country/>
    </Suspense>
  )
};
