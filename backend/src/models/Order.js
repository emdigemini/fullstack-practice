import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  productName: {
    type: String
  },
  flavor: {
    type: String
  },
  qty: {
    type: Number,
    default: 1
  },
  price: {
    type: Number
  }
}, {timestamps: true});

const Order = mongoose.model("Order", orderSchema);

export default Order;