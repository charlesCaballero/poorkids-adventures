import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Footer } from "./components/Layout";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Tips from "./pages/Tips";
import Gallery from "./pages/Gallery";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/tips" element={<Tips />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
