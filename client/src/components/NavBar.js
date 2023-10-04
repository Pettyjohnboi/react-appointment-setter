import React from 'react'; 
import { NavLink } from 'react-router-dom';  
import Auth from '../utils/auth';

function NavBar() {
 
    const LoginContext = Auth.loggedIn();
    let section;

    if (LoginContext) {
        section =   <div class="col-2 text-center"> 
                        <NavLink to="/" className="inactive" activeClassName="active" onClick={Auth.logout}>Logout</NavLink>
                    </div>
    } else {
        section = <div class="col-2 text-center"> 
            <NavLink to="/login" className="inactive" activeClassName="active">Login</NavLink>
            <span class="text-light"> - </span>
            <NavLink to="/sign-up" className="inactive" activeClassName="active">Sign-up</NavLink> 
        </div>
    }

    return ( 
        <div class="container p-2"> 
            <div class="row">
                <div class="col-8"> 
                    <NavLink to="/" className="inactive" activeClassName="active">Home</NavLink> 
                    <span class="text-light"> - </span>
                    <NavLink to="/appointments " className="inactive" activeClassName="active">Appointments</NavLink> 
                </div>
                <div class="col-2"></div>
                    {section}
                </div>
        </div>
    );
}

export default NavBar;