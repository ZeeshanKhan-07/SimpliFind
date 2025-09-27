import React from 'react';
import { Youtube, Search, MessageCircle } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-t from-black to-gray-950 py-16 sm:py-20 border-t border-gray-800 shadow-inner">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-y-12 sm:gap-y-16 md:gap-x-12 lg:gap-x-20">
                    <div className="col-span-1 md:col-span-2 flex flex-col items-center text-center md:items-start md:text-left">
                        <div className="flex items-center space-x-3 mb-6 group cursor-pointer">
                            <div className="relative">
                                <Youtube className="h-10 w-10 text-red-500 group-hover:scale-110 transition-transform duration-300" />
                                <div className="absolute inset-0 bg-red-500 rounded-full opacity-20 group-hover:animate-ping"></div>
                            </div>
                            <span className="text-4xl font-extrabold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent tracking-wide">
                                SimpliFind
                            </span>
                        </div>
                        <p className="text-gray-400 mb-8 max-w-md leading-relaxed text-lg">
                            Revolutionizing how you discover and analyze YouTube comments with cutting-edge AI-powered search technology.
                        </p>
                        <div className="flex space-x-5 mt-auto">
                            <a href="#" aria-label="YouTube" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300 cursor-pointer group transform hover:-translate-y-1">
                                <Youtube className="w-6 h-6 text-gray-400 group-hover:text-white" />
                            </a>
                            <a href="#" aria-label="Search" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300 cursor-pointer group transform hover:-translate-y-1">
                                <Search className="w-6 h-6 text-gray-400 group-hover:text-white" />
                            </a>
                            <a href="#" aria-label="Message" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300 cursor-pointer group transform hover:-translate-y-1">
                                <MessageCircle className="w-6 h-6 text-gray-400 group-hover:text-white" />
                            </a>
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-2 mt-8 md:mt-12">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 font-medium text-lg text-center md:text-left hover:text-red-400">
                                About Us
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 font-medium text-lg text-center md:text-left hover:text-red-400">
                                Privacy & Security
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 font-medium text-lg text-center md:text-left hover:text-red-400">
                                Terms & Conditions
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 font-medium text-lg text-center md:text-left hover:text-red-400">
                                Get Started
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-16 pt-8 text-center">
                    <p className="text-gray-500 text-base">
                        © 2025 SimpliFind. All rights reserved. Built with <span className="text-red-500">❤️</span> for the YouTube community.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;