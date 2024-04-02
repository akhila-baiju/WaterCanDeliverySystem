import React, { useState,useEffect } from 'react';
//import { Stepper, Step, StepLabel, Button, Typography, Paper, Grid } from '@mui/material';
import {
  Stepper, Step, StepLabel,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  Link,
} from "@mui/material";
import { useLocation } from 'react-router-dom';
//import {ShoppingCartOverview} from '../cart/ProductListingPage';

import { styled } from '@mui/material/styles';
import userService from '../../services/userService';
import PaymentForm from './PaymentForm';
import { useNavigate } from "react-router-dom";
import ShippingInfoPage from './ShippingInfoPage';
const steps = [ 'Billing and Shipping Info', 'Payment Info', 'Confirm Order'];
// const [data, setData] = useState(null);


const id = localStorage.getItem('id');
console.log("checkout page== "+id)
  
// const handleUpdate = async (values) => {
//   alert("updat")}
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const Checkout = (cartItems) => {
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  // const location = useLocation();
  // const { state } = location;
  // const cart = state ? state.cart : [];
  // console.log('Cart Items:', cart);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Grid>
    <Paper sx={{ padding: 2 ,marginLeft:15, marginRight:15, marginTop:5}}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography sx={{ mt: 2, mb: 1 }}>Thank you for your order!</Typography>
            <Button onClick={() => setActiveStep(0)}>Place Another Order</Button>
          </div>
        ) : (
          <div>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            {/* Render step content based on activeStep */}
            {getStepContent(activeStep)}
            <div sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} size='small' sx={{ mr: 1 }}>
                  Back
                </Button>
              )}
              <Button variant="contained" size='small' onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Place Order' : 'Proceed'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Paper>
    </Grid>
  );
};

const getStepContent = (step) => {
  switch (step) {
    case 0:
      return <CheckoutInfo />;
    case 1:
      return <BillingShippingInfo />;
    case 2:
      return <PaymentInfo />;
    case 3:
      return <ConfirmOrder />;
    default:
      return null;
  }
};

// Define your components for each step
const CheckoutInfo = () =>{
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const updateCart=()=>{
    navigate('/user/userheader/userwish');
}
  const cartItems = JSON.parse(localStorage.getItem('cart'));

 console.log('Cart Items:', cartItems);
  useEffect(() => {
    const fetchData = async () => {
    try {
        const response = await userService.getUserById(id);
       const result = await response.json();
      // console.log("result== "+result.firstName);
       setData(result);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
fetchData();
}, []);
const shippingCharge=50;

 return(
  <><Grid container spacing={2}>
    <Grid item xs={6}>
      <Item>Shipping Address
        {/* <ShippingInfoPage/> */}
        {/* {data && <UpdateProfile initialValues={data} onSubmit={handleUpdate} />} */}
    </Item>
  </Grid><Grid item xs={5}>
      <Item>Cart Items

      <Paper elevation={3} sx={{ p: 2 }}>
    <Typography variant="h6" gutterBottom>
      Shopping Cart
    </Typography>
    <Divider />
    <List>
       {(cartItems)&&cartItems.map((item, index) => ( 
        <ListItem
         key={index} 
         >
          <ListItemText
             primary={item.productName}
             secondary={`Quantity: ${item.quantity}`}
          />
          <Typography variant="body2">
            Rs.{(item.productPrice * item.quantity).toFixed(2)}
          </Typography>
                    
        </ListItem>
       ))} 
    </List>
    <List>
       
        <ListItem divider >
          <ListItemText
             primary='Shipping Charge'
             //secondary={`Quantity: ${item.quantity}`}
          />
          <Typography variant="body2">
            Rs.{shippingCharge}
          </Typography>
                    
        </ListItem>
      
    </List>
    <Typography divider>Shipping Charge</Typography>
    <Typography variant="h6">
      Total: Rs.
      {(cartItems)&&cartItems
        .reduce((total, item) => total + (item.productPrice * item.quantity)+shippingCharge, 0)
        .toFixed(2)}
    </Typography>
   <Grid item xs={12} md={4}>
          {/* <ShoppingCartOverview cartItems={cartItems} /> */}
        </Grid>
       
    {/* <Button variant='contained' onClick={updateCart}>Back To Cart</Button> */}
      </Paper>
      </Item>
    </Grid>

  </Grid></>
)}
  // <Paper elevation={2} sx={{ p: 6 }}>
    // <Typography variant="h6" gutterBottom>
    //   Shopping Cart
    // </Typography>
    {/* <Divider /> */}
    {/* <List> */}
      {/* {cartItems.map((item, index) => (
        <ListItem key={index} divider>
          <ListItemText
            primary={item.productName} */}
            {/* // secondary={`Quantity: ${item.quantity}`} */}
          {/* /> */}
          // <Typography variant="body2">
          //   {/* Rs.{(item.productPrice * item.quantity).toFixed(2)} */}
          // </Typography>
        {/* </ListItem> */}
      {/* ))} */}
    {/* </List> */}
    // <Typography variant="h6">
    //   Total: Rs.
      {/* {cartItems
        .reduce((total, item) => total + item.productPrice * item.quantity, 0)
        .toFixed(2)} */}
    {/* </Typography> */}
   
      {/* // </Paper> */}
  


const BillingShippingInfo = () => {
  const handleSubmit = (values) => {
    // Mock submission, replace with actual form submission logic
    console.log('Form submitted with values:', values);
  };
return(
  <Typography>
    <div>
    <PaymentForm onSubmit={handleSubmit} />
    </div>
  </Typography>
)};

const PaymentInfo = () => (
  <Typography>
    Enter payment information here...
  </Typography>
);

const ConfirmOrder = () => (
  <Typography>
    Confirm order details here...
  </Typography>
);

export default Checkout;
