import { BrowserRouter as Router, Routes, Route } from "react-router";
import { ProductContextProvider } from "./context/ProductContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Crumbs from "./pages/Crumbs";
import Basket from "./pages/Basket";

const App = () => {
  return (
    <Router>
      <ProductContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/crumbs" element={<Crumbs />} />
          <Route path="/basket" element={<Basket />} />
        </Routes>
      </ProductContextProvider>
    </Router>
  )
}

export default App