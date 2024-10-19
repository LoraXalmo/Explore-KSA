import React from 'react';
import './Homepage.css'; // Don't forget to import your custom CSS
import { Carousel } from 'react-bootstrap';

import img1 from '../../images/1.jpeg';
import img2 from '../../images/2.jpeg';
import img3 from '../../images/3.png';
import img4 from '../../images/4.jpeg';
import img6 from '../../images/6.png';

const HomePage = () => {
  return (
    <div>
      <section className="header-section">
        <Carousel id="carouselExampleControls" className="carousel-container">
          <Carousel.Item>
            <div className="carousel-item-bg" style={{ backgroundImage: `linear-gradient(
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0.6)
    ),url(${img1})` , backgroundPosition:"center",backgroundSize:"100% 100%" }}>
              <div className="carousel-caption d-block">
                <h1>Explore KSA</h1>
                <p>Welcome to Explore the Wonders of Saudi Arabia</p>
              </div>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className="carousel-item-bg" style={{ backgroundImage: `linear-gradient(
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0.6)
    ),url(${img2})` ,backgroundPosition:"center",backgroundSize:"100% 100%" }}>
              <div className="carousel-caption d-block">
                <h1>Religious Tourism</h1>
                <p>Discover the spiritual richness of Makkah and Madinah.</p>
              </div>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className="carousel-item-bg" style={{ backgroundImage: `linear-gradient(
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0.6)
    ),url(${img3})`,backgroundPosition:"center",backgroundSize:"100% 100%" }}>
              <div className="carousel-caption d-block">
                 <h1>Festivals & Events</h1>
               
                <p>Join the excitement of Riyadh Season's cultural festivities.</p>
              </div>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className="carousel-item-bg" style={{ backgroundImage: `linear-gradient(
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0.6)
    ),url(${img4})` ,backgroundPosition:"center",backgroundSize:"100% 100%" }}>
              <div className="carousel-caption d-block">
              <h1>Recreational Tourism</h1>
              <p>Experience the beauty of Riyadh's parks and Jeddah's Corniche.</p>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </section>

      {/* Section 2: Religious Tourism */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-5">Religious Tourism</h2>
          <div className="content">
            <img src={img1} alt="Makkah" />
            <div className="text text-dark">
              <h3 className="text-center text-dark">Makkah</h3>
              <p className="text-center text-dark">Makkah is the holiest city in Islam and a spiritual center for millions of Muslims around the world. It is home to the Masjid al-Haram and the Kaaba, a site of pilgrimage (Hajj) for Muslims.</p>
            </div>
          </div>
          <div className="content">
            <img src={img2} alt="Madinah" />
            <div className="text">
              <h3 className="text-center text-dark">Madinah</h3>
              <p className="text-center text-dark">Madinah, known as the City of the Prophet, is another sacred city in Islam. It is home to Al-Masjid an-Nabawi, the Prophet's Mosque, and attracts millions of visitors every year.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 and 4 remain unchanged */}
      <section className="section bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Recreational Tourism</h2>
          <div className="content">
            <img src={img4} alt="King Fahd Park" />
            <div className="text">
              <h3 className="text-center text-dark">King Fahad Park - Riyadh</h3>
              <p className="text-center text-dark">King Fahad Park is one of the largest parks in Riyadh, offering recreational activities and a beautiful setting for families and visitors.</p>
            </div>
          </div>
          <div className="content">
            <img src={img6} alt="Jeddah Corniche" />
            <div className="text">
              <h3 className="text-center text-dark">Corniche of Jeddah</h3>
              <p className="text-center text-dark">The Jeddah Corniche is a stunning waterfront area in Jeddah, offering a vibrant atmosphere with a mix of shopping, dining, and entertainment options.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="text-center mb-5">Festivals & Conferences</h2>
          <div className="content">
            <img src={img3} alt="Riyadh Season" />
            <div className="text">
              <h3 className="text-center text-dark">Riyadh Season</h3>
              <p className="text-center text-dark">Riyadh Season is a spectacular annual festival in the capital, Riyadh. It features a variety of cultural, entertainment, and sporting events that attract millions of visitors.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
