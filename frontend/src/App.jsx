import React from 'react'
import Layout from './pages/Layout'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import MyReview from './pages/reviews/MyReview'
import { Movies } from './pages/home/Movies'


const App = () => {
  return (
    <>
      <Layout />
      <Routes>
         <Route path='/' element={<Login/>} />
         <Route path='/register' element={<Register/>} />
        <Route path='/myReviews' element={<MyReview />} />
        <Route path='/allmovies' element={<Movies/>}/>
      </Routes>
      
    </>
  )
}

export default App