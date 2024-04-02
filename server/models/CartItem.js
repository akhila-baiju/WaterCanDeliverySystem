const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  //productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  manufactureId :{ type: String, required: true},
  userId :{ type: String, required: true},
  productId :{ type: String, required: true},
  quantity: { type: Number, required: true },
  productName: {type: String,required: true},
  productWeight: {type: String, required: true},
  productPrice: {type: String,required: true},
  imageUrl: {type: String,required: true},
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;
