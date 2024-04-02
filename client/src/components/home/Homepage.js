import React from 'react'
import Box from "@mui/material/Box";
import logo from '../../assets/images/first1.jpg'
import logo1 from '../../assets/images/page.jpg'
const Homepage = () => {
  return (
    <div><Box  sx={{  
        marginTop: 8,
        marginBottom: 28,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
       }}>  <img src={logo1} alt="landing"   /></Box></div>
  )
}

export default Homepage