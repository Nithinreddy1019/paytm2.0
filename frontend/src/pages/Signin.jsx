import React from 'react'
import Header from '../components/Header'

const Signin = () => {
  return (
    <div className='h-screen flex flex-col md:flex md:justify-center text-center'>
      <Header />
      <div className='flex flex-col h-full w-full justify-center md:items-center' >
        <div className='bg-white h-full w-full px-3 py-3 rounded-lg md:w-1/3 md:h-max md:shadow-blue-500/20 md:shadow-[0px_4px_18px_16px_#00000024]'>

        </div>
      </div>
    </div>
  )
}

export default Signin
