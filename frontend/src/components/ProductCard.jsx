import { useEffect } from "react"
import { money } from "../lib/utils"
const ProductCard = ({ product }) => {
  useEffect(() => {
    console.log(product.image);
  }, [])

  return (
    <div className="product__card">
      <div className="product__image">
        <img src={`http://localhost:5005/${product.image}`} alt="" />
      </div>
      <div className="product__name">
        {product.productName}
      </div>
      <div className="product__price">
        {money(product.price)}
      </div>
      <button>Add to Basket</button>
    </div>
  )
}

export default ProductCard