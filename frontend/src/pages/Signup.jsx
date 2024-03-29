import React, { useState } from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';


const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className='h-screen flex flex-col md:flex md:justify-center text-center'>
      <Header />
      <div className='flex flex-col h-full w-full justify-center md:items-center' >
        <div className='bg-white h-full w-full px-3 py-3 rounded-lg md:w-1/3 md:h-max md:shadow-blue-500/20 md:shadow-[0px_4px_18px_16px_#00000024]'>
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter you information to create an account"} />
          <InputBox onChange={(e) => {
            setUsername(e.target.value);
          }} label={"Email"} placeholder={"Youremail@gmail.com"} />
          <InputBox onChange={(e) => {
            setfirstName(e.target.value);
          }} label={"First Name"} placeholder={"Your first name"} />
          <InputBox onChange={(e) => {
            setlastName(e.target.value);
          }} label={"Last Name"} placeholder={"your last name"} />
          <InputBox onChange={(e) => {
            setPassword(e.target.value);
          }} label={"Password"} placeholder={"Your password"} />
          <div className='pt-3'>
            <Button onClick={ () => {

              axios.post("http://localhost:3000/api/v1.1/user/signup", {
                username: username,
                firstName: firstName,
                lastName: lastName,
                password: password
              }).then((res) => {
                localStorage.setItem("token", res.data.token);
                navigate("/dashboard");
              }).catch((err) => console.log(err))
            }
            } label={"Sign up"} />
          </div>
          <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
        </div>
      </div>


    </div>
  )
}

export default Signup
