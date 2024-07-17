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
    <div className='bg-transparent w-screen fixed top-0 z-50'>
      <nav className='container mx-auto'>
        <ul className='flex flex-col lg:flex-row w-full py-5 text-lg font-bold justify-between '>
          <div className='py-3'>
            <Avatar className='bg-white p-4 justify-between '>
              <Link href="/Home" onClick={handleLinkClick}>
                <AvatarFallback className='p-3'>Explora</AvatarFallback>
              </Link>
              <div className='lg:hidden  justify-center items-center  text-center bg-white p-3'>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className=' '
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  
                  {isOpen ? (
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                  )}
                </button>
              </div>
            </Avatar>
          </div>
          
          <div className={`lg:flex bg-white rounded-lg w-screen flex-1 text-center  justify-center text-black text-2xl border-2  ${isOpen ? 'block' : 'hidden'} lg:block`}>
            <li className='sm:py-4 p-4 lg:py-5 px-5'>
              <Link href="/Home" onClick={handleLinkClick}>Home</Link>
            </li>
            <li className='sm:py-4 p-4 lg:py-5 px-5'>
              <Link href="/Countries" onClick={handleLinkClick}>Explore</Link>
            </li>
            <li className='sm:py-4 p-4 lg:py-5 px-5'>
              <Link href="/PlanRoutes" onClick={handleLinkClick}>Plan Trip</Link>
            </li>
            <li className='sm:py-4 p-4 lg:py-5 px-5'>
              <Link href="/About" onClick={handleLinkClick}>About</Link>
            </li>
            <li className='sm:py-4 p-4 lg:py-5 px-5'>
              <Link href="/ContactUs" onClick={handleLinkClick}>Contact us</Link>
            </li>
            <li className='sm:py-4  p-4 lg:py-5 px-5'>
              {session ? (
                <div>
                  <button onClick={() => signOut()}>Sign out</button>
                </div>
              ) : (
                <div>
                  
                  <Link href="/SignIn" onClick={handleLinkClick}>
                    <button>Sign in</button>
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
