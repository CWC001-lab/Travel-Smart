import React from 'react';
import img1 from "../../assets/img/img1.jpg";
import Asia from "../../assets/img/Asia.jpg";
import img3 from "../../assets/img/img3.jpg";
import './About.css'; // Import the CSS file for styling

const About = () => {
    return (
        <div className="about">

<header className='banner'>
  <div className='banner-content'>
    <h1>About Us</h1>
    <p>Discover our story and passion for travel</p>
  </div>
</header>






            <main className="about-header">

              <div className='Rates'>

              </div>
                <h1>A Paradise Village</h1>
                <div className="statistics">
                    <div className="stat">
                        <h3>10,000+</h3>
                        <p>Visitors</p>
                    </div>
                    <div className="stat">
                        <h3>94%</h3>
                        <p>Satisfaction Rate</p>
                    </div>
                    <div className="stat">
                        <h3>Top 100</h3>
                        <p>Destinations</p>
                    </div>
                    <div className="stat">
                        <h3>7+</h3>
                        <p>Awards</p>
                    </div>
                </div>
                <p className="description">
                    Authentic Culture and Charm, Where Beauty Knows No Bounds
                </p>
            </main>

            <section className="endless-beauty">
                <div className="endless-beauty-content">
                    <h2>Endless Beauty, Natural Charm</h2>
                    <p>
                        Experience breathtaking landscapes and immerse yourself in the local culture.
                    </p>
                    <button className="discover-button">Discover More</button>
                </div>
            </section>

            <section className="why-village">


<div className='mixedimages'>
  <div className='main-image'>
    <img src={img1} alt="Main scenery" />
  </div>
  <div className='top-left-image'>
    <img src={Asia} alt="Top left scenery" />
  </div>
  <div className='bottom-right-image'>
    <img src={img3} alt="Bottom right scenery" />
  </div>
</div>
<div className='WhyUs'>

<h1>Perfect Destination for Peaceful Vacation</h1>
                <div className="features">


                      <figure>
                        <img src={img1} alt="Serenity" />
<figcaption>

                        <h3>Serenity</h3>
                        <p>Find peace in our tranquil surroundings. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
</figcaption>
                      </figure>


                      <figure>
                        <img src={img1} alt="Serenity" />
<figcaption>

                        <h3>Serenity</h3>
                        <p>Find peace in our tranquil surroundings. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
</figcaption>
                      </figure>


                      <figure>
                        <img src={img1} alt="Serenity" />
<figcaption>

                        <h3>Serenity</h3>
                        <p>Find peace in our tranquil surroundings. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
</figcaption>
                      </figure>
                      
                    </div>
</div>
            </section>
        </div>
    );
};

export default About;