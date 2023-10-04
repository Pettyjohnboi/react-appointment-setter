import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_APPOINTMENT } from "../utils/mutations";
import { useNavigate } from "react-router-dom"; 

function Home() {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [addAppointment] = useMutation(ADD_APPOINTMENT);
    const navigate = useNavigate(); 
  
    
    const handleAppointment = async (event) => {
      event.preventDefault();
      const nameInput = name;
      const addressInput = address;
      const phoneInput = phone;
      const emailInput = email;
      const descriptionInput = description;
      const dateInput = date;
      const userId = Auth.getProfile().data._id;

      //add date that switches to date time utc
      try {
        const { data } = await addAppointment({
            variables: {
                appointmentInput: {
                  name: nameInput,
                  address: addressInput,
                  phone: phoneInput,
                  email: emailInput,
                  description: descriptionInput,
                  dateTime: dateInput,
                  userId: userId
                },
              },
        }); 
        //Refresh to add more appointments
        window.location.reload(false);
      } catch (err) {
        console.error(err);
        // add signup error message later
      }
    };
  
    return (
      <div className="container mt-5">
        <h2>Add Appointment</h2>
        <Form onSubmit={handleAppointment}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="address"
              placeholder="Address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="datetime-local"
              placeholder="Date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </Form.Group>
            <div class="pt-3">
                <Button variant="primary" type="submit">
                    Add
                </Button>
            </div>
        </Form>
      </div>
    );
  }

export default Home;