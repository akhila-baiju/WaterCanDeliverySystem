import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { useState } from 'react';
import { Outlet,useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { toast } from 'react-toastify';

export default function Userheader() {
    const [title,setTitle] = useState('Profile');
    const navigate =useNavigate();
    
    const handleProfile = () =>{
     
      setTitle("Profile")
      navigate('/user/userheader/userprofile')
    }
    const handleOrders = () =>{
    setTitle("My Orders")
    navigate('/user/userheader/userorders')
  }

  const handleBilling = () =>{
    setTitle("Billing")
    navigate('/user/userheader/userbills')
  }
  const handleWish=()=>{
    setTitle("My WishList")
    navigate('/user/userheader/userwish')
  }
  const handlePassword=()=>{
    setTitle("Reset Password")
    navigate('/user/userheader/resetpassword')
  }
  const handleLogout=()=>{
    localStorage.removeItem('id')
    navigate('/homepage')
    toast.success("Logout Successfully!!!");
   }

  return (
    <Box sx={{ flex: 1, width: '100%' }}>
      <Box
        sx={{
          position: 'sticky',
          top: { sm: -100, md: -110 }, 
          bgcolor: 'background.body',
          zIndex: 9995,
        }}
      >
        <Box sx={{ px: { xs: 2, md: 6 } }}>
          <Breadcrumbs
            size="sm"
            aria-label="breadcrumbs"
            separator={<ChevronRightRoundedIcon fontSize="sm" />}
            sx={{ pl: 0 }}
          >
            <Link
              underline="none"
              color="neutral"
              href="#some-link"
              aria-label="Home"
            >
              <HomeRoundedIcon />
            </Link>
            <Link
              underline="hover"
              color="neutral"
              href="#some-link"
              fontSize={16}
              fontWeight={500}
            >
              Users
            </Link>
            <Typography color="primary" fontWeight={500} fontSize={16}>
             {title}
            </Typography>
          </Breadcrumbs>
          
        </Box>
        <Tabs
          defaultValue={0}
          sx={{
            bgcolor: 'transparent',
          }}
        >
          <TabList
            tabFlex={1}
            size="sm"
            sx={{
              pl: { xs: 0, md: 4 },
              justifyContent: 'left',
              [`&& .${tabClasses.root}`]: {
                fontWeight: '600',
                flex: 'initial',
                color: 'text.tertiary',
                [`&.${tabClasses.selected}`]: {
                  bgcolor: 'transparent',
                  color: 'text.primary',
                  '&::after': {
                    height: '2px',
                    bgcolor: 'primary.500',
                  },
                },
              },
            }}
          >
            <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={0}  >
            <Button variant="text" onClick={handleProfile}> My Profile</Button> 
            </Tab>
            <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={1} >
            <Button variant="text" onClick={handleOrders}>My Orders</Button>
            </Tab>
            <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={3} >
            <Button variant="text" onClick={handleBilling} >Billing</Button>
            </Tab>
            <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={4} >
            <Button variant="text" onClick={handleWish} >Shop Now</Button>
            </Tab>
            <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={5} >
            <Button variant="text" onClick={handlePassword} >Reset Password</Button>
            </Tab>
            
            <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={6} >
            <Button variant="text" onClick={handleLogout} >Logout</Button>
            </Tab>
              {/* <IconButton color="inherit" onClick={handleLogout}  >
                <Badge  color="secondary">
                     <LogoutIcon/>  
                </Badge>
              </IconButton>
            </Tab> */}
          </TabList>
        </Tabs>
        
      </Box>
       
<Outlet/>
      
      </Box> 
  );
}
