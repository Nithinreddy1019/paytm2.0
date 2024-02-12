import './App.css'
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import Index from './components/Index';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useUser } from './hooks/useUser';

function App() {

  const user = useUser();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sendmoney" element={<SendMoney />} />
          <Route path='/' element={<Index />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
