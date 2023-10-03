import { Route, Routes } from 'react-router-dom';
import Home from '../src/pages/Home';
import About from '../src/pages/About';
import Footer from './components/Footer';
import Header from './components/Header';
import Login  from './pages/Login';
import Signup from './pages/Signup';

function App() {
    return ( 
        <div className="App" > 
          <Header></Header>
            <div class="container text-center p-5 mr-auto">
              <Routes>
                <Route path="/" element={<Home/>} /> 
                <Route path="/about" element={<About/>} />
                <Route path="/login" element={<Login/>} /> 
                <Route path="/sign-up" element={<Signup/>} />
              </Routes>
            </div>
          <Footer></Footer>
        </div> 
      );
}
export default App;