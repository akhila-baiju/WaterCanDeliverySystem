const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
app.use(express.static('public'));

const routes = require('./routes');


// Use the routes
app.use('/', routes);

// Middleware for handling 404 errors
app.use((req, res) => {
  
  res.status(404).send('Not Found');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
