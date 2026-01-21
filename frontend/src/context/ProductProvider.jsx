import axiosInstance from "../lib/axios";
import { useState, useCallback } from "react";
import ProductContext from "./ProductContext";

function ProductContextProvider({ children }) {
  const [ products, setProducts ] = useState([]);
  const [ orders, setOrders ] = useState([]);
  const [ isRateLimited, setIsRateLimited ] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/products")
      setProducts(res.data);
    } catch (err) {
      console.log("Error fetching products", err);
      if(err.response?.status === 429) setIsRateLimited(true);
    } 
  }, []);

  const fetchOrders = useCallback(async () => {
    const res = await axiosInstance.get("/orders")
    setOrders(prev => {
      const sortedOrders = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return sortedOrders;
    });
  }, []);

  return(
    <ProductContext.Provider value={{ fetchProducts, products, fetchOrders, orders, setOrders, isRateLimited }}>
      {children}
    </ProductContext.Provider>
  )

}

export default ProductContextProvider;