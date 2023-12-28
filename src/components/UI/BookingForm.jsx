import React, { useState } from "react";
import "../../styles/booking-form.css";
import { Form, FormGroup } from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    fromAddress: "",
    toAddress: "",
    personsToCarry: "1 person", 
    luggageToCarry: "1 luggage", 
    journeyDate: "",
    journeyTime: "",
    additionalText: "",
  });


  const submitHandler = async (event) => {
    event.preventDefault(); 

    const formDataToSend = new FormData();
    formDataToSend.append("name", `${formData.firstName} ${formData.lastName}`);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone_number", formData.phoneNumber);
    formDataToSend.append("from_address", formData.fromAddress);
    formDataToSend.append("to_address", formData.toAddress);
    formDataToSend.append("persons_to_carry", parseInt(formData.personsToCarry));
    formDataToSend.append("luggage_to_carry", parseInt(formData.luggageToCarry));

    // Format date as 'YYYY-MM-DD'
    const formattedDate = new Date(formData.journeyDate).toISOString().split('T')[0];
    formDataToSend.append("date", formattedDate);

    // Send the time as a string without further validation or formatting
    formDataToSend.append("time", formData.journeyTime);

    formDataToSend.append("additional_text", formData.additionalText);

    try {
      const response = await fetch("http://127.0.0.1:5555/bookings", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        fromAddress: "",
        toAddress: "",
        personsToCarry: "1 person",
        luggageToCarry: "1 luggage",
        journeyDate: "",
        journeyTime: "",
        additionalText: "",
      });

      toast.success('Booking information sent!', {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {

      toast.error('Failed to send booking information', {
        position: toast.POSITION.TOP_CENTER
      });
      console.error("Error sending form data:", error);
    }
  };



  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  return (
    <Form onSubmit={submitHandler}>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input
          type="number"
          placeholder="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input
          type="text"
          placeholder="From Address"
          name="fromAddress"
          value={formData.fromAddress}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input
          type="text"
          placeholder="To Address"
          name="toAddress"
          value={formData.toAddress}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <select
          name="personsToCarry"
          id=""
          value={formData.personsToCarry}
          onChange={handleChange}
        >
          <option value="1 person">1 Person</option>
          <option value="2 person">2 Person</option>
          <option value="3 person">3 Person</option>
          <option value="4 person">4 Person</option>
          <option value="5+ person">5+ Person</option>
        </select>
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <select
          name="luggageToCarry"
          id=""
          value={formData.luggageToCarry}
          onChange={handleChange}
        >
          <option value="1 luggage">1 Luggage</option>
          <option value="2 luggage">2 Luggage</option>
          <option value="3 luggage">3 Luggage</option>
          <option value="4 luggage">4 Luggage</option>
          <option value="5+ luggage">5+ Luggage</option>
        </select>
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input
          type="date"
          placeholder="Journey Date"
          name="journeyDate"
          value={formData.journeyDate}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input
          type="time"
          placeholder="Journey Time"
          className="time__picker"
          name="journeyTime"
          value={formData.journeyTime}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup>
        <textarea
          rows={5}
          type="textarea"
          className="textarea"
          placeholder="Write"
          name="additionalText"
          value={formData.additionalText}
          onChange={handleChange}
        ></textarea>
      </FormGroup>

      <button className="booking_btn" type="submit">Submit</button>
      <ToastContainer />
    </Form>
  );
};

export default BookingForm;
