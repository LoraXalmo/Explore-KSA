import React, { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { DataContext } from '../../context/context.js'; // Assuming the context file is in the same folder
import axios from 'axios'; // Make sure axios is imported for API requests
import { Button, Spinner, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
// Validation Schema using Yup
const AccommodationSchema = Yup.object().shape({
  touristName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().required('Required'),
  accommodationPlace: Yup.string().required('Required'),
  accommodationType: Yup.string().required('Required'),
});

export default function Accommodation() {
  const {
    accommodationPlaces,
    accommodationTypes,
    fetchAccommodationData, // Function to fetch accommodation details
    selectedAccommodation,  // Data of selected accommodation
    loading // Loading state
  } = useContext(DataContext);
  
  const [error, setError] = useState(null); // State for API errors
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="container mt-4">
      <h2 className='my-3 text-center'>Book Your Accommodation</h2>

      {/* Formik form */}
      <Formik
        initialValues={{
          touristName: '',
          email: '',
          phone: '',
          accommodationPlace: '',
          accommodationType: '',
        }}
        validationSchema={AccommodationSchema}
        onSubmit={async (values) => {
          try {
            // Submit form data to the API
            const response = await axios.post('https://explore-ksa-backend.vercel.app/api/tourist-accommodation', values);
            console.log(response.data);
            setSubmitted(true);
          } catch (error) {
            console.error("Error submitting form", error);
            setError("Failed to submit the form. Please try again later.");
          }
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="touristName">Tourist Name</label>
                  <Field name="touristName" className="form-control" />
                  <ErrorMessage name="touristName" component="div" className="text-danger" />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field name="email" type="email" className="form-control" />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <Field name="phone" className="form-control" />
                  <ErrorMessage name="phone" component="div" className="text-danger" />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="accommodationPlace">Accommodation Place</label>
                  <Field as="select" name="accommodationPlace" className="form-control" onChange={(e) => {
                    setFieldValue("accommodationPlace", e.target.value);
                    setError(null); // Clear any previous errors
                    if (values.accommodationType) {
                      fetchAccommodationData(e.target.value, values.accommodationType).catch(err => {
                        setError("Failed to fetch accommodation details. Please check your selection.");
                      });
                    }
                  }}>
                    <option value="">Select a place</option>
                    {accommodationPlaces.map((place) => (
                      <option key={place} value={place}>
                        {place}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="accommodationPlace" component="div" className="text-danger" />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="accommodationType">Accommodation Type</label>
                  <Field as="select" name="accommodationType" className="form-control" onChange={(e) => {
                    setFieldValue("accommodationType", e.target.value);
                    setError(null); // Clear any previous errors
                    if (values.accommodationPlace) {
                      fetchAccommodationData(values.accommodationPlace, e.target.value).catch(err => {
                        setError("Failed to fetch accommodation details. Please check your selection.");
                      });
                    }
                  }}>
                    <option value="">Select a type</option>
                    {accommodationTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="accommodationType" component="div" className="text-danger" />
                </div>
              </div>
            </div>

            {/* Show loading spinner or selected accommodation details */}
            {loading ? (
              <Spinner animation="border" className="my-3" />
            ) : selectedAccommodation && (
              <div className="my-3">
                <div className="row">
                  <div className="col-md-6 col-sm-12">
                  <iframe
  src={selectedAccommodation.map.iframeUrl}
  width={selectedAccommodation.map.width}
  height={selectedAccommodation.map.height}
  style={{
    border: selectedAccommodation.map.style.border, // تأكد من تمرير الكائن بدلاً من النص
  }}
  allowFullScreen={selectedAccommodation.map.allowfullscreen}
  loading={selectedAccommodation.map.loading}
  referrerPolicy={selectedAccommodation.map.referrerpolicy}
></iframe>

                  </div>
                  <div className="col-md-6 col-sm-12 mt-5">
                    <div className="text-center">
                    <h4>Accommodation Details</h4>
                <p className='text-dark'><strong>Price Per Night:</strong> {selectedAccommodation.pricePerNight} SAR</p>
                <p className='text-dark'><strong>Availability:</strong> {selectedAccommodation.availability ? 'Available' : 'Not Available'}</p>
                <p className='text-dark'><strong>contact Number phone : </strong> {selectedAccommodation.contactInfo} </p>
                <p className='text-dark'><strong>ratings : </strong> {selectedAccommodation.ratings} <FontAwesomeIcon icon={faStar} style={{ color: '#ffc107' }} /> </p>
                    </div>
                  </div>
                </div>
                
                <div>

                </div>
              </div>
            )}

            {/* Show error if there's an issue fetching accommodation details */}
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

            {/* Show error if there's an issue submitting the form */}
            {submitted && <Alert variant="success" className="mt-3">Accommodation booked successfully!</Alert>}

            <Button type="submit" className="mt-3 d-block mx-auto w-100 my-2">Submit</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
