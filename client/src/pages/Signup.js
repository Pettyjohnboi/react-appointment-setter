
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { useNavigate } from "react-router-dom"; 


function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [addUser] = useMutation(ADD_USER);
  const navigate = useNavigate(); 

  
  const handleUserSignup = async (event) => {
    event.preventDefault();
    const usernameInput = username;
    const emailInput = email;
    const passwordInput = password;

    try {
      const { data } = await addUser({
        variables: {
          userInput: {
            username: usernameInput,
            email: emailInput,
            password: passwordInput,
          },
        },
      });
      Auth.login(data.addUser.token);

      // Redirect to the home page after successful signup
      navigate("/"); // Use navigate to redirect
    } catch (err) {
      console.error(err);
      // add signup error message later
    }
  };

  return (
    <div className="container mt-5">
      <h2>Sign Up</h2>
      <Form onSubmit={handleUserSignup}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </div>
  );
}

export default Signup;