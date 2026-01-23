import axiosInstance from "../lib/axios";

export const editOrder = async (setOrders, order) => {
  try {
    setOrders(prev => {
      return prev.map(o =>
        o._id === order.id ? { ...o, qty: order.qty} : o
      );
    })
    await axiosInstance.put(`/orders/${order.id}`, 
      { qty: order.qty });
    } catch (err) {
    console.log("Failed editing order", err);
  }
};
  
export const deleteOrder = async (setOrders, orderId) => {
  try {
    setOrders(prev => prev.filter(order => order._id !== orderId));
    await axiosInstance.delete(`/orders/${orderId}`);
  } catch (err) {
    console.log("Order not found.", err);
  }
}

export const existingProduct = (orders, productId) => {
  return orders.find(order => order.productId === productId)
}