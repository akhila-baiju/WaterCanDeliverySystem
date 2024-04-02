import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ProductCard from '../cart/ProductCard';
import CartPage from '../cart/CartPage';
import Products from '../products/Products.js';
import Badge from '@mui/material/Badge';
import Dashboard from "../home/Dashboard.js"
import Aboutus from './Aboutus.js';

const Header = () => {
const cart=1;// localStorage.getItem("cart");
const navigate =useNavigate();
const [itemCount, setItemCount] = React.useState(1);
const handleHome= ()=>{
       
  navigate('/homepage')
}
    const handleLogin= ()=>{
      // alert("login")
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
    const handleAboutus= ()=>{
      navigate('/aboutus')
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
           
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: .02 }} >
            WCDS
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: .02 }} >
          <Button color="inherit" onClick={handleHome}>HOME</Button>
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: .02 }} >
          <Button color="inherit" onClick={handleProducts}>PRODUCTS</Button>
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: .02 }} >
          <Button color="inherit" onClick={handleSubscription}>SUBSCRIPTION</Button>
          </Typography>
          <Typography variant="h6"  sx={{ flexGrow: 1 }}>
          <Button color="inherit" onClick={handleAboutus}>AboutUs</Button>
          </Typography>
          <Button color="inherit" onClick={handleLogin}>Login</Button>
           <Badge color="secondary" badgeContent={Products.cart}> 
          
          {/* <ShoppingCartOutlinedIcon/> */}
          </Badge>
           
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Header