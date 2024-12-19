import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink for active state
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8 z-50 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-cyan-300 text-lg font-semibold mb-4 transition"
                                    : "text-lg font-semibold mb-4 hover:text-cyan-400 transition"
                            }
                        >
                            About Us
                        </NavLink>
                        <p className="text-sm text-gray-300">
                            We are committed to delivering the best products and services to our customers...
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <NavLink
                                    to="/terms"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-cyan-300 text-sm transition"
                                            : "text-sm text-gray-300 hover:text-cyan-400 transition"
                                    }
                                >
                                    Terms and Conditions
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/privacy"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-cyan-300 text-sm transition"
                                            : "text-sm text-gray-300 hover:text-cyan-400 transition"
                                    }
                                >
                                    Privacy Policy
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/faq"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-cyan-300 text-sm transition"
                                            : "text-sm text-gray-300 hover:text-cyan-400 transition"
                                    }
                                >
                                    FAQs
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/contact"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-cyan-300 text-sm transition"
                                            : "text-sm text-gray-300 hover:text-cyan-400 transition"
                                    }
                                >
                                    Contact Us
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a
                                href="http://facebook.com/profile.php?id=61568381275729"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-300 hover:text-cyan-400 transition"
                            >
                                <FaFacebook size={24} />
                            </a>
                            <a
                                href="https://www.youtube.com/@goaiguru"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-300 hover:text-cyan-400 transition"
                            >
                                <FaYoutube size={24} />
                            </a>
                            <a
                                href="https://www.instagram.com/aiguruin/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-300 hover:text-cyan-400 transition"
                            >
                                <FaInstagram size={24} />
                            </a>
                            <a
                                href="https://www.linkedin.com/company/ai-guru-in"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-300 hover:text-cyan-400 transition"
                            >
                                <FaLinkedin size={24} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-700 my-8"></div>
                <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} AIGuru. All Rights Reserved.</p>
                    <div className="space-x-4">
                        <NavLink
                            to="/terms"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-cyan-300 hover:text-cyan-400 transition"
                                    : "hover:text-cyan-400 transition"
                            }
                        >
                            Terms
                        </NavLink>
                        <NavLink
                            to="/privacy"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-cyan-300 hover:text-cyan-400 transition"
                                    : "hover:text-cyan-400 transition"
                            }
                        >
                            Privacy
                        </NavLink>
                        <NavLink
                            to="/sitemap"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-cyan-300 hover:text-cyan-400 transition"
                                    : "hover:text-cyan-400 transition"
                            }
                        >
                            Sitemap
                        </NavLink>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
