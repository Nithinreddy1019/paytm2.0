import React from 'react'

const Balance = ({value}) => {
  return (
    <div className='flex items-center pl-4 h-14'>
        <div className='text-lg font-bold text-sky-500'>
            Your balance
        </div>
        <div className='text-lg font-semibold ml-4 text-sky-500'>
            Rs {value.toFixed(2)}
        </div>
      
    </div>
  )
}

export default Balance
