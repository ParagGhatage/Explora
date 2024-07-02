import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "../Avatar/Avatar"
import Link from 'next/link'
function Navbar() {
  return (
    <div className='bg-transparent w-100%'>
         <nav>
        <ul className='flex  py-5   text-lg font-bold justify-between'>
            <a href="/Home">
            <div className=' py-3 '>
            <Avatar>
  
  <AvatarFallback className='p-3 '>VoyageVista</AvatarFallback>
</Avatar>
            </div  >
            </a>
            <div className=' flex text-slate-900 text-opacity-90 text-2xl pr-0'>
            <li className='py-5 px-5'> <Link href={'/Home'}>Home</Link></li>
            <li className='py-5 px-5'><Link href={'/Countries'}>Countires</Link></li>
            <li className='py-5 px-5'><Link href={'/PlanRoutes'}>Plan Trip</Link></li>
            <li className='py-5 px-5'><Link href={'/About'}>About</Link></li>
            <li className='py-5 px-5 '> <Link href={'/ContactUs'}>Contact us</Link></li>
            <li className='py-5 px-5 '> <Link href={'/SignIn'}>Sign In</Link></li>
            </div>
        </ul>
      </nav>
      
    </div>
  )
}

export default Navbar