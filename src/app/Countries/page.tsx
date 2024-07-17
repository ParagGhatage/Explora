"use client"
import React, { useState,Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/Navbar/Navbar';
import { ComboboxDemo } from '@/components/UIElements/ComboBox/ComboBox';

function Page() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const router = useRouter();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const query = selectedCountry || searchQuery;
        router.push(`/Countries/CountryPhotos?query=${encodeURIComponent(query)}`);
        console.log(query);
    };

    const handleSelectCountry = (country: string) => {
        setSelectedCountry(country);
    };

    return (
        <div className='min-h-screen  pt-20 bg-orange-100'>
            <div className='flex flex-col items-center justify-center p-10'>
                <div className='w-full max-w-md p-10 mb-10 mt-10 bg-orange-200 rounded-lg shadow-lg'>
                    <ComboboxDemo onSelectCountry={handleSelectCountry} />
                </div>
                <div className='mt-2 pt-2'>
                    <form onSubmit={handleSearchSubmit} className="flex flex-col items-center justify-center">
                        <button
                            type="submit"
                            className="rounded-xl p-5 hover:bg-white hover:text-black hover:border-2 hover:border-black bg-black hover:font-bold  text-white text-2xl font-bold"
                        >
                            Search &rarr;
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default function Page3(){
    return(
        <Suspense>
        <Page/>
        </Suspense>
    )
};
