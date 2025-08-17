import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "@/components/Header.jsx";
import Home from "@/pages/Home.jsx";
import Booking from "@/pages/Booking.jsx";
import Service from "@/pages/Service.jsx";
import Contact from "@/pages/Contact.jsx"
import Footer from "@/components/Footer.jsx";
import {Toaster} from "../components/ui/sonner.jsx";


export default function App() {
    const menuItems = [
        {name: "Home", href: "/"},
        {name: "Services", href: "/services"},
        {name: "Contact", href: "/contact"},

    ];

    return (
        <Router>
            <Header menuItems={menuItems}/>
            <div>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/services" element={<Service/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/booking" element={<Booking/>}/>
                </Routes>
            </div>
            <Footer/>
            <Toaster/>
        </Router>
    );
}
