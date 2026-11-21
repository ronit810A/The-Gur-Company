
import React from "react";
import { Link } from "react-router-dom";
import { GurLogo, Union } from "./images";

import  { useState, useEffect } from "react";

import {
    Search,
    Heart,
    ShoppingCart,
    UserRound
} from "lucide-react";

import "../Css/header.css"

function Header() {

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {

        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

    }, []);

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
                        data-bs-toggle="collapse"
                        data-bs-target="#gurNavbar"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="gur-search gur-mobile-search d-flex align-items-center">
                        <Search size={15} />
                        <input
                            type="text"
                            placeholder="Search..."
                            aria-label="Search"
                        />
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
                                        <Link
                                            to="/collection"
                                            className="nav-link dropdown-toggle"
                                            data-bs-toggle="dropdown"
                                        >
                                            OUR COLLECTION
                                        </Link>

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
                                        <Link
                                            to="/insider"
                                            className="nav-link dropdown-toggle"
                                            data-bs-toggle="dropdown"
                                        >
                                            OUR INSIDER
                                        </Link>

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
                                        <Link
                                            to="/life"
                                            className="nav-link dropdown-toggle"
                                            data-bs-toggle="dropdown"
                                        >
                                            OUR LIFE
                                        </Link>

                                        <ul className="dropdown-menu">
                                            <li>
                                                <Link to="/recipes" className="dropdown-item">
                                                    Recipes
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <Link
                                            to="/customers"
                                            className="nav-link dropdown-toggle"
                                            data-bs-toggle="dropdown"
                                        >
                                            CUSTOMERS
                                        </Link>

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

                                <div className="gur-right d-flex align-items-center justify-content-end">

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

                                    {/* Profile */}

                                    <Link to="/profile" className="gur-action">
                                        <UserRound size={25} className="gur-action-icon " />
                                        <span>PROFILE</span>
                                    </Link>

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
