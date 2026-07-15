import React, { useState, useEffect, useRef } from 'react';
import { User, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { gsap } from 'gsap';
import useAuth from '../store/Useauth';

const Navbar = () => {
    const { authStatus, logout } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    // Refs for mount animation
    const navRef       = useRef(null);
    const logoRef      = useRef(null);
    const linksRef     = useRef(null);
    const authRef      = useRef(null);
    const hamburgerRef = useRef(null);

    // ── Mount animation ──────────────────────────────────────────────────────
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Start everything invisible / slightly offset
            gsap.set(navRef.current,       { y: -64, opacity: 0 });
            gsap.set(logoRef.current,      { x: -20, opacity: 0 });
            gsap.set(linksRef.current,     { y: -10, opacity: 0 });
            gsap.set(authRef.current,      { x: 20,  opacity: 0 });
            gsap.set(hamburgerRef.current, { x: 20,  opacity: 0 });

            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            // 1. Nav bar slides down
            tl.to(navRef.current, { y: 0, opacity: 1, duration: 0.55 })
            // 2. Logo fades in from left
              .to(logoRef.current, { x: 0, opacity: 1, duration: 0.45 }, '-=0.25')
            // 3. Center links fade up
              .to(linksRef.current, { y: 0, opacity: 1, duration: 0.4 }, '-=0.3')
            // 4. Auth buttons / hamburger slide in from right
              .to(authRef.current,      { x: 0, opacity: 1, duration: 0.4 }, '-=0.3')
              .to(hamburgerRef.current, { x: 0, opacity: 1, duration: 0.4 }, '<');

            // Stagger each nav link individually for a ripple feel
            const links = linksRef.current?.querySelectorAll('a');
            if (links?.length) {
                gsap.fromTo(
                    links,
                    { y: -8, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.35, stagger: 0.07, ease: 'power2.out', delay: 0.45 }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(prev => {
            document.body.style.overflow = prev ? 'unset' : 'hidden';
            return !prev;
        });
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        document.body.style.overflow = 'unset';
    };

    const handleLogout = async () => {
        await logout();
        closeMobileMenu();
        toast.success('Logged out successfully!');
        navigate('/');
    };

    return (
        <>
            <nav
                ref={navRef}
                className={`fixed w-full z-50 transition-shadow duration-300 bg-white border-b border-gray-100 ${
                    isScrolled ? 'shadow-sm' : ''
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-14 sm:h-16">

                        {/* Logo */}
                        <Link ref={logoRef} to="/" className="flex items-center flex-shrink-0">
                            <span className="text-xl sm:text-2xl font-bold tracking-tight">
                                <span className="text-gray-900">Simpli</span>
                                <span className="text-blue-500">Find</span>
                            </span>
                        </Link>

                        {/* Desktop center nav */}
                        <div ref={linksRef} className="hidden md:flex items-center space-x-8">
                            {[
                                { label: 'Home',         href: '#home' },
                                { label: 'About',        href: '#about' },
                                { label: 'How it works?',href: '#how-it-works' },
                                { label: 'Reviews',      href: '#reviews' },
                                { label: 'Features',     href: '#features' },
                            ].map(({ label, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium relative group"
                                >
                                    {label}
                                    {/* animated underline on hover */}
                                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300 rounded-full" />
                                </a>
                            ))}
                        </div>

                        {/* Desktop right auth */}
                        <div ref={authRef} className="hidden md:flex items-center space-x-4">
                            {authStatus ? (
                                <Link
                                    to="/profile"
                                    className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
                                    title="Profile"
                                >
                                    <User className="w-5 h-5 text-blue-500" />
                                </Link>
                            ) : (
                                <>
                                    <button
                                        onClick={() => navigate('/login')}
                                        className="text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900 transition-colors duration-200"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => navigate('/signup')}
                                        className="text-sm font-semibold cursor-pointer text-white bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
                                    >
                                        SignUp
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Mobile hamburger */}
                        <button
                            ref={hamburgerRef}
                            className="md:hidden flex items-center justify-center w-9 h-9 text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                            onClick={toggleMobileMenu}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile menu overlay */}
            <div
                className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
                    isMobileMenuOpen
                        ? 'opacity-100 pointer-events-auto'
                        : 'opacity-0 pointer-events-none'
                }`}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                    onClick={closeMobileMenu}
                />

                {/* Drawer */}
                <div
                    className={`absolute top-14 sm:top-16 left-0 right-0 bg-white shadow-xl transition-transform duration-300 ease-out ${
                        isMobileMenuOpen ? 'translate-y-0' : '-translate-y-4'
                    }`}
                >
                    <div className="px-4 py-4 space-y-1 border-b border-gray-100">
                        {[
                            { label: 'Home',          href: '#home' },
                            { label: 'About',         href: '#about' },
                            { label: 'How it works?', href: '#how-it-works' },
                            { label: 'Reviews',       href: '#reviews' },
                            { label: 'Features',      href: '#features' },
                        ].map(({ label, href }) => (
                            <a
                                key={label}
                                href={href}
                                onClick={closeMobileMenu}
                                className="block px-3 py-2.5 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                            >
                                {label}
                            </a>
                        ))}
                    </div>

                    <div className="px-4 py-4 space-y-2">
                        {authStatus ? (
                            <>
                                <Link
                                    to="/profile"
                                    onClick={closeMobileMenu}
                                    className="flex items-center space-x-3 px-3 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                                >
                                    <User className="w-5 h-5 text-blue-500" />
                                    <span>Profile</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-3 py-2.5 text-base font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => { closeMobileMenu(); navigate('/login'); }}
                                    className="w-full text-left px-3 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => { closeMobileMenu(); navigate('/signup'); }}
                                    className="w-full py-2.5 text-base font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-full transition-colors text-center"
                                >
                                    SignUp
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;