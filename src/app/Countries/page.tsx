'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar/Navbar'
import { ComboboxDemo } from '@/components/UIElements/ComboBox/ComboBox'

function Page() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCountry, setSelectedCountry] = useState('')
    
    const router = useRouter()

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const query = selectedCountry || searchQuery
        router.push(`/Countries/CountryPhotos?query=${encodeURIComponent(query)}`)
        console.log(query)
    }

    const handleSelectCountry = (country: string) => {
        setSelectedCountry(country)
    }

    return (
        <div className='bg-indigo-100'>
            <Navbar />
            
            <div className='flex justify-center justify-items-center p-10 h-screen'>

            <div className='p-10 mb-20 mt-10'>
            <ComboboxDemo onSelectCountry={handleSelectCountry} />
            </div>
            
            <div className='mt-20 pt-2'>
            <button
                type="submit"
                className="text-center border text-black font-extrabold bg-violet-600 p-5 rounded-full border-stone-950 hover:bg-fuchsia-500"
                onClick={handleSearchSubmit}
            >
                Search
            </button>
            </div>

            </div>
            
        </div>
    )
}

export default Page
