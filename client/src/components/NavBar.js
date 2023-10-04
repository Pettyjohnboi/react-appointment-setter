import React from 'react'; 
import { NavLink } from 'react-router-dom';  

function NavBar() {
    return ( 
        <div class="container p-2"> 
            <div class="row">
                <div class="col-8"> 
                    <NavLink to="/" className="inactive" activeClassName="active">Home</NavLink> 
                    <span class="text-light"> - </span>
                    <NavLink to="/appointments " className="inactive" activeClassName="active">Appointments</NavLink> 
                </div>
                <div class="col-2"></div>
                <div class="col-2 text-center"> 
                    <NavLink to="/login" className="inactive" activeClassName="active">Login</NavLink>
                    <span class="text-light"> - </span>
                    <NavLink to="/sign-up" className="inactive" activeClassName="active">Sign-up</NavLink> 
                </div>
            </div>
        </div>
    );
}

export default NavBar;