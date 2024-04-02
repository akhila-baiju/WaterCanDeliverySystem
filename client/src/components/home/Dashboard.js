import React from 'react'
import Box from "@mui/material/Box";
import logo from '../../assets/images/page.jpg'
import Products from '../products/Products';
import Subscription from './Subscription';
import Header from './Header';
import Footer from './Footer';
const Dashboard = () => {
  return (
    <div>
      <Header/>
      <Box  sx={{  
        marginTop: 8,
        marginBottom: 28,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
       }}>  <img src={logo} alt="landing"   /></Box>
       <Products/>
       <Subscription/>
       <Footer/>
   </div>
  )
}

export default Dashboard