'use client'
import React from 'react'
import Link from 'next/link'
import { InfiniteMovingCardsDemo } from '@/components/Testimonials/Testimonials'
import Footer from '@/components/Footer/Footer'
import { ThreeDCardDemo } from '@/components/Categories/Categories'

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen bg-orange-50">
      {/* Hero Section */}
      <header className="relative">
        <img 
          src="https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Scenic view" 
          className="w-full h-80 md:h-96 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-extrabold tracking-wide drop-shadow-lg">
            Discover Amazing Places
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-12">
        {/* Categories Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Categories</h2>
          <p className="text-lg text-gray-600">
            Explore by category and find your next adventure with our curated collections.
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link href="/Countries/CountryPhotos/TopDestinations?query=Cities">
            <ThreeDCardDemo 
              title="Cities" 
              sourc="https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg?auto=compress&cs=tinysrgb&w=600" 
            />
          </Link>
          <Link href="/Countries/CountryPhotos/TopDestinations?query=Adventure places">
            <ThreeDCardDemo 
              title="Adventure" 
              sourc="https://images.pexels.com/photos/390051/surfer-wave-sunset-the-indian-ocean-390051.jpeg?auto=compress&cs=tinysrgb&w=600" 
            />
          </Link>
          <Link href="/Countries/CountryPhotos/TopDestinations?query=Space related">
            <ThreeDCardDemo 
              title="Space" 
              sourc="https://images.pexels.com/photos/3862606/pexels-photo-3862606.jpeg?auto=compress&cs=tinysrgb&w=600" 
            />
          </Link>
          <Link href="/Countries/CountryPhotos/TopDestinations?query=ancient civilizations">
            <ThreeDCardDemo 
              title="Ancient Civilizations" 
              sourc="https://images.pexels.com/photos/5862696/pexels-photo-5862696.jpeg?auto=compress&cs=tinysrgb&w=600" 
            />
          </Link>
          <Link href="/Countries/CountryPhotos/TopDestinations?query=Religious places">
            <ThreeDCardDemo 
              title="Religious" 
              sourc="https://images.pexels.com/photos/415708/pexels-photo-415708.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            />
          </Link>
          <Link href="/Countries/CountryPhotos/TopDestinations?query=Museums">
            <ThreeDCardDemo 
              title="Museums" 
              sourc="https://images.pexels.com/photos/1604991/pexels-photo-1604991.jpeg?auto=compress&cs=tinysrgb&w=600" 
            />
          </Link>
          <Link href="/Countries/CountryPhotos/TopDestinations?query=Historical places">
            <ThreeDCardDemo 
              title="Historical" 
              sourc="https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            />
          </Link>
          <Link href="/Countries/CountryPhotos/TopDestinations?query=Natural wonders">
            <ThreeDCardDemo 
              title="Nature" 
              sourc="https://images.pexels.com/photos/2918152/pexels-photo-2918152.jpeg?auto=compress&cs=tinysrgb&w=600" 
            />
          </Link>
        </section>

        {/* Explore Popular Destinations */}
        <section className="mt-16 text-center">
          <Link href="/Countries/CountryPhotos/TopDestinations?query=world">
            <div className="inline-block bg-gradient-to-r from-blue-500 to-green-500 text-white py-4 px-10 rounded-full text-2xl font-bold shadow-lg hover:from-blue-600 hover:to-green-600 transition duration-300">
              Explore Popular Destinations &rarr;
            </div>
          </Link>
        </section>

        {/* Popular Destinations Carousel */}
        <section className="mt-20">
          <h2 className="text-center text-4xl font-extrabold text-gray-800 mb-8">
            Popular Destinations
          </h2>
          <InfiniteMovingCardsDemo />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <Footer />
      </footer>
    </div>
  )
}

export default Page
