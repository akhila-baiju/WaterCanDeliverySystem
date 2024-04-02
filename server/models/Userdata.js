
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var UserSchema = new Schema({

            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
            },
            password: {
                type: String,
                required: true,
            },
            contactNumber: {
                type: String,
                required: true,
            },
            userType: {
                type: String,
                required: true,
            },
            address: {
                type: String,
                required: true,
            },
            
        },
           );
    var UsersData = mongoose.model('Userdata', UserSchema);
     module.exports = UsersData;
