import React, { useEffect, useState } from 'react'
import Button from './Button'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Users = () => {
    const [users , setUsers] = useState([])
    const [filter, setFilter] = useState('')

    useEffect(() => {
        const debounce = setTimeout(() => {
            axios.get("http://localhost:3000/api/v1.1/user/bulk?filter="+filter, {
                headers:{"Authorization": "Bearer "+ localStorage.getItem("token")}
            }).then((res) => {
                setUsers(res.data.user);
        })}, 500)

        return () => {clearTimeout(debounce)};
    }, [filter])


    return (
        <>
            <div className='text-xl font-bold mt-2 pl-4'>
                Users
            </div>
            <div className='px-4 my-2'>
                <input onChange={(e) => {
                    setFilter(e.target.value);
                }} type='text' placeholder='search users...' className='w-full border-2 rounded py-2 px-1 focus:outline-none focus:border-sky-300'/>
            </div>
            <div className='mt-4'>
                {users.map((user) => {return (<User user={user} key={user.id} />)})}
            </div>
        </>
  )
}

const User = ({user}) => {
    const navigate = useNavigate();

    return (
        <div className='flex justify-between px-2 my-1 border-b-7 border-black '>
            <div className='flex items-center'>
                <div className='rounded-full bg-sky-100 h-12 w-12 flex justify-center items-center mr-3'>
                    <div className='h-full text-2xl flex flex-col justify-center'>
                        {user.firstName[0].toUpperCase()}
                    </div>
                </div>
                <div className='flex items-center'>
                    {user.firstName} {user.lastName}
                </div> 
            </div>
            <div className='flex flex-col justify-center'>
                <Button onClick={() => {
                    navigate(`/sendmoney?id=${user.id}&name=${user.firstName}`)
                }} label={"send money"}/>
            </div>
        </div>
    )
}

export default Users
