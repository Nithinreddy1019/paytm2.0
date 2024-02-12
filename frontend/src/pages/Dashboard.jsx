import React, { useEffect, useState } from 'react'
import AppBar from '../components/AppBar'
import Balance from '../components/Balance'
import Users from '../components/Users'
import axios from 'axios'

const Dashboard = () => {
  const [firstname, setfirstName] = useState('');
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1.1/account/balance", {headers: {"Authorization": "Bearer "+localStorage.getItem("token")}}).then((res) => {
      setfirstName(res.data.firstName);
      setBalance(res.data.balance);
    })

  },[]);

  return (
    <>
      <AppBar name={firstname}/>
      <Balance value={balance}/>
      <Users />
    </>
  )
}

export default Dashboard
