
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const database = require("../database/database");
const app = express();
const router = express.Router();
const CartItem = require('../models/CartItem');


router.post('/addcart',  async (req, res) => {
    try {

        const { manufactureId ,userId ,productId ,quantity, productName,productWeight,
        productPrice,imageUrl } = req.body; 
        
      const newCartItem = new CartItem({
        manufactureId ,userId ,productId ,quantity, productName,productWeight,productPrice,imageUrl
      });
     // console.log("newCartItem= "+newCartItem)
      await newCartItem.save();
      res.status(201).json({ message: 'Cart item added successfully' });
    } catch (error) {
      console.error('Error adding cart item:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });  


  router.get('/getquantity/:userId/:productId', async (req, res) => { 
    try {
      const { userId, productId } = req.params;
      const cartItem = await CartItem.findOne({ userId: userId, productId: productId });
  
      if (cartItem) {
        res.json({ quantity: cartItem.quantity }); // Send the quantity as JSON response
      } else {
        res.json({ quantity: 0 }); // Send 0 if cart item not found
      }
    } catch (error) {
      console.error('Error getting item quantity in cart:', error);
      res.status(500).json({ error: 'Internal server error' }); // Send 500 status with error message
    }
  });
   
  router.put('/updateCart', async (req, res) => {
    try {
     // console.log("inside ")
      const { manufactureId ,userId ,productId ,quantity } = req.body; 
  console.log( manufactureId +" "+userId+ " "+productId+" " +quantity)
      const updatedCartItem = await CartItem.findOneAndUpdate(
        { userId: userId, productId: productId },
        { quantity: quantity },
        { new: true } // Return the updated document
      );
  
      if (!updatedCartItem) {
        return res.status(404).json({ error: 'Cart item not found' });
      }
  console.log("up- "+updatedCartItem)
      res.json(updatedCartItem);
    } catch (error) {
      console.error('Error updating cart:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
 

  router.get('/cart/:id', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    const id=req.params.id;
   
         try {
         
         const cartItems = await CartItem.find({userId:id});
          if (!cartItems) {
      return res.status(404).json({ message: 'No Products found' });
    }else{
    //console.log("cartItems= "+cartItems)
    res.json(cartItems);
    }
  } catch (error) {
    console.error('Error fetching products data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  });


  router.put('/remove/:id',async(req,res) => {
    
     const cartItemId=req.params.id;
     
     try {
     const result= await CartItem.findByIdAndDelete(cartItemId);
     res.json({ message: 'Field updated successfully', result });
     } catch (error) {
       console.error('Error updating document:', error);
     }
  
    })
 
  
  module.exports = router;