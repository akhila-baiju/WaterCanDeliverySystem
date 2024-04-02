


const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const cors = require('cors');
const database = require("../database/database");
const app = express();
const router = express.Router();
const nodemailer = require('nodemailer');

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const UsersData = require("../models/Userdata");

database();
router.get('/user/:id', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    const id=req.params.id;
    //console.log("id== "+id)
         try {
         const user = await UsersData.findById(id);
          if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }else{
   // console.log("user=="+user);
    res.json(user);
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  });

  router.get('/user/manufacturer:id', async (req, res) => {
    //console.log("insied fn")
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    const id=req.params.id;
   // console.log("id== "+id)
         try {
         const user = await UsersData.findById(id);
          if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }else{
    //console.log("user=="+user);
    res.json(user);
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  });

//********************************************************** */
router.post('/sendMail' , async (req,res)=>{
  res.header("Access-Control-Allow-Orgin", "*");
  res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
// router.post('/sendMail', async (req, res) => {
  const data = req.body;
  const email =data.email;
  console.log("email=1= "+email)
  
  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'watercandeliverysystem@gmail.com', // Your email address
      pass: 'iqdq lrqa wkkm bqas' // Your email password
    }
  });

  // Construct email options
  const mailOptions = {
    from: 'watercandeliverysystem@gmail.com',
    to: email,
    subject: 'Reset Password ',
    text: 'Hello,\n\nPlease find the link to the page: http://localhost:3000/resetpassword'
    };
  
  try {
    const user = await UsersData.findOne({email});
    console.log("user- "+user)
    if (!user) {
      res.send({ message: 'User not found' });
      //res.send('Mail Id Does not Exist');
      //return res.status(404).json({ message: 'User not found' });
    }
    else{
    // Send email
    //console.log("email-- "+email)
    await transporter.sendMail(mailOptions);
    res.send({ message: 'Email sent successfully' });
    }
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send email');
  }
});




//************************************************************* */


router.put('/update',async(req,res) => {
 
  const updatedUserData = req.body; 
  const id= updatedUserData._id;
console.log("data= "+id)
try {
  const updatedUser = await UsersData.findByIdAndUpdate(
    id,
    { $set: updatedUserData },
    { new: true } // Return the modified document
  );
  if (!updatedUser) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(updatedUser);
} catch (error) {
  console.error('Error updating user:', error);
  res.status(500).json({ message: 'Internal server error' });
}


})
  module.exports = router;