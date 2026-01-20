import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: "No description available."
  },
  flavor: {
    type: [String],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  ratings: {
    type: Number,
    default: 0,
  },
  reviews: [{
    userId: mongoose.Schema.Types.ObjectId,
    customerName: String,
    rating: Number,
    comment: String,
    createdAt: { type: Date, default: Date.now }
  }],
  image: {
    type: String,
    default: "no_image_uploaded"
  }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product