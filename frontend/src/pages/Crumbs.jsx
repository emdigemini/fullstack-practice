import { useState, useEffect, useContext } from "react";
import ProductCard from "../components/ProductCard";
import ProductContext from "../context/ProductContext";

const Crumbs = () => {
  const { fetchProducts, products, isRateLimited } = useContext(ProductContext);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const renderProducts = async () => {
      try {
        await fetchProducts();
      } finally {
        if (isMounted) setIsLoading(false);
      }
    } 
    
    renderProducts();
    return () => isMounted = false;
  }, [fetchProducts]);

  return (
    <div className="crumbs">
      <div className="products">
        {isLoading && <p className="loading-products">Loading products...</p>}
        {isRateLimited && <p className="loading-products--error">Too many requests. Please try again later.</p>}
        {!isLoading && !isRateLimited && products.length === 0 && <p className="loading-products--error">No products found.</p>}
        {!isLoading && !isRateLimited &&
          products.map(product => {
            return (
              <ProductCard key={product._id} product={product} />
            )
          })
        }
      </div>
    </div>
  )
}

export default Crumbs