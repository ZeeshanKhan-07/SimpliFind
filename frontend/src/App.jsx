import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import Footer from './components/Footer';
import AskAiPage from './pages/AskAiPage';

import SignIn from './components/Login/SignIn';
import SignUp from './components/Login/SignUp';
import AuthService from './services/AuthService';
import ProfilePage from './pages/ProfilePage'; 

const LandingPage = ({ isAuthenticated, openLoginPopup, openSignupPopup, handleLogout }) => {
    useEffect(() => {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                }
            });
        }, observerOptions);

        const elements = document.querySelectorAll('section > div');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <Navbar 
                isAuthenticated={isAuthenticated} 
                openLoginPopup={openLoginPopup} 
                openSignupPopup={openSignupPopup} 
                handleLogout={handleLogout}
            />
            <HeroSection />
            <FeaturesSection />
            <HowItWorksSection />
            <Footer />
        </>
    );
};

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
    const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const authenticated = AuthService.isAuthenticated();
                setIsAuthenticated(authenticated);
                if (authenticated) {
                    const userInfo = AuthService.getUserInfo();
                    setUser(userInfo);
                }
            } catch (error) {
                console.error('Error checking auth status:', error);
                setIsAuthenticated(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    const openLoginPopup = () => {
        setIsLoginPopupOpen(true);
        setIsSignupPopupOpen(false);
    };

    const openSignupPopup = () => {
        setIsSignupPopupOpen(true);
        setIsLoginPopupOpen(false);
    };

    const closeAllPopups = () => {
        setIsLoginPopupOpen(false);
        setIsSignupPopupOpen(false);
    };

    const handleLoginSuccess = () => {
        const userInfo = AuthService.getUserInfo();
        setUser(userInfo);
        setIsAuthenticated(true);
        closeAllPopups();
    };

    const handleSignupSuccess = () => {
        const userInfo = AuthService.getUserInfo();
        setUser(userInfo);
        setIsAuthenticated(true);
        closeAllPopups();
    };

    const handleLogout = () => {
        AuthService.logout();
        setIsAuthenticated(false);
        setUser(null);
        navigate('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
            <Routes>
                <Route path="/" element={<LandingPage isAuthenticated={isAuthenticated} openLoginPopup={openLoginPopup} openSignupPopup={openSignupPopup} handleLogout={handleLogout} />} />
                <Route path="/ask-ai" element={<AskAiPage isAuthenticated={isAuthenticated} onLogout={handleLogout} />} />
                <Route 
                    path="/profile" 
                    element={<ProfilePage user={user} onLogout={handleLogout} />} 
                />
            </Routes>
            
            {/* Render popups conditionally */}
            {isLoginPopupOpen && (
                <SignIn
                    closeAllPopups={closeAllPopups}
                    onLogin={handleLoginSuccess}
                    switchToSignup={openSignupPopup}
                    AuthService={AuthService}
                />
            )}
            {isSignupPopupOpen && (
                <SignUp
                    closeAllPopups={closeAllPopups}
                    onSignup={handleSignupSuccess}
                    switchToLogin={openLoginPopup}
                    AuthService={AuthService}
                />
            )}
        </div>
    );
};

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;