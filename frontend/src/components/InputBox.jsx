import React from 'react'

const InputBox = ({onChange, label, placeholder }) => {
  return (
    <div>
      <div className='text-base font-medium text-left py-2 px-1 text-sky-400'>
        {label}
      </div>
      <input onChange={onChange} className='border-2 rounded-md focus:outline-none focus:border-sky-300 w-full px-2 py-1' placeholder={placeholder} />

    </div>
  )
}

export default InputBox
