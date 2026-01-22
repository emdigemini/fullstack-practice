import { useContext, useState } from "react";
import ProductContext from "../context/ProductContext";
import { money } from "../lib/utils";
import axiosInstance from "../lib/axios";
import { useEffect } from "react";

const Basket = () => {
  const { orders, setOrders, fetchOrders } = useContext(ProductContext);
  const [ editingId, setEditingId ] = useState(null);
  const [ tempQty, setTempQty ] = useState(1);

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
  }, [fetchOrders]);

  const editOrder = async (order) => {
    const orderId = order._id;
    if(editingId !== orderId){
      setEditingId(orderId);
      setTempQty(order.qty);
      return;
    }

    try {
      setOrders(prev => {
        prev.map(order =>
          order._id === orderId ? { ...order, qty: tempQty} : order
        );
      })
      await axiosInstance.put(`/orders/${orderId}`, 
        {qty: tempQty});
      setEditingId(null);
    } catch (err) {
      console.log("Failed editing order", err);
    }
  };

  const editOrderQty = e => {
    const count = Number(e.target.value);

    setTempQty(count < 1 ? 1 : count);
  }

  return (
    <div className="order__basket">
      <div className="order-list">
        {orders.length === 0 && <p className="order__empty">Your basket is empty.</p>}
        {orders.length > 0 && 
          orders.map(order => {
            return (
              <div key={order._id} className="order-card">
                <div className="order-card__info">
                  <p className="order-card__title">{order.productName}</p>
                  <p className="order-card__subtitle">{order.flavor}</p>
                </div>

                <div className="order-card__qty">
                  Qty: {
                    editingId === order._id 
                    ? <input type="number" value={tempQty} placeholder={order.qty}
                        onChange={(e) => editOrderQty(e)}
                      />
                    : order.qty
                  }
                </div>

                <div className="order-card__actions">
                  <span className="order-card__price">{money(order.price)}</span>
                  <button className="order-card__edit" onClick={() => editOrder(order)}>
                    {editingId === order._id ? "Done" : "Edit"}
                  </button>
                  <button
                    onClick={() => deleteOrder(order._id)}
                    className="order-card__remove"
                  >
                    Remove
                  </button>
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