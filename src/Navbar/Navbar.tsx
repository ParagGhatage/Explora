"use client";
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback } from '@/components/Avatar/Avatar'; // Adjust the import according to your structure

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className='bg-transparent fixed w-full top-0 z-50 pt-3'>
  <nav className='container w-100% mx-auto '>
    <ul className='flex flex-col lg:flex-row  text-lg font-bold justify-between '>
      <div className=' sm:mt-7'>
        <Avatar className='bg-white p-2 justify-between '>
          <Link href="/Home" onClick={handleLinkClick} className='flex h-7 '>
          <img src="/logo-color.svg" alt="logo" />
            <AvatarFallback className='p-2'>Explora</AvatarFallback>
          </Link>
          <div className='lg:hidden justify-center items-center text-center bg-white p-2'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              {isOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </Avatar>
      </div>
      
      <div className={`lg:flex bg-white rounded-lg w-100% justify-end flex-1 p-3  text-black text-2xl border-2 ${isOpen ? 'block' : 'hidden'} lg:block`}>
        <li className='sm:py-2 p-2 lg:py-3 px-3'>
          <Link href="/Home" onClick={handleLinkClick}>Home</Link>
        </li>
        <li className='sm:py-2 p-3 lg:py-3 px-3'>
          <Link href="/Countries" onClick={handleLinkClick}>Explore</Link>
        </li>
        
        <li className='sm:py-2 p-3 lg:py-3 px-3'>
          <Link href="/PlanRoutes" onClick={handleLinkClick}>Plan Trip</Link>
        </li>
        <li className='sm:py-2 p-3 lg:py-3 px-3'>
          <Link href="/Countries/CountryPhotos/TopDestinations?query=world" onClick={handleLinkClick}>Destinations</Link>
        </li>
        <li className='sm:py-2 p-3 lg:py-3 px-3'>
          <Link href="/About" onClick={handleLinkClick}>About</Link>
        </li>
        <li className='sm:py-2 p-3 lg:py-3 px-3'>
          <Link href="/ContactUs" onClick={handleLinkClick}>Contact us</Link>
        </li>
        <li className='sm:py-2 p-3 lg:py-3 px-3'>
          {session ? (
            <div>
              <button
              className='sm:py-2 p-3 lg:py-3 px-3  rounded-xl hover:bg-white hover:text-black hover:border-2 hover:border-black bg-black   text-white'
              onClick={() => signOut()
              
              }>Sign out</button>
            </div>
          ) : (
            <div>
              <Link href="/SignIn" onClick={handleLinkClick}>
                <button
                className='sm:py-2 p-3 lg: px-3  rounded-xl hover:bg-white hover:text-black hover:border-2 hover:border-black bg-black   text-white '
                >Sign in</button>
              </Link>
            </div>
          )}
        </li>
      </div>
    </ul>
  </nav>
</div>

  );
};

export default Navbar;
