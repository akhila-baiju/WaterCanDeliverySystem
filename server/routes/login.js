
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

const adminEmail = 'admin@gmail.com';
const adminPassword = 'admin123';

router.post('/signup', (req, res) => {
  const formData = req.body;
  var create = new UsersData(formData);
  try {
    if (formData.firstName == ('') || formData.lastName == ('') || formData.email == ('') || formData.password == ('') || formData.contactNumber == ('') || formData.userType == ('')) {
      res.send({ message: "Field cannot be empty" })
      //return res.status(400).json({ message: 'All fields are required' });
    } else {
      create.save();
      res.json({ message: 'Form data received successfully!' });
    }
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/login' , async (req,res)=>{
  res.header("Access-Control-Allow-Orgin", "*");
  res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
  const data = req.body;
  const useremail =data.email;
  const userpassword = data.password;
 //console.log("emil= "+useremail+" pass= "+userpassword)
  try{
      const user = await UsersData.findOne({email : useremail});
    //  console.log("user= "+user)
      if(user){
         const result = (userpassword === user.password);
         if (result) {
            const customer =user.userType === "customer";
            const vendor =user.userType === "vendor";
            const manufacturer =user.userType === "manufacturer";
           // const token = jwt.sign({ userId: 'user123' }, 'your-secret-key');
         //  console.log("usertype== "+)
           var id=user._id;
           var type=user.userType;
           res.json({userType : type, userId : id})
          
           
            } 
            else {
                    res.status(400).json({ error: "password doesn't match" });
                 }
        } else {
                  res.status(400).json({ error: "User doesn't exist" });
               }
} catch (error) {
  res.status(400).json({ error });
}
  
});


router.post('/resetpassword', async(req, res) => {
  const formData = req.body;
  var create = new UsersData(formData);
  var email = formData.email;
  var newPassword =formData.password
 // console.log(create)
  try {
    if ( formData.email == ('') || formData.password == ('') ) {
      res.send({ message: "Field cannot be empty" })
      //return res.status(400).json({ message: 'All fields are required' });
    } else {
      await UsersData.updateOne(
        { email: email },
        { $set: { password: newPassword } }
      );
     // create.save();
      res.json({ message: 'Form data received successfully!' });
    }
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




module.exports = router;