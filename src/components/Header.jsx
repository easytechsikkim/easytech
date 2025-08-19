import React, { useState } from "react";
import { Cog, Menu, Phone, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header({ menuItems }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-md z-50 border-b border-stone-200">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 py-4">
                {/* Brand */}
                <Link to="/" className="flex items-center space-x-2 text-xl sm:text-2xl font-bold text-stone-900">
                    <Cog size={28} className="text-green-800" />
                    <span>EASY TECH</span>
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center space-x-8 ml-10">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            className="text-stone-700 hover:text-green-900 transition-colors font-medium"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Contact */}
                <div className="hidden md:flex items-center space-x-2 text-stone-800 font-semibold ml-auto">
                    <Phone size={18} className="text-green-800" />
                    <span>+91 9851933977</span>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-stone-700 ml-auto"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <nav className="md:hidden bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-md animate-slideDown">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            className="block px-6 py-3 text-stone-700 hover:text-green-900 font-medium transition-colors"
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
