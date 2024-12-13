import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="p-4 fixed top-0 text-lg left-0 w-full z-50 bg-transparent">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="hidden md:flex space-x-6 ml-auto">
                    <NavLink
                        to="/home"
                        className={({ isActive }) =>
                            isActive
                                ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400 text-lg border-b-2 border-blue-600" 
                                : "text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-500 text-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-400" 
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            isActive
                                ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400 text-lg border-b-2 border-blue-600"
                                : "text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-500 text-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-400"
                        }
                    >
                        About
                    </NavLink>
                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            isActive
                                ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400 text-lg border-b-2 border-blue-600"
                                : "text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-500 text-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-400"
                        }
                    >
                        Contact
                    </NavLink>
                </div>

                {/* Mobile Hamburger Icon */}
                {!isOpen && (
                    <div className="md:hidden flex items-center ml-auto">
                        <button onClick={toggleMenu} className="text-gray-900 focus:outline-none">
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
                        className="w-1/2 h-min fixed ml-auto inset-0 bg-inherit z-50 md:hidden"
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
                        <div className="flex flex-col items-center space-y-6 text-white">
                            <NavLink
                                to="/home"
                                onClick={toggleMenu}
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400 text-lg border-b-2 border-blue-600"
                                        : "text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-500 text-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-400"
                                }
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/about"
                                onClick={toggleMenu}
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400 text-lg border-b-2 border-blue-600"
                                        : "text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-500 text-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-400"
                                }
                            >
                                About
                            </NavLink>
                            <NavLink
                                to="/contact"
                                onClick={toggleMenu}
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400 text-lg border-b-2 border-blue-600"
                                        : "text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-500 text-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-400"
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
