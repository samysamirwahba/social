// import React from 'react'
import Navbar from '../Componant/Navbar/Navbar'
import Footer from '../Componant/Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
      <Navbar /> 
       
      <div className='container w-[80%] mx-auto bg-blue-400 min-h-screen'>
      <Outlet />  
      </div>
       
      <Footer /> 
    </div>
  )
}
