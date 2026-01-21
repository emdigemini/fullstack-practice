import Product from "../models/Products.js";

export async function getAllProducts(_, res){
  try {
    const products = await Product.find().sort({createdAt: -1});
    res.status(200).json(products);
  } catch (err) {
    console.log("Error in getAllProducts controller", err);
    res.status(500).json({message: "Internal server error."});
  }
}

export async function getSelectedProduct(req, res){
  try {
    const selectedProduct = await Product.findById(req.params.id);
    if(!selectedProduct) return res.status(404).json("Product not found.");

    res.status(200).json(selectedProduct);
  } catch (err) {
    console.log("Error in getSelectedProduct controller", err);
    res.status(500).json({message: "Internal server error."});
  }
}

export async function addNewProduct(req, res){
  try {
    const { productName, description, flavor, 
      price, ratings, reviews } = req.body;
    const newProduct = await Product.create({ productName, description, flavor, 
      price, ratings, reviews, image: req.file?.path || "" });
    res.status(201).json(newProduct);
  } catch (err) {
    console.log("Error in addNewProduct controller", err);
    res.status(500).json({message: "Internal server error."});
  }
}

export async function editProduct(req, res){
  try {
    const { productName, description, flavor, 
      price, ratings, reviews } = req.body; 
    const updateData = {
      productName, description, flavor,
      price, ratings, reviews
    };

    if(req.file?.path){
      updateData.image = req.file.path;
    }

    const updateProduct = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if(!updateProduct) return res.status(404).json({message: "Product not found."});

    res.status(200).json({message: "Product successfully updated."});
  } catch (err) {
    console.log("Error in editProduct controller", err);
    res.status(500).json({message: "Internal server error."});
  }
}

export async function deleteProduct(req, res){
  try {
    const productRemove = await Product.findByIdAndDelete(req.params.id);
    if(!productRemove) return res.status(404).json({message: "Product not found."});

    res.status(200).json({message: "Product successfully remove."});
  } catch (err) {
    console.log("Error in deleteProduct controller", err);
    res.status(500).json({message: "Internal server error."});
  }
}