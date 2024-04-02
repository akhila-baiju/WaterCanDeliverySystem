
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ProductSchema = new Schema({

            manufactureId: {
                type: String,
                required: true,
            },
            // manufactureName: {
            //     type: String,
            //     required: true,
            // },
            productName: {
                type: String,
                required: true,
            },
            productWeight: {
                type: String,
                required: true,
            },
            productPrice: {
                type: String,
                required: true,
            },
            pNumber: {
                type: String,
                required: true,
            },
            imageUrl: {
                type: String,
                required: true,
            },
           
            
        },
           );
    var ProductsData = mongoose.model('Productdata', ProductSchema);
     module.exports = ProductsData;


    //  const ItemModel = mongoose.model('Item', 
    //  { name: String, imageUrl: String });
