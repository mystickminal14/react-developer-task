import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Posts from '../pages/Posts/Posts'
export default function AppRoutes() {
  return (
    <>
    <Routes>
        <Route path='/'  element={<Posts/>} index/>
    </Routes>

      
    </>
  )
}
