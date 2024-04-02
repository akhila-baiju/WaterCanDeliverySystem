const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const database = require("../database/database");
const app = express();

const router = express.Router();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
                  
 const ProductsData = require('../models/Productdata');
 
database();
// Multer middleware for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// API endpoint for creating new items with image upload
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
   
    const newItem = new ProductsData({
    
     manufactureId:req.body.manufactureId,
     productName:req.body.productName,
     productWeight:req.body.productWeight,
     productPrice:req.body.productPrice ,
     pNumber:req.body.pNumber ,
      imageUrl: req.file.path
      
    });
  //  console.log("produ--"+newItem)
    await newItem.save();
    res.status(201).send('Item created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating item');
  }
});


module.exports = router;