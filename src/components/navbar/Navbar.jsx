import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        document.addEventListener("mousedown", handleClickOutside);
        
        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className={`p-4 fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/90 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo or Brand Name could go here */}
                
                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-8 ml-auto">
                    <NavLink
                        to="/home"
                        className={({ isActive }) =>
                            isActive
                                ? "text-blue-400 font-medium text-lg relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-0.5 after:bg-blue-500"
                                : "text-white font-medium text-lg hover:text-blue-300 transition-colors relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-0.5 after:bg-blue-500 after:transition-all hover:after:w-full"
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            isActive
                                ? "text-blue-400 font-medium text-lg relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-0.5 after:bg-blue-500"
                                : "text-white font-medium text-lg hover:text-blue-300 transition-colors relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-0.5 after:bg-blue-500 after:transition-all hover:after:w-full"
                        }
                    >
                        About
                    </NavLink>
                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            isActive
                                ? "text-blue-400 font-medium text-lg relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-0.5 after:bg-blue-500"
                                : "text-white font-medium text-lg hover:text-blue-300 transition-colors relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-0.5 after:bg-blue-500 after:transition-all hover:after:w-full"
                        }
                    >
                        Contact
                    </NavLink>
                </div>

                {/* Mobile Hamburger Icon */}
                {!isOpen && (
                    <div className="md:hidden flex items-center ml-auto">
                        <button onClick={toggleMenu} className="text-white focus:outline-none">
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Mobile Sidebar */}
                {isOpen && (
                    <div
                        ref={menuRef}
                        className="fixed top-0 right-0 h-screen w-64 bg-gray-900 shadow-xl z-50 md:hidden transform transition-transform duration-300 ease-in-out"
                    >
                        <div className="flex justify-end p-4">
                            <button onClick={toggleMenu} className="text-white">
                                {/* Cross Button */}
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-col items-center space-y-8 mt-8 p-4">
                            <NavLink
                                to="/home"
                                onClick={toggleMenu}
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-blue-400 font-medium text-lg border-l-4 border-blue-500 pl-4 w-full"
                                        : "text-white font-medium text-lg hover:text-blue-300 hover:border-l-4 hover:border-blue-500 hover:pl-4 transition-all w-full"
                                }
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/about"
                                onClick={toggleMenu}
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-blue-400 font-medium text-lg border-l-4 border-blue-500 pl-4 w-full"
                                        : "text-white font-medium text-lg hover:text-blue-300 hover:border-l-4 hover:border-blue-500 hover:pl-4 transition-all w-full"
                                }
                            >
                                About
                            </NavLink>
                            <NavLink
                                to="/contact"
                                onClick={toggleMenu}
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-blue-400 font-medium text-lg border-l-4 border-blue-500 pl-4 w-full"
                                        : "text-white font-medium text-lg hover:text-blue-300 hover:border-l-4 hover:border-blue-500 hover:pl-4 transition-all w-full"
                                }
                            >
                                Contact
                            </NavLink>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
