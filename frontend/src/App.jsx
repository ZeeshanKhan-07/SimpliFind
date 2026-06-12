import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import HowItWorksSection from "./components/HowItWorksSection";
import Footer from "./components/Footer";
import AskAiPage from "./pages/AskAiPage";

import SignIn from "./components/Login/SignIn";
import SignUp from "./components/Login/SignUp";
import AuthService from "./services/AuthService";
import ProfilePage from "./pages/ProfilePage";
import { Toaster } from "react-hot-toast";
import LoginPage from "./components/Login/LoginPage";

const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            duration: 3000,
            style: {
              background: 'rgba(255, 255, 255, 0.45)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              color: '#1e293b',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              borderRadius: '16px',
              fontSize: '14px',
              fontWeight: '500',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.06)',
            },
            iconTheme: {
              primary: '#1cec76',
              secondary: 'rgba(255, 255, 255, 0.5)',
            },
          },
        }}
      />
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <FeaturesSection />
              <HowItWorksSection />
              <Footer />
            </>
          }
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/ask-ai" element={<AskAiPage />} />
      </Routes>
    </>
  );
};

export default App;
