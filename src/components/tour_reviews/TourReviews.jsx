import React, { useState, useRef } from "react";
import { Container, Row, Col, Tab, Nav, Modal, Form, Button } from "react-bootstrap";
import { motion, useAnimationFrame } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import { TourReviewCard } from "./TourReviewCard";
import TestimonialCard from "./TestimonialCard";
import img1 from "../../assets/img/img1.jpg";
import "./TourReviews.css";

export const TourReviews = () => {
  const [key, setKey] = useState('tab1');

  const reviews = [
    // Europe (8 reviews)
    {
      title: "Paris City Tour",
      description: "Explore the City of Light",
      image: "../../assets/img/paris.jpg",
      rating: 4.5,
      price: "$199"
    },
    {
      title: "Rome Historical Walk",
      description: "Step back in time in the Eternal City",
      image: "../../assets/img/rome.jpg",
      rating: 4.7,
      price: "$180"
    },
    {
      title: "Amsterdam Canal Cruise",
      description: "Discover the Venice of the North",
      image: "../../assets/img/amsterdam.jpg",
      rating: 4.3,
      price: "$75"
    },
    {
      title: "Barcelona Gaudi Tour",
      description: "Experience Gaudi's architectural marvels",
      image: "../../assets/img/barcelona.jpg",
      rating: 4.6,
      price: "$150"
    },
    {
      title: "London Royal Tour",
      description: "Visit the iconic royal landmarks",
      image: "../../assets/img/london.jpg",
      rating: 4.4,
      price: "$210"
    },
    {
      title: "Prague Castle Tour",
      description: "Explore the largest ancient castle complex",
      image: "../../assets/img/prague.jpg",
      rating: 4.5,
      price: "$100"
    },
    {
      title: "Vienna Classical Music Tour",
      description: "Immerse in the city's rich musical heritage",
      image: "../../assets/img/vienna.jpg",
      rating: 4.8,
      price: "$190"
    },
    {
      title: "Greek Islands Cruise",
      description: "Sail through the beautiful Aegean Sea",
      image: "../../assets/img/greek-islands.jpg",
      rating: 4.9,
      price: "$1200"
    },

    // Asia (8 reviews)
    {
      title: "Tokyo Sushi Making Class",
      description: "Learn to make authentic Japanese sushi",
      image: "../../assets/img/tokyo.jpg",
      rating: 4.7,
      price: "$120"
    },
    {
      title: "Great Wall of China Hike",
      description: "Walk along one of the world's wonders",
      image: "../../assets/img/great-wall.jpg",
      rating: 4.8,
      price: "$180"
    },
    {
      title: "Bali Temple and Rice Terrace Tour",
      description: "Discover Bali's cultural and natural beauty",
      image: "../../assets/img/bali.jpg",
      rating: 4.6,
      price: "$90"
    },
    {
      title: "Bangkok Street Food Tour",
      description: "Taste the flavors of Thailand",
      image: "../../assets/img/bangkok.jpg",
      rating: 4.5,
      price: "$70"
    },
    {
      title: "Angkor Wat Sunrise Tour",
      description: "Witness a magical sunrise at Angkor Wat",
      image: "../../assets/img/angkor-wat.jpg",
      rating: 4.9,
      price: "$150"
    },
    {
      title: "Mount Fuji Day Trip",
      description: "Visit Japan's iconic mountain",
      image: "../../assets/img/mount-fuji.jpg",
      rating: 4.7,
      price: "$200"
    },
    {
      title: "Singapore City Highlights",
      description: "Experience the best of Singapore in a day",
      image: "../../assets/img/singapore.jpg",
      rating: 4.4,
      price: "$130"
    },
    {
      title: "Taj Mahal Sunrise Tour",
      description: "See the Taj Mahal at its most beautiful",
      image: "../../assets/img/taj-mahal.jpg",
      rating: 4.8,
      price: "$220"
    },

    // Americas (8 reviews)
    {
      title: "New York City in a Day",
      description: "Experience the Big Apple's highlights",
      image: "../../assets/img/new-york.jpg",
      rating: 4.6,
      price: "$250"
    },
    {
      title: "Machu Picchu Adventure",
      description: "Explore the ancient Incan citadel",
      image: "../../assets/img/machu-picchu.jpg",
      rating: 4.9,
      price: "$400"
    },
    {
      title: "Rio de Janeiro Highlights",
      description: "Discover the Marvelous City",
      image: "../../assets/img/rio.jpg",
      rating: 4.5,
      price: "$180"
    },
    {
      title: "San Francisco Bay Cruise",
      description: "See the Golden Gate Bridge from the water",
      image: "../../assets/img/san-francisco.jpg",
      rating: 4.3,
      price: "$90"
    },
    {
      title: "Yellowstone National Park Tour",
      description: "Explore America's first national park",
      image: "../../assets/img/yellowstone.jpg",
      rating: 4.7,
      price: "$300"
    },
    {
      title: "Cancun Beach Getaway",
      description: "Relax on Mexico's stunning Caribbean coast",
      image: "../../assets/img/cancun.jpg",
      rating: 4.4,
      price: "$450"
    },
    {
      title: "Alaska Glacier Cruise",
      description: "Witness the majesty of Alaska's glaciers",
      image: "../../assets/img/alaska.jpg",
      rating: 4.8,
      price: "$1200"
    },
    {
      title: "Quebec City Winter Carnival",
      description: "Experience the magic of winter in Quebec",
      image: "../../assets/img/quebec.jpg",
      rating: 4.5,
      price: "$220"
    },

    // Africa (8 reviews)
    {
      title: "Serengeti Safari",
      description: "Witness the great migration",
      image: "../../assets/img/serengeti.jpg",
      rating: 4.9,
      price: "$2000"
    },
    {
      title: "Cairo Pyramids Tour",
      description: "Explore the last standing wonder of the ancient world",
      image: "../../assets/img/pyramids.jpg",
      rating: 4.7,
      price: "$150"
    },
    {
      title: "Cape Town City and Table Mountain",
      description: "Discover the beauty of Cape Town",
      image: "../../assets/img/cape-town.jpg",
      rating: 4.6,
      price: "$120"
    },
    {
      title: "Victoria Falls Experience",
      description: "See one of the world's largest waterfalls",
      image: "../../assets/img/victoria-falls.jpg",
      rating: 4.8,
      price: "$180"
    },
    {
      title: "Marrakech Medina Tour",
      description: "Navigate the vibrant souks of Marrakech",
      image: "../../assets/img/marrakech.jpg",
      rating: 4.5,
      price: "$80"
    },
    {
      title: "Zanzibar Beach Retreat",
      description: "Relax on the pristine beaches of Zanzibar",
      image: "../../assets/img/zanzibar.jpg",
      rating: 4.7,
      price: "$600"
    },
    {
      title: "Namibia Desert Safari",
      description: "Explore the otherworldly landscapes of Namibia",
      image: "../../assets/img/namibia.jpg",
      rating: 4.8,
      price: "$1500"
    },
    {
      title: "Gorilla Trekking in Uganda",
      description: "Encounter mountain gorillas in their natural habitat",
      image: "../../assets/img/uganda.jpg",
      rating: 4.9,
      price: "$1800"
    }
  ];

  const testimonials = [
    {
      image: "../../assets/img/testimonial1.jpg",
      name: "John Doe",
      title: "Adventure Enthusiast",
      testimonial: "The tour exceeded all my expectations. I'll definitely be booking again!",
      rating: 5
    },
    {
      image: "../../assets/img/testimonial2.jpg",
      name: "Jane Smith",
      title: "Cultural Explorer",
      testimonial: "An unforgettable experience that opened my eyes to new cultures.",
      rating: 4
    },
    {
      image: "../../assets/img/testimonial3.jpg",
      name: "Mike Johnson",
      title: "Nature Lover",
      testimonial: "The breathtaking landscapes we saw were worth every penny.",
      rating: 5
    },
    {
      image: "../../assets/img/testimonial4.jpg",
      name: "Emily Brown",
      title: "Solo Traveler",
      testimonial: "I felt safe and well-cared for throughout the entire journey.",
      rating: 4
    },
    // Add more testimonials as needed
  ];

  const [scrollX, setScrollX] = useState(0);
  const containerRef = useRef(null);

  useAnimationFrame((t) => {
    const speed = 0.5; // Adjust this value to change the scroll speed
    setScrollX((prevScrollX) => {
      const newScrollX = prevScrollX - speed;
      const containerWidth = containerRef.current?.scrollWidth || 0;
      const viewportWidth = containerRef.current?.offsetWidth || 0;
      return newScrollX <= -containerWidth / 2 ? 0 : newScrollX;
    });
  });

  const [showModal, setShowModal] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({
    name: "",
    email: "",
    rating: 5,
    testimonial: ""
  });

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedbackForm({ ...feedbackForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the feedback to your server
    console.log("Feedback submitted:", feedbackForm);
    handleClose();
    // Optionally, reset the form
    setFeedbackForm({ name: "", email: "", rating: 5, testimonial: "" });
  };

  return (
    <section className="tour-reviews" id="tour-reviews">
              <div className="hero">
        <h2>Check out our reviews</h2>
      </div>
      <Container>
        <Row>
          <Col>
            <h2 className="section-title">Tour Reviews</h2>
            <Tab.Container id="tour-reviews-tabs" defaultActiveKey="tab1" onSelect={(k) => setKey(k)}>
              <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center">
                <Nav.Item>
                  <Nav.Link eventKey="tab1">Europe</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="tab2">Asia</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="tab3">Americas</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="tab4">Africa</Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="tab1">
                  <Row>
                    {reviews.slice(0, 8).map((review, index) => (
                      <TourReviewCard key={index} {...review} />
                    ))}
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="tab2">
                  <Row>
                    {reviews.slice(8, 16).map((review, index) => (
                      <TourReviewCard key={index + 8} {...review} />
                    ))}
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="tab3">
                  <Row>
                    {reviews.slice(16, 24).map((review, index) => (
                      <TourReviewCard key={index + 16} {...review} />
                    ))}
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="tab4">
                  <Row>
                    {reviews.slice(24, 32).map((review, index) => (
                      <TourReviewCard key={index + 24} {...review} />
                    ))}
                  </Row>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>
        </Row>
      </Container>

      <section className="client-testimonials">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="section-title">Client Testimonials</h2>

            <FaPlus className="add-testimonial-icon" onClick={handleShow} />
          </div>
          <div className="testimonial-container" ref={containerRef}>
            <motion.div
              className="testimonial-slider"
              style={{
                x: scrollX,
                display: "flex",
                width: "fit-content",
              }}
            >
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Leave Your Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={feedbackForm.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={feedbackForm.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rating</Form.Label>
              <Form.Select
                name="rating"
                value={feedbackForm.rating}
                onChange={handleInputChange}
              >                {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>{num} Star{num !== 1 ? 's' : ''}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Your Testimonial</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="testimonial"
              value={feedbackForm.testimonial}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit Feedback
          </Button>
        </Form>
      </Modal.Body>
    </Modal>



  </section>
);
};

export default TourReviews;
