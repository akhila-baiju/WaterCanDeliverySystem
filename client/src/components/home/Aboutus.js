import React from 'react'
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import logo from '../../assets/images/aboutus.jpg'
const Aboutus = () => {
  return (
    <div><Box  sx={{  
     // marginTop:2 ,
      marginBottom: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
     }}>  <img src={logo} alt="landing"   />
    
     </Box></div>
  )
}

export default Aboutus