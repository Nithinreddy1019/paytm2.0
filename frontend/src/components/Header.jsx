import React from 'react'
import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='bg-white flex justify-between'>
      <div className='flex items-center'>
        <img className='text-blue-500' src={logo} />
        <p className='hidden md:block font-bold text-sky-500 text-2xl'>Swish it</p>
      </div>
      <div className='flex items-center px-2'>
        <Link className='font-medium text-lg text-center' to={"/about"}>About</Link>
      </div>
    </div>
  )
}

export default Header
