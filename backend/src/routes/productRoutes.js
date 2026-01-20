import express from "express";
import { getAllProducts, getSelectedProduct, addNewProduct, editProduct, deleteProduct } from "../controller/productController.js";
import { upload } from "../middleware/multerConfig.js";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", upload.single("image"), addNewProduct);
router.put("/:id", upload.single("image"), editProduct);
router.delete("/:id", deleteProduct);
router.get("/:id", getSelectedProduct);

export default router;