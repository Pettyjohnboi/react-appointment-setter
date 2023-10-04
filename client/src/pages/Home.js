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
    const [addAppointment] = useMutation(ADD_APPOINTMENT);
    const navigate = useNavigate(); 
  
    
    const handleAppointment = async (event) => {
      event.preventDefault();
      const nameInput = name;
      const addressInput = address;
      const phoneInput = phone;
      const emailInput = email;
      const descriptionInput = description;
      const userId = Auth.getToken();
      
      try {
        const { data } = await addAppointment({
            variables: {
                userInput: {
                  name: nameInput,
                  address: addressInput,
                  phone: phoneInput,
                  email: emailInput,
                  description: descriptionInput,
                  userId: userId
                },
              },
        });
        Auth.login(data.login.token);
  
        // Redirect to the home page after successful signup
        navigate("/"); // Use navigate to redirect
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
              type="text"
              placeholder="Address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="password"
              placeholder="Phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="password"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="password"
              placeholder="Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
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