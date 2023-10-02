import React from 'react'; 
import { NavLink } from 'react-router-dom';  

function NavBar() {
    return ( 
        <div class="container p-4"> 
            <div class="row">
                <div class="col-8"> 
                    <NavLink to="/" >  Home  </NavLink> 
                    <NavLink to="/about" > About </NavLink> 
                </div>
                <div class="col-md-auto"></div>
                <div class="col-3"> 
                    <NavLink to="/login" >  Login  </NavLink>
                    <NavLink to="/sign-up" > Sign-up </NavLink> 
                </div>
            </div>
        </div> 
    );
}

export default NavBar;