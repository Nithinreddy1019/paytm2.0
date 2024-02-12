import React, { useState } from 'react'
import Header from '../components/Header'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button';
import BottomWarning from '../components/BottomWarning'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  return (
    <div className='h-screen flex flex-col md:flex md:justify-center text-center'>
      <Header />
      <div className='flex flex-col h-full w-full justify-center md:items-center' >
        <div className='bg-white h-full w-full px-3 py-3 rounded-lg md:w-1/3 md:h-max md:shadow-blue-500/20 md:shadow-[0px_4px_18px_16px_#00000024]'>
          <Heading label={"Sign in"}/>
          <SubHeading label={"Welcome back! Please enter your credentials to access your account."}/>
          <InputBox onChange={(e) => {
            setUsername(e.target.value);
          }} label={'Email'} placeholder={"youremail.com"}/>
          <InputBox onChange={(e) => {
            setPassword(e.target.value);
          }} label={'Password'} placeholder={"yourpassword"}/>
          <div className='pt-3'>
          <Button onClick={() => {
            axios.post("http://localhost:3000/api/v1.1/user/signin", {
              username: username,
              password: password
            }).then((res) => {
              localStorage.setItem("token", res.data.token)
              navigate("/dashboard")
            }).catch((err) => {console.log(err)})
          }} label={"Sign in"}/>
          </div>
          <BottomWarning label={"Don't have an account?"} to={"/signup"} buttonText={"Sign up"}/>
          
        </div>
      </div>
    </div>
  )
}

export default Signin
