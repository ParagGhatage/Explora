'use client'
import React, { ChangeEvent, useState, useEffect } from 'react'
import Country from './CountryPhotos/page'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar/Navbar'
import { CountryNames } from '@/components/APIs/AllCountries/CountryNames'

function Page() {
    const [searchQuery, setSearchQuery] = useState('')
    const [names, setNames] = useState([])
    const router = useRouter()

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

    const fetchNames = async () => {
        try {
            const CountriesAll: any = await CountryNames()
            console.log(CountriesAll)
            let arr = []
            for (let i = 0; i < CountriesAll.length; i++) {
                arr.push(CountriesAll[i].name.common)
            }
            setNames(arr)
        } catch (error) {
            console.error("Error fetching Country details:", error)
        }
    }

    useEffect(() => {
        fetchNames()
    }, [])

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        router.push(`/Countries/CountryPhotos?query=${encodeURIComponent(searchQuery)}`)
        console.log(searchQuery)
    }

    return (
        <div className='bg-indigo-100'>
            <Navbar />
            <div className="max-w-lg mx-auto mt-8 p-4 ">
                <h1 className="text-3xl font-bold text-center pb-3 text-gray-900">Explore Travel Destinations</h1>
                <form onSubmit={handleSearchSubmit} className="">
                    <div className="flex items-center bg-white rounded-lg shadow-md p-4">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search for travel destinations..."
                            className="flex-grow px-4 py-2 mr-2 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-700"
                        />
                        <button
                            type="submit"
                            className="text-center border text-black font-extrabold bg-violet-600 p-5 rounded-full border-stone-950 hover:bg-fuchsia-500"
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>
            <div className='mt-0'></div>
        </div>
    )
}

export default Page
