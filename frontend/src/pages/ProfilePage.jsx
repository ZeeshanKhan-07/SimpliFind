import React from 'react';
import { LogOut, User as UserIcon } from 'lucide-react';

const ProfilePage = ({ user, onLogout }) => {
    // Basic check to ensure user data is available
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <div className="text-center p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
                    <p className="text-xl font-semibold mb-4">User not logged in.</p>
                    <a href="/" className="text-red-400 hover:text-red-300 transition-colors">Go to Home</a>
                </div>
            </div>
        );
    }

    const { firstName, lastName, email } = user;

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-black text-white">
            <div className="relative z-10 w-full max-w-md animate-[modalSlideIn_0.5s_ease-out]">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                    <div className="flex flex-col items-center mb-6">
                        <div className="bg-red-500/20 p-4 rounded-full mb-4">
                            <UserIcon size={48} className="text-red-400" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">{firstName} {lastName}</h1>
                        <p className="text-white/70">{email}</p>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                            <h2 className="text-sm font-medium text-white/80">Full Name</h2>
                            <p className="text-lg font-semibold text-white">{firstName} {lastName}</p>
                        </div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                            <h2 className="text-sm font-medium text-white/80">Email Address</h2>
                            <p className="text-lg font-semibold text-white">{email}</p>
                        </div>
                    </div>

                    <button
                        onClick={onLogout}
                        className="mt-8 w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 rounded-full font-semibold text-lg hover:from-red-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-red-500/25"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;