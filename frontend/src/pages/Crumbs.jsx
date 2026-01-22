import { useState, useEffect, useContext } from "react";
import ProductCard from "../components/ProductCard";
import ProductContext from "../context/ProductContext";

const Crumbs = () => {
  const { fetchProducts, products, isRateLimited } = useContext(ProductContext);
  const [ isLoading, setIsLoading ] = useState(true);
  const delay = ms => new Promise(res => setTimeout(res, ms));

  useEffect(() => {
    let isMounted = true;
    let retries = 0;
    const MAX_RETRIES = 3;
    const renderProducts = async () => {
      try {
        await fetchProducts();
      } catch (err) {
        if(retries < MAX_RETRIES) {
          retries++;
          await delay(1000 * retries);
          renderProducts();
        }
        renderProducts();
      }finally {
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