
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Collapse, Dropdown } from "bootstrap";
import { GurLogo, Union } from "./images";

import  { useState, useEffect } from "react";

import {
    Search,
    Heart,
    ShoppingCart,
    UserRound
} from "lucide-react";

import "../Css/header.css"

function Header({ user }) {

    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const handleDropdownToggle = (event) => {
        Dropdown.getOrCreateInstance(event.currentTarget).toggle();
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

                    <div
                        className="gur-search gur-mobile-search d-flex align-items-center"
                        role="img"
                        aria-label="Search"
                    >
                        <Search size={21} strokeWidth={2} />
                    </div>

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

                                    <div className="gur-search d-none d-xl-flex align-items-center">
                                        <Search size={15} />

                                        <input
                                            type="text"
                                            placeholder="Search by taste, use, or curiosity."
                                        />
                                    </div>

                                    {/* Wishlist */}

                                    <Link to="/wishlist" className="gur-action">
                                        <Heart size={25} fill="currentColor" className="gur-action-icon " />
                                        <span>WISHLIST</span>
                                    </Link>

                                    {/* Cart */}

                                    <Link to="/cart" className="gur-action">
                                        <ShoppingCart size={25} className="gur-action-icon " />
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

        </header>
    );
}

export default Header;
