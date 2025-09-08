import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    return (
        <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-600 to-blue-600">
                {/* Large floating shapes */}
                <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-400/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-pink-500/40 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1000ms'}}></div>
                <div className="absolute top-1/2 left-10 w-64 h-64 bg-blue-500/30 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1500ms'}}></div>
                <div className="absolute bottom-40 left-1/3 w-48 h-48 bg-purple-500/40 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2000ms'}}></div>
                
                {/* Medium shapes */}
                <div className="absolute top-40 right-40 w-32 h-32 bg-cyan-300/50 rounded-full blur-xl animate-pulse" style={{animationDelay: '500ms'}}></div>
                <div className="absolute bottom-60 left-60 w-40 h-40 bg-pink-400/40 rounded-full blur-xl animate-pulse" style={{animationDelay: '1800ms'}}></div>
                <div className="absolute top-60 left-1/2 w-36 h-36 bg-blue-400/35 rounded-full blur-xl animate-pulse" style={{animationDelay: '1200ms'}}></div>
                
                {/* Small floating orbs */}
                <div className="absolute top-32 right-60 w-16 h-16 bg-cyan-200/60 rounded-full blur-lg animate-pulse" style={{animationDelay: '800ms'}}></div>
                <div className="absolute bottom-32 right-32 w-20 h-20 bg-purple-400/50 rounded-full blur-lg animate-pulse" style={{animationDelay: '1600ms'}}></div>
                <div className="absolute top-3/4 left-40 w-12 h-12 bg-pink-300/60 rounded-full blur-md animate-pulse" style={{animationDelay: '400ms'}}></div>
            </div>

            {/* Login Form */}
            <div className="relative z-10 w-full max-w-md mx-4">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                    {/* Title */}
                    <h1 className="text-4xl font-bold text-white text-center mb-8">Login</h1>
                    
                    {/* Username Input */}
                    <div className="mb-6">
                        <label className="block text-white/80 text-sm mb-2">Username or email</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all duration-300"
                            placeholder="Enter your username or email"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-white/80 text-sm">Password</label>
                            <a href="#" className="text-yellow-400 text-sm hover:text-yellow-300 transition-colors">
                                Forgot password ?
                            </a>
                        </div>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 pr-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all duration-300"
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Remember Me */}
                    <div className="mb-8">
                        <label className="flex items-center text-white/80 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="mr-3 w-4 h-4 rounded border-white/20 bg-white/10 text-red-500 focus:ring-red-500 focus:ring-offset-0"
                            />
                            <span className="text-sm">Remember me</span>
                        </label>
                    </div>

                    {/* Login Button */}
                    <button className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-red-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-red-500/25 mb-6">
                        Login
                    </button>

                    {/* Sign Up Link */}
                    <div className="text-center">
                        <span className="text-white/70 text-sm">Don't have an account? </span>
                        <a href="#" className="text-yellow-400 text-sm hover:text-yellow-300 transition-colors font-medium">
                            Sign up
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;