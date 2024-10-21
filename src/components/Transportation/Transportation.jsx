import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/context.js";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Spinner, Button, Form as BootstrapForm, Col, Row, Modal } from "react-bootstrap"; // Import Modal
import "bootstrap/dist/css/bootstrap.min.css";
import "./Transportation.css"; // Import custom CSS

export default function Transportation() {
  const { transportationTypes, fetchTransportationData, selectedTransportation, loading } = useContext(DataContext);
  const [transportationDetails, setTransportationDetails] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  useEffect(() => {
    if (selectedTransportation) {
      setTransportationDetails(selectedTransportation);
    }
  }, [selectedTransportation]);

  const initialValues = {
    touristName: "",
    email: "",
    phone: "",
    typeTransportation: "",
  };

  const validationSchema = Yup.object({
    touristName: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    typeTransportation: Yup.string().required("Please select a transportation type"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.post("https://explore-ksa-backend.vercel.app/api/touriststransportation", values);
      setShowModal(true); // Show modal on success
    } catch (error) {
      console.error("Error submitting transportation", error);
      alert("Error submitting transportation. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseModal = () => setShowModal(false); // Close modal handler

  return (
    <div className="container mt-5">
      <h2 className="text-center">Select Transportation</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <BootstrapForm.Group as={Row} className="mb-3">
              <Col>
                <BootstrapForm.Label>Name</BootstrapForm.Label>
                <Field name="touristName" type="text" className="form-control" />
                <ErrorMessage name="touristName" component="div" className="text-danger" />
              </Col>
              <Col>
                <BootstrapForm.Label>Email</BootstrapForm.Label>
                <Field name="email" type="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </Col>
            </BootstrapForm.Group>

            <BootstrapForm.Group as={Row} className="mb-3">
              <Col>
                <BootstrapForm.Label>Phone</BootstrapForm.Label>
                <Field name="phone" type="text" className="form-control" />
                <ErrorMessage name="phone" component="div" className="text-danger" />
              </Col>
              <Col>
                <BootstrapForm.Label>Transportation Type</BootstrapForm.Label>
                <Field
                  name="typeTransportation"
                  as="select"
                  className="form-control"
                  onChange={(e) => {
                    setFieldValue("typeTransportation", e.target.value);
                    fetchTransportationData(e.target.value); // Fetch type details on select
                  }}
                >
                  <option value="">Select Transportation</option>
                  {transportationTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="typeTransportation" component="div" className="text-danger" />
              </Col>
            </BootstrapForm.Group>

            {loading ? (
              <div className="text-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : (
              transportationDetails && (
                <div className="mt-3 text-center">

                  <div className="row">
                    {transportationDetails.images.map((image, index) => (
                      <div key={index} className="col-md-4">
                        <img src={image.url} alt="Transportation" className="img-fluid img-custom" />
                      </div>
                    ))}
                  </div>
                  <h4>Transportation Details</h4>
                  <p className="text-dark ">
                    <strong>Provider:</strong> {transportationDetails.providerName}
                  </p>
                  <p className="text-dark ">
                    <strong>Contact:</strong> {transportationDetails.contactInfo}
                  </p>
                  <p className="text-dark ">
                    <strong>Price:</strong> SAR{transportationDetails.price}
                  </p>
                </div>
              )
            )}

            <div className="text-center mt-4">
              <Button type="submit" className="my-3 d-block mx-auto w-100" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>

      {/* Modal for showing result */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Transportation Selected</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-dark ">Your transportation has been successfully selected!</p>
  
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
