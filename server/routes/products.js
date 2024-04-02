
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const database = require("../database/database");
const app = express(); 
const router = express.Router();

const multer = require('multer');
const ImageDataURI = require('image-data-uri');
const path= require("path");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const UsersData = require("../models/Productdata");
const ProductsData = require('../models/Productdata');
 
database();
app.use(express.static('public'));
//app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static('public'));
// const { request } = require("http");
app.use(cors());
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
router.post('/add', upload.single('image'), async (req, res) => {
  try {
   
    const newItem = new ProductsData({
    
     manufactureId:req.body.manufactureId,
     productName:req.body.productName,
     productWeight:req.body.productWeight,
     productPrice:req.body.productPrice ,
     pNumber:req.body.pNumber ,
      imageUrl: req.file.path
      
    });
   // console.log("produ--"+newItem)
    await newItem.save();
    res.status(201).send('Item created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating item');
  }
});


router.get('/user/:id', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    const id=req.params.id;
   
         try {
         
         const products = await ProductsData.find({manufactureId:id});
          if (!products) {
      return res.status(404).json({ message: 'No Products found' });
    }else{
    console.log("products= "+products)
    res.json(products);
    }
  } catch (error) {
    console.error('Error fetching products data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  });


  router.get('/product/:id', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    const id=req.params.id;
   
         try {
         
         const products = await ProductsData.find({_id:id});
          if (!products) {
      return res.status(404).json({ message: 'No Products found' });
    }else{
    console.log("products= "+products)
    res.json(products);
    }
  } catch (error) {
    console.error('Error fetching products data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  });



  router.get('/allproducts', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
          try {
          const products = await ProductsData.find();
          if (!products) {
      return res.status(404).json({ message: 'No Products found' });
    }else{
           res.json(products);
    }
  } catch (error) {
    console.error('Error fetching products data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  });



module.exports = router;