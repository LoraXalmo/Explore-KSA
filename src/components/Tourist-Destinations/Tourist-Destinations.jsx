import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import "./touristdest.css"
import { Helmet } from 'react-helmet';
export default function TouristDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    // Fetch the data from the API
    fetch('https://explore-ksa-backend.vercel.app/api/destinations')
      .then((response) => response.json())
      .then((data) => {
        setDestinations(data);
        setSelectedDestination(data[0]); // Set the first destination as default
        setLoading(false); // Set loading to false after data is fetched
      });
  }, []);

  const handleSelectionChange = (event) => {
    const selectedId = event.target.value;
    const destination = destinations.find((dest) => dest._id === selectedId);
    setSelectedDestination(destination);
  };

  // Function to get the Google Maps iframe src based on the selected destination
  const getMapIframeSrc = () => {
    switch (selectedDestination.name) {
      case 'Riyadh Season Boulevard':
        return 'https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d7901.5891595991825!2d46.60081259861545!3d24.764805144393954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sRiyadh%20Season%20Boulevard!5e0!3m2!1sen!2seg!4v1729435499213!5m2!1sen!2seg';
      case 'Kaaba':
        return 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3714.1720123383734!2d39.823702624021536!3d21.422482874141668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c204b74c28d467%3A0xb2f543a618225767!2sKaaba!5e0!3m2!1sen!2seg!4v1729435737077!5m2!1sen!2seg';
      case 'Al Masjid an Nabawi':
        return 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3631.5137902389138!2d39.60649147087146!3d24.467648712679953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15bdbfaa728d4c15%3A0x39c9cca9e8b98e2f!2sAl%20Masjid%20an%20Nabawi!5e0!3m2!1sen!2seg!4v1729435798573!5m2!1sen!2seg';
      case 'New Jeddah Corniche':
        return 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14837.998151337864!2d39.096980232265146!3d21.605449783322452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3dbaea8c06d51%3A0xa8f1e399d6cd9dd3!2sNew%20Jeddah%20Corniche!5e0!3m2!1sen!2seg!4v1729435849637!5m2!1sen!2seg';
      default:
        return ''; // Default case
    }
  };

  return (
    <div className="container">
      <Helmet>
        <title>Destination</title>
        <meta name="description" content="Explore KSA Destination" />
      </Helmet>
      <h2 className="text-center text-dark my-4">KSA Destinations</h2>

      {loading ? ( // Display loading spinner if loading
        <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
          <FontAwesomeIcon icon={faSpinner} className="fa-spin" size="3x" />
        </div>
      ) : (
        <>
          {destinations.length > 0 && (
            <>
              {/* Dropdown to select tourist destination */}
              <div className="form-group mb-4">
                <label htmlFor="destinationSelect">Choose a Destination:</label>
                <select
                  id="destinationSelect"
                  className="form-control"
                  onChange={handleSelectionChange}
                  value={selectedDestination?._id || ''}
                >
                  {destinations.map((destination) => (
                    <option key={destination._id} value={destination._id}>
                      {destination.name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedDestination && (
                <div className="destination-details my-3">
                  {/* Carousel for displaying images */}
                  <div className="row">
                    <div className="col-md-6 col-sm-12 my-3">
                      <Carousel>
                        {selectedDestination.images.map((image) => (
                          <Carousel.Item key={image._id}>
                            <img
                              className="d-block w-100"
                              src={image.url}
                              alt={selectedDestination.name}
                            />
                          </Carousel.Item>
                        ))}
                      </Carousel>
                    </div>
                    <div className="col-md-6 col-sm-12 my-3">
                      <div className="mt-4">
                        <h2 className='text-dark text-center'>Destination name : {selectedDestination.name}</h2>
                        <p className="text-muted text-center">Destination category: {selectedDestination.category}</p>
                        <p className='text-dark text-center'>Destination description: {selectedDestination.description}</p>

                        <p className='text-dark text-center'>Opening Hours: {selectedDestination.openingHours}</p>
                        <p className='text-dark text-center'>Entry Fee: {selectedDestination.entryFee} SAR</p>
                        <p className='text-dark text-center'>
                          Rating: {selectedDestination.ratings}{' '}
                          <FontAwesomeIcon icon={faStar} style={{ color: '#ffc107' }} />
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Google Maps Iframe */}
                  <div className="mt-4">
                    <iframe
                      width="100%"
                      height="400"
                      frameBorder="0"
                      style={{ border: 0 }}
                      src={getMapIframeSrc()} // Use the function to get the src
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
