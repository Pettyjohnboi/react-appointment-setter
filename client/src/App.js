import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div>
                {/* Navigation Links */}
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
  
                {/* Routes */}
                <Route path="/" exact component={Home} />
                <Route path="/about" component={About} />
            </div>
      </Router>
    );
}

function Home() {
    return <h3>Home Page</h3>;
}
function About() {
    return <h3>About Page</h3>;
}