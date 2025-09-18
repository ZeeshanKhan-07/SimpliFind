import React, { useState, useEffect } from 'react';
import { User, Menu, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, openLoginPopup, openSignupPopup, handleLogout }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        document.body.style.overflow = isMobileMenuOpen ? 'unset' : 'hidden';
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        document.body.style.overflow = 'unset';
    };

    return (
        <>
            <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-red-500/20' : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-12 sm:h-16">
                        {/* Logo */}
                        <div className="flex items-center space-x-2 group">
                            <Link to="/" className="text-lg sm:text-xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                                AI-App
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#features" className="text-gray-300 hover:text-red-400 transition-colors duration-300 relative group">
                                Features
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
                            </a>
                            <a href="#how-it-works" className="text-gray-300 hover:text-red-400 transition-colors duration-300 relative group">
                                How It Works
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
                            </a>

                            {isAuthenticated ? (
                                <Link to="/profile" className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-300">
                                    <User className="w-5 h-5" />
                                    <span>Profile</span>
                                </Link>
                            ) : (
                                <>
                                    <button onClick={openLoginPopup} className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-300">
                                        <User className="w-5 h-5" />
                                        <span>Log in</span>
                                    </button>
                                    <button onClick={openSignupPopup} className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-2 rounded-full hover:from-red-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/25">
                                        Sign up
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button className="md:hidden text-white p-1 z-[60] relative" onClick={toggleMobileMenu}>
                            <div className="relative w-5 h-5 sm:w-6 sm:h-6">
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </div>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-[55] transition-all duration-500 ease-in-out bg-black/70 backdrop-blur-md" onClick={closeMobileMenu}>
                    <div className="absolute top-12 sm:top-16 left-0 right-0 bottom-0 flex flex-col justify-start pt-8 px-4">
                        <div className="space-y-4 w-full max-w-sm mx-auto">
                            <a href="#features" onClick={closeMobileMenu} className="flex items-center justify-between w-full p-3 sm:p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white hover:bg-white/10 hover:border-red-500/30 transition-all duration-300 group">
                                <span className="text-base sm:text-lg font-medium">Features</span>
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a href="#how-it-works" onClick={closeMobileMenu} className="flex items-center justify-between w-full p-3 sm:p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white hover:bg-white/10 hover:border-red-500/30 transition-all duration-300 group">
                                <span className="text-base sm:text-lg font-medium">How It Works</span>
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 group-hover:translate-x-1 transition-transform" />
                            </a>
                            {isAuthenticated ? (
                                <button onClick={handleLogout} className="w-full p-3 sm:p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white hover:bg-white/10 hover:border-red-500/30 transition-all duration-300 group">
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center space-x-3">
                                            <User className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                                            <span className="text-base sm:text-lg font-medium">Logout</span>
                                        </div>
                                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </button>
                            ) : (
                                <>
                                    <button onClick={openLoginPopup} className="w-full p-3 sm:p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white hover:bg-white/10 hover:border-red-500/30 transition-all duration-300 group">
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center space-x-3">
                                                <User className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                                                <span className="text-base sm:text-lg font-medium">Sign In</span>
                                            </div>
                                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </button>
                                    <button onClick={openSignupPopup} className="w-full p-3 sm:p-4 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-semibold text-base sm:text-lg hover:from-red-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-red-500/25">
                                        Get Started
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;