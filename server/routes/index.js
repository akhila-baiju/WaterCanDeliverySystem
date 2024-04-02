const express = require('express');
const router = express.Router();


const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


const loginRoutes = require('./login');
const userRoutes = require("./user");
const productRoutes = require("./products");
const vendorRoutes = require("./vendor");
const manufacturerRoutes = require("./manufacturer"); 
const uploadRoutes = require("./upload");
const cartRoutes =require('./cartitems')

router.use('/api', loginRoutes);
router.use('/api/user', userRoutes);
router.use('/api/products', productRoutes);
router.use('/api/vendor', vendorRoutes);
router.use('/api/manufacturer',manufacturerRoutes);
router.use('/api/items', uploadRoutes);
router.use('/api/cart', cartRoutes);










//router.use('/api/signup', loginRoutes);

module.exports = router; 
