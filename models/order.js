const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  productQuantity: Number,
});


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;