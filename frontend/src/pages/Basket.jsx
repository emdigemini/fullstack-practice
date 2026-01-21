import { useContext } from "react";
import ProductContext from "../context/ProductContext";
import { money } from "../lib/utils";
import axiosInstance from "../lib/axios";
import { useEffect } from "react";

const Basket = () => {
  const { orders, setOrders, fetchOrders } = useContext(ProductContext);

  const deleteOrder = async (orderId) => {
    try {
      setOrders(prev => prev.filter(order => order._id !== orderId));
      await axiosInstance.delete(`/orders/${orderId}`);
    } catch (err) {
      console.log("Order not found.", err);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders])

  return (
    <div className="order__basket">
      <div className="order-list">
        {orders.length === 0 && <p className="order__empty">Your basket is empty.</p>}
        {orders.length > 0 && 
          orders.map(order => {
            return (
              <div key={order._id} className="order__card">
                <div className="order__card-left">
                  <p className="order__card-title">{order.productName}</p>
                  <p className="order__card-subtitle">{order.flavor}</p>
                </div>
                <div className="order__card qty">Qty: {order.qty}</div>

                <div className="order__card-right">
                  <span className="order__price">{money(order.price)}</span>
                  <button onClick={() => deleteOrder(order._id)} className="order__remove">Remove</button>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Basket