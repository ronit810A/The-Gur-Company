
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "../Css/footer.css";

import {GurLogo} from "../Component/images"

const Footer = () => {
  return (
    <footer className="main-footer">
      <Container>
        <Row className="footer-row">

          {/* Company Details */}
          <Col lg={3} md={6} sm={12} className="footer-about">
            <img
              src={GurLogo}
              alt="The Gur Company"
              className="footer-logo"
            />

            <p className="footer-description">
              Bringing the authentic taste of traditional
              Indian jaggery to modern kitchens. Pure,
              unrefined, conscious.
            </p>

            <div className="footer-socials">
              <a href="#" aria-label="Facebook">
                <FaFacebookF />
              </a>

              <a href="#" aria-label="Instagram">
                <FaInstagram />
              </a>

              <a href="#" aria-label="Twitter">
                <FaTwitter />
              </a>
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={2} md={6} sm={6} className="footer-links">
            <h5>Quick Links</h5>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/story">Our Story</a></li>
              <li><a href="/blogs">Blogs</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </Col>

          {/* Products */}
          <Col lg={2} md={6} sm={6} className="footer-links">
            <h5>Products</h5>
            <ul>
              <li><a href="/products">All Products</a></li>
              <li><a href="/jaggery-cubes">Jaggery Cubes</a></li>
              <li><a href="/jaggery-syrup">Jaggery Syrup</a></li>
              <li><a href="/gift-sets">Gift Sets</a></li>
            </ul>
          </Col>

          {/* Support */}
          <Col lg={2} md={6} sm={6} className="footer-links">
            <h5>Support</h5>
            <ul>
              <li><a href="/faqs">FAQs</a></li>
              <li><a href="/recipes">Recipes</a></li>
              <li><a href="/privacy-policy">Privacy Policy</a></li>
              <li><a href="/terms">Terms & Conditions</a></li>
            </ul>
          </Col>

          {/* Contact */}
          <Col lg={3} md={6} sm={12} className="footer-contact">
            <h5>Contact Us</h5>

            <div className="contact-item">
              <span><FaPhoneAlt /></span>
              <p>+91 8297 966 777</p>
            </div>

            <div className="contact-item">
              <span><FaEnvelope /></span>
              <p>support@thegurcompany</p>
            </div>

            <div className="contact-item">
              <span><FaMapMarkerAlt /></span>
              <p>
                175 Elizabeth Ave Str, San Jose,
                CA, 90025
              </p>
            </div>
          </Col>

        </Row>
        </Container>
        
        <div className="footer-end text-center">
            <p>© 2024 The Gur Company. All rights reserved.</p>
        </div>
      
    </footer>
  );
};

export default Footer;
