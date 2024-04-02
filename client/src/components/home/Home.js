import React from 'react'
import Header from './Header.js'
import { Outlet } from 'react-router-dom'
import Products from '../products/Products.js'
import Subscription from './Subscription.js'
import Offers from './Offers.js'
import Footer from './Footer.js'

import Box from "@mui/material/Box";
import Dashboard from './Dashboard.js'
import Homepage from './Homepage.js'
const Home = () => {
  
  return (
    <div>
      <Header/> 
     
      <Outlet/>
      
      <Footer/> 
    </div>
    
  )
}

export default Home