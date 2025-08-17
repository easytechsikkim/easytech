import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-green-950 text-stone-200 py-12 px-4 sm:px-6 lg:px-10">
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">

                {/* Company Info */}
                <div>
                    <h3 className="text-2xl font-bold text-white mb-4">EASY TECH</h3>
                    <p className="text-gray-400 text-sm">
                        Expert IT services, laptop & desktop repair, networking, CCTV installation, and more.
                        Fast, reliable, and secure.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                        <li><Link to="/services" className="hover:text-white transition">Services</Link></li>
                        <li><Link to="/about" className="hover:text-white transition">About</Link></li>
                        <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
                    </ul>
                </div>

                {/* Services */}
                <div>
                    <h4 className="text-xl font-semibold mb-4">Services</h4>
                    <ul className="space-y-2">
                        <li><Link to="/services/laptop-repair" className="hover:text-white transition">Laptop Repair</Link></li>
                        <li><Link to="/services/desktop-repair" className="hover:text-white transition">Desktop Repair</Link></li>
                        <li><Link to="/services/networking" className="hover:text-white transition">Networking</Link></li>
                        <li><Link to="/services/cctv-installation" className="hover:text-white transition">CCTV & Security</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
                    <ul className="space-y-2 text-stone-400 text-sm">
                        <li>
                            <span className="font-medium text-white">Phone:</span> +91 9851933977
                        </li>
                        <li>
                            <span className="font-medium text-white">Email:</span> easytech.sikkim@gmail.com
                        </li>
                        <li>
                            <span className="font-medium text-white">Address:</span> NH-10, Beside Sun Pharma, Ranipool, Gangtok-737135
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-green-800 mt-8 pt-6 text-center text-green-500 text-sm">
                &copy; {new Date().getFullYear()} EASY TECH. All rights reserved.
            </div>
        </footer>
    );
}
