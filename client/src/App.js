import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import  {setContext}  from "@apollo/client/link/context";
import { Container }  from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Appointments from "./pages/Appointments";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NavBar from "./components/NavBar";
//import Auth from "./utils/auth";

const httpLink = createHttpLink({
  //this would need to change for live application
  uri: "http://localhost:3001/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
 
  return (
    <ApolloProvider client={client}>
      <Router>
          <Header>
            <NavBar
            />
          </Header>
          <Container fluid>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<Signup />} />
              <Route
                path="*"
                element={<h1 className="display-2">Wrong page!</h1>}
              />
            </Routes>
          </Container>
          <Footer /> 
      </Router>
    </ApolloProvider>
  );
}

export default App;