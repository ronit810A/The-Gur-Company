
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
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
