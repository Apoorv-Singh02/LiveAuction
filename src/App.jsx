import { useState } from 'react'
import './App.css'
import Navbar from './screens/Navbar'
import { Route, Routes } from 'react-router-dom'
import DashBoard from './screens/DashBoard'
import LoginScreen from './screens/LoginScreen'
import AdScreen from './screens/AdScreen'
import HomeScreen from './screens/HomeScreen'

function App() {

  return (
      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route path='/' index element={<HomeScreen />} />
          <Route path='/DashBoard' element={<DashBoard />} />
          <Route path='/Login' element={<LoginScreen />} />
          <Route path='/PostAd' element={<AdScreen />} />
        </Route>
      </Routes>
  )
}

export default App
