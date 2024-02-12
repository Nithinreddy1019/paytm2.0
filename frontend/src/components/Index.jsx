import React from 'react'
import { useUser } from '../hooks/useUser'
import { Navigate } from 'react-router-dom';

const Index = () => {
    const user = useUser();
    if(user.loading){
        return ("loading...")
    }

    if(!user.userDetails){
        return <Navigate to={"/signin"}/>
    }

    return (<Navigate to={"/dashboard"}/>)
}

export default Index
