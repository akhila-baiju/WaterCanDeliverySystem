
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
const ProductsData = require('../models/Productdata');

database();



module.exports = router;