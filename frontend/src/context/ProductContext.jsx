import { createContext, useEffect, useState } from "react";
import axiosInstance from "../lib/axios";

export const ProductContext =  createContext();

export function ProductContextProvider({ children }) {
  const [ products, setProducts ] = useState([]);
  const [ orders, setOrders ] = useState([]);

  const fetchProducts = async () => {
    const res = await axiosInstance.get("/products")
    setProducts(res.data);
  };

  const fetchOrders = async () => {
    const res = await axiosInstance.get("/orders")
    setOrders(res.data);
  };

  return(
    <ProductContext.Provider value={{ fetchProducts, products, fetchOrders, orders, setOrders }}>
      {children}
    </ProductContext.Provider>
  )

}