import React, { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';

const SignIn = ({ onLogin, switchToSignup, closeAllPopups, AuthService }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }

        if (!isValidEmail(formData.email)) {
            setError('Please enter a valid email');
            return;
        }

        setLoading(true);

        try {
            await AuthService.login(formData);
            onLogin();
        } catch (err) {
            setError(err.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={closeAllPopups}
            ></div>

            <div className="relative z-10 w-full max-w-sm sm:max-w-md animate-[modalSlideIn_0.3s_ease-out]">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl relative">
                    <button
                        onClick={closeAllPopups}
                        className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/60 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>

                    <h1 className="text-2xl sm:text-4xl font-bold text-white text-center mb-6 sm:mb-8">Login</h1>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm mb-4">
                            {error}
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 sm:mb-6">
                            <label className="block text-white/80 text-sm mb-2" htmlFor="email">Username or email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                disabled={loading}
                                className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all duration-300 text-sm sm:text-base"
                                placeholder="Enter your username or email"
                            />
                        </div>

                        <div className="mb-3 sm:mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-white/80 text-sm" htmlFor="password">Password</label>
                                <a href="#" className="text-red-400 text-xs sm:text-sm hover:text-red-300 transition-colors">
                                    Forgot password?
                                </a>
                            </div>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    autoComplete="current-password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    type={showPassword ? "text" : "password"}
                                    disabled={loading}
                                    className="w-full px-3 py-2.5 sm:px-4 sm:py-3 pr-10 sm:pr-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all duration-300 text-sm sm:text-base"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                                    disabled={loading}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="mb-6 sm:mb-8">
                            <label className="flex items-center text-white/80 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="mr-2 sm:mr-3 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-white/20 bg-white/10 text-red-500 focus:ring-red-500 focus:ring-offset-0 accent-red-500"
                                    disabled={loading}
                                />
                                <span className="text-xs sm:text-sm">Remember me</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className={`w-full text-white py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 shadow-lg mb-4 sm:mb-6 ${
                                loading
                                    ? 'bg-gray-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25'
                            }`}
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Signing in...
                                </div>
                            ) : (
                                'Login'
                            )}
                        </button>
                    </form>

                    <div className="text-center">
                        <span className="text-white/70 text-xs sm:text-sm">Don't have an account? </span>
                        <button
                            onClick={switchToSignup}
                            className="text-red-400 text-xs sm:text-sm hover:text-red-300 transition-colors font-medium"
                        >
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;