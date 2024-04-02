import React from 'react'
import react, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import productService from '../../services/productService';
import userService from '../../services/userService';
import ProductCard from '../cart/ProductCard';
import { Grid, Box } from '@mui/material';
import { Card, CardMedia, CardContent, CardActions, Typography, Button } from '@mui/material';
import cartService from '../../services/cartService';

import CartPage from '../cart/CartPage';

const Usershoping = () => {
  const [data, setData] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const navigate=useNavigate();
  //const [products] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const userId= localStorage.getItem("id")
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productService.getAllProducts();
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();

        setData(result);
        const res = await cartService.getCart(userId);
        if (!res.ok) {
              throw new Error('Failed to fetch data');
            }
            const carts = await res.json();
            setCartItems(carts);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }

    };
    fetchData();
  }, []);


  

  const getItemQuantityInCart = async (productId) => {
    try {
      const response = await cartService.getItemQuantityInCart(userId, productId);
      if (!response.ok) {
        throw new Error('Failed to fetch quantity');
      }
      const data = await response.json();
      return data.quantity;
    } catch (error) {
      console.error('Error getting item quantity in cart:', error);
      return 0; // Return 0 if there's an error
    }
  };

  const addCart = async(e,product) => {
    e.preventDefault();
    try {
     const productId=product._id;
    
      const quantityInCart = await getItemQuantityInCart(productId);
     var quantity;
    
      if (quantityInCart === 0) {
        const response = cartService.addToCart({
          manufactureId: product.manufactureId,
          userId: userId,
          productId: product._id,
          quantity: 1,
          productName: product.productName,
          productWeight: product.productWeight,
          productPrice: product.productPrice,
          imageUrl: product.imageUrl
        });
          }
     else{ 
        const res = cartService.updateCart({
          manufactureId: product.manufactureId,
          userId: userId,
          productId: product._id,
          quantity: quantityInCart+1,
      })
    }
    const response = await cartService.getCart(userId);
    if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            const result = await response.json();
            setCartItems(result);
    
    } catch (error) {
      console.error('Error submitting form:', error);
    }

  }

  const deleteItem = async(item) => {
    //console.log("id- "+item._id)
      const remove=await cartService.removeItem(item._id);
      const response = await cartService.getCart(userId);
     if (!response.ok) {
               throw new Error('Failed to fetch data');
             }
             const result = await response.json();
             setCartItems(result);
  };


  const handleQuantityChange = async(event, item) => {
    try {
      // Get the new quantity from the event target value
      const newQuantity = event.target.value;
  
      // Update quantity in the database
      await cartService.updateCart({
        manufactureId: item.manufactureId,
        userId: userId,
        productId: item.productId,
        quantity: newQuantity
      });
  
      // Update the quantity locally in the cartItems state
      const newCartItems = cartItems.map((cartItem) => {
        if (cartItem._id === item._id) {
          return { ...cartItem, quantity: newQuantity };
        }
        return cartItem;
      });
  
      // Update the cartItems state with the updated items
      setCartItems(newCartItems);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };
  

  return (

    // <div><ProductListingPage/></div>
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {(data) && data.map((product) => (
              <Grid item key={product._id} xs={12} sm={6} md={4}>
                <Card sx={{ maxWidth: 245 }}>
                  <CardMedia
                    component="img"
                    height="240"
                    image={'http://localhost:3001//' + product.imageUrl.replace(/public\\/, '')}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.productName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Number of Available Item: {product.pNumber}
                    </Typography>
                  </CardContent>
                  <CardActions>
                  <Button size="small" onClick={(e) => addCart(e, product)}>
                      Add to Cart
                  </Button>

                  </CardActions>
                </Card>

              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
        
        <CartPage
      cartItems={cartItems}
      handleQuantityChange={handleQuantityChange}
      deleteItem={deleteItem}
    />
        </Grid>
      </Grid>
    </Box>
  )
}


export default Usershoping

