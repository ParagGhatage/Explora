
"use client"
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback } from '@/components/Avatar/Avatar'; // Adjust the import according to your structure

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <div className='bg-transparent w-full fixed top-0 z-50'>
      <nav className='container mx-auto'>
        <ul className='flex flex-col lg:flex-row w-full py-5 text-lg font-bold justify-between'>
          <div className='py-3'>
            <Link href="/Home">
              <Avatar>
                <AvatarFallback className='p-3'>Travo</AvatarFallback>
              </Avatar>
            </Link>
          </div>
          <div className='lg:hidden flex justify-end items-end'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='text-3xl focus:outline-none b'
            >
              &#9776;
            </button>
          </div>
          <div className={`sm:flex-initialw-40 lg:flex bg-white rounded-lg w-full flex-1 justify-end text-slate-900 text-opacity-90   ${isOpen ? 'block' : 'hidden'} lg:block`}>
            <li className='sm:py-4 p-2  lg:py-5 px-5 '> <Link href={'/Home'}>Home</Link></li>
            <li className='sm:py-4 p-2 lg:py-5 px-5 '><Link href={'/Countries'}>Countries</Link></li>
            <li className='sm:py-4 p-2 lg:py-5 px-5'><Link href={'/PlanRoutes'}>Plan Trip</Link></li>
            <li className='sm:py-4 p-2 lg:py-5 px-5'><Link href={'/About'}>About</Link></li>
            <li className='sm:py-4 p-2 lg:py-5 px-5'> <Link href={'/ContactUs'}>Contact us</Link></li>
            <li className='sm:py-4 p-2 lg:py-5 px-5'> 
            {session ? (
        <div>
         
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      ) : (
        <div>
          <p>Not signed in</p>
          <Link
          href={"/SignIn"}>
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
