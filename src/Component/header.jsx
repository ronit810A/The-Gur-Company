
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Collapse, Dropdown } from "bootstrap";
import { GurLogo, Union } from "./images";

import { useState, useEffect } from "react";

import {
    Search,
    Heart,
    ShoppingCart,
    UserRound
} from "lucide-react";

import { CART_STORAGE_KEY, CART_UPDATED_EVENT, readCartItems } from "./CartPageData/cartData";
import { WISHLIST_STORAGE_KEY, WISHLIST_UPDATED_EVENT, readWishlistItems } from "./WishlistPageData/wishlistData";

import "../Css/header.css"

function Header({ user }) {

    const location = useLocation();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(
        () => new URLSearchParams(location.search).get("search") || ""
    );
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);
    const [searchProducts, setSearchProducts] = useState([]);
    const [searchStatus, setSearchStatus] = useState("idle");
    const [searchError, setSearchError] = useState("");
    const [itemCounts, setItemCounts] = useState({ wishlist: 0, cart: 0, error: "" });
    const handleDropdownToggle = (event) => {
        Dropdown.getOrCreateInstance(event.currentTarget).toggle();
    };
    const loadSearchProducts = () => {
        if (searchStatus !== "idle") return;

        setSearchStatus("loading");
        fetch("/api/products")
            .then((response) => {
                if (!response.ok) throw new Error("Products could not be loaded.");
                return response.json();
            })
            .then((products) => {
                if (!Array.isArray(products)) throw new Error("Product data is in an unexpected format.");
                setSearchProducts(products);
                setSearchStatus("loaded");
            })
            .catch((error) => {
                setSearchStatus("error");
                setSearchError(error.message);
            });
    };
    const handleProductSearch = (event) => {
        event.preventDefault();
        const query = searchQuery.trim();
        navigate(query ? `/products?search=${encodeURIComponent(query)}` : "/products");
        setMobileSearchOpen(false);
        setSearchFocused(false);
    };
    const openProductSearch = (product) => {
        setSearchQuery(product.name);
        navigate(`/products/${encodeURIComponent(String(product.id))}`);
        setMobileSearchOpen(false);
        setSearchFocused(false);
    };
    const searchMatches = searchProducts.filter((product) =>
        [product.name, product.description, product.category]
            .some((value) => String(value || "").toLowerCase().includes(searchQuery.trim().toLowerCase()))
    );
    const showSearchResults = searchFocused && searchQuery.trim();
    const renderSearchResults = () => {
        if (!showSearchResults) return null;

        return (
            <div className="gur-search-results" role="listbox" aria-label="Product search results">
                {searchStatus === "loading" && (
                    <p className="gur-search-results-message" role="status">Searching products…</p>
                )}
                {searchStatus === "error" && (
                    <p className="gur-search-results-message" role="alert">
                        Products could not be loaded: {searchError}
                    </p>
                )}
                {searchStatus === "loaded" && searchMatches.length === 0 && (
                    <p className="gur-search-results-message" role="status">No matching products found.</p>
                )}
                {searchStatus === "loaded" && searchMatches.slice(0, 5).map((product) => (
                    <button
                        className="gur-search-result"
                        type="button"
                        role="option"
                        aria-selected="false"
                        key={product.id}
                        onClick={() => openProductSearch(product)}
                    >
                        <span className="gur-search-result-name">{product.name}</span>
                        <span className="gur-search-result-category">{product.category}</span>
                    </button>
                ))}
                {searchStatus === "loaded" && searchMatches.length > 0 && (
                    <button
                        className="gur-search-results-all"
                        type="submit"
                        onClick={() => setSearchFocused(false)}
                    >
                        View all {searchMatches.length} matching products
                    </button>
                )}
            </div>
        );
    };

    useEffect(() => {

        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

    }, []);

    useEffect(() => {
        const refreshItemCounts = () => {
            let wishlist = 0;
            let cart = 0;
            const errors = [];

            try {
                wishlist = readWishlistItems().length;
            } catch (error) {
                errors.push(error.message);
            }

            try {
                cart = readCartItems().reduce((total, item) => total + item.quantity, 0);
            } catch (error) {
                errors.push(error.message);
            }

            setItemCounts({ wishlist, cart, error: errors.join(" ") });
        };

        const handleStorageChange = (event) => {
            if (!event.key || [CART_STORAGE_KEY, WISHLIST_STORAGE_KEY].includes(event.key)) {
                refreshItemCounts();
            }
        };

        refreshItemCounts();
        window.addEventListener(CART_UPDATED_EVENT, refreshItemCounts);
        window.addEventListener(WISHLIST_UPDATED_EVENT, refreshItemCounts);
        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener(CART_UPDATED_EVENT, refreshItemCounts);
            window.removeEventListener(WISHLIST_UPDATED_EVENT, refreshItemCounts);
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    useEffect(() => {
        const navbar = document.getElementById("gurNavbar");

        if (!navbar) {
            return;
        }

        const handleMenuShown = () => setMenuOpen(true);
        const handleMenuHidden = () => setMenuOpen(false);

        navbar.addEventListener("show.bs.collapse", handleMenuShown);
        navbar.addEventListener("hide.bs.collapse", handleMenuHidden);

        return () => {
            navbar.removeEventListener("show.bs.collapse", handleMenuShown);
            navbar.removeEventListener("hide.bs.collapse", handleMenuHidden);
        };
    }, []);

    useEffect(() => {
        const navbar = document.getElementById("gurNavbar");

        if (!navbar) {
            return;
        }

        navbar.querySelectorAll(".dropdown-toggle").forEach((toggle) => {
            Dropdown.getInstance(toggle)?.hide();
        });

        if (navbar.classList.contains("show")) {
            Collapse.getOrCreateInstance(navbar, { toggle: false }).hide();
        }
    }, [location.pathname]);

    return (
        <header className={`gur-header ${scrolled ? "scrolled" : ""}`}>

            <img
                src={Union}
                alt=""
                className="gur-header-shape"
            />

            <nav className="navbar navbar-expand-xl">
                <div className="container-fluid px-4">

                    {/* Mobile Toggle */}

                    <button
                        className="navbar-toggler"
                        type="button"
                        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
                        aria-controls="gurNavbar"
                        aria-expanded={menuOpen}
                        onClick={() => {
                            const navbar = document.getElementById("gurNavbar");
                            if (!navbar) return;

                            const collapse = Collapse.getOrCreateInstance(navbar, { toggle: false });
                            if (menuOpen) {
                                collapse.hide();
                            } else {
                                collapse.show();
                            }
                        }}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <form
                        className={`gur-search gur-mobile-search d-flex align-items-center${mobileSearchOpen ? " is-open" : ""}`}
                        role="search"
                        onSubmit={handleProductSearch}
                        onFocus={() => {
                            setSearchFocused(true);
                            loadSearchProducts();
                        }}
                        onBlur={(event) => {
                            if (!event.currentTarget.contains(event.relatedTarget)) setSearchFocused(false);
                        }}
                    >
                        {mobileSearchOpen ? (
                            <>
                                <Search size={18} strokeWidth={2} />
                                <input
                                    type="search"
                                    aria-label="Search products"
                                    placeholder="Search products"
                                    value={searchQuery}
                                    onChange={(event) => setSearchQuery(event.target.value)}
                                    autoFocus
                                />
                                <button type="submit" aria-label="Submit product search">
                                    <Search size={18} />
                                </button>
                            </>
                        ) : (
                            <button
                                type="button"
                                aria-label="Open product search"
                                onClick={() => setMobileSearchOpen(true)}
                            >
                                <Search size={21} strokeWidth={2} />
                            </button>
                        )}
                        {renderSearchResults()}
                    </form>

                    {/* Center Logo */}

                    <Link to="/" className="gur-logo">
                        <img src={GurLogo} alt="The Gur Company" />
                    </Link>

                    {/* Navbar Content */}

                    <div className="collapse navbar-collapse" id="gurNavbar">

                        <div className="row w-100 align-items-center">

                            {/* LEFT MENU */}

                            <div className="col-xl-5">

                                <ul className="navbar-nav gur-menu">

                                    <li className="nav-item">
                                        <Link to="/" className="nav-link home-link">
                                            HOME
                                        </Link>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <button
                                            type="button"
                                            className="nav-link dropdown-toggle"
                                            aria-expanded="false"
                                            onClick={handleDropdownToggle}
                                        >
                                            OUR COLLECTION
                                        </button>

                                        <ul className="dropdown-menu">
                                            <li>
                                                <Link to="/powder" className="dropdown-item">
                                                    Jaggery Powder
                                                </Link>
                                            </li>

                                            <li>
                                                <Link to="/block" className="dropdown-item">
                                                    Jaggery Block
                                                </Link>
                                            </li>

                                            <li>
                                                <Link to="/syrup" className="dropdown-item">
                                                    Jaggery Syrup
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <button
                                            type="button"
                                            className="nav-link dropdown-toggle"
                                            aria-expanded="false"
                                            onClick={handleDropdownToggle}
                                        >
                                            OUR INSIDER
                                        </button>

                                        <ul className="dropdown-menu">
                                            <li>
                                                <Link to="/story" className="dropdown-item">
                                                    Our Story
                                                </Link>
                                            </li>

                                            <li>
                                                <Link to="/blogs" className="dropdown-item">
                                                    Blogs
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <button
                                            type="button"
                                            className="nav-link dropdown-toggle"
                                            aria-expanded="false"
                                            onClick={handleDropdownToggle}
                                        >
                                            OUR LIFE
                                        </button>

                                        <ul className="dropdown-menu">
                                            <li>
                                                <Link to="/recipes" className="dropdown-item">
                                                    Recipes
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <button
                                            type="button"
                                            className="nav-link dropdown-toggle"
                                            aria-expanded="false"
                                            onClick={handleDropdownToggle}
                                        >
                                            CUSTOMERS
                                        </button>

                                        <ul className="dropdown-menu">
                                            <li>
                                                <Link to="/reviews" className="dropdown-item">
                                                    Reviews
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/contact" className="dropdown-item">
                                                    Contact Us
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>

                                </ul>
                            </div>

                            {/* RIGHT SECTION */}

                            <div className="col-xl-7">

                                <div className="gur-right d-flex align-items-center">

                                    {/* Search */}

                                    <form
                                        className="gur-search d-none d-xl-flex align-items-center"
                                        role="search"
                                        onSubmit={handleProductSearch}
                                        onFocus={() => {
                                            setSearchFocused(true);
                                            loadSearchProducts();
                                        }}
                                        onBlur={(event) => {
                                            if (!event.currentTarget.contains(event.relatedTarget)) setSearchFocused(false);
                                        }}
                                    >
                                        <button type="submit" aria-label="Search products">
                                            <Search size={17} />
                                        </button>
                                        <input
                                            type="search"
                                            aria-label="Search products"
                                            placeholder="Search by taste, use, or curiosity."
                                            value={searchQuery}
                                            onChange={(event) => setSearchQuery(event.target.value)}
                                        />
                                        {renderSearchResults()}
                                    </form>

                                    {/* Wishlist */}

                                    <Link to="/wishlist" className="gur-action">
                                        <span className="gur-action-icon-wrap">
                                            <Heart size={25} fill="currentColor" className="gur-action-icon" />
                                            {itemCounts.wishlist > 0 && (
                                                <span className="gur-action-count" aria-label={`${itemCounts.wishlist} items`}>
                                                    {itemCounts.wishlist}
                                                </span>
                                            )}
                                        </span>
                                        <span>WISHLIST</span>
                                    </Link>

                                    {/* Cart */}

                                    <Link to="/cart" className="gur-action">
                                        <span className="gur-action-icon-wrap">
                                            <ShoppingCart size={25} className="gur-action-icon" />
                                            {itemCounts.cart > 0 && (
                                                <span className="gur-action-count" aria-label={`${itemCounts.cart} items`}>
                                                    {itemCounts.cart}
                                                </span>
                                            )}
                                        </span>
                                        <span>CART</span>
                                    </Link>

                                    {user ? (
                                        <Link to="/profile" className="gur-action">
                                            <UserRound size={25} className="gur-action-icon" />
                                            <span>PROFILE</span>
                                        </Link>
                                    ) : (
                                        <Link to="/signup" className="gur-action">
                                            <UserRound size={25} className="gur-action-icon" />
                                            <span>SIGN UP</span>
                                        </Link>
                                    )}

                                </div>

                            </div>

                        </div>
                    </div>

                </div>
            </nav>
            {itemCounts.error && (
                <span className="gur-action-count-error" role="alert">
                    Unable to load saved item counts. {itemCounts.error}
                </span>
            )}

        </header>
    );
}

export default Header;
