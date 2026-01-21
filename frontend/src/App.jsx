import { BrowserRouter as Router, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Crumbs from "./pages/Crumbs";
import { ProductContextProvider } from "./context/ProductContext";

const App = () => {
  return (
    <Router>
      <ProductContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/crumbs" element={<Crumbs />} />
        </Routes>
      </ProductContextProvider>
    </Router>
  )
}

export default App