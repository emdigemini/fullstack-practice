import express from "express";
import { getAllOrders, createOrder, editOrder, deleteOrder, getSelectedOrder } from "../controller/orderController.js";

const router = express.Router();

router.get("/",getAllOrders);
router.post("/",createOrder);
router.put("/:id",editOrder);
router.delete("/:id",deleteOrder);
router.get("/:id",getSelectedOrder);

export default router;