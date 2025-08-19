import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative bg-gradient-to-br from-stone-500 via-stone-800 to-black text-stone-300">
            <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-12">

                {/* Brand */}
                <div>
                    <h3 className="text-3xl font-extrabold text-white mb-4 tracking-tight">
                        EASY TECH
                    </h3>
                    <p className="text-sm leading-relaxed text-stone-300">
                        Expert IT services: laptop & desktop repair, networking, CCTV
                        installation, and more. Fast, reliable, and secure.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
                    <ul className="space-y-3 text-sm">
                        {[
                            { name: "Home", path: "/" },
                            { name: "Services", path: "/services" },
                            { name: "About", path: "/about" },
                            { name: "Contact", path: "/contact" },
                        ].map((link) => (
                            <li key={link.name}>
                                <Link
                                    to={link.path}
                                    className="hover:text-green-600 hover:underline transition-colors"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Services */}
                <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
                    <ul className="space-y-3 text-sm">
                        {[
                            { name: "Laptop Repair", path: "/services/laptop-repair" },
                            { name: "Desktop Repair", path: "/services/desktop-repair" },
                            { name: "Networking", path: "/services/networking" },
                            { name: "CCTV & Security", path: "/services/cctv-installation" },
                        ].map((service) => (
                            <li key={service.name}>
                                <Link
                                    to={service.path}
                                    className="hover:text-green-600 hover:underline transition-colors"
                                >
                                    {service.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
                    <ul className="space-y-4 text-sm">
                        <li className="flex items-center gap-3">
              <span className="bg-stone-700/50 p-2 rounded-full">
                <Phone size={16} className="text-green-600" />
              </span>
                            <span>+91 9851933977</span>
                        </li>
                        <li className="flex items-center gap-3">
              <span className="bg-stone-700/50 p-2 rounded-full">
                <Mail size={16} className="text-green-600" />
              </span>
                            <span>easytech.sikkim@gmail.com</span>
                        </li>
                        <li className="flex items-start gap-3">
              <span className="bg-stone-700/50 p-2 rounded-full">
                <MapPin size={16} className="text-green-600" />
              </span>
                            <span>
                NH-10, Beside Sun Pharma, <br /> Ranipool, Gangtok-737135
              </span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-stone-700 mt-10 py-6 text-center text-xs text-stone-500">
                &copy; {new Date().getFullYear()} EASY TECH. All rights reserved.
            </div>
        </footer>
    );
}
