import React from 'react'
import Navbar from '../componentts/Navbar'
import { Footer } from '../componentts/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
      <>
        <Navbar />
        <Outlet/>
        {/* <Footer/>    */}
    </>
  )
}

export default Layout