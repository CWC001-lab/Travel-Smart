import React, { useRef, useState } from "react";
import "./Contact.css";
import emailjs from "@emailjs/browser";
// import { Form } from "react-bootstrap";
// npm i @emailjs/browser
const Contact = () => {
  const [mapVisible, setMapVisible] = useState(false);

  const toggleMap = () => {
    setMapVisible(prevState => !prevState);
  };

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_qnqwyip",
        "template_p3cd1lj",
        form.current,
        "sQ8QrD1aZiphsj0Ry" // Use your actual public key here
      )
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
          alert("Message sent successfully!");
          form.current.reset(); // Reset the form after successful submission
        },
        (error) => {
          console.error("Failed to send email:", error.text);
          alert("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <div className="contact-page">
<header className='Contact-hero'>
  <div className='Contact-Bannerhero'>
    <h1>Contact Us</h1>
    <p>In need of more information and reviews </p>
  </div>
</header>


      <section id="contact-us">
        <h2>Contact Us</h2>

        <div className="contact-container">
          <div className="contact-info">
            <div className="info-item">
              <strong>Location: </strong>
              <a href="mailto:kelvinkokorie@gmail.com">
 89 Modupe Johnson Street, Ibadan, Nigeria
              </a>
            </div>
            <div className="info-item">
              <strong>Phone:</strong>
              <a href="tel:+2349036728132">+234-903-672-8132</a>
            </div>
            <div className="map-container">
              <p>
                <strong>Our Location:</strong>
              </p>
              <div id="map" className={mapVisible ? "show" : "hidden"}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.60872098296!2d3.8856896750010543!3d7.397663792612251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10398d6a657b14c9%3A0xb43849f101727e38!2sAptech%20Ibadan!5e0!3m2!1sen!2sng!4v1726747774576!5m2!1sen!2sng"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Aptech Ibadan Location"
                ></iframe>
              </div>
              <button onClick={toggleMap}>Show/Hide Map</button>
            </div>
          </div>

          <div className="contact-form">
            <h3>Send Us a Message</h3>
            <form
              action="/submit-form"
              method="POST"
              ref={form}
              onSubmit={sendEmail}
            >
              <input type="text" id="name" placeholder="Enter your full name" name="to_name" required />

              <input type="email" id="email" placeholder="Enter your email here" name="from_name" required />

              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Type in your message here"
                required
              ></textarea>

              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
