import axiosInstance from "../lib/axios";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

const Crumbs = () => {
  const [ products, setProducts ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isRateLimited, setIsRateLimited ] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.log("Error fetching products", err);
        if(err.response?.status === 429) setIsRateLimited(true);
      } finally {
        setIsLoading(false);
      }
    } 

    fetchProducts();
  }, []);

  return (
    <div className="crumbs">
      <div className="products">
        {products.map(product => {
          return (
            <ProductCard key={product._id} product={product} />
          )
        })}
      </div>
    </div>
  )
}

export default Crumbs