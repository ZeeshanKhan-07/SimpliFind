import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';

const SignUp = ({ closeAllPopups, switchToLogin }) => {
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={closeAllPopups}
            ></div>

            {/* Modal Content */}
            <div className="relative z-10 w-full max-w-sm sm:max-w-md max-h-[95vh] overflow-y-auto animate-[modalSlideIn_0.3s_ease-out]">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl relative m-1 sm:m-2">
                    {/* Close Button */}
                    <button
                        onClick={closeAllPopups}
                        className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/60 hover:text-white transition-colors z-20"
                    >
                        <X size={20} className="sm:hidden" />
                        <X size={24} className="hidden sm:block" />
                    </button>

                    {/* Title */}
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-4 sm:mb-6">Sign Up</h1>

                    {/* Name Input */}
                    <div className='flex flex-col sm:flex-row gap-2 sm:gap-4'>
                        <div className="mb-3 sm:mb-4 flex-1">
                            <label className="block text-white/80 text-sm mb-1.5 sm:mb-2">First Name</label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 md:py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all duration-300 text-sm sm:text-base"
                                placeholder="First name"
                            />
                        </div>
                        <div className="mb-3 sm:mb-4 flex-1">
                            <label className="block text-white/80 text-sm mb-1.5 sm:mb-2">Last Name</label>
                            <input
                                type="text"
                                value={secondName}
                                onChange={(e) => setSecondName(e.target.value)}
                                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 md:py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all duration-300 text-sm sm:text-base"
                                placeholder="Last name"
                            />
                        </div>
                    </div>

                    {/* Email Input */}
                    <div className="mb-3 sm:mb-4">
                        <label className="block text-white/80 text-sm mb-1.5 sm:mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 sm:px-4 sm:py-2.5 md:py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all duration-300 text-sm sm:text-base"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Username Input */}
                    <div className="mb-3 sm:mb-4">
                        <label className="block text-white/80 text-sm mb-1.5 sm:mb-2">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 sm:px-4 sm:py-2.5 md:py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all duration-300 text-sm sm:text-base"
                            placeholder="Choose a username"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-3 sm:mb-4">
                        <label className="block text-white/80 text-sm mb-1.5 sm:mb-2">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 md:py-3 pr-10 sm:pr-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all duration-300 text-sm sm:text-base"
                                placeholder="Create a password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff size={16} className="sm:w-[18px] sm:h-[18px]" /> : <Eye size={16} className="sm:w-[18px] sm:h-[18px]" />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password Input */}
                    <div className="mb-4 sm:mb-4">
                        <label className="block text-white/80 text-sm mb-1.5 sm:mb-2">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 md:py-3 pr-10 sm:pr-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all duration-300 text-sm sm:text-base"
                                placeholder="Confirm your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                            >
                                {showConfirmPassword ? <EyeOff size={16} className="sm:w-[18px] sm:h-[18px]" /> : <Eye size={16} className="sm:w-[18px] sm:h-[18px]" />}
                            </button>
                        </div>
                    </div>

                    {/* Terms Agreement */}
                    <div className="mb-4 sm:mb-6">
                        <label className="flex items-start text-white/80 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={agreeToTerms}
                                onChange={(e) => setAgreeToTerms(e.target.checked)}
                                className="mr-2 sm:mr-3 mt-0.5 sm:mt-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded accent-red-500 flex-shrink-0"
                            />
                            <span className="text-xs sm:text-sm leading-relaxed">
                                I agree to the <span className="text-red-400 hover:text-red-300 transition-colors">Terms of Service</span> and <span className="text-red-400 hover:text-red-300 transition-colors">Privacy Policy</span>
                            </span>
                        </label>
                    </div>

                    {/* Sign Up Button */}
                    <button className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-2.5 sm:py-3 md:py-4 rounded-xl font-semibold text-sm sm:text-base md:text-lg hover:from-red-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-red-500/25 mb-3 sm:mb-4">
                        Create Account
                    </button>

                    {/* Login Link */}
                    <div className="text-center">
                        <span className="text-white/70 text-xs sm:text-sm">Already have an account? </span>
                        <button
                            onClick={switchToLogin}
                            className="text-red-400 text-xs sm:text-sm hover:text-red-300 transition-colors font-medium"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;