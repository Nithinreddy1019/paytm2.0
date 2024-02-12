import React from 'react'
import AppBar from '../components/AppBar'
import Balance from '../components/Balance'
import Users from '../components/Users'

const Dashboard = () => {
  return (
    <>
    <AppBar />
    <Balance value={20000}/>
    <Users />
    </>
  )
}

export default Dashboard
