import * as React from 'react';
//import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
//import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Outlet, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { toast } from 'react-toastify';
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));
  
const Userdashboard = () => {

  const navigate =useNavigate(); 
  const handleLogout=()=>{
      localStorage.removeItem('id')
      navigate('/homepage')
      toast.success("Logout Successfully!!!");
      
   } 
  
const handleHome= ()=>{
       
  navigate('/')
}
    const handleLogin= ()=>{
       
        navigate('/login')
    }
    const handleProducts= ()=>{
        navigate('/productslist')
    }
    const handleSubscription= ()=>{
        navigate('/subscription')
    }
    const handleOffers= ()=>{
        navigate('/offers')
    }


  return (


<Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" >
        <Toolbar>
        
        <Typography variant="h6" sx={{ flexGrow: .02 }} >
            WCDS
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: .02 }} >
          <Button color="inherit" onClick={handleHome}>HOME</Button>
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: .02 }} >
          <Button color="inherit" onClick={handleProducts}>PRODUCTS</Button>
          </Typography>
          {/* <Typography variant="h6" sx={{ flexGrow: .02 }} >
          <Button color="inherit" onClick={handleSubscription}>SUBSCRIPTION</Button>
          </Typography> */}
          <Typography variant="h6"  sx={{ flexGrow: 1 }}>
          <Button color="inherit" onClick={handleSubscription}>SUBSCRIPTION</Button>
          </Typography>
          <Button color="inherit"  onClick={handleLogout}>  <LogoutIcon/></Button>        
          {/* <ShoppingCartOutlinedIcon/>
          <NotificationsIcon/> */}
        </Toolbar>
      </AppBar> 
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
       // open={open}
      >
      </Drawer>
      <Main>
        <DrawerHeader />
     
          
           <Outlet/>
        
      </Main>
    </Box>
 
  )
 
}

export default Userdashboard