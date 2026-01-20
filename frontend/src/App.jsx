import { BrowserRouter as Router, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Crumbs from "./pages/Crumbs";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/crumbs" element={<Crumbs />} />
      </Routes>
    </Router>
  )
}

export default App