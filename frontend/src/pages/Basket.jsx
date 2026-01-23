import { useContext, useState } from "react";
import ProductContext from "../context/ProductContext";
import { money } from "../lib/utils";
import axiosInstance from "../lib/axios";
import { useEffect } from "react";
import { editOrder, deleteOrder } from "../hooks/orderServices";

const Basket = () => {
  const { orders, setOrders, fetchOrders } = useContext(ProductContext);
  const [ editingId, setEditingId ] = useState(null);
  const [ tempQty, setTempQty ] = useState(1);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleDelete = (orderId) => {
    deleteOrder(setOrders, orderId);
  };

  const handleEdit = (orders) => {
    const orderId = orders._id;
    if(editingId !== orderId){
      setEditingId(orderId);
      setTempQty(orders.qty);
      return;
    }

    const order = { id: orderId, qty: tempQty };  
    editOrder(setOrders, order)
    setEditingId(null);
  }

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
                <div className="order-card__img">
                  <img src={`http://localhost:5005/${order.image}`} alt="" />
                </div>
                <div className="order-card__info">
                  <p className="order-card__title">{order.productName}</p>
                  <p className="order-card__subtitle">{order.flavor}</p>
                </div>

                <div className="order-card__price">
                  <p>Price:
                  <span>{money(order.price)}</span>
                  </p>
                </div>

                <div className="order-card__qty">
                  {editingId === order._id ? (
                    <input
                      type="number"
                      value={tempQty}
                      onChange={editOrderQty}
                    />
                  ) : (
                    order.qty
                  )}
                </div>

                <div className="order-card__total">
                  <p>Total Price:
                  <span>{money(order.price * order.qty)}</span>
                  </p>
                </div>

                <div className="order-card__actions">
                  <button
                    className="order-card__edit"
                    onClick={() => handleEdit(order)}
                  >
                    {editingId === order._id ? "Done" : "Edit"}
                  </button>
                  <button
                    onClick={() => handleDelete(order._id)}
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