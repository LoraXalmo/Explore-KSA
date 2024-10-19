import React from 'react';
import './Homepage.css'; // Don't forget to import your custom CSS
import img1 from '../../images/1.jpeg';
import img2 from '../../images/2.jpeg';
import img3 from '../../images/3.png';
import img4 from '../../images/4.jpeg'
import img6 from '../../images/6.png'
const HomePage = () => {
  return (
    <div>

      {/* Section 1: Bootstrap Carousel with 4 images and descriptions */}
      <section className="header-section">
        <div id="tourismCarousel" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            {/* Slide 1 */}
            <div className="carousel-item active">
              <img src={img1}className="d-block w-100" alt="Slide 1" />
              <div className="carousel-caption d-none d-md-block">
                <h1>Explore KSA</h1>
                <p>Welcome to Explore the Wonders of Saudi Arabia</p>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="carousel-item">
              <img src={img2} className="d-block w-100" alt="Slide 2" />
              <div className="carousel-caption d-none d-md-block">
                <h1>Religious Tourism</h1>
                <p>Discover the spiritual richness of Makkah and Madinah.</p>
              </div>
            </div>

            {/* Slide 3 */}
            <div className="carousel-item">
              <img src={img3} className="d-block w-100" alt="Slide 3" />
              <div className="carousel-caption d-none d-md-block">
                <h1>Recreational Tourism</h1>
                <p>Experience the beauty of Riyadh's parks and Jeddah's Corniche.</p>
              </div>
            </div>

            {/* Slide 4 */}
            <div className="carousel-item">
              <img src={img4} className="d-block w-100" alt="Slide 4" />
              <div className="carousel-caption d-none d-md-block">
                <h1>Festivals & Events</h1>
                <p>Join the excitement of Riyadh Season's cultural festivities.</p>
              </div>
            </div>

           
          </div>

          {/* Carousel Controls */}
          <a className="carousel-control-prev" href="#tourismCarousel" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#tourismCarousel" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
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
           
            <img src={img4} alt="King fahd Park" />
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
