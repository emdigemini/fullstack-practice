import { Link } from "react-router";
import { useEffect, useContext } from "react";
import ProductContext from "../context/ProductContext";

const Navbar = () => {
  const { fetchOrders, orders } = useContext(ProductContext);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <header>
      <div>
        <h1>Quite Crumbs</h1>
        <p>BITES OF HAPPINESS</p>
      </div>
      <nav>
        <Link to={"/"}>HOME</Link>
        <Link to={"/about"}>ABOUT</Link>
        <Link to={"/crumbs"}>CRUMBS</Link>
        <Link to={"/contact"}>CONTACT</Link>
        <Link to={"/basket"} className="basket">
          <i className="bi bi-basket"></i>
          <span>{orders.length}</span>
        </Link>
      </nav>
    </header>
  )
}

export default Navbar