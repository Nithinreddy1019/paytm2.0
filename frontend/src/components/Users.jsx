import React, { useState } from 'react'
import Button from './Button'

const Users = () => {
    const [users , setUsers] = useState([{
        firstName: "maajin",
        lastName: "maajin",
        _id: 1
    }])

    return (
        <>
            <div className='text-xl font-bold mt-2 pl-4'>
                Users
            </div>
            <div className='px-4 my-2'>
                <input type='text' placeholder='search users...' className='w-full border-2 rounded py-2 px-1 focus:outline-none focus:border-sky-300'/>
            </div>
            <div className='mt-4'>
                {users.map((user) => {return (<User user={user} key={user._id} />)})}
            </div>
        </>
  )
}

const User = ({user}) => {
    return (
        <div className='flex justify-between px-2'>
            <div className='flex'>
                <div className='rounded-full bg-sky-100 h-12 w-12 flex justify-center items-center mr-3'>
                    <div className='h-full text-2xl flex flex-col justify-center'>
                        {user.firstName[0].toUpperCase()}
                    </div>
                </div>
                <div className='flex justify-center items-center h-full'>
                    {user.firstName} {user.lastName}
                </div> 
            </div>
            <div className='flex flex-col justify-center h-full'>
                <Button label={"send money"}/>
            </div>
        </div>
    )
}

export default Users
