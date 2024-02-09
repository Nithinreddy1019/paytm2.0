import React from 'react'

const InputBox = ({ label, placeholder }) => {
  return (
    <div className='shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]'>
      <div className='text-sm font-medium text-left py-2 text-sky-400'>
        {label}
      </div>
      <input className='border-2 rounded-md focus:outline-none focus:border-sky-300 w-full px-2 py-1' placeholder={placeholder} />

    </div>
  )
}

export default InputBox
