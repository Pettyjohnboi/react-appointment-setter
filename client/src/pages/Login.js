import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { LOGIN_USER } from "../utils/mutations";
import { useNavigate } from "react-router-dom"; 


function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginUser] = useMutation(LOGIN_USER);
    const navigate = useNavigate(); 
  
    
    const handleUserSignup = async (event) => {
      event.preventDefault();
      const usernameInput = username;
      const passwordInput = password;
  
      try {
        const { data } = await loginUser({
          variables: {
            userInput: {
              username: usernameInput,
              password: passwordInput,
            },
          },
        });
        Auth.login(data.loginUser.token);
  
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
  
  export default Login;