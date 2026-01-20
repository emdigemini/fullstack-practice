import Order from "../models/Order.js";

export async function getAllOrders(_, res) {
  try {
    const order = await Order.find().sort({createdAt: -1});
    res.status(200).json(order);
  } catch (err) {
    console.warn("Error in getAllOrders controller", err);
    res.status(500).json({message: "Internal server error."})
  }
}

export async function createOrder(req, res) {
  try {
    const { product, flavor, qty = 1, price } = req.body;
    const newOrder = await Order.create({ product, flavor, qty, price });
    res.status(201).json(newOrder);
  } catch (err) {
    console.warn("Error in createOrder controller", err);
    res.status(500).json({message: "Internal server error."});
  }
}

export async function editOrder(req, res) {
  try {
    const { product, flavor, qty = 1, price } = req.body;
    const updateOrder = await Order.findByIdAndUpdate(req.params.id, { product, flavor, qty, price }, { new: true });
    if(!updateOrder) return res.status(404).json({message: "Order not found."});

    res.status(200).json({message: "Order successfully updated."})
  } catch (err) {
    console.warn("Error in editOrder controller", err);
    res.status(500).json({ message: "Internal server error." });
  }
}

export async function deleteOrder(req, res) {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if(!deletedOrder) return res.status(404).json({message: "Order not found."});

    res.status(200).json({message: "Order successfully deleted."});
  } catch (err) {
    console.warn("Error in deleteOrder controller", err);
    res.status(500).json({message: "Internal server error."})
  }
}

export async function getSelectedOrder(req, res) {
  try {
    const selectedOrder = await Order.findById(req.params.id);
    if(!selectedOrder) return res.status(404).json({message: "Order not found."});

    res.status(200).json(selectedOrder);
  } catch (err) {
    console.warn("Error in getSelectedOrder controller", err);
    res.status(500).json({message: "Internal server error."});
  }
}