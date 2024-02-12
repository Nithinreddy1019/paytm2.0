import React from 'react'
import logo from '../assets/logo.svg';

const AppBar = ({name}) => {
  return (
    <div className='flex justify-between items-center h-16 shadow-[0px_2px_9px_0px_#cbd5e0]'>
      <div>
        <img src={logo}/>
      </div>
      <div className='flex'>
        <div className='text-lg mr-4 flex flex-col justify-center'>
            Hello
        </div>
        <div className='rounded-full bg-sky-100 h-12 w-12 flex justify-center items-center mr-3'>
            <div className='h-full text-2xl flex flex-col justify-center'>
                {name[0]}
            </div>
        </div>

      </div>
    </div>
  )
}

export default AppBar
