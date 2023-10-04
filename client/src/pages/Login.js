import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { LOGIN_USER } from "../utils/mutations";
import { useNavigate } from "react-router-dom"; 


function Login() {
    const [loginName, setLoginName] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginUser] = useMutation(LOGIN_USER);
    const navigate = useNavigate(); 
  
    
    const handleUserLogin = async (event) => {
      event.preventDefault();
      const loginNameInput = loginName;
      const loginPasswordInput = loginPassword;
  
      try {
        const { data } = await loginUser({
          variables: {
            loginName: loginNameInput,
            loginPassword: loginPasswordInput,
          },
        });
        Auth.login(data.login.token);
  
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
              onChange={(event) => setLoginPassword(event.target.value)}
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