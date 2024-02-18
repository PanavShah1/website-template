import React from "react";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from "./Homepage";
import About from "./About";
import Login from "./Login";
import Register from "./Register";

export default function App() {
    return (
        <Router>
            <div>
                {/* Include your Navbar component here if needed */}
                <Navbar />
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    )
}
