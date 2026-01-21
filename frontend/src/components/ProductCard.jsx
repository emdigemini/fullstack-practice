import axiosInstance from "../lib/axios";
import { money, ratingAverage } from "../lib/utils";
import ProductContext from "../context/ProductContext";
import { useContext } from "react";
import { useEffect } from "react";

const ProductCard = ({ product }) => {
  const { orders, setOrders, fetchOrders } = useContext(ProductContext);

  const addToOrder = async () => {
    try {
      const newOrder = {
        productId: product._id,
        productName: product.productName,
        flavor: product.flavor[0],
        price: product.price,
      }

      if(existingProduct(product._id)) {
        setOrders(prev => prev.map(order => order.productId === newOrder.productId ? { ...order, qty: order.qty + 1 } : order));
        await axiosInstance.post("/orders", { productId: newOrder.productId });
        return;
      }
      
      setOrders(prev => [ ...prev, { ...newOrder, qty: 1 } ]);
      await axiosInstance.post("/orders", newOrder);
    } catch (err) {
      console.log("Error failed to order product", err);
    } 
  }

  const existingProduct = (productId) => {
    return orders.find(order => order.productId === productId)
  }

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="product__card">
      <div className="product__image">
        <img src={`http://localhost:5005/${product.image}`} alt={product.productName} />
      </div>
      <div className="product__name">
        {product.productName}
      </div>
      <div className="product__ratings">
        <img src={`/star-rating/${ratingAverage(product.reviews)}-star.png`} alt="ratings" /> ({product.reviews.length})
      </div>
      <div className="product__price">
        {money(product.price)}
      </div>
      <button onClick={addToOrder}>Add to Basket</button>
    </div>
  )
}

export default ProductCard