import { useState } from 'react'
import './App.css'
import InputBox from './components/InputBox'
import Heading from './components/Heading'
import SubHeading from './components/SubHeading'
import Button from './components/Button'
import BottomWarning from './components/BottomWarining'

function App() {

  return (
    <>
      <InputBox label={"Name"} placeholder={"Enter your name"}></InputBox>
      <Heading label={"Sign up"} />
      <SubHeading label={"This is a new page "} />
      <Button label={"Sign up"} />
    </>
  )
}

export default App
