import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='text-white flex justify-between bg-slate-600 p-5 py-2.5'>
        <div className="logo text-xl font-bold">
            iTask
        </div>
        <ul className='flex gap-6'>
            <NavLink to="/"><li className='hover:text-lg transition-all w-[60px] text-center'>Home</li></NavLink>
            <NavLink to="/yourtasks"><li className='hover:text-lg transition-all w-[90px] text-center'>Your Tasks</li></NavLink>
            <NavLink to="/login"><li className='hover:text-lg transition-all w-[80px] text-center'>Login</li></NavLink>
        </ul>
    </nav>
  )
}

export default Navbar
 