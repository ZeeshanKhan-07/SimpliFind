import React, { useState, useEffect } from 'react';
import { Search, MessageCircle, Youtube, Zap, Users, TrendingUp, Menu, X, ArrowRight, User, Eye, EyeOff } from 'lucide-react';
import SignUp from './Login/SignUp'; // Import the new SignUp component

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
    const [isSignUpPopupOpen, setIsSignUpPopupOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const openLoginPopup = () => {
        setIsLoginPopupOpen(true);
        setIsSignUpPopupOpen(false);
        setIsMobileMenuOpen(false);
        document.body.style.overflow = 'hidden';
    };

    const openSignUpPopup = () => {
        setIsSignUpPopupOpen(true);
        setIsLoginPopupOpen(false);
        setIsMobileMenuOpen(false);
        document.body.style.overflow = 'hidden';
    };

    const closeAllPopups = () => {
        setIsLoginPopupOpen(false);
        setIsSignUpPopupOpen(false);
        setIsMobileMenuOpen(false);
        document.body.style.overflow = 'unset';
    };

    const handleForgotPassword = () => {
        window.location.href = '/forgotPassword';
    };

    const switchToSignUp = () => {
        setIsLoginPopupOpen(false);
        setIsSignUpPopupOpen(true);
    };

    const switchToLogin = () => {
        setIsSignUpPopupOpen(false);
        setIsLoginPopupOpen(true);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        if (!isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    };

    return (
        <>
            {/* Navbar - Reduced height for mobile */}
            <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled
                ? 'bg-black/80 backdrop-blur-xl border-b border-red-500/20'
                : 'bg-transparent'
            }`}>
                <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-12 sm:h-16">
                        {/* Logo - Smaller on mobile */}
                        <div className="flex items-center space-x-2 group">
                            <div className="relative">
                                <Youtube className="h-6 w-6 sm:h-8 sm:w-8 text-red-500 group-hover:scale-110 transition-transform duration-300" />
                                <div className="absolute inset-0 bg-red-500 rounded-full opacity-20 group-hover:animate-ping"></div>
                            </div>
                            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                                SimpliFind
                            </span>
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
                            <button
                                onClick={openLoginPopup}
                                className="flex items-center space-x-2 text-gray-300 hover:text-red-400 transition-colors duration-300"
                            >
                                <User className="w-5 h-5" />
                                <span>Sign In</span>
                            </button>
                            <button 
                                onClick={openSignUpPopup}
                                className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-2 rounded-full hover:from-red-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/25"
                            >
                                Get Started
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-white p-1 z-[60] relative"
                            onClick={toggleMobileMenu}
                        >
                            <div className="relative w-5 h-5 sm:w-6 sm:h-6">
                                <div className={`absolute inset-0 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45' : ''}`}>
                                    {isMobileMenuOpen ? <X size={20} className="sm:hidden" /> : <Menu size={20} className="sm:hidden" />}
                                    {isMobileMenuOpen ? <X size={24} className="hidden sm:block" /> : <Menu size={24} className="hidden sm:block" />}
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay - Improved positioning */}
            <div className={`md:hidden fixed inset-0 z-[55] transition-all duration-500 ease-in-out ${isMobileMenuOpen
                ? 'opacity-100 visible'
                : 'opacity-0 invisible'
                }`}>
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/70 backdrop-blur-md"
                    onClick={closeAllPopups}
                />

                {/* Menu Content - Better mobile positioning */}
                <div className={`absolute top-12 sm:top-16 left-0 right-0 bottom-0 flex flex-col justify-start pt-8 px-4 transition-all duration-500 ${isMobileMenuOpen
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
                    }`}>

                    {/* Navigation Links */}
                    <div className="space-y-4 w-full max-w-sm mx-auto">
                        
                        <div className={`transform transition-all duration-700 delay-100 ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                            }`}>
                            <a
                                href="#features"
                                className="flex items-center justify-between w-full p-3 sm:p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white hover:bg-white/10 hover:border-red-500/30 transition-all duration-300 group"
                                onClick={closeAllPopups}
                            >
                                <span className="text-base sm:text-lg font-medium">Features</span>
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>

                        <div className={`transform transition-all duration-700 delay-200 ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                            }`}>
                            <a
                                href="#how-it-works"
                                className="flex items-center justify-between w-full p-3 sm:p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white hover:bg-white/10 hover:border-red-500/30 transition-all duration-300 group"
                                onClick={closeAllPopups}
                            >
                                <span className="text-base sm:text-lg font-medium">How It Works</span>
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>

                        <div className={`transform transition-all duration-700 delay-300 ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                            }`}>
                            <button
                                onClick={openLoginPopup}
                                className="flex items-center justify-between w-full p-3 sm:p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white hover:bg-white/10 hover:border-red-500/30 transition-all duration-300 group"
                            >
                                <div className="flex items-center space-x-3">
                                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                                    <span className="text-base sm:text-lg font-medium">Sign In</span>
                                </div>
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        <div className={`transform transition-all duration-700 delay-400 ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                            }`}>
                            <button
                                onClick={openSignUpPopup}
                                className="w-full p-3 sm:p-4 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-semibold text-base sm:text-lg hover:from-red-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-red-500/25"
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Login Popup Modal */}
            {isLoginPopupOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={closeAllPopups}
                    ></div>

                    {/* Modal Content - Better mobile sizing */}
                    <div className="relative z-10 w-full max-w-sm sm:max-w-md animate-[modalSlideIn_0.3s_ease-out]">
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl relative">
                            {/* Close Button */}
                            <button
                                onClick={closeAllPopups}
                                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/60 hover:text-white transition-colors"
                            >
                                <X size={20} className="sm:hidden" />
                                <X size={24} className="hidden sm:block" />
                            </button>

                            {/* Title */}
                            <h1 className="text-2xl sm:text-4xl font-bold text-white text-center mb-6 sm:mb-8">Login</h1>

                            {/* Username Input */}
                            <div className="mb-4 sm:mb-6">
                                <label className="block text-white/80 text-sm mb-2">Username or email</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all duration-300 text-sm sm:text-base"
                                    placeholder="Enter your username or email"
                                />
                            </div>

                            {/* Password Input */}
                            <div className="mb-3 sm:mb-4">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-white/80 text-sm">Password</label>
                                    <button
                                        onClick={handleForgotPassword}
                                        className="text-red-400 text-xs sm:text-sm hover:text-red-300 transition-colors"
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-3 py-2.5 sm:px-4 sm:py-3 pr-10 sm:pr-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all duration-300 text-sm sm:text-base"
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me */}
                            <div className="mb-6 sm:mb-8">
                                <label className="flex items-center text-white/80 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="mr-2 sm:mr-3 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-white/20 bg-white/10 text-red-500 focus:ring-red-500 focus:ring-offset-0 accent-red-500"
                                    />
                                    <span className="text-xs sm:text-sm">Remember me</span>
                                </label>
                            </div>

                            {/* Login Button */}
                            <button className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:from-red-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-red-500/25 mb-4 sm:mb-6">
                                Login
                            </button>

                            {/* Sign Up Link */}
                            <div className="text-center">
                                <span className="text-white/70 text-xs sm:text-sm">Don't have an account? </span>
                                <button
                                    onClick={switchToSignUp}
                                    className="text-red-400 text-xs sm:text-sm hover:text-red-300 transition-colors font-medium"
                                >
                                    Sign up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Sign Up Component */}
            {isSignUpPopupOpen && (
                <SignUp closeAllPopups={closeAllPopups} switchToLogin={switchToLogin} />
            )}

            <style jsx>{`
                @keyframes modalSlideIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95) translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }
            `}</style>
        </>
    );
};

export default Navbar;