import React from 'react';
import aboutuspage2 from "../../assets/img/aboutuspage2.jpg";
import aboutpagecard3 from "../../assets/img/aboutpagecard3.jpg";
import aboutusimage from "../../assets/img/aboutusimage.jpg";
import aboutpagecard2 from "../../assets/img/aboutpagecard2.jpg";
import mountain from "../../assets/img/mountain.jpg";
import rock from "../../assets/img/rock.jpg";
import grass from "../../assets/img/grass.jpg";


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
              <h1>A Paradise Village</h1>

              <p>
                Discover a hidden gem nestled in nature's embrace. Our paradise village offers a perfect blend of tranquility and adventure, where every moment becomes a cherished memory.
              </p>

              
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
                <button className="explore-button">Explore Paradise</button>
              </div>


              <div className='CombinedImages'>
  <div className='First-main-image'>
    <img src={aboutuspage2} alt="Main scenery" />
  </div>
  <div className='First-top-left-image'>
    <img src={aboutpagecard3} alt="Top left scenery" />
  </div>
  <div className='First-bottom-left-image'>
    <img src={aboutpagecard2} alt="Bottom right scenery" />
  </div>

  <div className='First-middle-right-image'>
    <img src={aboutusimage} alt="Bottom right scenery" />
  </div>

</div>


              <div className='TextHolder'>
  <h2>
    Discover the World with Travel Smart: Your Gateway to Authentic Experiences
  </h2>

  <p>
    At Travel Smart, we believe in creating unforgettable journeys that go beyond the ordinary. Our passion for exploration and cultural immersion drives us to craft unique travel experiences that connect you with the heart and soul of each destination.
  </p>

  <ul>
    <li>Expertly Curated Itineraries</li>
    <li>Local Guides and Authentic Experiences</li>
    <li>Sustainable and Responsible Travel</li>
    <li>24/7 Customer Support</li>
  </ul>

  <p>
    Whether you're seeking adventure in remote landscapes, cultural enrichment in historic cities, or relaxation on pristine beaches, Travel Smart is your trusted companion. We combine our deep knowledge of global destinations with personalized service to ensure every journey is tailored to your unique preferences and travel style.
  </p>
              </div>

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
    <img src={mountain} alt="Main scenery" />
  </div>
  <div className='top-left-image'>
    <img src={grass} alt="Top left scenery" />
  </div>
  <div className='bottom-right-image'>
    <img src={rock} alt="Bottom right scenery" />
  </div>
</div>


<div className='WhyUs'>

<h1>Perfect Destination for Peaceful Vacation</h1>
                <div className="features">


                      <figure>
                        <img src={img3} alt="Serenity" />
<figcaption>

                        <h3>Serenity</h3>
                        <p>Find peace in our tranquil surroundings. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
</figcaption>
                      </figure>


                      <figure>
                        <img src={img3} alt="Serenity" />
<figcaption>

                        <h3>Serenity</h3>
                        <p>Find peace in our tranquil surroundings. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
</figcaption>
                      </figure>


                      <figure>
                        <img src={img3} alt="Serenity" />
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