import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Link, useNavigate } from 'react-router-dom';
import "./navbar.css"

// import { NavLink } from "react-router-dom";


export default function Navbar() {
    const navigate = useNavigate()

    function logout(){
        localStorage.setItem("userData", "")
        navigate('/login')
    }


    return (
        <nav className="navbar navbar-expand-md p-4 fixed-top fixed-left">
            <button className="navbar-toggler" data-bs-target="#index" data-bs-toggle="collapse" >
                <span className="navbar-toggler-icon"></span>
            </button>
            <a href="" className="navbar-brand ">Navbar</a>

            <div className="collapse navbar-collapse justify-content-start me-5" id="index">
                <ul className="nav-item active p-0 m-0 ml-5 mt-2 d-flex flex-md-row justify-content-between" id="index">
                    <li className="nav-link">
                        <Link to="/">Homepage</Link>
                    </li>
                    <li className="nav-link">
                        <Link to="/about">About</Link>
                    </li>
                    <li className="nav-link">
                        <Link to="/register">Register</Link>
                    </li>
                    <li className="nav-link">
                        <Link to="/login">Login</Link>
                    </li>
                    <li className="nav-link">
                        <a onClick={logout}>Logout</a>
                    </li>
                    
                    
                </ul>
            </div>
        </nav>
    );
}
