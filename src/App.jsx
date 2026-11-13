
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Component/header";

import Home from "./Pages/home";
import "./app.css"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
