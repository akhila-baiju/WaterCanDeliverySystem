import React from 'react'
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import logo from '../../assets/images/first1.jpg'
const Welcome = () => {
  return (
    <div><Box  sx={{  
      marginTop: 8,
      marginBottom: 28,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
     }}>  <img src={logo} alt="landing"   />
    Your Account Created Successfully!!
    <Link href="/login" variant="body2">
                   Login to Start Booking
                  </Link>
     </Box></div>
  )
}

export default Welcome