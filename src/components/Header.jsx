import React, { useState } from "react";
import {Cog, Menu, Phone, X} from "lucide-react";
import { Link } from "react-router-dom";

export default function Header({ menuItems }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full backdrop-blur-md z-50 shadow-md px-6">
            <div className="container mx-auto flex items-center py-3">
                <div className="flex items-center text-2xl font-bold text-black mr-10 space-x-2">
                    <Cog size={28}/>
                    <Link to="/">EASY TECH</Link>
                </div>

                {/* Desktop Menu */}
                <nav className="hidden md:flex space-x-6 text-sm">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            className="text-black hover:bg-stone-200 px-2 py-1 rounded-md transition"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Contact Number */}
                <div className="hidden md:flex items-center ml-auto space-x-2 text-black font-medium">
                    <Phone size={20} fill="#000000"/>
                    <span>+91-9851933977</span>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-700 ml-auto"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X/> : <Menu/>}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <nav className="md:hidden bg-white/90 backdrop-blur-md shadow-md">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
            )}
        </header>
    );
}
