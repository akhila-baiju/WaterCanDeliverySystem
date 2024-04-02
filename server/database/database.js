
const mongoose = require('mongoose');

const connect = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/wcds', {
    
  
    });

    //console.log('Connected to MongoDB1');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the application on connection failure
  }
};

module.exports = connect;
