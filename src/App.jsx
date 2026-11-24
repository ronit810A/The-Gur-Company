
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Header from "./Component/header";
import Footer from "./Component/footer";

import Home from "./Pages/home";
import Powder from "./Pages/powder";
import JaggeryBlock from "./Pages/jaggery-block";
import JaggerySyrup from "./Pages/jaggery-syrup";
import OurStory from "./Pages/our-story";
import Blogs from "./Pages/blogs";
import Recipes from "./Pages/recipes";
import Reviews from "./Pages/reviews";
import Contact from "./Pages/contact";
import Wishlist from "./Pages/wishlist";
import Cart from "./Pages/cart";

import "./app.css";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/powder" element={<Powder />} />
        <Route path="/block" element={<JaggeryBlock />} />
        <Route path="/syrup" element={<JaggerySyrup />} />
        <Route path="/story" element={<OurStory />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
