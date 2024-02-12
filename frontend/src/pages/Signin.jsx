import React from 'react'
import Header from '../components/Header'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button';
import BottomWarning from '../components/BottomWarning'

const Signin = () => {
  return (
    <div className='h-screen flex flex-col md:flex md:justify-center text-center'>
      <Header />
      <div className='flex flex-col h-full w-full justify-center md:items-center' >
        <div className='bg-white h-full w-full px-3 py-3 rounded-lg md:w-1/3 md:h-max md:shadow-blue-500/20 md:shadow-[0px_4px_18px_16px_#00000024]'>
          <Heading label={"Sign in"}/>
          <SubHeading label={"Welcome back! Please enter your credentials to access your account."}/>
          <InputBox label={'Email'} placeholder={"youremail.com"}/>
          <InputBox label={'Password'} placeholder={"yourpassword"}/>
          <div className='pt-3'>
          <Button label={"Sign in"}/>
          </div>
          <BottomWarning label={"Don't have an account?"} to={"/signup"} buttonText={"Sign up"}/>
          
        </div>
      </div>
    </div>
  )
}

export default Signin
