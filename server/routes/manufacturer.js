


const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const database = require("../database/database");
const app = express();
const router = express.Router();


app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const UsersData = require("../models/Userdata");

database();

  router.get('/manufacturer/:id', async (req, res) => {
   
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    const id=req.params.id; 
            try {
         const user = await UsersData.findById(id);
          if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }else{
   // console.log("user=="+user.firstName +" "+user.lastName);
    res.json(user.firstName +" "+user.lastName);
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  });



  router.get('/allmanufacturers', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
   
        try {

          const manufacturer=await UsersData.find({"userType":"manufacturer"})
         
//console.log("manufacturer= "+manufacturer)
         
          if (!manufacturer) { 
      return res.status(404).json({ message: 'No usernames found' });
    }else{
       res.json(manufacturer);
    }
  } catch (error) {
    console.error('Error fetching products data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  });
  module.exports = router;