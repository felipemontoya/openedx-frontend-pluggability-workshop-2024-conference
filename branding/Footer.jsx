import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="navy-footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h1 className="logo-text"><span>Navy</span>Tech</h1>
          <p>
            NavyTech is your ultimate destination for cutting-edge technology and innovative solutions.
            We bring the future to your fingertips.
          </p>
          <div className="contact">
            <span><i className="fa fa-phone"></i> &nbsp; (123) 456-7890</span>
            <span><i className="fa fa-envelope"></i> &nbsp; info@navytech.com</span>
          </div>
          <div className="socials">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>

        <div className="footer-section links">
          <h2>Quick Links</h2>
          <br />
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>

        <div className="footer-section contact-form">
          <h2>Contact Us</h2>
          <br />
          <form action="#" method="post">
            <input type="email" name="email" className="text-input contact-input" placeholder="Your email address..." />
            <textarea name="message" className="text-input contact-input" placeholder="Your message..."></textarea>
            <button type="submit" className="btn btn-big">
              <i className="fa fa-envelope"></i>
              Send
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; navytech.com | Designed by NavyTech
      </div>
    </footer>
  );
};

export default Footer;
