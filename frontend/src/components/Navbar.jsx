import { Link } from "react-router"

const Navbar = () => {
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
          <span>5</span>
        </Link>
      </nav>
    </header>
  )
}

export default Navbar