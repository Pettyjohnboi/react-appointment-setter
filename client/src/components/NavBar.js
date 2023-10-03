import React from 'react'; 
import { NavLink } from 'react-router-dom';  

function NavBar() {
    return ( 
        <div class="container p-2"> 
            <div class="row">
                <div class="col-8"> 
                    <NavLink to="/">Home</NavLink> 
                    <span> - </span>
                    <NavLink to="/appointments " >About</NavLink> 
                </div>
                <div class="col-2"></div>
                <div class="col-2 text-center"> 
                    <NavLink to="/login" >Login</NavLink>
                    <span> - </span>
                    <NavLink to="/sign-up" >Sign-up</NavLink> 
                </div>
            </div>
        </div>
    );
}

export default NavBar;