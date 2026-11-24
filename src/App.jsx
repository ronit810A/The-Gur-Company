
import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Routes, Route, useLocation } from "react-router-dom";

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
import BlogStory from "./Pages/blog-story";
import Recipes from "./Pages/recipes";
import Reviews from "./Pages/reviews";
import Contact from "./Pages/contact";
import Wishlist from "./Pages/wishlist";
import Cart from "./Pages/cart";
import Profile from "./Pages/profile";
import Signup from "./Pages/signup";
import Login from "./Pages/login";
import { endDemoSession, readDemoSession } from "./Component/AuthPageData/demoAuth";

import "./app.css";

const pageBodyClasses = {
  "/": "home-page",
  "/powder": "powder-page",
  "/block": "jaggery-block-page",
  "/syrup": "jaggery-syrup-page",
  "/story": "our-story-page",
  "/blogs": "blogs-page",
  "/recipes": "recipes-page",
  "/reviews": "reviews-page",
  "/contact": "contact-page",
  "/wishlist": "wishlist-page",
  "/cart": "cart-page",
  "/profile": "profile-page",
  "/signup": "login-signup-page",
  "/login": "login-signup-page",
};

function PageBodyClass() {
  const { pathname } = useLocation();

  useEffect(() => {
    const routePath = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
    const bodyClass = routePath.startsWith("/blogs/")
      ? "blog-story-page"
      : pageBodyClasses[routePath] || "not-found-page";
    document.body.classList.add(bodyClass);

    return () => document.body.classList.remove(bodyClass);
  }, [pathname]);

  return null;
}

function App() {
  const [authState, setAuthState] = useState(() => {
    try {
      return { user: readDemoSession(), error: "" };
    } catch (error) {
      return { user: null, error: error.message };
    }
  });

  const handleAuthenticated = (user) => {
    setAuthState({ user, error: "" });
  };

  const handleLogout = () => {
    try {
      endDemoSession();
      setAuthState({ user: null, error: "" });
    } catch (error) {
      setAuthState({ ...authState, error: error.message });
    }
  };

  return (
    <BrowserRouter>
      <PageBodyClass />
      <Header user={authState.user} />
      {authState.error && <p className="app-auth-error" role="alert">{authState.error}</p>}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/powder" element={<Powder />} />
        <Route path="/block" element={<JaggeryBlock />} />
        <Route path="/syrup" element={<JaggerySyrup />} />
        <Route path="/story" element={<OurStory />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<BlogStory />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/wishlist"
          element={
            authState.user
              ? <Wishlist />
              : <Navigate to="/login" replace state={{ from: "/wishlist" }} />
          }
        />
        <Route
          path="/cart"
          element={
            authState.user
              ? <Cart />
              : <Navigate to="/login" replace state={{ from: "/cart" }} />
          }
        />
        <Route
          path="/profile"
          element={
            authState.user
              ? <Profile onLogout={handleLogout} />
              : <Navigate to="/signup" replace />
          }
        />
        <Route
          path="/signup"
          element={
            authState.user
              ? <Navigate to="/profile" replace />
              : <Signup onAuthenticated={handleAuthenticated} />
          }
        />
        <Route
          path="/login"
          element={
            authState.user
              ? <Navigate to="/profile" replace />
              : <Login onAuthenticated={handleAuthenticated} />
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
