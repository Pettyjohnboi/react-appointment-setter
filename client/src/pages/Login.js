import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { LOGIN_USER } from "../utils/mutations";
import { useNavigate } from "react-router-dom"; 


function Login() {
    const [loginName, setLoginName] = useState("");
    const [loginPassword, setPassword] = useState("");
    const [loginUser] = useMutation(LOGIN_USER);
    const navigate = useNavigate(); 
  
    
    const handleUserLogin = async (event) => {
      event.preventDefault();
      const loginNameInput = loginName;
      const loginPasswordInput = loginPassword;
  
      try {
        const { data } = await loginUser({
          variables: {
            userInput: {
              loginName: loginNameInput,
              loginPassword: loginPasswordInput,
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
        <Form onSubmit={handleUserLogin}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username/Email"
              value={loginName}
              onChange={(event) => setLoginName(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={loginPassword}
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