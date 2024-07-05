import React from 'react';
import { Avatar, AvatarFallback } from "../Avatar/Avatar";
import Link from 'next/link';

function Navbar() {
  return (
    <div className='bg-transparent w-full fixed top-0 z-50 '>
      <nav>
        <ul className='flex w-full py-5 text-lg font-bold justify-between'>
          <div className='py-3'>
            <Link href="/Home">
              <Avatar>
                <AvatarFallback className='p-3'>VoyageVista</AvatarFallback>
              </Avatar>
            </Link>
          </div>
          <div className='flex flex-1 justify-end text-slate-900 text-opacity-90 text-2xl pr-0'>
            <li className='py-5 px-5'> <Link href={'/Home'}>Home</Link></li>
            <li className='py-5 px-5'><Link href={'/Countries'}>Countries</Link></li>
            <li className='py-5 px-5'><Link href={'/PlanRoutes'}>Plan Trip</Link></li>
            <li className='py-5 px-5'><Link href={'/About'}>About</Link></li>
            <li className='py-5 px-5 '> <Link href={'/ContactUs'}>Contact us</Link></li>
            <li className='py-5 px-5 '> <Link href={'/SignIn'}>Sign In</Link></li>
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
