import React from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarining'
import Header from '../components/Header'

const Signup = () => {
  return (
    <div className='bg-sky-100 h-screen flex flex-col md:flex md:justify-center text-center'>
      <Header />
      <div className='flex flex-col h-full w-full justify-center md:items-center' >
        <div className='bg-white h-full w-full px-3 py-3 rounded-lg md:w-1/3 md:h-max md:shadow-2xl md:shadow-blue-500/20'>
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter you information to create an account"} />
          <InputBox label={"Email"} placeholder={"Youremail@gmail.com"} />
          <InputBox label={"First Name"} placeholder={"Your first name"} />
          <InputBox label={"Last Name"} placeholder={"your last name"} />
          <InputBox label={"Password"} placeholder={"Your password"} />
          <div className='pt-3'>
            <Button label={"Sign up"} />
          </div>
          <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
        </div>
      </div>


    </div>
  )
}

export default Signup
