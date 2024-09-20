import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer-cont-container">
          <div className="footer-cont">
            <h4>Travel Smart</h4>
Taking you on a Tour Around 
            <br /> <br />
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <FaFacebookF />
              <FaTwitter />
              <FaYoutube />
            </div>
          </div>
          <div className="footer-cont">
            <h4>Get in Touch</h4>
            <hr />
            <p>Location:</p>
            Lorem ipsum dolor sit amet consectetur adipisi jjuhihijin. <br />{" "}
            <br />
            <p>Contact:</p>
            Phone : +012 345 6789 0123 <br />
            Email : info@example.com
          </div>
          <div className="footer-cont">
            <h4>Quick Links</h4>
            <hr />
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/About">About</a>
              </li>
              <li>
                <a href="/Trips">Trips</a>
              </li>
              <li>
                <a href="/Trips Reviews">Trips Reviews</a>
              </li>

              <li>
                <a href="/Contact">Contact  </a>
              </li>
            </ul>
          </div>
          <div className="footer-cont">
            <h4>Sign up for your offers</h4>
            <hr />
            By subscribing to our mailing list, you will always get latest news
            and updates from us. <br /> <br />
            <div style={{ display: "flex", alignItems: "center" }}>
              <input type="email" placeholder="Enter your email..." />
              <MdEmail style={{ marginLeft: "10px", cursor: "pointer" }} />
            </div>
          </div>
        </div>
        <hr />

      </footer>
    </>
  );
}

export default Footer;
